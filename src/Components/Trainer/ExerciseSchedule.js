import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../features/patient/patient-slice";
import { XAxis } from "recharts";
import { BsPlusCircleFill } from "react-icons/bs";

function ExerciseSchedule() {
  const dispatch = useDispatch();

  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const Patient_Age = useSelector((state) => state.patient.Patient_Age);
  const Patient_Gender = useSelector((state) => state.patient.Patient_Gender);
  const Patient_Height = useSelector((state) => state.patient.Patient_Height);
  const Patient_Weight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const [isPatient, setisPatient] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [scheduleDoneBy, setscheduleDoneBy] = useState(null);
  const [oldSchedule, setoldSchedule] = useState(null);

  const [cols, setCols] = useState([]);

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
      SNo: cols.length + 1,
      Days_Week: "",
      Exercises: "",
      TargetingMuscle: "",
      TargetingJoint: "",
    };
    setCols([...cols, newColumn]);
  };

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

  const searchPatient = async (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
        Patient_Id: patientId,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.Status) {
          // notify("success", "Fetched patient ");
          //   setisPatient(true);
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

    axios
      .post(process.env.REACT_APP_HOPE_BACKEND +"trainer/ViewRehabView", {
        Patient_Id: patientId,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.Status) {
          // notify("success", "Fetched patient ");
          setisPatient(true);
          setoldSchedule(res.data.ExerciseSchedule);
          setCols(res.data.ExerciseSchedule);
        }  else if (res.data.Status == "Patient Not Found in Re-Hab") {
          setisPatient(false);
          notify("error", "Patient Not added in Re-Hab Portal");
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

  const updateDates = async (e) => {
    e.preventDefault();

    axios
      .post(
        "https://physioplusbackend.onrender.com/trainer/AddExerciseSchedule",
        {
          Patient_Id: patientId,
          ExerciseSchedule: cols,
          ScheduleDoneBy: scheduleDoneBy,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.Status == "Successfully") {
          notify("success", "Updated exercise for " + patientName);
        } else {
          notify("error", "Error updating exercise for " + patientName);
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

              <p>{Patient_Age}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">
                Patient Weight
              </label>

              <p>{Patient_Weight}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-2">
                Patient Height
              </label>

              <p>{Patient_Height}</p>
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
              {/* <div>{lastReview.GeneralAssessmentDate}</div> */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleAddColumn}
              >
                <BsPlusCircleFill />
                <p className="text-sm text-gray-700">Add new exercise date</p>
              </div>
            </div>
            {cols?.map((day, index) => {
              return (
                <div key={index} className="flex items-center gap-2 w-full">
                  <div className="w-1/8">
                    <label class="block text-xs font-medium text-gray-700">
                      SNo
                    </label>
                    <input
                      type="text"
                      id="day"
                      value={day.SNo}
                      required
                      onChange={(e) => handleColumnChange(e, index, "SNo")}
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                  <div className="w-1/8">
                    <label class="block text-xs font-medium text-gray-700">
                      Days of Week
                    </label>
                    <input
                      type="text"
                      id="day"
                      value={day.Days_Week}
                      required
                      placeholder="Mon,Tues,Wed"
                      onChange={(e) =>
                        handleColumnChange(e, index, "Days_Week")
                      }
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                  <div className="w-1/4">
                    <label class="block text-xs font-medium text-gray-700">
                      Exercises
                    </label>
                    <input
                      type="text"
                      id="pain"
                      value={day.Exercises}
                      required
                      placeholder="Flexors, ..."
                      onChange={(e) =>
                        handleColumnChange(e, index, "Exercises")
                      }
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                  <div className="w-1/4">
                    <label class="block text-xs font-medium text-gray-700">
                      Targeting Muscle
                    </label>
                    <input
                      type="text"
                      id="comments"
                      value={day.TargetingMuscle}
                      required
                      placeholder="Lower Hip, ..."
                      onChange={(e) =>
                        handleColumnChange(e, index, "TargetingMuscle")
                      }
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                  <div className="w-1/4">
                    <label class="block text-xs font-medium text-gray-700">
                      Targeting Joint
                    </label>
                    <input
                      type="text"
                      id="comments"
                      value={day.TargetingJoint}
                      required
                      placeholder="Hip, ..."
                      onChange={(e) =>
                        handleColumnChange(e, index, "TargetingJoint")
                      }
                      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full">
            <label class="block text-xs font-medium text-gray-700">
              Schedule Done By
            </label>
            <input
              type="text"
              id="comments"
              value={scheduleDoneBy}
              required
              placeholder="Name of Trainer"
              onChange={(e) => setscheduleDoneBy(e.target.value)}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
            />
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
              Update Exercises
            </span>
          </button>
          {/* <div className="w-full text-lg text-red-500 text-center">
            Treatment will automatically get closed, when Receptionist adds a new Basic Assesment
          </div> */}
        </form>
      )}
    </div>
  );
}

export default ExerciseSchedule;
