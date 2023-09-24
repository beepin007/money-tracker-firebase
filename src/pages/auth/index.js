import React, { useEffect } from "react";
import "./style.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase-config";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserinfo";

export const Auth = () => {
  const navigate = useNavigate();
  // const { isAuth } = useGetUserInfo();
  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      console.log(results);
      const authInfo = {
        UserID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/money-tracker");
      setTimeout(() => {
        window.alert("I'm working on CSS");
      }, 100);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  // if (isAuth) {
  //   return <Navigate to="/money-tracker" />;
  // }

  return (
    <div className="login-page">
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

// import React from "react";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../../config/firebase-config";

// export const Auth = () => {
//   const signInWithGoogle = async () => {
//     const results = await signInWithPopup(auth, provider);
//     console.log(results);
//   };
//   signInWithPopup();
//   return (
//     <div className="login-page">
//       <p>Sign in with google to continue</p>
//       <button
//         className="login-with-google-btn"
//         onClick={signInWithGoogle}
//       ></button>
//     </div>
//   );
// };
//Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'constructor')
