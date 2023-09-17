import React, { useEffect, useRef, useState } from "react";
import pData from "../../../Data/patient";

import axios, { all } from "axios";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import PatientCard from "./PatientCard";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../features/auth/auth-slice";
import { AiOutlineSearch } from "react-icons/ai";
import FuzzyCard from "./FuzzyCard";
import { BiRefresh } from "react-icons/bi";

function ViewPatients() {
  const [allPatients, setallPatients] = useState(null);
  const [isFetching, setisFetching] = useState(false);

  const [searchQuery, setsearchQuery] = useState("");

  //to change tab no when component comes to focus
  const dispatch = useDispatch();
  const tabNo = useSelector((state) => state.auth.rTabNo);
  dispatch(authActions.setRTabNo(1));

  // console.log(process.env.REACT_APP_HOPE_BACKEND);


  // notifications
  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text, {
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

  const getAllPatients = async (e) => {
    e.preventDefault();
    // console.log("getting all patients");
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "SearchPatient", {
        SearchString: searchQuery,
      })
      .then((res) => {
        // console.log(res.data.allPatients[0]);
        // setallPatients(res.data.allPatients?.reverse());
        // console.log(res.data.allPatients);
        setallPatients(res.data.allPatients);
        notify("success", "Patients Fetched Successfully");
      })
      .catch((error) => {
        console.log(error.message);
        notify("error", "Error Fetching Patients");
      });
  };

  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      console.log("getting all patients");
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "SearchPatient", {
          SearchString: searchQuery,
        })
        .then((res) => {
          // console.log(res.data.allPatients[0]);
          // setallPatients(res.data.allPatients?.reverse());
          console.log(res.data.allPatients);
          setallPatients(res.data.allPatients);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return () => (effectRan.current = true);
  }, []);

  const SendSearch = async (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "SearchPatient", {
        SearchString: searchQuery,
      })
      .then((response) => {
        console.log(response);
        setallPatients(response.data.Results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <ToastContainer />
      <form className="flex text-black h-16 items-center w-full gap-4 px-4 sticky top-16">
        <input
          type="text"
          placeholder="Search by Name, ID or Phone"
          className="border-2 border-gray-300 rounded-md p-2 flex-grow"
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <button onClick={SendSearch}>
          <AiOutlineSearch />
        </button>
        <button onClick={getAllPatients} className="bg-purple-500 rounded-full p-1 text-xl text-white">
          <BiRefresh />
        </button>
      </form>
      {allPatients == null && (
        <div className="flex flex-col items-center h-full w-full p-4">
          <p className="text-3xl text-center mb-20">Fetching Patients</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
        </div>
      )}

      {searchQuery == null && allPatients != null && (
        <div className="text-red-500 text-xl text-center">
          Type in search bar then click on Search Button
        </div>
      )}
      {/* {allPatients?.filter((val) => {
        if (
          val.Patient_Name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          val.Patient_Id.toLowerCase().includes(searchQuery?.toLowerCase()) ||
          val.Patient_Contact_No.toLowerCase().includes(
            searchQuery?.toLowerCase()
          )
        ) {
          return val;
        }
      }) &&
        searchQuery != null && (
          <div className="text-red-500 font-medium text-2xl text-center">
            No Results
          </div>
        )} */}
      <div className="mx-auto text-center text-gray-500">
        Only <span className="font-bold">latest 10 patients</span> are shown on first load, search for other
        patients on search bar
      </div>
      <div className="flex flex-wrap w-full gap-2 p-4 overflow-auto">
        {allPatients
          // ?.filter((val) => {
          //   if (searchQuery == null) {
          //     return val;
          //   } else if (
          //     val.Patient_Name.toLowerCase().includes(
          //       searchQuery.toLowerCase()
          //     ) ||
          //     val.Patient_Id.toLowerCase().includes(
          //       searchQuery.toLowerCase()
          //     ) ||
          //     val.Patient_Contact_No.toLowerCase().includes(
          //       searchQuery.toLowerCase()
          //     )
          //   ) {
          //     return val;
          //   }
          // })

          ?.map((p) => {
            return (
              <FuzzyCard
                pId={p.Patient_Id}
                pName={p.Patient_Name}
                pAge={p.Patient_Age}
                pGender={p.Patient_Gender}
                pPhone={p.Patient_Contact_No}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ViewPatients;
