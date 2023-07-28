import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
//import {yupResolver}

const FormComponentValidate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const checklength = (event) => {
    alert("exceeded length");
  };

  const [selected_satisfaction, setSelected_satisfaction] = React.useState("");
  const [selected_heard_from, setSelected_heard_from] = React.useState("");

  const labelStyle = {
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await axios.post("http://localhost:3000/api/submit", data);
      console.log(res.data);
      alert("Form submitted successfully!");
      reset(); // Reset the form after successful submission
    } catch (e) {
      alert("An error occurred while submitting the form.");
    }
  };

  const handleSatisfactionChange = (value) => {
    setSelected_satisfaction(value);
  };

  const handleHeardAboutChange = (value) => {
    setSelected_heard_from(value);
  };

  return (
    <div className="container">
      <h1>Client Feedback Survey Form</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mb-3" style={containerStyle}>
            <label htmlFor="name" className="form-label" style={labelStyle}>
              Name:
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required.",
              }}
              minLength="5"
              inputProps={{ minLength: 5 }}
              render={({ field }) => (
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  {...field}
                />
              )}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div className="col-md-6 mb-3" style={containerStyle}>
            <label htmlFor="email" className="form-label" style={labelStyle}>
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required.",

                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address.",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  {...field}
                />
              )}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3" style={containerStyle}>
            <label htmlFor="age" className="form-label" style={labelStyle}>
              Age:
            </label>
            <input
              onKeyDown={checklength}
              type="text"
              id="age"
              className="form-control"
              {...register("age", {
                required: "This field is required.",
              })}
            />
            {errors.age && <span>{errors.age.message}</span>}
          </div>
          <div className="col-md-6 mb-3" style={containerStyle}>
            <label htmlFor="contact" className="form-label" style={labelStyle}>
              Contact:
            </label>
            <Controller
              name="contact"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required.",
                minLength: { value: 12, message: "Min length" },
              }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  defaultCountry="US" // Set the default country (change to your desired default)
                  className="form-control"
                  minLength={12}
                  maxLength={15}
                />
              )}
            />
            {errors.contact && <span>{errors.contact.message}</span>}
          </div>
        </div>
        <hr />
        <h3 className="text-start">Are you satisfied with our services?</h3>
        <div className="d-flex justify-content-start">
          {/* ... (existing checkboxes with handleSatisfactionChange) */}

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
        <h3 className="text-start">
          What made us stand out from other companies?
        </h3>
        <textarea
          id="stand_out"
          className="form-control"
          {...register("stand_out", {
            required: "This field is required.",
          })}
        />
        {errors.stand_out && <span>{errors.stand_out.message}</span>}
        <hr />
        <h3 className="text-start">Where did you hear about our company?</h3>
        <div className="d-flex justify-content-start">
          {/* ... (existing checkboxes with handleHeardAboutChange) */}
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
        <h3 className="text-start">
          Any suggestions/comments to better improve our services?
        </h3>
        <div className="mb-3" style={containerStyle}>
          <label htmlFor="message" className="form-label" style={labelStyle}>
            Message:
          </label>
          <textarea
            id="message"
            className="form-control"
            {...register("message", {
              required: "This field is required.",
            })}
          />
          {errors.message && <span>{errors.message.message}</span>}
        </div>
        <button type="submit" className="btn btn-success">
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

export default FormComponentValidate;
