import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    contact: "",
    selected_satisfaction: "",
    selected_heard_from: "",
    message: "",
  });

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/data/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchShowData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/update/${id}`, formData);
      console.log("Form data updated successfully.");
      history.push("/admin");
    } catch (err) {
      console.error("Error updating form data:", err);
    }
  };

  return (
    <div>
      <h1>Edit Client Review</h1>
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {/* Other fields */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Edit;
