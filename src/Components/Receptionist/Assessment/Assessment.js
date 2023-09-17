//this is for assessment view in the patient profile
import React, { useState, useEffect } from "react";
import {
  GiBackPain,
  GiBodyBalance,
  GiKneeCap,
  GiShoulderArmor,
} from "react-icons/gi";
import AnyAssesment from "../../Common/AnyAssesment/AnyAssesment";
import PARQPlusAssessment from "../../SrDoctor/PARQPlusAssessment/PARQPlusAssessment";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BiMicrophone } from "react-icons/bi";

import { useSelector } from "react-redux";
import axios from "axios";

function Assessment({ FullAss }) {
  const [tab, setTab] = useState(0);

  // console.log(FullAss);
  const displayTab = () => {
    switch (tab) {
      case 0:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.GeneralAssessment}
          />
        );
      case 1:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.KneeAssessment}
          />
        );
      case 2:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.BalanceAssessment}
          />
        );
      case 3:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.LowBackAssessment}
          />
        );
      case 4:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.ShoulderAssessment}
          />
        );
      case 5:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.FMSAssessment}
          />
        );
      case 6:
        return (
          <PARQPlusAssessment
            prefilledData={FullAss.SeniorDoctorPrescription?.PARQPlusAssessment}
          />
        );
      case 7:
        return (
          <AnyAssesment
            data={FullAss.SeniorDoctorPrescription?.TreatmentPrescription}
          />
        );
      default:
        <AnyAssesment
          data={FullAss.SeniorDoctorPrescription?.GeneralAssessment}
        />;
    }
  };

  const Patient_Id = useSelector((state) => state.patient.Patient_Id);
  const [summary, setSummary] = useState("");
  const [summaryLoaded, setSummaryLoaded] = useState(false);

  useEffect(() => {
    // axios
    //   .post("https://hope-backend.onrender.com/generate_summary/", {
    //     patient_id: Patient_Id,
    //     DateOfAssessment: FullAss.Date,
    //   })
    //   .then((res) => {
    //     setSummaryLoaded(true);
    //     console.log(res);
    //     setSummary(res.data.summary);
    //   })
    //   .catch((err) => {
    //     setSummaryLoaded(false);
    //     console.log(err);
    //   });

    const data = {
      patient_id: Patient_Id,
      DateOfAssessment: FullAss.Date,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        process.env.REACT_APP_HOPE_BACKEND + "generate_summary/",
        data,
        config
      )
      .then((response) => {
        // console.log(response.data);
        setSummaryLoaded(true);
        //     console.log(res);
        setSummary(response.data.summary);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  var tts = window.speechSynthesis;
  const speech = new SpeechSynthesisUtterance(summary);
  speech.lang = "en-US";
  var v = [];
  // v = tts.getVoices();
  const toggleSpeak = () => {
    console.log("speaking ", speech);

    // speech.voice = v[1];
    window.speechSynthesis.cancel();
    tts.speak(speech);
  };

  return (
    <div className="flex flex-col gap-4">
      <div class="flex w-full">
        <div className="flex flex-col min-w-[20rem] w-1/3 h-full p-2 pl-4">
          <div className="flex items-center gap-4 justify-center rounded-md py-2 text-lg font-bold mb-4 text-center bg-[#ffb703] text-gray-900">
            Basic Assesment
            {summaryLoaded && (
              <button
                className="bg-white text-black p-2 rounded-full"
                onClick={toggleSpeak}
              >
                <BiMicrophone />
              </button>
            )}
          </div>
          <div class="text-sm text-gray-500  rounded flex items-center border-b ">
            <span className="font-semibold  w-1/3">Assesment :</span>{" "}
            {FullAss.Date}
          </div>

          <div class="text-sm text-gray-500  rounded flex items-center border-b">
            <span className="font-semibold  w-1/3">Complaint :</span>{" "}
            <div className="w-2/3 break-all">{FullAss.Complaint}</div>
          </div>
          <div class="text-sm text-gray-500  rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Injury: </span>{" "}
            {FullAss.Injury}
          </div>
          <div class="text-sm text-gray-500  rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Injury Date: </span>{" "}
            {FullAss.DateOfInjury}
          </div>
          <div class="text-sm text-gray-500  rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Surgery Date: </span>{" "}
            {FullAss.DateOfSurgery}
          </div>
          <div class="text-sm text-gray-500  rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Injury Desc: </span>{" "}
            {FullAss.DecriptionOfInjury}
          </div>
          <div class="text-sm text-gray-500  rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Therapy: </span>{" "}
            {FullAss.RecievedTherapy}
          </div>
          <div class="text-sm text-gray-500  rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Therapy Date: </span>
            {FullAss.DateofTherapy}
          </div>

          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Currrent Condtion </span>{" "}
            {FullAss.CurrentCondition}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Symptoms </span>{" "}
            {FullAss.CurrentStatusSymptoms}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3">Pain Rating: </span>{" "}
            {FullAss.AtWorstPain}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Surgical History: </span>{" "}
            {FullAss.SurgicalHistory}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3">Referral Doc: </span>{" "}
            {FullAss.ReferalDoctor}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3">
              Conditions that make better:
            </span>
            <div className="w-2/3 break-words">
              {FullAss.MakesConditionBetter?.map((i) => i + ",")}
            </div>
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3">
              Conditions that make worse:
            </span>
            <div className="w-2/3 break-words">
              {FullAss.MakesConditionWorse?.map((i) => i + ",")}
            </div>
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3">
              Past Medical Intervention:
            </span>
            <div className="w-2/3 break-words">
              {FullAss.MedicalIntervention?.map((i) => i + ",")}
            </div>
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Medical Info: </span>{" "}
            <div className="w-2/3 break-words">
              {FullAss.MedicalInformation?.map((i) => i + ",")}
            </div>
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Any Other Info: </span>{" "}
            {FullAss.OtherInformation}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Allergies: </span>{" "}
            {FullAss.Allergies}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3">Medications: </span>{" "}
            {FullAss.Medications}
          </div>
          <div class="text-sm text-gray-500 rounded  flex items-center border-b ">
            <span className="font-semibold  w-1/3"> Goals: </span>{" "}
            {FullAss.GoalsAfterTreat}
          </div>
        </div>
        <div className="flex flex-col w-2/3 pt-2 border">
          <div className="flex items-center justify-between w-full bg-gray-50">
            <div className="flex items-center gap-4 text-sm p-2">
              <div
                className={
                  tab === 0
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(0)}
              >
                General
              </div>
              <div
                className={
                  tab === 1
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(1)}
              >
                Knee
              </div>
              <div
                className={
                  tab === 2
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(2)}
              >
                Balance
              </div>
              <div
                className={
                  tab === 3
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(3)}
              >
                Back
              </div>
              <div
                className={
                  tab === 4
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(4)}
              >
                Shoulder
              </div>
              <div
                className={
                  tab === 5
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(5)}
              >
                FMS
              </div>
              <div
                className={
                  tab === 6
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(6)}
              >
                PARQ
              </div>
              <div
                className={
                  tab === 7
                    ? "w-full border-b-2  p-2 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                    : "w-full border-b-2 border-white p-2 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
                }
                onClick={() => setTab(7)}
              >
                Prescription
              </div>
            </div>
          </div>

          <div className="w-full">{displayTab()}</div>
        </div>
      </div>

      {/* Exercise prescribed */}

      <div className="w-full flex flex-col items-center my-4">
        <div className="text-lg font-bold mb-4 text-center   bg-pink-400 text-gray-50 w-full">
          Exercise Prescribed
        </div>
        {FullAss?.SeniorDoctorPrescription?.TreatmentPrescription?.exercises?.map(
          (day, index) => {
            return (
              <div key={index} className="flex items-center gap-2 w-full my-2">
                <div className="w-1/8">
                  <label class="block text-xs font-medium text-gray-700">
                    Sr No
                  </label>
                  <input
                    type="number"
                    id="date"
                    disabled
                    value={day.SrNo}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
                <div className="w-1/4">
                  <label class="block text-xs font-medium text-gray-700">
                    Name of Exercise
                  </label>
                  <input
                    type="text"
                    id="date"
                    disabled
                    value={day.NameOfExercise}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
                <div className="w-1/8">
                  <label class="block text-xs font-medium text-gray-700">
                    Reps
                  </label>
                  <input
                    type="number"
                    id="reps"
                    disabled
                    value={day.Reps}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
                <div className="w-1/8">
                  <label class="block text-xs font-medium text-gray-700">
                    Sets
                  </label>
                  <input
                    type="number"
                    id="sets"
                    disabled
                    value={day.Sets}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
                <div className="w-1/8">
                  <label class="block text-xs font-medium text-gray-700">
                    No of Days
                  </label>
                  <input
                    type="number"
                    id="noOfDays"
                    disabled
                    value={day.NoOfDays}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
                <div className="w-1/4">
                  <label class="block text-xs font-medium text-gray-700">
                    Next Review
                  </label>
                  <input
                    type="date"
                    id="nextReview"
                    disabled
                    value={day.NextReview}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
      {/* Treatment Tracker */}

      <div className="flex flex-col items-center gap-2 w-full">
        <div className="text-lg font-bold mb-4 text-center   bg-[#023047] text-gray-50 w-full">
          Treatment Tracker
        </div>
        {FullAss.JuniorDoctorPrescription.DayWise.length < 1 && (
          <div className="w-full text-lg text-gray-500 text-center">
            No Treatment Added for this date
          </div>
        )}
        {FullAss.JuniorDoctorPrescription.DayWise?.map((day, index) => {
          return (
            <div key={index} className="flex items-center gap-2 w-full">
              <div className="w-1/4">
                <label class="block text-xs font-medium text-gray-700">
                  Date of Treatment
                </label>
                <input
                  type="text"
                  id="date"
                  value={day.Date}
                  // disabled
                  class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                />
              </div>
              <div className="w-1/4">
                <label class="block text-xs font-medium text-gray-700">
                  Pain
                </label>
                <input
                  type="text"
                  id="pain"
                  value={day.PainScale}
                  disabled
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
                  disabled
                  class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                />
              </div>
            </div>
          );
        })}
        {FullAss.JuniorDoctorPrescription.DayWise.length > 0 && (
          <div className="bg-gray-50 rounded-md p-4 w-full">
            <LineChart
              width={600}
              height={300}
              data={FullAss.JuniorDoctorPrescription.DayWise}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis domain={[0, 10]} />
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
          </div>
        )}
      </div>

      {/* Feedback */}

      <div class="flex flex-col w-full items-center p-2">
        <div className="text-lg font-bold mb-4 text-center bg-[#fb8500] text-gray-900 w-full">
          Feedback
        </div>
        {Object.keys(FullAss.Feedback).length > 0 ? (
          <div className="flex w-full p-2 pl-4 shadow-md flex-wrap gap-4 justify-around">
            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3">Comfortable: </span>{" "}
              {FullAss.Feedback.confortable}
            </div>

            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3"> Effective: </span>{" "}
              {FullAss.Feedback.effecitive}
            </div>

            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3"> Overall: </span>{" "}
              {FullAss.Feedback.overAll}
            </div>
            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3"> Punctual: </span>{" "}
              {FullAss.Feedback.punctual}
            </div>
            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3"> Recommend: </span>{" "}
              {FullAss.Feedback.recommend}
            </div>
            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3"> Experience: </span>{" "}
              {FullAss.Feedback.experience}
            </div>
            <div class="text-sm text-gray-500  rounded  ">
              <span className="font-semibold  w-1/3"> Suggestions: </span>{" "}
              {FullAss.Feedback.suggestions}
            </div>
          </div>
        ) : (
          <div className="w-full text-lg text-gray-500 text-center">
            No Feedback Added for this date
          </div>
        )}
      </div>
    </div>
  );
}

export default Assessment;
