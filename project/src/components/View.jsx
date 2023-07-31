import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import CountryData from "./CountryData.json";
import { v4 as uuidv4 } from "uuid";
import "./PhoneInput.css";

import ReactFlagsSelect from "react-flags-select";
const View = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();

  //const [value, setValue] = useState("");
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
    setCountry(code);

    // Update the country code in the phone input
    setCountryCode(code);
    setSearchCode(code);
  };

  const {
    control,
    formState: { errors },
    setValue,
    register,
  } = useForm();

  const [selected_satisfaction, setSelected_satisfaction] = React.useState("");
  const [selected_heard_from, setSelected_heard_from] = React.useState("");

  // const CountrySelect = ({ value, onChange, labels, ...rest }) => (
  //   <select
  //     {...rest}
  //     value={value}
  //     onChange={(event) => {
  //       onChange(event.target.value || undefined);
  //     }}
  //   >
  //     <option value="">country</option>
  //     {getCountries().map((country) => (
  //       <option key={country} value={country}>
  //         {labels[country]} +{getCountryCallingCode(country)}
  //       </option>
  //     ))}
  //   </select>
  // );
  const labelStyle = {
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const en = {
    NP: "Nepal",
    DE: "Germany",
    // Add more country labels as needed...
  };

  const handleSatisfactionChange = (value) => {
    setSelected_satisfaction(value);
  };

  const handleHeardAboutChange = (value) => {
    setSelected_heard_from(value);
  };

  useEffect(() => {
    // Fetch the form data for the specific user ID from the backend
    axios
      .get(`http://localhost:3000/api/data/${id}`)
      .then((response) => {
        setFormData(response.data);
        // Set form field values after data is fetched
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setValue("age", response.data.age);
        setValue("contact", response.data.contact);

        setValue("stand_out", response.data.stand_out);

        setValue("message", response.data.message);
        // Set other form field values similarly
        // Set selected values for radio buttons
        console.log("Satisfaction:", response.data.selected_satisfaction);
        console.log("Heard From:", response.data.selected_heard_from);
        setSelected_satisfaction(response.data.selected_satisfaction);
        setSelected_heard_from(response.data.selected_heard_from);
        //setCountries(response.data.country);
        setSearchCode(response.data.countryCode);
        setCountry(response.data.country);
        setSelected(response.data.country);
        setCountryCode(response.data.countryCode);

        // console.log("abc", abc, selected);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, [id, setValue, setSearchCode, setCountryCode]); // Include setValue in the dependency array

  return (
    <div>
      <h1>Form Data for User ID: {id}</h1>
      <form>
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
                  disabled
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
                  disabled
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
              disabled
            />
            {errors.age && (
              <small className="text-danger">{errors.age.message}</small>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            {/* <div className="mb-3">
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
              </div> */}
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
              <div className="col-12">{country}</div>
            </div>
            <div className="col-2">
              <input
                value={(searchCountry && searchCountry.dial_code) || searchCode}
                type="tel"
                placeholder="Code"
                className="w-full h-14 text-xl rounded-lg form-control"
                disabled
              />
              {/* <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full h-14 text-xl rounded-lg col-span-2"
                /> */}
            </div>
            <div className="col-md-4 mb-3" style={containerStyle}>
              <Controller
                name="contact"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required.",
                  pattern: {
                    value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    message: "Invalid contact no..",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="contact"
                    id="contact"
                    className="form-control"
                    {...field}
                    disabled
                  />
                )}
              />
              {errors.contact && (
                <small className="text-danger">{errors.contact.message}</small>
              )}
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

          <div className="col col form-check form-check-inline">
            <label htmlFor="very unsatisfied">
              <input
                {...register("satisfaction", { required: true })}
                type="radio"
                name="satisfaction"
                value="Very unsatisfied"
                className="form-check-input"
                id="very unsatisfied"
                checked={selected_satisfaction === "Very unsatisfied"}
                onChange={() => handleSatisfactionChange("Very unsatisfied")}
                disabled
              />{" "}
              Very unsatisfied
            </label>
          </div>
          <div className="col col form-check form-check-inline">
            <label htmlFor="unsatisfied">
              <input
                {...register("satisfaction", { required: true })}
                type="radio"
                name="satisfaction"
                value="Unsatisfied"
                className="form-check-input"
                id="unsatisfied"
                checked={selected_satisfaction === "Unsatisfied"}
                onChange={() => handleSatisfactionChange("Unsatisfied")}
                disabled
              />{" "}
              Unsatisfied
            </label>
          </div>
          <div className="col col form-check form-check-inline">
            <label htmlFor="neutral">
              <input
                {...register("satisfaction", { required: true })}
                type="radio"
                name="satisfaction"
                value="Neutral"
                className="form-check-input"
                id="neutral"
                checked={selected_satisfaction === "Neutral"}
                onChange={() => handleSatisfactionChange("Neutral")}
                disabled
              />{" "}
              Neutral
            </label>
          </div>

          <div className="col col form-check form-check-inline">
            <label htmlFor="satisfied">
              <input
                {...register("satisfaction", { required: true })}
                type="radio"
                name="satisfaction"
                value="Satisfied"
                className="form-check-input"
                id="satisfied"
                checked={selected_satisfaction === "Satisfied"}
                onChange={() => handleSatisfactionChange("Satisfied")}
                disabled
              />{" "}
              Satisfied
            </label>
          </div>
          <div className="col col form-check form-check-inline">
            <label htmlFor="very satisfied">
              <input
                {...register("satisfaction", { required: true })}
                type="radio"
                name="satisfaction"
                value="Very satisfied"
                className="form-check-input"
                id="very satisfied"
                checked={selected_satisfaction === "Very satisfied"}
                onChange={() => handleSatisfactionChange("Very satisfied")}
                disabled
              />{" "}
              Very satisfied
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
          defaultValue={formData.stand_out}
          disabled
        />
        {errors.stand_out && (
          <small className="text-danger">{errors.stand_out.message}</small>
        )}
        <hr />
        <h3 className="text-start">Where did you hear about our company?</h3>
        <div className="d-flex justify-content-start">
          {/* ... (existing checkboxes with handleHeardAboutChange) */}
          <div className="col form-check form-check-inline">
            <label htmlFor="website">
              <input
                {...register("heard_from", { required: true })}
                type="radio"
                name="heard_from"
                value="Website"
                className="form-check-input"
                id="website"
                checked={selected_heard_from === "Website"}
                onChange={() => handleHeardAboutChange("Website")}
                disabled
              />{" "}
              Website
            </label>
          </div>
          <div className="col form-check form-check-inline">
            <label htmlFor="social media">
              <input
                {...register("heard_from", { required: true })}
                type="radio"
                name="heard_from"
                value="Social media"
                className="form-check-input"
                id="social media"
                checked={selected_heard_from === "Social media"}
                onChange={() => handleHeardAboutChange("Social media")}
                disabled
              />{" "}
              Social media
            </label>
          </div>
          <div className="col form-check form-check-inline">
            <label htmlFor="friends">
              <input
                {...register("heard_from", { required: true })}
                type="radio"
                name="heard_from"
                value="Friends"
                className="form-check-input"
                id="friends"
                checked={selected_heard_from === "Friends"}
                onChange={() => handleHeardAboutChange("Friends")}
                disabled
              />{" "}
              Friends
            </label>
          </div>
          <div className="col form-check form-check-inline">
            <label htmlFor="others">
              <input
                {...register("heard_from", { required: true })}
                type="radio"
                name="heard_from"
                value="Others"
                className="form-check-input"
                id="others"
                checked={selected_heard_from === "Others"}
                onChange={() => handleHeardAboutChange("Others")}
                disabled
              />{" "}
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
            defaultValue={formData.message}
            disabled
          />
          {errors.message && (
            <small className="text-danger">{errors.message.message}</small>
          )}
        </div>
        {/* ... Form fields with Controller as you had previously ... */}
      </form>
    </div>
  );
};

export default View;
