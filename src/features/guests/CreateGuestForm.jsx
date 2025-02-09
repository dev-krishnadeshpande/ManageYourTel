import { useForm } from "react-hook-form";
import { TextField, Button, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCreateGuest } from "./useCreateGuest";

const CreateGuestForm = ({ onSuccessHandler }) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createGuestMutate, isCreatingGuest } =
    useCreateGuest(onSuccessHandler);

  // Handle form submission
  const onSubmit = (data) => {
    createGuestMutate(data);
  };

  return (
    <Container maxWidth="sm">
      <h2>Create Guest</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Full Name Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              {...register("fullName", { required: "Full name is required" })}
              error={Boolean(errors?.fullName?.message)}
              helperText={errors?.fullName?.message}
            />
          </Grid>

          {/* Email Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              error={Boolean(errors?.email?.message)}
              helperText={errors?.email?.message}
            />
          </Grid>

          {/* Nationality Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Nationality"
              variant="outlined"
              {...register("nationality", {
                required: "Nationality is required",
              })}
              error={Boolean(errors?.nationality?.message)}
              helperText={errors?.nationality?.message}
            />
          </Grid>

          {/* National ID Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="National ID"
              variant="outlined"
              {...register("nationalID", {
                required: "National ID is required",
              })}
              error={Boolean(errors?.nationalID?.message)}
              helperText={errors?.nationalID?.message}
            />
          </Grid>

          {/* Submit Button */}
          <Grid xs={12}>
            <Button
              disabled={isCreatingGuest}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateGuestForm;
