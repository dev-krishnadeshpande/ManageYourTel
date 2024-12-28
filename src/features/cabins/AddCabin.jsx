import { useForm } from "react-hook-form";
import "./add-cabin.css"; // Import the CSS file for styling
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";

const AddCabin = () => {
  const { register, handleSubmit } = useForm();

  // Access the client
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
  };

  return (
    <div className="form-container">
      <h2>Create Cabin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="name">Cabin name</label>
          <input type="text" id="name" {...register("name")} required />
        </div>

        <div className="form-group">
          <label htmlFor="maxCapacity">Maximum capacity</label>
          <input
            type="text"
            id="maxCapacity"
            {...register("maxCapacity")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="regularPrice">Regular price</label>
          <input
            type="text"
            id="regularPrice"
            {...register("regularPrice")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input type="text" id="discount" {...register("discount")} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description for website</label>
          <input
            type="text"
            id="description"
            {...register("description")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Cabin photo</label>
          <input type="file" id="image" {...register("image")} required />
        </div>

        <div className="btn-container">
          <Button type="submit">Cancel</Button>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddCabin;
