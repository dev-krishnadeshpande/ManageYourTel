import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCreateBooking(reset) {
  const navigate = useNavigate()
  const { mutate: createBookingMutate, isLoading: isCreatingBooking } = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      toast.success("Booking created successfully!");
      reset();
      navigate(`/checkin/${data[0].id}`)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createBookingMutate, isCreatingBooking };
}

