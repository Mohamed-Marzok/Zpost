import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  link: string;
  children: ReactNode;
  token: boolean;
}

export default function ProtectedRoute({ link, children, token }: IProps) {
  return <>{token ? children : <Navigate to={link} replace />}</>;
}
