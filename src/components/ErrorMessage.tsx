import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p style={{ color: "red", marginTop: "8px" }}>{message}</p>
);

export default ErrorMessage;
