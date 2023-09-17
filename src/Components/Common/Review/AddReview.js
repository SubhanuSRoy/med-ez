import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function AddReview() {
  const dispatch = useDispatch();

  const userType = useSelector((state) => state.auth.userType);
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const patientWeight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  var curr = new Date();
  curr.setDate(curr.getDate());
  var currDate = curr.toISOString().substring(0, 10);

  const [isPatient, setisPatient] = useState(false);
  const [patientId, setPatientId] = useState(null);

  const [formData, setFormData] = useState({
    reviewType: "General",
    reviewDesc: "",
    reviewDate: currDate,
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // notifications
  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text + patientId, {
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

  const searchPatient = async (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
        Patient_Id: patientId,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.Status) {
          notify("success", "Fetched patient ");
          setisPatient(true);
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
        } else {
          setisPatient(false);
          notify("error", "Wrong Patient ID or Patient does not exist");
        }
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  const raiseReview = async (e) => {
    e.preventDefault();

    axios
      .post("https://physioplusbackend.onrender.com/RaiseReview", {
        Patient_Id: patientId,
        Patient_Name: patientName,
        DateOfReview: formData.reviewDate,
        TypeOfReview: formData.reviewType,
        Description: formData.reviewDesc,
        srDocNote: "",
        AddedBy: userType,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Status == "successful") {
          notify("success", "Added review for ");
        } else {
          notify("error", "Review already exists for this date");
        }
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 gap-4">
      <ToastContainer />
      <form
        className="flex items-center gap-4 bg-gray-200 w-full p-4 rounded-md"
        onSubmit={searchPatient}
      >
        <div className="flex items-end justify-between gap-2 w-1/3">
          <div className="w-3/4">
            <label
              htmlFor="patientId"
              class="block text-xs font-medium text-gray-700"
            >
              Patient ID:
            </label>
            <input
              type="text"
              id="patientId"
              value={patientId}
              onChange={(e) => {
                setPatientId(e.target.value.toUpperCase());
              }}
              required
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
            />
          </div>
          <input
            type="submit"
            value="Search"
            className="mt-2 cursor-pointer px-4 py-2 text-white font-medium bg-purple-600 hover:bg-primary active:bg-primary rounded-lg duration-150"
          />
        </div>
        {isPatient && (
          <div className="w-full flex items-start gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">
                Patient ID
              </label>

              <p>{patientID}</p>
            </div>
            <div className="flex-grow">
              <label class="block text-xs font-medium text-gray-700 mb-2 ">
                Patient Name
              </label>

              <p>{patientName}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">
                Patient Age
              </label>

              <p>{patientAge}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">
                Patient Weight
              </label>

              <p>{patientWeight}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">
                Patient Phone
              </label>

              <p>{Patient_Contact_No}</p>
            </div>
          </div>
        )}
      </form>
      {isPatient && (
        <form className="flex flex-col gap-2" onSubmit={raiseReview}>
          <div className="w-full">
            <label class="block text-xs font-medium text-gray-700 mb-2">
              {userType}'s Note
            </label>

            <textarea
              name="reviewDesc"
              required
              value={formData.reviewDesc}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            ></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                for="PatientDOA"
                class="block text-xs font-medium text-gray-700"
              >
                Date of Assessment
              </label>

              <input
                type="date"
                id="PatientDOA"
                placeholder="13-04-2023"
                name="reviewDate"
                required
                value={formData.reviewDate}
                onChange={handleChange}
                class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-1/2">
              <label
                for="ReviewType"
                class="block text-xs font-medium text-gray-700"
              >
                Type of Review
              </label>
              <select
                id="type"
                name="reviewType"
                required
                value={formData.reviewType}
                onChange={handleChange}
                className="w-full rounded-md shadow-sm sm:text-sm outline-none p-2 "
              >
                <option value="General">General</option>
                <option value="Emergency">Emergency</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Periodical">Periodical</option>
                <option value="Review Result">Review Result</option>
              </select>
            </div>
            <button class="w-full  group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500">
              <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                <svg
                  class="h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span class="font-bold text-2xl transition-all group-hover:mr-4">
                Add Review
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddReview;
