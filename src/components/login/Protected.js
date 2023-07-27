import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props) {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let login = sessionStorage.getItem('login');
    console.log(login);
    console.log(sessionStorage.getItem('loginStatus'));
    if (!login) {
      sessionStorage.setItem(
        "loginStatus",
        "Please login to access the Doctor interface!"
      );
      navigate("/loginDoctor");
    }
  });

  return( <Component />);
}
