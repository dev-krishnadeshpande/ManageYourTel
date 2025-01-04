import Button from "../../ui/Button";
import "./login.css";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function onSubmit(data) {
    console.log(data);

    reset();
  }

  return (
    <div className="login-form-container">
      <h3>Login</h3>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
}
