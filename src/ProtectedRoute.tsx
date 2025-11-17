import { Navigate } from "react-router-dom";
import { getCookie } from "./utils/cookes";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const token = getCookie("token");  

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
