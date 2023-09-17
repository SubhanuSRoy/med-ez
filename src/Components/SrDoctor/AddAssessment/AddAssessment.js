import React, { useState } from "react";
import GeneralAssessment from "../GeneralAssessment/GeneralAssessment";
import KneeAssessment from "../KneeAssessment/KneeAssessment";
import BalanceAssessment from "../BalanceAssessment/BalanceAssessment";
import LowBackAssessment from "../LowBackAssessment/LowBackAssessment";
import ShoulderAssessment from "../ShoulderAssessment/ShoulderAssessment";
import FMSAssessment from "../FMSAssessment/FMSAssessment";
import PARQPlusAssessment from "../PARQPlusAssessment/PARQPlusAssessment";
import Prescribe from "../Prescribe/Prescribe";
import { useSelector } from "react-redux";

function AddAssessment() {
  const [tab, setTab] = useState(0);

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  // assessment
  const [pDOA, setpDOA] = useState(date);

  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const patientWeight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const displayTab = () => {
    switch (tab) {
      case 0:
        return <GeneralAssessment pDOA={pDOA} />;
      case 1:
        return <KneeAssessment pDOA={pDOA} />;
      case 2:
        return <BalanceAssessment pDOA={pDOA} />;
      case 3:
        return <LowBackAssessment pDOA={pDOA} />;
      case 4:
        return <ShoulderAssessment pDOA={pDOA} />;
      case 5:
        return <FMSAssessment pDOA={pDOA} />;
      case 6:
        return <PARQPlusAssessment pDOA={pDOA} />;
      case 7:
        return <Prescribe pDOA={pDOA} />;
      default:
        <GeneralAssessment pDOA={pDOA} />;
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between w-full p-4 bg-gray-50 sticky top-0 z-30">
        <div className="flex items-center gap-4 ">
          <div
            className={
              tab === 0
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(0)}
          >
            General
          </div>
          <div
            className={
              tab === 1
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(1)}
          >
            Knee
          </div>
          <div
            className={
              tab === 2
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(2)}
          >
            Balance
          </div>
          <div
            className={
              tab === 3
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(3)}
          >
            Back
          </div>
          <div
            className={
              tab === 4
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(4)}
          >
            Shoulder
          </div>
          <div
            className={
              tab === 5
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(5)}
          >
            FMS
          </div>
          <div
            className={
              tab === 6
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(6)}
          >
            PARQ
          </div>
        </div>
        <button
          className="w-32 px-4 py-2 text-white font-medium bg-purple-600 hover:bg-primary active:bg-primary rounded-lg duration-150"
          onClick={() => setTab(7)}
        >
          Prescribe
        </button>
      </div>
      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 sticky top-20 z-30">
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
            value={pDOA}
            onChange={(e) => setpDOA(e.target.value)}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2 flex items-start gap-4">
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
      </div>
      <div className="text-red-400 mx-auto pl-8 w-full">
        If you are changing date of assessment (to edit an old assessment) then:
        <ol className="list-decimal">
          <li>
            Make sure receptionist has <span className="font-bold">added Basic Assesment</span> for that date
          </li>
          <li>
            If yes, then move to Knee Assessment tab, then come back to General
            Assessment tab
          </li>
        </ol>
      </div>
      {displayTab()}
    </div>
  );
}

export default AddAssessment;
