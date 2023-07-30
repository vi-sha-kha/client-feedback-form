import React from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
function CustomRadioButton() {
  const schema = Yup;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const labelStyle = {
    marginRight: "10px",
  };

  const [selected_satisfaction, setSelected_satisfaction] = React.useState("");

  const handleSatisfactionChange = (value) => {
    setSelected_satisfaction(value);
  };

  const onRBSubmit = (res) => console.log(res);
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onRBSubmit)}>
        <h2>React Hook Form Radio Buttons Example</h2>
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
              //min
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

        <div className="form-check mt-3">
          <label htmlFor="very satisfied">
            <input
              {...register("satisfaction", { required: true })}
              type="radio"
              name="satisfaction"
              value="Very satisfied"
              className="form-check-input"
              id="very satisfied"
              checked={selected_satisfaction === "Unsatisfied"}
              onChange={() => handleSatisfactionChange("Unsatisfied")}
            />{" "}
            Very satisfied
          </label>
        </div>
        <div className="form-check">
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
        {/* <div className="form-check">
          <label htmlFor="fries">
            <input
              {...register("satisfaction", { required: true })}
              type="radio"
              name="satisfaction"
              value="Fries"
              className="form-check-input"
              id="fries"
            />
            French Fries
          </label>
        </div> */}
        <div className="text-danger mt-3">
          {errors.satisfaction?.type === "required" &&
            "Tell us what is your favourite satisfaction."}
        </div>
        <button type="submit" className="btn btn-dark mt-4">
          Tell Us
        </button>
      </form>
    </div>
  );
}
export default CustomRadioButton;
