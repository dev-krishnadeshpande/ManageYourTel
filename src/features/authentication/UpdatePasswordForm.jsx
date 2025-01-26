import { useForm } from "react-hook-form";
import { TextField, Button, FormHelperText, FormControl } from "@mui/material";
import { useUpdateUser } from "./useUpdateUser";
import Grid from "@mui/material/Grid2";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Password Field */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors?.password}>
            <TextField
              label="New password (min 8 chars)"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={isUpdating}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
              variant="outlined"
              fullWidth
            />
            {errors?.password && (
              <FormHelperText>{errors?.password?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Confirm Password Field */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors?.passwordConfirm}>
            <TextField
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              id="passwordConfirm"
              disabled={isUpdating}
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords need to match",
              })}
              variant="outlined"
              fullWidth
            />
            {errors?.passwordConfirm && (
              <FormHelperText>
                {errors?.passwordConfirm?.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} container spacing={2}>
          <Grid item>
            <Button
              onClick={() => reset()}
              type="reset"
              variant="outlined"
              color="secondary"
              disabled={isUpdating}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isUpdating}
            >
              Update password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdatePasswordForm;
