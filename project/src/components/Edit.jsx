import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import CountryData from "./CountryData.json";
import "./PhoneInput.css";
const Edit = () => {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  //countryData.json bata countries ko state set
  const [countries, setCountries] = useState(CountryData);
  //searchCode le just code
  const [searchCode, setSearchCode] = useState();
  //countryCode le dial_code
  const [countryCode, setCountryCode] = React.useState("");

  //searchCountry ma json data ma vako code ra eta user le droopdown bata select gareko searchCode which is just code word  lai compare hancha
  // const searchCountry = countries.find((obj) => {
  //   if (obj.code === searchCode) {
  //     return true;
  //   }
  //   return false;
  // });
  const searchCountry = countries.find((obj) => {
    if (obj.dial_code === countryCode) {
      return true;
    }
    return false;
  });

  // const findSelectedCountry = (countryCode) => {
  //   // Find the country object that matches the given countryCode
  //   const selectedCountry = countries.find(
  //     (country) => country.dial_code === countryCode
  //   );
  //   return selectedCountry || {}; // Return an empty object if not found
  // };

  // const handleCountryChange = (code) => {
  //   setCountries(CountryData);

  //   // Update the country code in the phone input
  //   setCountryCode(code);
  //   setSearchCode(code);
  // };

  const handleCountryChange = (dial_code) => {
    setCountries(CountryData);

    // Update the country code in the phone input
    setCountryCode(dial_code);
    setSearchCode(dial_code);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm();

  const [selected_satisfaction, setSelected_satisfaction] = React.useState("");
  const [selected_heard_from, setSelected_heard_from] = React.useState("");

  const labelStyle = {
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
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
        console.log("data came to edit page", response.data);
        setFormData(response.data);
        // Set form field values after data is fetched
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setValue("age", response.data.age);
        setValue("contact", response.data.contact);

        setValue("stand_out", response.data.stand_out);

        setValue("message", response.data.message);

        setSelected_satisfaction(response.data.selected_satisfaction);
        setSelected_heard_from(response.data.selected_heard_from);
        // setSearchCode(response.data.countryCode);
        //setCountries(response.data.countryCode);
        // setSelected(response.data.country);
        setCountryCode(response.data.countryCode);

        // console.log(countries);

        // CountryData.find((obj) => {
        //   if (obj.dial_code === response.data.countryCode) {
        //     console.log(obj.code);
        //     setSearchCode(obj.code);
        //     return true;
        //   }
        //   return false;
        // });

        // const selectedCountry = findSelectedCountry(response.data.countryCode);

        // CountryData.find((obj) => {
        //   if (obj.dial_code === response.data.countryCode) {
        //     console.log(obj.dial_code);
        //     setCountryCode(obj.dial_code);
        //     return true;
        //   }
        //   return false;
        // });
        //console.log("abc", abc, selected);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error);
      });
  }, [id, setValue]); // Include setValue in the dependency array

  const onSubmit = (data) => {
    // Perform the update operation to the backend API using Axios

    data.selected_satisfaction = selected_satisfaction;
    data.selected_heard_from = selected_heard_from;
    data.country = searchCountry.name; // Add the selected country name
    data.countryCode = searchCountry.dial_code;
    console.log(data);
    axios
      .put(`http://localhost:3000/api/data/${id}`, data)
      .then((response) => {
        navigate("/show");

        // console.log("abc", abc, selected);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <h1>Form Data for User ID: {id}</h1>
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
          <div
            className="form-control col-md-4 col-sm-4 m-3"
            //style={{ display: "flex", alignItems: "center" }}
            style={containerStyle}
          >
            <div className="row g-0">
              <div className="col-12">
                <select
                  //value={searchCode}
                  value={countryCode}
                  onChange={(e) => {
                    //setSearchCode(e.target.value);
                    handleCountryChange(e.target.value);
                  }}
                  className="h-14 text-xl rounded-lg m-3 col-md-6"
                >
                  <option value="" hidden>
                    --Select Country--
                  </option>

                  {countries.map((item) => {
                    return (
                      <option
                        // key={uuidv4()}
                        // key={item.code}
                        // value={item.code}
                        key={item.dial_code}
                        value={item.dial_code}
                        //selected={item.code === countryCode ? "selected" : ""}
                      >
                        {item.name}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="col-2">
              <input
                value={
                  (searchCountry && searchCountry.dial_code) || countryCode
                }
                type="tel"
                placeholder="Code"
                className="w-full h-14 text-xl rounded-lg form-control"
              />
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
                  />
                )}
              />
              {errors.contact && (
                <small className="text-danger">{errors.contact.message}</small>
              )}
            </div>
          </div>

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
          />
          {errors.message && (
            <small className="text-danger">{errors.message.message}</small>
          )}
        </div>
        {/* ... Form fields with Controller as you had previously ... */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Edit;
