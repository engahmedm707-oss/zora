import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    // لو فيه يوزر، اطرده للهوم
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
