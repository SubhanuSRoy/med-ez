import React, { useEffect, useState } from "react";
import {
  BsPersonAdd,
  BsPersonGear,
  BsPeople,
  BsFilePerson,
  BsCalendar2Check,
  BsClipboardCheck,
  BsCalendarWeek,
  BsClipboardPlus,
} from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";

import { AiOutlineBarChart, AiOutlineSchedule } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { IoArrowRedoCircleOutline } from "react-icons/io5";

function Dashboard({ children }) {
  const rTabNo = useSelector((state) => state.auth.rTabNo);
  const userType = useSelector((state) => state.auth.userType);
  const dispatch = useDispatch();

  const [reviewCount, setreviewCount] = useState(0);
  const [todayPatientCount, settodayPatientCount] = useState(0);
  const toggleTab = (index) => {
    dispatch(authActions.setRTabNo(index));
  };

  // useEffect(() => {
  //   document.title = "Med-ez - " + userType;
  //   const interval = setInterval(() => {
  //     axios
  //       .get(process.env.REACT_APP_HOPE_BACKEND + "ReviewCount")
  //       .then((res) => {
  //         // console.log("ReviewCount",res);
  //         setreviewCount(res.data.ReviewCount);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });

  //     axios
  //       .get(process.env.REACT_APP_HOPE_BACKEND + "allPatientsTodayCount")
  //       .then((res) => {
  //         // console.log("ReviewCount",res);
  //         settodayPatientCount(res.data.allPatientsTodayCount);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const showRespTabs = () => {
    switch (userType) {
      case "Receptionist":
        return (
          <div className="flex flex-col w-1/4 md:w-1/5 min-h-screen p-4 bg-transparent border-r">
            <Link
              to="/receptionist/dashboard/addPatient"
              className={
                rTabNo === 0
                  ? "w-full   text-2xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-2xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(0)}
            >
              <BsPersonAdd /> New Patient
            </Link>

            <Link
              to="/receptionist/dashboard/viewPatients"
              className={
                rTabNo === 1
                  ? "w-full   text-2xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-2xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(1)}
            >
              <BsPeople /> View Patients
            </Link>
            <Link
              to="/receptionist/dashboard/patientFeedback"
              className={
                rTabNo === 2
                  ? "w-full   text-2xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-2xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(2)}
            >
              <BsFilePerson /> Patient Feedback
            </Link>
            <Link
              to="/receptionist/dashboard/createBill"
              className={
                rTabNo === 3
                  ? "w-full   text-2xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-2xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(3)}
            >
              <RiBillLine /> Create Bill
            </Link>
          </div>
        );
      case "Senior Doctor":
        return (
          <div className="flex flex-col w-1/4 md:w-1/5 min-h-screen p-4 bg-transparent border-r">
            <Link
              to="/srDoctor/dashboard/todayPatients"
              className={
                rTabNo === 0
                  ? "w-full   text-lg p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-lg p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(0)}
            >
              <BsPersonAdd /> Today's Patients{" "}
              <div className="rounded-full bg-red-600 border-white border-2 text-gray-50 h-10 w-10 text-center pt-1">
                {todayPatientCount}
              </div>
            </Link>

            <Link
              to="/srDoctor/dashboard/viewPatients"
              className={
                rTabNo === 1
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(1)}
            >
              <BsPeople /> View Patients
            </Link>
            <Link
              to="/srDoctor/dashboard/allReviews"
              className={
                rTabNo === 2
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(2)}
            >
              <BsClipboardCheck /> All Reviews{" "}
              <div className="rounded-full bg-red-600 border-white border-2 text-gray-50 h-10 w-10 text-center pt-1">
                {reviewCount}
              </div>
            </Link>
            <Link
              to="/srDoctor/dashboard/rehabDetails"
              className={
                rTabNo === 3
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(3)}
            >
              <CgProfile /> Rehab Details
            </Link>
            <Link
              to="/srDoctor/dashboard/revisits"
              className={
                rTabNo === 4
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(4)}
            >
              <IoArrowRedoCircleOutline /> Revisits Due
            </Link>
          </div>
        );
      case "Junior Doctor":
        return (
          <div className="flex flex-col w-1/4 md:w-1/5 min-h-screen p-4 bg-transparent border-r">
            <Link
              to="/jrDoctor/dashboard/todayPatients"
              className={
                rTabNo === 0
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(0)}
            >
              <BsPersonAdd /> Today's Patients
            </Link>
            <Link
              to="/jrDoctor/dashboard/viewPatients"
              className={
                rTabNo === 1
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(1)}
            >
              <BsPeople /> View Patients
            </Link>
            <Link
              to="/jrDoctor/dashboard/treatmentTracker"
              className={
                rTabNo === 2
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(2)}
            >
              <BsCalendarWeek /> Treatment Tracker
            </Link>
            <Link
              to="/jrDoctor/dashboard/addReview"
              className={
                rTabNo === 3
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(3)}
            >
              <BsClipboardPlus /> Add Reviews
            </Link>
            <Link
              to="/jrDoctor/dashboard/viewReviews"
              className={
                rTabNo === 4
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(4)}
            >
              <BsClipboardCheck /> View Reviews
            </Link>
          </div>
        );
      case "Trainer":
        return (
          <div className="flex flex-col w-1/4 md:w-1/5 min-h-screen p-4 bg-transparent border-r">
            <Link
              to="/trainer/dashboard/todayPatients"
              className={
                rTabNo === 0
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(0)}
            >
              <BsPeople /> Today's Patients
            </Link>
            <Link
              to="/trainer/dashboard/viewPatients"
              className={
                rTabNo === 1
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(1)}
            >
              <BsPeople /> All Patients
            </Link>
          
            <Link
              to="/trainer/dashboard/rehabDetails"
              className={
                rTabNo === 3
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(3)}
            >
              <CgProfile /> Rehab Details
            </Link>
            <Link
              to="/trainer/dashboard/addReview"
              className={
                rTabNo === 4
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(4)}
            >
              <BsClipboardPlus /> Add Reviews
            </Link>
            <Link
              to="/trainer/dashboard/allReviews"
              className={
                rTabNo === 5
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(5)}
            >
              <BsClipboardPlus /> All Reviews
            </Link>
            <Link
              to="/trainer/dashboard/exerciseSchedule"
              className={
                rTabNo === 6
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(6)}
            >
              <AiOutlineSchedule /> Exercise Schedule
            </Link>
            <Link
              to="/trainer/dashboard/exerciseTracker"
              className={
                rTabNo === 7
                  ? "w-full   text-xl p-4 rounded-md cursor-pointer  my-2 bg-purple-900 text-gray-50 font-bold flex gap-4 items-center "
                  : "w-full  text-xl p-4 rounded-md cursor-pointer  my-2 text-gray-50 font-bold flex gap-4 items-center hover:bg-purple-900"
              }
              onClick={() => toggleTab(7)}
            >
              <AiOutlineBarChart /> Exercise Tracker
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-violet-400 to-purple-800 border-gray-200 text-white">
      {/* side navbar */}
      {showRespTabs()}

      <div className="flex flex-col  w-3/4 md:w-4/5 ">
        {/* navbar */}
        <nav class="bg-transparent border-gray-200 text-white sticky top-0">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
            <div class="flex items-center">
              <span class="self-center text-3xl font-bold whitespace-nowrap ">
                Med-ez
              </span>
            </div>
            <div className="font-medium text-xl">{userType}</div>
          </div>
        </nav>
        {/* contents */}
        <div className="bg-white h-full w-full border-2 border-red-300 text-black">
          {children}
        </div>

        {/* {rTabNo==0 && <AddPatient />}
        {rTabNo==1 && <ViewPatient />} */}
      </div>
    </div>
  );
}

export default Dashboard;
