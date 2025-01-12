import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as apiLogout } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading, isPending } = useMutation({
    mutationFn: apiLogout, onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    }
  });

  return { logout, isLoading, isPending };
}