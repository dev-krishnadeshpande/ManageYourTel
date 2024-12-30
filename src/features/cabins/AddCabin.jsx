import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

import "./add-cabin.css";
import { useAddCabin } from "./useAddCabin";
import { useEditCabin } from "./useEditCabin";

// eslint-disable-next-line react/prop-types
const AddCabin = ({ setShowAddCabin, cabinToEdit = {} }) => {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });
  const { errors } = formState;

  const { addCabinMutate, isCreatingCabin } = useAddCabin(
    reset,
    setShowAddCabin
  );
  const { editCabinMutate, isEditingCabin } = useEditCabin(
    reset,
    setShowAddCabin
  );

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
    <div className="form-container">
      <h2>Create Cabin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="name">Cabin name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "This field is required" })}
            disabled={isProcessing}
          />
          {errors?.name?.message && <span>{errors?.name?.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="maxCapacity">Maximum capacity</label>
          <input
            type="text"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
            disabled={isProcessing}
          />
          {errors?.maxCapacity?.message && (
            <span>{errors?.maxCapacity?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="regularPrice">Regular price</label>
          <input
            type="text"
            id="regularPrice"
            {...register("regularPrice", {
              required: "This field is required",
            })}
            disabled={isProcessing}
          />
          {errors?.regularPrice?.message && (
            <span>{errors?.regularPrice?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            id="discount"
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                +value <= +getValues().regularPrice ||
                "Discount should be less than reugular price",
            })}
            disabled={isProcessing}
          />
          {errors?.discount?.message && (
            <span>{errors?.discount?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description for website</label>
          <input
            type="text"
            id="description"
            {...register("description", {
              required: isEditingSession ? false : "This field is required",
            })}
            disabled={isProcessing}
          />
          {errors?.description?.message && (
            <span>{errors?.description?.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">Cabin photo</label>
          <input
            type="file"
            id="image"
            {...register("image", {
              required: isEditingSession ? false : "You must upload a file",
            })}
            disabled={isProcessing}
          />
          {errors?.image?.message && <span>{errors?.image?.message}</span>}
        </div>

        <div className="btn-container">
          <Button type="reset">Cancel</Button>

          <Button type="submit">
            {isEditingSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCabin;
