import { useMutation } from "@tanstack/react-query";
import { logout as apiLogout } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: apiLogout, onSuccess: () => {
      navigate('/login');
    }
  });

  return { logout, isLoading };
}