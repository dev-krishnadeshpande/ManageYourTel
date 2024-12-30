import { useForm } from "react-hook-form";

import "./update-settings.css";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useUpdateSettings } from "./useUpdateSettings";
import { Button } from "@mui/material";
import { useEffect } from "react";

const UpdateSettingsForm = () => {
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
    <div className="form-container">
      <h2>Update Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="minBookingLength">Minimum booking length</label>
          <input
            type="text"
            id="minBookingLength"
            {...register("minBookingLength", {
              required: "This field is required",
            })}
            disabled={processingSettingUpdates}
          />
          {errors?.minBookingLength?.message && (
            <span>{errors?.minBookingLength?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="maxBookingLength">Maximum booking length</label>
          <input
            type="text"
            id="maxBookingLength"
            {...register("maxBookingLength", {
              required: "This field is required",
            })}
            disabled={processingSettingUpdates}
          />
          {errors?.maxBookingLength?.message && (
            <span>{errors?.maxBookingLength?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="maxGuestsPerBooking">
            Maximum guests per booking
          </label>
          <input
            type="text"
            id="maxGuestsPerBooking"
            {...register("maxGuestsPerBooking", {
              required: "This field is required",
            })}
            disabled={processingSettingUpdates}
          />
          {errors?.maxGuestsPerBooking?.message && (
            <span>{errors?.maxGuestsPerBooking?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="breakfastPrice">Breakfast price</label>
          <input
            type="text"
            id="breakfastPrice"
            {...register("breakfastPrice", {
              required: "This field is required",
            })}
            disabled={processingSettingUpdates}
          />
          {errors?.breakfastPrice?.message && (
            <span>{errors?.breakfastPrice?.message}</span>
          )}
        </div>

        <div className="btn-container">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSettingsForm;
