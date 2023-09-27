import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected3(props) {
  const navigate = useNavigate();
  const { Component,role } = props;
  useEffect(() => {
    let login = sessionStorage.getItem(role);
    console.log(login);
    console.log(sessionStorage.getItem('loginStatus'));
    if (login === 'false'|| login === null) {
      sessionStorage.setItem(
        "loginStatus",
        "Please login to access User interface!"
      );
      navigate("/login");
      return;
    }
  });

  return( <Component />);
}
