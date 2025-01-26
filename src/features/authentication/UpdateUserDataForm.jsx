import { useState } from "react";
import useGetUser from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";
import { TextField, Button, FormControl, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useGetUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Email Row */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Email address"
              value={email}
              disabled
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </Grid>

        {/* Full Name Row */}
        <Grid item xs={12}>
          <FormControl fullWidth error={false}>
            <TextField
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullName"
              disabled={isUpdating}
              variant="outlined"
              fullWidth
            />
          </FormControl>
        </Grid>

        {/* Avatar Row */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="avatar">Avatar image</InputLabel>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              disabled={isUpdating}
              style={{ marginTop: 8 }}
            />
          </FormControl>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12} container spacing={2}>
          <Grid item>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              disabled={isUpdating}
              onClick={handleCancel}
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
              Update account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateUserDataForm;
