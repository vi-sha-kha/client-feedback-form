// import axios from "axios";
// import React, { useState } from "react";
// import ReactPhoneInput from "react-phone-number-input/input";
// import "react-phone-number-input/style.css";
// //import { useForm, Controller } from "react-hook-form";

// const FormComponent = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState("");
//   const [contact, setContact] = useState("");
//   const [selected_satisfaction, setSelected_satisfaction] = useState("");
//   const [stand_out, setStandout] = useState("");
//   const [selected_heard_from, setHeardfrom] = useState("");
//   const [message, setMessage] = useState("");
//   //const [satisfaction, setSatisfaction] = useState("");

//   // Form validation function
//   const isFormValid = () => {
//     return (
//       name.trim() !== "" &&
//       email.trim() !== "" &&
//       age.trim() !== "" &&
//       contact.trim() !== "" &&
//       selected_satisfaction !== "" &&
//       stand_out !== "" &&
//       selected_heard_from !== "" &&
//       message.trim() !== ""
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     console.log(
//       name,
//       email,
//       age,
//       contact,
//       selected_satisfaction,
//       stand_out,
//       selected_heard_from,
//       message
//     );

//     let data = {
//       name: name,
//       email: email,
//       age: age,
//       contact: contact,
//       selected_satisfaction: selected_satisfaction,
//       stand_out: stand_out,
//       selected_heard_from: selected_heard_from,
//       message: message,
//     };

//     const config = {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//       },
//     };
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/submit",
//         data,
//         config
//       );
//       console.log(res.data);
//       alert("Form submitted successfully!");
//     } catch (e) {
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   const handleSatisfactionChange = (value) => {
//     console.log("Value", value);
//     setSelected_satisfaction(value);
//   };
//   const handleHeardAboutChange = (value) => {
//     console.log("Value", value);
//     setHeardfrom(value);
//   };

//   return (
//     <div className="container">
//       <h1>Client Feedback Survey Form</h1>
//       <hr />
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             {" "}
//             <label htmlFor="name" className="form-label"></label>
//             Name:
//             <input
//               type="text"
//               id="name"
//               className="form-control"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="form-control"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label htmlFor="age" className="form-label">
//               Age:
//             </label>
//             <input
//               type="text"
//               id="age"
//               className="form-control"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label htmlFor="contact" className="form-label">
//               Contact:
//             </label>
//             <ReactPhoneInput
//               defaultCountry="US" // Set the default country (change to your desired default)
//               value={contact}
//               onChange={setContact}
//               className="form-control"
//               inputStyle={{ width: "100%" }}
//               // You can also add any additional props as needed
//             />
//           </div>
//         </div>
//         <hr />
//         <h4 className="text-left">Are you satisfied with our services?</h4>
//         <div className="d-flex justify-content-start">
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="very-unsatisfied"
//               value="Very Unsatisfied"
//               checked={selected_satisfaction === "Very Unsatisfied"}
//               onChange={() => handleSatisfactionChange("Very Unsatisfied")}
//             />
//             <label className="form-check-label" htmlFor="very-unsatisfied">
//               Very Unsatisfied
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="unsatisfied"
//               value="Unsatisfied"
//               checked={selected_satisfaction === "Unsatisfied"}
//               onChange={() => handleSatisfactionChange("Unsatisfied")}
//             />
//             <label className="form-check-label" htmlFor="unsatisfied">
//               Unsatisfied
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="neutral"
//               value="Neutral"
//               checked={selected_satisfaction === "Neutral"}
//               onChange={() => handleSatisfactionChange("Neutral")}
//             />
//             <label className="form-check-label" htmlFor="neutral">
//               Neutral
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="satisfied"
//               value="Satisfied"
//               checked={selected_satisfaction === "Satisfied"}
//               onChange={() => handleSatisfactionChange("Satisfied")}
//             />
//             <label className="form-check-label" htmlFor="satisfied">
//               Satisfied
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="very-satisfied"
//               value="Very Satisfied"
//               checked={selected_satisfaction === "Very Satisfied"}
//               onChange={() => handleSatisfactionChange("Very Satisfied")}
//             />
//             <label className="form-check-label" htmlFor="very-satisfied">
//               Very Satisfied
//             </label>
//           </div>
//         </div>
//         <hr />
//         <h4>What made us stand out from other companies?</h4>
//         <textarea
//           id="stand_out"
//           className="form-control"
//           value={stand_out}
//           onChange={(e) => setStandout(e.target.value)}
//         ></textarea>
//         <hr />
//         <h4>Where did you hear about our company?</h4>
//         <div className="d-flex justify-content-start">
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Website"
//               value="Website"
//               checked={selected_heard_from === "Website"}
//               onChange={() => handleHeardAboutChange("Website")}
//             />
//             <label className="form-check-label" htmlFor="Social Media">
//               Website
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Social Media"
//               value="Social Media"
//               checked={selected_heard_from === "Social Media"}
//               onChange={() => handleHeardAboutChange("Social Media")}
//             />
//             <label className="form-check-label" htmlFor="Social Media">
//               Social Media
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Friends"
//               value="Friends"
//               checked={selected_heard_from === "Friends"}
//               onChange={() => handleHeardAboutChange("Friends")}
//             />
//             <label className="form-check-label" htmlFor="Friends">
//               Friends
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Others"
//               value="Others"
//               checked={selected_heard_from === "Others"}
//               onChange={() => handleHeardAboutChange("Others")}
//             />
//             <label className="form-check-label" htmlFor="Others">
//               Others
//             </label>
//           </div>
//         </div>
//         <hr />
//         <h4>Any suggestions/comments to better improve our services?</h4>
//         <div className="mb-3">
//           <label htmlFor="message" className="form-label">
//             Message:
//           </label>
//           <textarea
//             id="message"
//             className="form-control"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
//         </div>
//         {/* ... (existing form fields) */}
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//       <hr />
//       <h3>Thank you for choosing our services!</h3>
//       <hr />
//       <footer className="footer mt-auto py-3">
//         <div className="container">
//           <span className="text-muted">
//             © 2023 Your Company. All rights reserved.
//           </span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default FormComponent;

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import PhoneInput from "react-phone-number-input/input";
// import "react-phone-number-input/style.css";

// const FormComponent = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     register,
//   } = useForm();

//   const [selected_satisfaction, setSelected_satisfaction] = React.useState("");
//   const [selected_heard_from, setSelected_heard_from] = React.useState("");

//   const onSubmit = async (data) => {
//     console.log(data);

//     try {
//       const res = await axios.post("http://localhost:3000/api/submit", data);
//       console.log(res.data);
//       alert("Form submitted successfully!");
//       reset(); // Reset the form after successful submission
//     } catch (e) {
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   const handleSatisfactionChange = (value) => {
//     setSelected_satisfaction(value);
//   };

//   const handleHeardAboutChange = (value) => {
//     setSelected_heard_from(value);
//   };

//   return (
//     <div className="container">
//       <h1>Client Feedback Survey Form</h1>
//       <hr />
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label htmlFor="name" className="form-label">
//               Name:
//             </label>
//             <Controller
//               name="name"
//               control={control}
//               defaultValue=""
//               rules={{ required: "This field is required." }}
//               render={({ field }) => (
//                 <input
//                   type="text"
//                   id="name"
//                   className="form-control"
//                   {...field}
//                 />
//               )}
//             />
//             {errors.name && <span>{errors.name.message}</span>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label htmlFor="email" className="form-label">
//               Email:
//             </label>
//             <Controller
//               name="email"
//               control={control}
//               defaultValue=""
//               rules={{
//                 required: "This field is required.",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                   message: "Invalid email address.",
//                 },
//               }}
//               render={({ field }) => (
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control"
//                   {...field}
//                 />
//               )}
//             />
//             {errors.email && <span>{errors.email.message}</span>}
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label htmlFor="age" className="form-label">
//               Age:
//             </label>
//             <input
//               type="text"
//               id="age"
//               className="form-control"
//               {...register("age", { required: "This field is required." })}
//             />
//             {errors.age && <span>{errors.age.message}</span>}
//           </div>
//           <div className="col-md-6 mb-3">
//             <label htmlFor="contact" className="form-label">
//               Contact:
//             </label>
//             <Controller
//               name="contact"
//               control={control}
//               defaultValue=""
//               rules={{ required: "This field is required." }}
//               render={({ field }) => (
//                 <PhoneInput
//                   {...field}
//                   defaultCountry="US" // Set the default country (change to your desired default)
//                   className="form-control"
//                 />
//               )}
//             />
//             {errors.contact && <span>{errors.contact.message}</span>}
//           </div>
//         </div>
//         <hr />
//         <h4 className="text-left">Are you satisfied with our services?</h4>
//         <div className="d-flex justify-content-start">
//           {/* ... (existing checkboxes with handleSatisfactionChange) */}

//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="very-unsatisfied"
//               value="Very Unsatisfied"
//               checked={selected_satisfaction === "Very Unsatisfied"}
//               onChange={() => handleSatisfactionChange("Very Unsatisfied")}
//             />
//             <label className="form-check-label" htmlFor="very-unsatisfied">
//               Very Unsatisfied
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="unsatisfied"
//               value="Unsatisfied"
//               checked={selected_satisfaction === "Unsatisfied"}
//               onChange={() => handleSatisfactionChange("Unsatisfied")}
//             />
//             <label className="form-check-label" htmlFor="unsatisfied">
//               Unsatisfied
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="neutral"
//               value="Neutral"
//               checked={selected_satisfaction === "Neutral"}
//               onChange={() => handleSatisfactionChange("Neutral")}
//             />
//             <label className="form-check-label" htmlFor="neutral">
//               Neutral
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="satisfied"
//               value="Satisfied"
//               checked={selected_satisfaction === "Satisfied"}
//               onChange={() => handleSatisfactionChange("Satisfied")}
//             />
//             <label className="form-check-label" htmlFor="satisfied">
//               Satisfied
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="very-satisfied"
//               value="Very Satisfied"
//               checked={selected_satisfaction === "Very Satisfied"}
//               onChange={() => handleSatisfactionChange("Very Satisfied")}
//             />
//             <label className="form-check-label" htmlFor="very-satisfied">
//               Very Satisfied
//             </label>
//           </div>
//         </div>
//         <hr />
//         <h4>What made us stand out from other companies?</h4>
//         <textarea
//           id="stand_out"
//           className="form-control"
//           {...register("stand_out", {
//             required: "This field is required.",
//           })}
//         />
//         {errors.stand_out && <span>{errors.stand_out.message}</span>}
//         <hr />
//         <h4>Where did you hear about our company?</h4>
//         <div className="d-flex justify-content-start">
//           {/* ... (existing checkboxes with handleHeardAboutChange) */}
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Website"
//               value="Website"
//               checked={selected_heard_from === "Website"}
//               onChange={() => handleHeardAboutChange("Website")}
//             />
//             <label className="form-check-label" htmlFor="Social Media">
//               Website
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Social Media"
//               value="Social Media"
//               checked={selected_heard_from === "Social Media"}
//               onChange={() => handleHeardAboutChange("Social Media")}
//             />
//             <label className="form-check-label" htmlFor="Social Media">
//               Social Media
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Friends"
//               value="Friends"
//               checked={selected_heard_from === "Friends"}
//               onChange={() => handleHeardAboutChange("Friends")}
//             />
//             <label className="form-check-label" htmlFor="Friends">
//               Friends
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="Others"
//               value="Others"
//               checked={selected_heard_from === "Others"}
//               onChange={() => handleHeardAboutChange("Others")}
//             />
//             <label className="form-check-label" htmlFor="Others">
//               Others
//             </label>
//           </div>
//         </div>
//         <hr />
//         <h4>Any suggestions/comments to better improve our services?</h4>
//         <div className="mb-3">
//           <label htmlFor="message" className="form-label">
//             Message:
//           </label>
//           <textarea
//             id="message"
//             className="form-control"
//             {...register("message", {
//               required: "This field is required.",
//             })}
//           />
//           {errors.message && <span>{errors.message.message}</span>}
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//       <hr />
//       <h3>Thank you for choosing our services!</h3>
//       <hr />
//       <footer className="footer mt-auto py-3">
//         <div className="container">
//           <span className="text-muted">
//             © 2023 Your Company. All rights reserved.
//           </span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default FormComponent;

import axios from "axios";
import React, { useState } from "react";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [selected_satisfaction, setSelected_satisfaction] = useState("");
  const [stand_out, setStandout] = useState("");
  const [selected_heard_from, setHeardfrom] = useState("");
  const [message, setMessage] = useState("");
  //const [satisfaction, setSatisfaction] = useState("");

  // Form validation function
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      age.trim() !== "" &&
      contact.trim() !== "" &&
      selected_satisfaction !== "" &&
      stand_out !== "" &&
      selected_heard_from !== "" &&
      message.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill out all fields.");
      return;
    }

    console.log(
      name,
      email,
      age,
      contact,
      selected_satisfaction,
      stand_out,
      selected_heard_from,
      message
    );

    let data = {
      name: name,
      email: email,
      age: age,
      contact: contact,
      selected_satisfaction: selected_satisfaction,
      stand_out: stand_out,
      selected_heard_from: selected_heard_from,
      message: message,
    };

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/submit",
        data,
        config
      );
      console.log(res.data);
      alert("Form submitted successfully!");
    } catch (e) {
      alert("An error occurred while submitting the form.");
    }
  };

  const handleSatisfactionChange = (value) => {
    console.log("Value", value);
    setSelected_satisfaction(value);
  };
  const handleHeardAboutChange = (value) => {
    console.log("Value", value);
    setHeardfrom(value);
  };

  return (
    <div className="container">
      <h1>Client Feedback Survey Form</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            {" "}
            <label htmlFor="name" className="form-label"></label>
            Name:
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="text"
              id="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="contact" className="form-label">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              className="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <h4 className="text-left">Are you satisfied with our services?</h4>
        <div className="d-flex justify-content-start">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="very-unsatisfied"
              value="Very Unsatisfied"
              checked={selected_satisfaction === "Very Unsatisfied"}
              onChange={() => handleSatisfactionChange("Very Unsatisfied")}
            />
            <label className="form-check-label" htmlFor="very-unsatisfied">
              Very Unsatisfied
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="unsatisfied"
              value="Unsatisfied"
              checked={selected_satisfaction === "Unsatisfied"}
              onChange={() => handleSatisfactionChange("Unsatisfied")}
            />
            <label className="form-check-label" htmlFor="unsatisfied">
              Unsatisfied
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="neutral"
              value="Neutral"
              checked={selected_satisfaction === "Neutral"}
              onChange={() => handleSatisfactionChange("Neutral")}
            />
            <label className="form-check-label" htmlFor="neutral">
              Neutral
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="satisfied"
              value="Satisfied"
              checked={selected_satisfaction === "Satisfied"}
              onChange={() => handleSatisfactionChange("Satisfied")}
            />
            <label className="form-check-label" htmlFor="satisfied">
              Satisfied
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="very-satisfied"
              value="Very Satisfied"
              checked={selected_satisfaction === "Very Satisfied"}
              onChange={() => handleSatisfactionChange("Very Satisfied")}
            />
            <label className="form-check-label" htmlFor="very-satisfied">
              Very Satisfied
            </label>
          </div>
        </div>
        <hr />
        <h4>What made us stand out from other companies?</h4>
        <textarea
          id="stand_out"
          className="form-control"
          value={stand_out}
          onChange={(e) => setStandout(e.target.value)}
        ></textarea>
        <hr />
        <h4>Where did you hear about our company?</h4>
        <div className="d-flex justify-content-start">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="Website"
              value="Website"
              checked={selected_heard_from === "Website"}
              onChange={() => handleHeardAboutChange("Website")}
            />
            <label className="form-check-label" htmlFor="Social Media">
              Website
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="Social Media"
              value="Social Media"
              checked={selected_heard_from === "Social Media"}
              onChange={() => handleHeardAboutChange("Social Media")}
            />
            <label className="form-check-label" htmlFor="Social Media">
              Social Media
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="Friends"
              value="Friends"
              checked={selected_heard_from === "Friends"}
              onChange={() => handleHeardAboutChange("Friends")}
            />
            <label className="form-check-label" htmlFor="Friends">
              Friends
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="Others"
              value="Others"
              checked={selected_heard_from === "Others"}
              onChange={() => handleHeardAboutChange("Others")}
            />
            <label className="form-check-label" htmlFor="Others">
              Others
            </label>
          </div>
        </div>
        <hr />
        <h4>Any suggestions/comments to better improve our services?</h4>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        {/* ... (existing form fields) */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <hr />
      <h3>Thank you for choosing our services!</h3>
      <hr />
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">
            © 2023 Your Company. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default FormComponent;
