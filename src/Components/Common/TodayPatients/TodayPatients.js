import React, { useEffect, useState } from "react";
import pData from "../../../Data/patient";

import axios from "axios";
import { ToastContainer } from "react-toastify";
import PatientCard from "../ViewPatients/PatientCard";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../features/auth/auth-slice";
import { BiRefresh } from "react-icons/bi";

function TodayPatients() {
  const [allPatients, setallPatients] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  const [searchQuery, setsearchQuery] = useState(null);

  //to change tab no when component comes to focus
  const dispatch = useDispatch();
  const tabNo = useSelector((state) => state.auth.rTabNo);
  dispatch(authActions.setRTabNo(0));

  const getAllPatients = async (e) => {
    e.preventDefault();
    console.log("getting all patients");
    axios
      .get(process.env.REACT_APP_HOPE_BACKEND + "allPatientsToday")
      .then((res) => {
        console.log(res.data);
        setallPatients(res.data.allPatientsToday);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    setisFetching(true);
    axios
      .get(process.env.REACT_APP_HOPE_BACKEND + "allPatientsToday")
      .then((res) => {
        console.log(res.data);
        setisFetching(false);
        setallPatients(res.data.allPatientsToday);
      })
      .catch((error) => {
        setisFetching(false);
        console.log(error.message);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <ToastContainer />
      <div className="flex bg-gray-200 h-16 items-center w-full gap-4 px-4 rounded-md sticky top-16">
        <input
          type="text"
          placeholder="Search by Name, ID or Phone"
          className="border-2 border-gray-300 rounded-md p-2 flex-grow"
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <AiOutlineSearch />
        <button onClick={getAllPatients}>
          <BiRefresh />
        </button>
      </div>
      {isFetching && (
        <div className="flex flex-col items-center h-full w-full p-4">
          <p className="text-3xl text-center mb-20">Fetching Patients</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
        </div>
      )}
      {allPatients?.length < 1 && !isFetching && (
        <div className="flex flex-col items-center h-full w-full p-4">
          <p className="text-3xl text-center mb-20">No Patients for Today!</p>
          <img src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif" />
        </div>
      )}
      <div className="flex flex-wrap w-full gap-4 p-4">
        {allPatients
          ?.filter((val) => {
            if (searchQuery == null) {
              return val;
            } else if (
              val.Patient_Name.toLowerCase().includes(
                searchQuery.toLowerCase()
              ) ||
              val.Patient_Id.toLowerCase().includes(
                searchQuery.toLowerCase()
              ) ||
              val.Patient_Contact_No.toLowerCase().includes(
                searchQuery.toLowerCase()
              )
            ) {
              return val;
            }
          })
          ?.map((p) => {
            return (
              <PatientCard
                pId={p.Patient_Id}
                pName={p.Patient_Name}
                pAge={p.Patient_Age}
                pGender={p.Patient_Gender}
                pPhone={p.Patient_Contact_No}
                lastAss={p.LastAssessment}
                status={p.Status}
              />
            );
          })}
      </div>
    </div>
  );
}

export default TodayPatients;
