import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuthentication";

export default function useGetUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === "authenticated", user };
}