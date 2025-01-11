import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../ui/LoadingSpinner";
import useGetUser from "./useGetUser";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useGetUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
