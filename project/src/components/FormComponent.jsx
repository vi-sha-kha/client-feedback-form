import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import CountryData from "./CountryData.json";
import { v4 as uuidv4 } from "uuid";
import "./PhoneInput.css";

import ReactFlagsSelect from "react-flags-select";
// import PhoneInput, {
//   getCountries,
//   parsePhoneNumber,
//   getCountryCallingCode,
//   //formatPhoneNumber,
//   //formatPhoneNumberIntl,
//   isPossiblePhoneNumber,
// } from "react-phone-number-input/input";
// import { Link } from "react-router-dom";
//import "react-phone-number-input/style.css";

const en = {
  NP: "Nepal",
  DE: "Germany",
  // Add more country labels as needed...
};
const FormComponent = () => {
  //const [country, setCountry] = useState("NP");
  //const [number, setNumber] = useState("");
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  // const [onFocuseInput, setOnFocuseInput] = useState("");

  const [countries, setCountries] = useState(CountryData);

  const [searchCode, setSearchCode] = useState();

  const searchCountry = countries.find((obj) => {
    if (obj.code === searchCode) {
      return true;
    }
    return false;
  });

  const [country, setCountry] = useState();
  const [countryCode, setCountryCode] = React.useState("DE");

  const handleCountryChange = (code) => {
    setSelected(code);
    // Update the country code in the phone input
    setCountryCode(code);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm();

  // const [selected_satisfaction, setSelected_satisfaction] = React.useState("");
  // const [selected_heard_from, setSelected_heard_from] = React.useState("");
  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select
      {...rest}
      value={value}
      onChange={(event) => {
        onChange(event.target.value || undefined);
      }}
    >
      <option value="">country</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );
  const labelStyle = {
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("http://localhost:3000/api/submit", data);
      console.log("---------------");
      console.log(res.data);
      alert("Form submitted successfully!");
      reset(); // Reset the form after successful submission
    } catch (e) {
      alert("An error occurred while submitting the form.");
    }
  };

  // const handleSatisfactionChange = (value) => {
  //   setSelected_satisfaction(value);
  // };

  // const handleHeardAboutChange = (value) => {
  //   setSelected_heard_from(value);
  // };

  useEffect(() => {}, [value]);

  return (
    <>
      <h1>Client Feedback Survey Form</h1>
      <div className="form-control container d-flex justify-content-center">
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-4 mb-3" style={containerStyle}>
              <label htmlFor="name" className="form-label" style={labelStyle}>
                Name:
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required.",
                  pattern: {
                    value: /^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]+$/,
                    message: "Invalid name",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>
            <div className="col-md-4 mb-3" style={containerStyle}>
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
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="col-md-4 mb-3" style={containerStyle}>
              <label htmlFor="age" className="form-label" style={labelStyle}>
                Age:
              </label>
              <input
                type="number"
                id="age"
                className="form-control"
                min
                max={150}
                {...register("age", {
                  required: "This field is required.",
                  pattern: {
                    value: /^[1-9][0-9]?[0-9]?$/,
                    message: "Invalid age",
                  },
                })}
              />
              {errors.age && (
                <small className="text-danger">{errors.age.message}</small>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="mb-3">
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ReactFlagsSelect
                      value={value}
                      onChange={onChange}
                      onSelect={(code) => {
                        onChange(code);
                        setSelected(code);
                        handleCountryChange(code);
                      }}
                      selected={selected}
                    />
                  )}
                />
              </div>
            </div>

            {/* <div className="bg-white w-auto h-96 mx-5 mt-40 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto ">
            <div>
              <div className=" mt-14 mx-10"> */}

            <div
              className="form-control col-md-4 col-sm-4 m-3"
              //style={{ display: "flex", alignItems: "center" }}
              style={containerStyle}
            >
              <div className="row g-0">
                <div className="col-12">
                  <select
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="h-14 text-xl rounded-lg m-3 col-md-6"
                  >
                    <option value="" hidden>
                      --Select Country--
                    </option>
                    {countries.map((item) => {
                      return (
                        <option key={uuidv4()} value={item.code}>
                          {item.name}{" "}
                          <ReactFlagsSelect
                            selected={item.code}
                            countries={[item.code]}
                            customLabels={en} // Define your custom country labels if needed
                            onSelect={(code) => {
                              setSearchCode(code); // Update the selected code when a flag is clicked
                            }}
                          />
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-2">
                <input
                  value={(searchCountry && searchCountry.dial_code) || ""}
                  type="tel"
                  placeholder="Code"
                  className="w-full h-14 text-xl rounded-lg form-control"
                />
                {/* <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full h-14 text-xl rounded-lg col-span-2"
                    /> */}
              </div>
              {/* <div className="col-5">
                <Controller
                  name="contact"
                  control={control}
                  defaultValue=""
                  className="col-12 form-control"
                  rules={{
                    required: "This field is required.",

                    validate: {
                      isValid: (value) => {
                        if (value) {
                          const callingCode =
                            getCountryCallingCode(countryCode);
                          if (!new RegExp(`^\\+${callingCode}$`).test(value)) {
                            return !!parsePhoneNumber(value);
                          }
                        }
                        return true;
                      },
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      placeholder="Enter Phone Number"
                      defaultCountry="NP" // Set the default country (change to your desired default)
                      //country={country}
                      onCountryChange={(v) => setCountryCode(v)}
                      className={
                        value && isPossiblePhoneNumber(value)
                          ? "text-success"
                          : "text-danger"
                      }
                      international={true}
                      limitMaxLength={true}
                      value={value}
                      countryCodeEditable={false}
                      onChange={(value) => {
                        setValue(value);
                      }}
                      error={
                        value && isPossiblePhoneNumber(value)
                          ? "Not a possible number"
                          : "Possible number"
                      }
                    />
                  )}
                />
              </div> */}
            </div>

            {/* </div>
            </div>
          </div> */}

            <hr />
          </div>
          <hr />
          <h3 className="text-start">Are you satisfied with our services?</h3>
          <div className="d-flex justify-content-center">
            {/* ... (existing checkboxes with handleSatisfactionChange) */}
            {/* 
            <div className="col col form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="very-unsatisfied"
                value="Very Unsatisfied"
                checked={selected_satisfaction === "Very Unsatisfied"}
                // onChange={() => handleSatisfactionChange("Very Unsatisfied")}
                {...register("satisfaction", {
                  required: "This field is required.",
                })}
              />
              <label className="form-check-label" htmlFor="very-unsatisfied">
                Very Unsatisfied
              </label>
            </div>
            <div className="col col form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="unsatisfied"
                value="Unsatisfied"
                checked={selected_satisfaction === "Unsatisfied"}
                //onChange={() => handleSatisfactionChange("Unsatisfied")}
                {...register("satisfaction", {
                  required: "This field is required.",
                })}
              />
              <label className="form-check-label" htmlFor="unsatisfied">
                Unsatisfied
              </label>
            </div> */}
            <div className="col col form-check form-check-inline">
              {/* <input
                className="form-check-input"
                type="checkbox"
                id="neutral"
                value="Neutral"
                checked={selected_satisfaction === "Neutral"}
                //onChange={() => handleSatisfactionChange("Neutral")}
                {...register("satisfaction", {
                  required: "This field is required.",
                })}
              /> */}
              <input
                {...register("food", { required: true })}
                type="radio"
                name="food"
                value="Neutral"
                className="form-check-input"
                id="neutral"
              />{" "}
              <label className="form-check-label" htmlFor="neutral">
                Neutral
              </label>
            </div>
            {/* <div className="col col form-check form-check-inline">
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
            <div className="col col form-check form-check-inline">
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
            </div> */}
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
          {errors.stand_out && (
            <small className="text-danger">{errors.stand_out.message}</small>
          )}
          <hr />
          <h3 className="text-start">Where did you hear about our company?</h3>
          <div className="d-flex justify-content-start">
            {/* ... (existing checkboxes with handleHeardAboutChange) */}
            <div className="col form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="Website"
                value="Website"
                checked={selected_heard_from === "Website"}
                //onChange={() => handleHeardAboutChange("Website")}
                {...register("heard_from", {
                  required: "This field is required.",
                })}
              />
              <label className="form-check-label" htmlFor="Social Media">
                Website
              </label>
            </div>
            <div className="col form-check form-check-inline">
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
            <div className="col form-check form-check-inline">
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
            <div className="col form-check form-check-inline">
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
            {errors.message && (
              <small className="text-danger">{errors.message.message}</small>
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
        <hr />
      </div>
      <h3>Thank you for choosing our services!</h3>
      <hr />
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">
            © 2023 Your Company. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default FormComponent;
