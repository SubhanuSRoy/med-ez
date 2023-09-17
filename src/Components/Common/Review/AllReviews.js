import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { BiRefresh } from "react-icons/bi";

function AllReviews() {
  const userType = useSelector((state) => state.auth.userType);

  const [allReviews, setallReviews] = useState(null);

  const [searchQuery, setsearchQuery] = useState(null);

  //Implementing the setInterval method

  const getAllReviews = async () => {
    axios
      .get(process.env.REACT_APP_HOPE_BACKEND + "AllReviews")
      .then((res) => {
        console.log(res);
        setallReviews(res.data?.AllReviews);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //to make useEffect run only once
  const effectRan = useRef(false);
  useEffect(() => {
    if (!effectRan.current) {
      console.log("getting all patients");
      axios
        .get(process.env.REACT_APP_HOPE_BACKEND + "AllReviews")
        .then((res) => {
          console.log(res);
          setallReviews(res.data?.AllReviews);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return () => (effectRan.current = true);
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 pt-0 gap-4">
      <ToastContainer />
      <div className="flex items-center w-full gap-4 ">
        <input
          type="text"
          placeholder="Search by Patient ID, Name or Date"
          className="border-2 border-gray-300 rounded-md p-2 flex-grow"
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <AiOutlineSearch />
        <button
          onClick={getAllReviews}
          className="bg-purple-500 rounded-full p-1 text-xl text-white"
        >
          <BiRefresh />
        </button>
      </div>
      {allReviews == null && (
        <div className="flex flex-col items-center h-full w-full">
          <p className="text-3xl text-center mb-20">Fetching Reviews</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" />
        </div>
      )}
      {allReviews?.length < 1 && (
        <div className="flex flex-col items-center h-full w-full p-4">
          <p className="text-3xl text-center mb-20">No Reviews for Today!</p>
          <img src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif" />
        </div>
      )}

      <div className="flex flex-col items-center w-full p-4">
        <p className="text-xl text-center">
          Only reviews which are not seen by doctor are shown
        </p>
      </div>

      <div className="flex flex-wrap w-full gap-4">
        {userType != "Senior Doctor" &&
          allReviews
            ?.filter((val) => {
              if (searchQuery == null) {
                return val;
              } else if (
                val.Patient_Id.toLowerCase().includes(
                  searchQuery.toLowerCase()
                ) ||
                val.Patient_Name.toLowerCase().includes(
                  searchQuery.toLowerCase()
                ) ||
                val.DateOfReview.toLowerCase().includes(
                  searchQuery.toLowerCase()
                )
              ) {
                return val;
              }
            })
            .map((r) => {
              return (
                <ReviewCard
                  pId={r.Patient_Id}
                  pName={r.Patient_Name}
                  srDoctorViewed={r.SeniorDoctorViewed}
                  reviewDate={r.DateOfReview}
                  reviewType={r.TypeOfReview}
                  reviewDesc={r.Description}
                />
              );
            })}

        {userType == "Senior Doctor" &&
          allReviews
            ?.filter((val) => {
              if (searchQuery == null) {
                if (!val.SeniorDoctorViewed) return val;
              } else if (
                val.Patient_Id.toLowerCase().includes(
                  searchQuery.toLowerCase()
                ) ||
                val.Patient_Name.toLowerCase().includes(
                  searchQuery.toLowerCase()
                ) ||
                val.DateOfReview.toLowerCase().includes(
                  searchQuery.toLowerCase()
                )
              ) {
                if (!val.SeniorDoctorViewed) return val;
              }
            })
            .map((r) => {
              return (
                <ReviewCard
                  pId={r.Patient_Id}
                  pName={r.Patient_Name}
                  srDoctorViewed={r.SeniorDoctorViewed}
                  reviewDate={r.DateOfReview}
                  reviewType={r.TypeOfReview}
                  reviewDesc={r.Description}
                />
              );
            })}
      </div>
    </div>
  );
}

export default AllReviews;
