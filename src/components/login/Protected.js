import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const navigate = useNavigate();
  const { Component,roll } = props;
  useEffect(() => {
    let login = sessionStorage.getItem(roll);
    console.log(login);
    console.log(sessionStorage.getItem('loginStatus'));
    if (login === 'false' || login === null) {
      let loginStatusMessage = "";
      switch (roll) {
        case "Doctor":
          loginStatusMessage = "Please login to access the Doctor interface!";
          break;
        case "Pharmacist":
          loginStatusMessage = "Pls login to access the Inventory interface!";
          break;
        case "admin":
          loginStatusMessage = "Please login to access the Admin interface!";
          break;
        default:
          loginStatusMessage = "Please login to access this interface!";
          break;
      }
      sessionStorage.setItem(
        "loginStatus",
        loginStatusMessage
      );
      navigate("/");
    }
  },[navigate,roll]);

  return( <Component />);
}
