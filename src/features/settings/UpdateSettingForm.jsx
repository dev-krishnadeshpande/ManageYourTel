import { useForm } from "react-hook-form";

import "./update-settings.css";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useUpdateSettings } from "./useUpdateSettings";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";

const UpdateSettingForm = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {},
  });
  const { errors } = formState;

  const { updateSettingsMutate, processingSettingUpdates } =
    useUpdateSettings();

  // Once the data is fetched, update the form default values
  useEffect(() => {
    if (settings) {
      const {
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
      } = settings;

      reset({
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
      });
    }
  }, [settings, reset]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  function onSubmit(data) {
    updateSettingsMutate({ ...data });
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Grid
          container
          gap={6}
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              id="minBookingLength"
              label="Minimum booking length"
              {...register("minBookingLength", {
                required: "This field is required",
              })}
              error={Boolean(errors?.minBookingLength?.message)}
              helperText={errors?.minBookingLength?.message}
              disabled={processingSettingUpdates}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="maxBookingLength"
              label="Maximum booking length"
              {...register("maxBookingLength", {
                required: "This field is required",
              })}
              error={Boolean(errors?.maxBookingLength?.message)}
              helperText={errors?.maxBookingLength?.message}
              disabled={processingSettingUpdates}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="maxGuestsPerBooking"
              label="Maximum guests per booking"
              {...register("maxGuestsPerBooking", {
                required: "This field is required",
              })}
              error={Boolean(errors?.maxGuestsPerBooking?.message)}
              helperText={errors?.maxGuestsPerBooking?.message}
              disabled={processingSettingUpdates}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="breakfastPrice"
              label="Breakfast price"
              {...register("breakfastPrice", {
                required: "This field is required",
              })}
              error={Boolean(errors?.breakfastPrice?.message)}
              helperText={errors?.breakfastPrice?.message}
              disabled={processingSettingUpdates}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit">Update</Button>
      </Box>
    </>
  );
};

export default UpdateSettingForm;
