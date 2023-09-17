import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// icons
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

function LoginForm() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);

  const [loading, setLoading] = useState(false);
  // const [userEmail, setuserEmail] = useState(null);
  const [userName, setuserName] = useState(null);
  // const [userPfp_Link, setuserPfp_Link] = useState(null);
  const [userPassword, setuserPassword] = useState(null);

  // state to store wether password is visible or not
  const [passwordType, setPasswordType] = useState("password");

  const notify = (value, text) => {
    if (value == "success") {
      toast.success("Logged in", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Error: " + text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const reloadPage = () => {
    dispatch(authActions.setUserType(null));
    window.location.reload(true);
  };

  const navigate = useNavigate();
  const loginAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND +"loginCheck", {
        userName: userName,
        password: userPassword,
        userType: userType,
      })
      .then((res) => {
        console.log(res);
        if (res.data.Status == false) {
          setLoading(false);
          notify("error", "Wrong credentials!");
          // navigate("/")
        } else {
          dispatch(
            authActions.login({
              userPassword: userPassword,
              userName: userName,
              userType: userType,
            })
          );
          setLoading(false);
          switch (userType) {
            case "Receptionist":
              navigate("/receptionist/dashboard");
            case "Senior Doctor":
              navigate("srDoctor/dashboard");
            case "Junior Doctor":
              navigate("jrDoctor/dashboard");
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        notify(error.message);
      });
  };

  // to show and hide the password
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <motion.div
      className="relative p-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div
        className="float-left mt-4 ml-4 cursor-pointer text-gray-700"
        onClick={reloadPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </div>
      <div className="max-w-sm w-full text-gray-100 bg-transparent  py-4 px-8 rounded-lg border-2 border-white">
        <div className="text-center">
          {/* <img src={SE_logo} width={150} className="mx-auto" /> */}

          <div className="mt-5 space-y-2">
            <h3 className="text-gray-50 text-2xl font-bold sm:text-3xl">
              Login as <span className="text-primary">{userType}</span>
            </h3>
          </div>
        </div>
        <form className="mt-8 space-y-5" onSubmit={loginAccount}>
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
              className="w-full mt-2 px-3 py-2 bg-white text-gray-800 outline-none border focus:border-primary shadow-sm rounded-lg"
            />
          </div>

          <div class="relative">
            <label className="font-medium">Password</label>
            <div className="flex items-center gap-2 mt-2 bg-white rounded-md shadow-sm pr-4">
              <input
                type={passwordType}
                required
                value={userPassword}
                onChange={(e) => {
                  setuserPassword(e.target.value);
                }}
                placeholder="Must have 8 characters"
                class="w-full px-3 py-2 text-gray-800 bg-white outline-none  rounded-lg sm:text-sm"
              />

              {/* <button
                className="text-lg"
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button> */}
            </div>
          </div>

          {!loading ? (
            <input
              type="submit"
              value="Log In"
              className="w-full cursor-pointer px-4 py-2 text-white font-medium bg-purple-600 hover:bg-primary active:bg-primary rounded-lg duration-150"
            />
          ) : (
            <div className="w-full grid place-items-center">
              <img
                src="https://i.stack.imgur.com/kOnzy.gif"
                className="h-10 w-10"
              />
            </div>
          )}

          <div className="text-center">
            <p className="">
              Forgot Credentials?{" "}
              <Link
                to="/"
                className="font-medium text-primary hover:text-primary"
              >
                Request
              </Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

export default LoginForm;
