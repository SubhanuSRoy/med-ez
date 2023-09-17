import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { patientActions } from "../../features/patient/patient-slice";
import ParQ from "./ParQ";

function RehabDetails() {
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

  const [details, setdetails] = useState({
    DateOfAssessment: "",
    Diagnosis: "",
    TreatmentGiven: "",
    Package: "",
    FollowUp: "",
    ReviewDate: "",
    Contradiction: "",
    Category: "",
    InvestigationDone: "",
    TargetingMuscle: "",
    TargetingJoint: "",
    PainScale: "",
    AssessmentDoneBy: "",
  });

  const [parq, setparq] = useState({});

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
          // notify("success", "Fetched patient ");
          // setisPatient(true);
          dispatch(
            patientActions.setPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: res.data.Patient_Name,
              Patient_Age: res.data.Patient_Age,
              Patient_Email: res.data.Patient_Email,
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
      .post(process.env.REACT_APP_HOPE_BACKEND + "trainer/ViewRehabView", {
        Patient_Id: patientId,
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.Status) {
          notify("success", "Fetched patient ");
          setisPatient(true);
          setdetails(res.data);
          setparq(res.data.PARQ_Assessment);
        } else if (res.data.Status == "Patient Not Found in Re-Hab") {
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
        <div className="flex w-full h-full bg-white p-4 gap-4">
          <div className="flex flex-col w-1/2 h-full bg-white gap-4">
            <div className="flex flex-col min-w-[20rem] w-full  p-4 bg-gray-100 rounded-md">
              <div className="text-lg rounded-md font-bold mb-4 text-center bg-yellow-500 text-gray-100">
                Basic Rehab Assesment
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b ">
                <span className="font-semibold  w-1/3">Date :</span>{" "}
                {details?.Basic?.DateOfAssessment}
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Diagnosis :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.Diagnosis}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Treatment Given :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.TreatmentGiven}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Package :</span>{" "}
                <div className="w-2/3 break-all">{details?.Basic?.Package}</div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Follow Up :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.FollowUp}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Review Date :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.ReviewDate}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Contradiction :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.Contradiction}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Category :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.Category}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">
                  Investigation Done :
                </span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.InvestigationDone}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Targeting Joint :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.TargetingJoint}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Targeting Muscle :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.TargetingMuscle}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">PainScale :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.PainScale}
                </div>
              </div>
              <div class="text-sm text-gray-500  rounded flex items-center border-b">
                <span className="font-semibold  w-1/3">Assessment Done By :</span>{" "}
                <div className="w-2/3 break-all">
                  {details?.Basic?.AssessmentDoneBy}
                </div>
              </div>
            </div>

            {/* Exercise Schedule */}
            <div className="flex flex-col min-w-[20rem] w-full p-4 bg-gray-200 rounded-md">
              <div className="text-lg rounded-md font-bold mb-4 text-center bg-purple-500 text-gray-100">
                Exercise Schedule
              </div>
              {details?.ExerciseSchedule?.map((day, index) => {
                return (
                  <div key={index} className="flex items-center gap-2 w-full ">
                    <div className="w-10">
                      <label class="block text-xs font-medium text-gray-700">
                        SNo
                      </label>
                      <input
                        type="text"
                        id="day"
                        value={day.SNo}
                        required
                        // onChange={(e) => handleColumnChange(e, index, "SNo")}
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
                        // onChange={(e) =>
                        //   handleColumnChange(e, index, "Days_Week")
                        // }
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
                        // onChange={(e) =>
                        //   handleColumnChange(e, index, "Exercises")
                        // }
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
                        // onChange={(e) =>
                        //   handleColumnChange(e, index, "TargetingMuscle")
                        // }
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
                        // onChange={(e) =>
                        //   handleColumnChange(e, index, "TargetingJoint")
                        // }
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Exercise Tracking */}
            <div className="flex flex-col min-w-[20rem] w-full p-4 bg-gray-200 rounded-md">
              <div className="text-lg rounded-md font-bold mb-4 text-center bg-purple-800 text-gray-100">
                Exercise Tracking
              </div>
              {details?.ExerciseTracking?.map((day, index) => {
                return (
                  <div key={index} className="flex items-center gap-2 w-full">
                    <div className="w-32">
                      <label class="block text-xs font-medium text-gray-700">
                        Sr No
                      </label>
                      <input
                        type="number"
                        id="day"
                        value={index + 1}
                        // disabled
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                    <div className="w-1/8">
                      <label class="block text-xs font-medium text-gray-700">
                        Time In
                      </label>
                      <input
                        type="time"
                        id="day"
                        value={day.TimeIn}
                        required
                        // onChange={(e) => handleColumnChange(e, index, "TimeIn")}
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                    <div className="w-1/8">
                      <label class="block text-xs font-medium text-gray-700">
                        Time Out
                      </label>
                      <input
                        type="time"
                        id="day"
                        value={day.TimeOut}
                        required
                        // onChange={(e) =>
                        //   handleColumnChange(e, index, "TimeOut")
                        // }
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>

                    <div className="w-1/8">
                      <label class="block text-xs font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="pain"
                        value={day.Date}
                        required
                        // onChange={(e) => handleColumnChange(e, index, "Date")}
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                    <div className="w-1/8">
                      <label class="block text-xs font-medium text-gray-700">
                        Pain Scale
                      </label>
                      <input
                        type="number"
                        id="painSclae"
                        value={day.PainScale}
                        required
                        // onChange={(e) =>
                        //   handleColumnChange(e, index, "PainScale")
                        // }
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                    <div className="w-1/2">
                      <label class="block text-xs font-medium text-gray-700">
                        Note
                      </label>
                      <input
                        type="text"
                        id="note"
                        value={day.Note}
                        required
                        placeholder="Very good improvement"
                        // onChange={(e) => handleColumnChange(e, index, "Note")}
                        class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col w-1/2 h-[60rem] overflow-y-scroll rounded-md p-4 gap-4">
            <div className="text-lg rounded-md font-bold mb-4 text-center bg-purple-500 text-gray-100">
              PARQ
            </div>
            <ParQ prefilledData={parq} />
          </div>
        </div>
      )}
    </div>
  );
}

export default RehabDetails;
