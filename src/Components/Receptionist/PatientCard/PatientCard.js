import React, { useEffect } from "react";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { patientActions } from "../../../features/patient/patient-slice";

function PatientCard({ pId, pName, pAge, pGender, pPhone, status, lastAss }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userType = useSelector((state) => state.auth.userType);

  // func which gets called when add button in a card is clicked

  const addBAss = async () => {
    if (userType == "Receptionist") {
      console.log(pId);
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/receptionist/dashboard/addBasicAssessment/" + pId);
    } else if (userType == "Senior Doctor") {
      console.log(pId);
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/srDoctor/dashboard/addDocAssessment/" + pId);
    } else if (userType == "Junior Doctor") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/jrDoctor/dashboard/addDocAssessment/" + pId);
    } else if (userType == "Trainer") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      console.log(userType);

      navigate("/trainer/dashboard/addBasicParQ/" + pId);
    }
  };
  const viewPatient = () => {
    if (userType == "Receptionist") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      navigate("/receptionist/dashboard/viewPatient/" + pId);
      // window.open(
      //   `${window.location.origin}/"/receptionist/dashboard/viewPatient/" + ${pId}`,
      //   "_blank",
      //   "rel=noopener noreferrer"
      // );
    } else if (userType == "Senior Doctor") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      navigate("/srDoctor/dashboard/viewPatient/" + pId);
    } else if (userType == "Junior Doctor") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      navigate("/jrDoctor/dashboard/viewPatient/" + pId);
    } else if (userType == "Trainer") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: pId,
        })
        .then((res) => {
          console.log(res);
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
            })
          );
        })
        .catch((error) => {
          console.log(error.message);
        });
      navigate("/trainer/dashboard/viewPatient/" + pId);
    }
  };

  return (
    <div>
      <article class="rounded-xl border border-gray-700 bg-gray-50 p-4 min-w-[20rem]">
        <div class="flex items-center gap-4 w-full">
          {/* <div class="h-16 w-16 bg-purple-800 text-white"
          ><IoFemale className="h-12 w-12 text-left"/></div> */}
          {/* {showGender} */}

          <div className="w-full">
            <div class="text-lg font-medium text-gray-800 flex items-center justify-between gap-4">
              {pName}
              <span
                className={`text-base font-normal ${
                  status == "Completed"
                    ? "text-green-500"
                    : status == "Partial"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {status}
              </span>
              <span className="text-base font-normal text-gray-700">{pId}</span>
            </div>

            <div class="flow-root">
              <ul class=" flex flex-wrap">
                <li class="p-1 leading-none">
                  <div class="text-xs font-medium text-gray-600">{pPhone}</div>
                </li>

                <li class="p-1 leading-none">
                  <div class="text-xs font-medium text-gray-600">{pAge}</div>
                </li>
                <li class="p-1 leading-none">
                  <div class="text-xs font-medium text-gray-600">{pGender}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {lastAss && (
          <ul class="mt-4 space-y-2">
            <li>
              <a class="block h-full rounded-lg border-2 border-gray-700 p-4 hover:border-purple-600">
                <strong class="font-medium text-gray-700">
                  Last Assessment on{" "}
                  <span className="font-bold">{lastAss.Date}</span>
                </strong>

                <p class="mt-1 text-xs font-medium text-gray-600">
                  <span className="font-bold">Complaint:</span>
                  {lastAss.Complaint && lastAss.Complaint.length > 30
                    ? lastAss.Complaint.slice(0, 30) + "..."
                    : lastAss.Complaint}
                </p>
              </a>
            </li>
          </ul>
        )}
        {!lastAss && (
          <ul class="mt-4 space-y-2">
            <li>
              <a class="block h-full rounded-lg border-2 border-gray-700 p-4 hover:border-purple-600">
                <strong class="font-medium text-gray-700">
                  No Assessment added
                  <span className="font-bold"> </span>
                </strong>

                <p class="mt-1 text-xs font-medium text-transparent">
                  <span className="font-bold">Complaint:</span> cqcwcwec
                </p>
              </a>
            </li>
          </ul>
        )}
        <div className="flex items-center justify-between mt-4 font-bold gap-4">
          <button
            className="px-4 py-2 rounded-md shadow-md border bg-green-500 hover:border-green-500 hover:bg-transparent text-gray-900 flex items-center gap-2"
            onClick={addBAss}
          >
            Add / Edit <HiOutlineDocumentReport />
          </button>
          <button
            className="px-4 py-2 rounded-md shadow-md border bg-violet-500 hover:border-violet-500 hover:bg-transparent text-gray-100 hover:text-gray-800 flex items-center gap-2"
            onClick={viewPatient}
          >
            View <CgProfile />{" "}
          </button>
        </div>
      </article>
    </div>
  );
}

export default PatientCard;
