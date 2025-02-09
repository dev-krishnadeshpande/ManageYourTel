import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCreateBooking } from "./useCreateBooking";
import { useEffect } from "react";
import { useCabin } from "../cabins/useCabin";
import LoadingSpinner from "../../ui/LoadingSpinner";

const CreateBookingForm = ({ cabinId, guestId }) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const { createBookingMutate, isCreatingBooking } = useCreateBooking(reset);
  const { cabin, isLoading: isLoadingCabinDetails } = useCabin(cabinId);

  // Watch specific fields
  const cabinPrice = watch("cabinPrice", 0);
  const extrasPrice = watch("extrasPrice", 0);
  const numNights = watch("numNights", 0);
  const totalPrice = watch("totalPrice", 0);

  // Calculate total price based on fields
  useEffect(() => {
    if (cabinPrice && extrasPrice && numNights) {
      const calculatedTotal =
        (cabinPrice +
          parseInt(extrasPrice, 10) -
          parseInt(cabin?.discount, 10)) *
        numNights;

      setValue("totalPrice", calculatedTotal); // Set the calculated value for totalPrice
    }
  }, [cabinPrice, extrasPrice, numNights, cabin, setValue]); // Dependencies to watch for changes

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);

    createBookingMutate(data); // Send data to API or handle as required
  };

  if (isLoadingCabinDetails) return <LoadingSpinner />;

  return (
    <Container maxWidth="sm">
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Start Date Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              type="datetime-local"
              {...register("startDate", { required: "Start date is required" })}
              error={Boolean(errors?.startDate?.message)}
              helperText={errors?.startDate?.message}
            />
          </Grid>

          {/* End Date Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="End Date"
              variant="outlined"
              type="datetime-local"
              {...register("endDate", { required: "End date is required" })}
              error={Boolean(errors?.endDate?.message)}
              helperText={errors?.endDate?.message}
            />
          </Grid>

          {/* Has Breakfast Field */}
          <Grid xs={12}>
            <FormControlLabel
              control={<Switch {...register("hasBreakfast")} color="primary" />}
              label="Has Breakfast"
            />
          </Grid>

          {/* Observations Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Observations"
              variant="outlined"
              {...register("observations")}
              multiline
              rows={4}
              error={Boolean(errors?.observations?.message)}
              helperText={errors?.observations?.message}
            />
          </Grid>

          {/* Is Paid Field */}
          <Grid xs={12}>
            <FormControlLabel
              control={<Switch {...register("isPaid")} color="primary" />}
              label="Is Paid"
            />
          </Grid>

          {/* Number of Guests Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Number of Guests"
              variant="outlined"
              type="number"
              {...register("numGuests", {
                required: "Number of guests is required",
              })}
              error={Boolean(errors?.numGuests?.message)}
              helperText={errors?.numGuests?.message}
            />
          </Grid>

          {/* Cabin ID Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Cabin ID"
              variant="outlined"
              type="number"
              {...register("cabinId", {
                value: cabinId,
              })}
              disabled // Disable the field to prevent editing
            />
          </Grid>

          {/* Guest ID Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Guest ID"
              variant="outlined"
              type="number"
              {...register("guestId", {
                value: guestId,
              })}
              disabled // Disable the field to prevent editing
            />
          </Grid>

          {/* Cabin Price Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Cabin Price"
              variant="outlined"
              type="number"
              {...register("cabinPrice", {
                value: cabin?.regularPrice, // Set the default value
                disabled: true, // Make sure it stays disabled (so users can't edit it)
              })}
            />
          </Grid>

          {/* Extras Price Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Extras Price"
              variant="outlined"
              type="number"
              {...register("extrasPrice", {
                required: "Extras price is required",
              })}
              error={Boolean(errors?.extrasPrice?.message)}
              helperText={errors?.extrasPrice?.message}
            />
          </Grid>

          {/* Number of Nights Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Number of nights"
              variant="outlined"
              type="number"
              {...register("numNights", {
                required: "Number of nights is required",
              })}
              error={Boolean(errors?.numNights?.message)}
              helperText={errors?.numNights?.message}
            />
          </Grid>

          {/* Total Price Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Total Price"
              variant="outlined"
              type="number"
              {...register("totalPrice", {
                value: totalPrice,
                disabled: true, // Make sure it stays disabled (so users can't edit it)
              })}
            />
          </Grid>

          {/* Status Field */}
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Status"
              variant="outlined"
              {...register("status", { required: "Status is required" })}
              error={Boolean(errors?.status?.message)}
              helperText={errors?.status?.message}
              defaultValue="unconfirmed"
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="Booked Through"
              variant="outlined"
              {...register("bookedThrough", {
                required: "This is required field",
              })}
              error={Boolean(errors?.status?.bookedThrough)}
              helperText={errors?.status?.bookedThrough}
              defaultValue="offline"
            />
          </Grid>

          {/* Submit Button */}
          <Grid xs={12}>
            <Button
              disabled={isCreatingBooking}
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

export default CreateBookingForm;
