import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected7(props) {
  const navigate = useNavigate();
  const { Component, role } = props;

  useEffect(() => {
    let login = sessionStorage.getItem(role);

    if (login === 'false' || login === null) {
      // Update the loginStatus message based on the role
      let loginStatusMessage = "";
      switch (role) {
        case "Doctor":
          loginStatusMessage = "Please login to access the Doctor interface!";
          break;
        case "Pharmacist":
          loginStatusMessage = "Please login to access the Pharmacist interface!";
          break;
        case "admin":
          loginStatusMessage = "Please login to access the Admin interface!";
          break;
        default:
          loginStatusMessage = "Please login to access this interface!";
          break;
      }

      sessionStorage.setItem("loginStatus", loginStatusMessage);
      navigate("/");
    }
  }, [navigate, role]);

  return <Component />;
}
