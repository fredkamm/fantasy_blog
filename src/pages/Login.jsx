import React from "react";
import GoogleButton from "react-google-button";

import { auth, provider } from "../config/firebase";
import { signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const googleSignIn = () => {
    signInWithRedirect(auth, provider).then((results) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/")
    });
  };

  return (
    <div className="loginPage">
      <p>Log In</p>
      <GoogleButton onClick={googleSignIn} />
    </div>
  );
}

export default Login;
