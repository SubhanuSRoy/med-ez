import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";

//charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TreatmentTracker() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [date, setDate] = useState(currDate);

  const [lastReview, setlastReview] = useState({});

  const [cols, setCols] = useState([]);

  // to delay the next statement
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
      .post(process.env.REACT_APP_HOPE_BACKEND +"GetTreatmentTracker", {
        Patient_Id: patientId,
      })
      .then((res) => {
        console.log(res.data.DailyReview[0]);
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

          setlastReview(res.data.DailyReview[0]);
          setCols(res.data.DailyReview[0].DateWise);
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


  const handleColumnChange = (event, index, field) => {
    const updatedCols = [...cols];
    updatedCols[index] = {
      ...updatedCols[index],
      [field]: event.target.value,
    };

    setCols(updatedCols);
  };
  const handleAddColumn = () => {
    const newColumn = {
      Date: "",
      PainScale: 0,
      Comments: "",
    };
    setCols([...cols, newColumn]);
  };

  const updateDates = async (e) => {
    e.preventDefault();

    axios
      .post("https://physioplusbackend.onrender.com/UpdateTreatmentTracker", {
        Patient_Id: patientId,
        GeneralAssessmentDate: lastReview.GeneralAssessmentDate,
        DateWise: cols,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Status == "Successful") {
          notify("success", "Updated dates for ");
        } else {
          notify("error", "Two dates can't have same score");
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
                setPatientId(e.target.value);
              }}
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
        <form
          className="flex flex-col gap-2 bg-gray-200 rounded-md p-2"
          onSubmit={updateDates}
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-4 text-3xl font-bold">
              <div>{lastReview.GeneralAssessmentDate}</div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleAddColumn}
              >
                <BsPlusCircleFill />
                <p className="text-sm text-gray-700">Add new treatment date</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-4 w-full py-3 px-2 rounded-md bg-yellow-500">
              <label class="block font-semibold text-gray-800 w-1/4">
                Date of Treatment
              </label>
              <label class="block font-semibold text-gray-800 w-1/4">
                Pain
              </label>
              <label class="block font-semibold text-gray-800 w-1/2">
                Comments
              </label>
            </div> */}
            {/* {lastReview.DateWise?.map((day) => {
              return (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-1/4">
                      <input
                        type="date"
                        id="date"
                        value={day.Date}
                        disabled
                        class="mt-1 w-full rounded-md bg-gray-300 border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                    <div className="w-1/4 px-2">
                      <input
                        type="number"
                        id="pain"
                        value={day.PainScale}
                        disabled
                        class="mt-1 w-full rounded-md bg-gray-300 border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        id="comments"
                        value={day.Comments}
                        disabled
                        class="mt-1 w-full rounded-md bg-gray-300 border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                  </div>
                </div>
              );
            })} */}
            {cols?.map((day, index) => {
              return (
                <div key={index} className="flex items-center gap-2 w-full">
                  <div className="w-1/4">
                    <label class="block text-xs font-medium text-gray-700">
                      Date of Treatment
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={day.Date}
                      onChange={(e) => handleColumnChange(e, index, "Date")}
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                  <div className="w-1/4">
                    <label class="block text-xs font-medium text-gray-700">
                      Pain
                    </label>
                    <input
                      type="number"
                      id="pain"
                      value={day.PainScale}
                      onChange={(e) =>
                        handleColumnChange(e, index, "PainScale")
                      }
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                  <div className="w-1/2">
                    <label class="block text-xs font-medium text-gray-700">
                      Comments
                    </label>
                    <input
                      type="text"
                      id="comments"
                      value={day.Comments}
                      onChange={(e) => handleColumnChange(e, index, "Comments")}
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                </div>
              );
            })}
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
              Update Dates
            </span>
          </button>
          <div className="w-full text-lg text-red-500 text-center">
            Treatment will automatically get closed, when Receptionist adds a
            new Basic Assesment
          </div>
          <ResponsiveContainer
            width="100%"
            aspect={3}
            // height="100%"
            className="bg-gray-50 rounded-md p-4"
          >
            <LineChart
              width={600}
              height={300}
              data={cols}
              margin={{
                top: 20,
                right: 60,
                left: 20,
                bottom: 5,
              }}
              isAnimationActive={false}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis  domain={[0, 10]}/>
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="PainScale"
                stroke="#8884d8"
                // activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </form>
      )}
    </div>
  );
}

export default TreatmentTracker;
