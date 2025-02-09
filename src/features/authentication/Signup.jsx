import Button from "../../ui/Button";
import "./signup.css";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function Signup() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { signup, isPending } = useSignup();

  function onSubmit(data) {
    signup(data);
    reset();
  }

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="signup-form-container">
      <h3>Signup</h3>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="field-container">
          <label className="field-label" htmlFor="name">
            Name
          </label>
          <input
            className="field-input"
            type="text"
            id="name"
            name="name"
            {...register("name", {
              required: "This field is required",
            })}
          />
          <span className="field-error">{errors?.email?.message}</span>
        </div>
        <div className="field-container">
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            className="field-input"
            type="text"
            id="email"
            name="email"
            {...register("email", {
              required: "This field is required",
              validate: (value) =>
                emailRegex.test(value) || "Enter valid email id",
            })}
          />
          <span className="field-error">{errors?.email?.message}</span>
        </div>
        <div className="field-container">
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            className="field-input"
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
            })}
          />
          <span className="field-error">{errors?.password?.message}</span>
        </div>
        <div className="field-container">
          <label className="field-label" htmlFor="password">
            Confirm password
          </label>
          <input
            className="field-input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
              validate: (value) =>
                value === getValues().password || "Passwords should match",
            })}
          />
          <span className="field-error">
            {errors?.confirmPassword?.message}
          </span>
        </div>
        <div>
          <Button type="submit">Signup</Button>
        </div>
      </form>
    </div>
  );
}
