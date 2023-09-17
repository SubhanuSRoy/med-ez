import React from "react";
import { useSelector } from "react-redux";
import ChooseType from "./ChooseType";
import LoginForm from "./LoginForm";


function Login() {
  const userType = useSelector((state) => state.auth.userType);
  console.log(userType);
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 pt-4 text-gray-800 bg-gradient-to-t from-violet-400 to-purple-800 min-h-screen">
      {!userType && <ChooseType />}
      {userType && <LoginForm />}
    </div>
  );
}

export default Login;
