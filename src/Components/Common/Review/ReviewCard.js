import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { BsClipboardData } from "react-icons/bs";

function ReviewCard({ pId, pName,reviewDate, reviewType, reviewDesc, srDoctorViewed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userType = useSelector((state) => state.auth.userType);
  // notifications
  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text + pId, {
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
  const getPatient = async (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
        Patient_Id: pId,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.Status) {
          notify("success", "Fetched patient ");
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Gender: res.data.Patient_Gender,
              Patient_Height: res.data.Patient_Height,
              Patient_Weight: res.data.Patient_Weight,
              Patient_Contact_No: res.data.Patient_Contact_No,
            })
          );

        if(userType=="Senior Doctor") navigate("/srDoctor/dashboard/ViewReview/"+pId+"/"+reviewDate)
        else if (userType=="Junior Doctor") navigate("/jrDoctor/dashboard/ViewReview/"+pId+"/"+reviewDate)
        else navigate("/trainer/dashboard/ViewReview/"+pId+"/"+reviewDate)
        } else {
          notify("error", "Wrong Patient ID or Patient does not exist");
        }
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };


  return (
    <div>
      <article class="rounded-xl border border-gray-700 bg-gray-50 p-4 max-w-md">
        <div class="flex flex-col items-center gap-2 w-full">
          <div className="w-full">
            <div class="text-lg font-medium text-gray-800 flex items-center justify-between gap-4">
              <span className="text-base font-normal text-gray-700">{pId}</span>
              <span className="text-base font-normal text-gray-700">{pName}</span>
              <div class="text-xs font-medium text-gray-600">{reviewDate}</div>
            </div>
          </div>
          <div
            class={`text-sm font-bold ${
              reviewType == "General"
                ? "text-green-600"
                : reviewType == "Follow Up"
                ? "text-orange-500"
                : "text-red-500"
            }`}
          >
            {reviewType}
          </div>
          <div
            class={`text-sm font-bold ${
              srDoctorViewed
                ? "text-purple-600"
                : "text-gray-500"
            }`}
          >
            {srDoctorViewed
                ? "Seen"
                : "Not seen"}
          </div>

          <div class="text-xs font-medium text-gray-600">{reviewDesc}</div>
        </div>

        <button
          className="w-full mt-2 px-4 py-2 rounded-md shadow-md border bg-yellow-500 hover:border-yellow-500 hover:bg-transparent text-gray-100 hover:text-gray-800 flex items-center justify-center font-medium gap-2"
          onClick={getPatient}
        >
          View <BsClipboardData />
        </button>
      </article>
    </div>
  );
}

export default ReviewCard;
