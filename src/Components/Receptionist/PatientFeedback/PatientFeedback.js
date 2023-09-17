import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authActions } from "../../../features/auth/auth-slice";
import { patientActions } from "../../../features/patient/patient-slice";

function PatientFeedback() {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var currDate = curr.toISOString().substring(0, 10);

  //to change tab no when component comes to focus
  const dispatch = useDispatch();
  const tabNo = useSelector((state) => state.auth.rTabNo);
  dispatch(authActions.setRTabNo(2));

  const [searchPatientId, setsearchPatientId] = useState(null);
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const patientWeight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const [date, setDate] = useState(currDate);
  const [complaint, setComplaint] = useState(null);
  const [overallFeedback, setOverallFeedback] = useState(null);
  const [effective, setEffective] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [comfortable, setComfortable] = useState(null);
  const [punctual, setPunctual] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [experience, setExperience] = useState(null);

  const [isPatient, setisPatient] = useState(false);

  const navigate = useNavigate();

  // to delay the next statement
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // notifications
  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text + patientName, {
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
        Patient_Id: searchPatientId,
      })
      .then((res) => {
        // console.log(res.data);
        if (!res.data.Status) {
          setisPatient(true);
          setComplaint(res.data.Complaint);
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Gender: res.data.Patient_Gender,
              Patient_Height: res.data.Patient_Height,
              Patient_Weight: res.data.Patient_Weight,
              Patient_Contact_No: res.data.Patient_Contact_No,
              Employed: res.data.Employed,
              Occupation: res.data.Occupation,
              Address: res.data.Address,
              Assesment: res.data.Assessment,
              Assesment: res.data.Assessment,
            })
            );
            notify("success", "Fetched patient ");
          } else {
          setisPatient(false);
          notify("error", "Wrong Patient ID or Patient does not exist");
        }
      })
      .catch((error) => {
        // console.log(error.message);
        notify(error.message);
      });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    // Create an object with the captured form data
    const feedbackData = {
      Patient_Id: patientID,
      Date: date,
      Feedback: {
        overAll: overallFeedback,
        effecitive: effective,
        treatmentPlan: treatmentPlan,
        confortable: comfortable,
        punctual: punctual,
        recommend: recommendation,
        suggestions: suggestions,
        experience: experience,
      },
    };

    axios
      .post(
        "https://physioplusbackend.onrender.com/patientFeedback",
        feedbackData
      )
      .then((res) => {
        // console.log(res);
        if (res.data.Status == true) {
          notify("success", "Feedback Submitted for ");
          // navigate("/")
        } else {
          notify(
            "error",
            "Wrong Patient ID or Date of Assessment does not exist"
          );
        }
      })
      .catch((error) => {
        // console.log(error.message);
        notify(error.message);
      });

    // await delay(5000);
    // navigate("/receptionist/dashboard/viewPatients");
    // e.target.reset();

    // You can now send the feedbackData object to an API, save it to a database, or perform any other necessary actions with it.
    // console.log(feedbackData);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
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
              value={searchPatientId}
              onChange={(e) => {
                setsearchPatientId(e.target.value.toUpperCase());
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
          <div className="w-full flex flex-wrap items-start gap-4">
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
        <form
          onSubmit={submitFeedback}
          className="flex flex-col w-full h-full bg-white p-4 gap-4"
        >
          

          <div className="flex items-center justify-between gap-2">
            <div className="w-2/3">
              <label
                htmlFor="date"
                class="block text-xs font-medium text-gray-700"
              >
                Date of Assessment for which Feedback is to be given:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="overallFeedback"
                class="block text-xs font-medium text-gray-700"
              >
                Overall Feedback:
              </label>
              <input
                type="number"
                id="overallFeedback"
                value={overallFeedback}
                onChange={(e) => {
                  setOverallFeedback(Number(e.target.value));
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="w-1/5">
              <label
                htmlFor="effective"
                class="block text-xs font-medium text-gray-700"
              >
                Effective:
              </label>
              <select
                id="effective"
                value={effective}
                onChange={(e) => {
                  setEffective(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="w-1/5">
              <label
                htmlFor="treatmentPlan"
                class="block text-xs font-medium text-gray-700"
              >
                Treatment Plan:
              </label>
              <select
                id="treatmentPlan"
                value={treatmentPlan}
                onChange={(e) => {
                  setTreatmentPlan(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="w-1/5">
              <label
                htmlFor="comfortable"
                class="block text-xs font-medium text-gray-700"
              >
                Comfortable:
              </label>
              <select
                id="comfortable"
                value={comfortable}
                onChange={(e) => {
                  setComfortable(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="w-1/5">
              <label
                htmlFor="punctual"
                class="block text-xs font-medium text-gray-700"
              >
                Punctual:
              </label>
              <select
                id="punctual"
                value={punctual}
                onChange={(e) => {
                  setPunctual(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="w-1/5">
              <label
                htmlFor="recommendation"
                class="block text-xs font-medium text-gray-700"
              >
                Recommendation:
              </label>
              <input
                type="number"
                id="recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(Number(e.target.value))}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>

          <div className="w-full ">
            <label
              htmlFor="suggestions"
              class="block text-xs font-medium text-gray-700"
            >
              Suggestions:
            </label>
            <textarea
              type="text"
              id="suggestions"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full ">
            <label
              htmlFor="experience"
              class="block text-xs font-medium text-gray-700"
            >
              Experience:
            </label>
            <textarea
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <input
            type="submit"
            value="Submit"
            className="w-full mt-2 cursor-pointer px-4 py-2 text-white font-medium bg-purple-600 hover:bg-primary active:bg-primary rounded-lg duration-150"
          />
        </form>
      )}
    </div>
  );
}

export default PatientFeedback;
