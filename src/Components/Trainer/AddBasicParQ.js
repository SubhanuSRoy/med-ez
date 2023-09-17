import React, { useState } from "react";
import BasicAssessment from "./BasicAssessment";
import { useSelector } from "react-redux";
import ParQ from "./ParQ";

function AddBasicParQ() {
  const [tab, setTab] = useState(0);

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  // assessment
  const [pDOA, setpDOA] = useState(date);

  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const Patient_Gender = useSelector((state) => state.patient.Patient_Gender);
  const Patient_Height = useSelector((state) => state.patient.Patient_Height);
  const Patient_Weight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const displayTab = () => {
    switch (tab) {
      case 0:
        return <BasicAssessment pDOA={pDOA} />;
      case 1:
        return <ParQ pDOA={pDOA} />;
      default:
        <BasicAssessment pDOA={pDOA} />;
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
            Basic
          </div>
          <div
            className={
              tab === 1
                ? "w-full border-b-2  p-4 rounded-md cursor-pointer bg-purple-100 text-gray-500 font-bold flex gap-4 items-center "
                : "w-full border-b-2 border-white p-4 rounded-md cursor-pointer text-gray-500 font-bold flex gap-4 items-center hover:bg-gray-100"
            }
            onClick={() => setTab(1)}
          >
            PARQ
          </div>
         
        </div>
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
            disabled
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2 flex items-start gap-4">
          <div className="flex-grow">
            <label class="block text-xs font-medium text-gray-700 mb-2 ">
              Patient Name
            </label>

            <p>{patientName}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-2">
              Patient ID
            </label>

            <p>{patientID}</p>
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
      </div>
      {displayTab()}
    </div>
  );
}

export default AddBasicParQ;
