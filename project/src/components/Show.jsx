// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Show = () => {
//   const [shows, setShows] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkTokenExpiration = (accessToken) => {
//       // Verify the token with the server
//       axios
//         .post("http://localhost:3000/api/verify-token", {
//           accessToken: accessToken,
//         })
//         .then((response) => {
//           if (!response.data.valid) {
//             // If the token is invalid or expired, log out the user
//             console.log("Token has expired. Auto-logout.");
//             localStorage.removeItem("accessToken");
//             navigate("/admin");
//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying token:", error);
//           localStorage.removeItem("accessToken");
//           navigate("/admin");
//         });
//     };

//     // Check if the user is authenticated (token exists in local storage)
//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) {
//       // If the token is not present, redirect the user to the login page
//       console.log("User not authenticated. Redirecting to login page.");
//       navigate("/admin");
//     } else {
//       // Verify the token with the server
//       axios
//         .post("http://localhost:3000/api/verify-token", {
//           accessToken: accessToken,
//         })
//         .then((response) => {
//           if (response.data.valid) {
//             // Token is valid, fetch the data
//             fetchAllShows();
//             // Check token expiration every 10 seconds
//             setInterval(() => checkTokenExpiration(accessToken), 10000);
//           } else {
//             // If the token is invalid or expired, redirect to login page
//             console.log("Token invalid or expired. Redirecting to login page.");
//             localStorage.removeItem("accessToken");
//             navigate("/admin");
//           }
//         })
//         .catch((error) => {
//           console.error("Error verifying token:", error);
//           localStorage.removeItem("accessToken");
//           navigate("/admin");
//         });
//     }
//   }, [navigate]);

//   const fetchAllShows = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/data");
//       console.log(res.data);
//       setShows(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getSelectedLabels = (show) => {
//     const selectedLabels = [];

//     if (show.selected_satisfaction) {
//       selectedLabels.push(show.selected_satisfaction);
//     }

//     if (show.selected_heard_from) {
//       selectedLabels.push(show.selected_heard_from);
//     }

//     return selectedLabels.join(", ");
//   };

//   return (
//     <div>
//       <h1>CLIENT REVIEW DATA</h1>
//       <table className="table table-striped table-hover table-bordered">
//         <thead>
//           <tr>
//             <th style={{ textAlign: "center" }}>ID</th>
//             <th style={{ textAlign: "center" }}>Name</th>
//             <th style={{ textAlign: "center" }}>Email</th>
//             <th style={{ textAlign: "center" }}>Age</th>
//             <th style={{ textAlign: "center" }}>Contact</th>
//             <th style={{ textAlign: "center" }}>Selected Labels</th>
//             <th style={{ textAlign: "center" }}>Satisfaction Level</th>
//             <th style={{ textAlign: "center" }}>Heard From</th>
//             <th style={{ textAlign: "center" }}>Message</th>
//           </tr>
//         </thead>
//         <tbody>
//           {shows.map((show) => (
//             <tr key={show.id}>
//               <td>{show.id}</td>
//               <td>{show.name}</td>
//               <td>{show.email}</td>
//               <td>{show.age}</td>
//               <td>{show.contact}</td>

//               <td>{getSelectedLabels(show)}</td>
//               <td>{show.selected_satisfaction}</td>
//               <td>{show.selected_heard_from}</td>
//               <td>{show.message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Show;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Show = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = (accessToken) => {
      // Verify the token with the server
      axios
        .post("http://localhost:3000/api/verify-token", {
          accessToken: accessToken,
        })
        .then((response) => {
          if (!response.data.valid) {
            // If the token is invalid or expired, log out the user
            console.log("Token has expired. Auto-logout.");
            localStorage.removeItem("accessToken");
            navigate("/admin");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("accessToken");
          navigate("/admin");
        });
    };

    // Check if the user is authenticated (token exists in local storage)
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // If the token is not present, redirect the user to the login page
      console.log("User not authenticated. Redirecting to login page.");
      navigate("/admin");
    } else {
      // Verify the token with the server
      axios
        .post("http://localhost:3000/api/verify-token", {
          accessToken: accessToken,
        })
        .then((response) => {
          if (response.data.valid) {
            // Token is valid, fetch the data
            fetchAllShows();
            // Check token expiration every 10 seconds
            setInterval(() => checkTokenExpiration(accessToken), 1000);
          } else {
            // If the token is invalid or expired, redirect to login page
            console.log("Token invalid or expired. Redirecting to login page.");
            localStorage.removeItem("accessToken");
            navigate("/admin");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("accessToken");
          navigate("/admin");
        });
    }
  }, [navigate]);

  const fetchAllShows = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/data");
      console.log(res.data);
      setShows(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedLabels = (show) => {
    const selectedLabels = [];

    if (show.selected_satisfaction) {
      selectedLabels.push(show.selected_satisfaction);
    }

    if (show.selected_heard_from) {
      selectedLabels.push(show.selected_heard_from);
    }

    return selectedLabels.join(", ");
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:3000/api/delete/${id}`);
      console.log("Form data deleted successfully.");
      toast.success("Deleted successfully");
      setTimeout(() => fetchAllShows(), 500);
    }
  };

  return (
    <div>
      <h1>CLIENT REVIEW DATA</h1>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Age</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Selected Labels</th>
            <th style={{ textAlign: "center" }}>Satisfaction Level</th>
            <th style={{ textAlign: "center" }}>Heard From</th>
            <th style={{ textAlign: "center" }}>Message</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show, index) => (
            <tr key={show.id}>
              <th scope="row">{show.id}</th>
              <td>{show.name}</td>
              <td>{show.email}</td>
              <td>{show.age}</td>
              <td>{show.contact}</td>
              <td>
                <Link to={`/edit/${show.id}`}>
                  <button className="btn btn-success">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteContact(show.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${show.id}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>

              <td>{getSelectedLabels(show)}</td>
              <td>{show.selected_satisfaction}</td>
              <td>{show.selected_heard_from}</td>
              <td>{show.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Show;
