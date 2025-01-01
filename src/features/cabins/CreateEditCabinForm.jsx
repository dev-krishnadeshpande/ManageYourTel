import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

import "./create-edit-cabin-form.css";
import { useAddCabin } from "./useAddCabin";
import { useEditCabin } from "./useEditCabin";
import FileInput from "../../ui/FileInput";

const CreateEditCabinForm = ({ onCloseModal, cabinToEdit = {} }) => {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });
  const { errors } = formState;

  const { addCabinMutate, isCreatingCabin } = useAddCabin(reset, onCloseModal);
  const { editCabinMutate, isEditingCabin } = useEditCabin(reset, onCloseModal);

  const isProcessing = isCreatingCabin || isEditingCabin;

  const onSubmit = (data) => {
    if (isEditingSession) {
      let isImageUpdated = typeof data.image !== "string";
      if (isImageUpdated) {
        let cabinData = { ...data, image: data.image[0] };
        editCabinMutate({ editedCabinData: cabinData, id: editId });
      } else {
        editCabinMutate({ editedCabinData: data, id: editId });
      }
    } else {
      addCabinMutate({ ...data, image: data.image[0] });
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "72rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Grid container gap={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="name"
              label="Cabin name"
              {...register("name", { required: "This field is required" })}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
              disabled={isProcessing}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="maxCapacity"
              label="Maximum capacity"
              {...register("maxCapacity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity should be at least 1",
                },
              })}
              error={Boolean(errors?.maxCapacity?.message)}
              helperText={errors?.maxCapacity?.message}
              disabled={isProcessing}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="regularPrice"
              label="Regular price"
              {...register("regularPrice", {
                required: "This field is required",
              })}
              error={Boolean(errors?.regularPrice?.message)}
              helperText={errors?.regularPrice?.message}
              disabled={isProcessing}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="discount"
              label="Discount"
              {...register("discount", {
                required: "This field is required",
                validate: (value) =>
                  +value <= +getValues().regularPrice ||
                  "Discount should be less than reugular price",
              })}
              error={Boolean(errors?.discount?.message)}
              helperText={errors?.discount?.message}
              disabled={isProcessing}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="description"
              label="Description for website"
              {...register("description", {
                required: isEditingSession ? false : "This field is required",
              })}
              error={Boolean(errors?.description?.message)}
              helperText={errors?.description?.message}
              disabled={isProcessing}
              slotProps={{
                htmlInput: {
                  style: { padding: "24px" },
                },
              }}
              margin="dense"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required: isEditingSession
                ? false
                : "You must upload Cabin photo",
            })}
          />
        </Grid>

        <Button
          type="reset"
          variant="contained"
          color="error"
          sx={{ marginTop: 2 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#4f46e5" }}
        >
          {isEditingSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </Box>
    </>
  );
};

export default CreateEditCabinForm;
