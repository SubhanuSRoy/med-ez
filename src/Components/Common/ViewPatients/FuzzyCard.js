import React, { useEffect } from "react";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiEdit, BiFemale, BiMale } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { patientActions } from "../../../features/patient/patient-slice";
import { AiOutlinePhone } from "react-icons/ai";

function FuzzyCard({ pId, pName, pAge, pGender, pPhone }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userType = useSelector((state) => state.auth.userType);

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
              Patient_Email: res.data.Patient_Email,
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
      <article
        className={
          pGender == "Male"
            ? "bg-purple-100 rounded-xl border border-gray-700 p-4 min-w-[18rem]"
            : "bg-pink-100 rounded-xl border border-gray-700 p-4 min-w-[18rem]"
        }
      >
        <div class="flex items-center gap-4 w-full">
          <div className="w-full">
            <div class="text-lg font-medium text-gray-800 flex items-center justify-between gap-4">
              {pName}

              <span className="text-base font-normal text-gray-700">{pId}</span>
            </div>

            <div class="w-full pt-2">
              <ul class=" flex flex-wrap justify-between w-full items-center">
                <li class=" leading-none flex items-center gap-2">
                  <div class="text-xs font-medium text-gray-600 flex items-center gap-1">
                    <AiOutlinePhone /> {pPhone}
                  </div>
                  <div class="text-xs font-medium text-gray-600">{pAge} Years</div>
                </li>

                {/* <li class=" leading-none"></li> */}
                <li class="leading-none ">
                  <div class="font-medium text-gray-600 flex items-center gap-1">
                    <span className="text-xs">{pGender}</span>
                    {pGender == "Male" ? <BiMale /> : <BiFemale />}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

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

export default FuzzyCard;
