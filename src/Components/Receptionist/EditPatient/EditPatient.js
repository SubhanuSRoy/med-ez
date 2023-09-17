import React, { useEffect, useState } from "react";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function EditPatient() {
  const dispatch = useDispatch();

  // states to add the names
  const [pName, setpName] = useState(null);
  const [pAge, setpAge] = useState(null);
  const [pGender, setpGender] = useState("Male");
  const [pHt, setpHt] = useState(null);
  const [pPhone, setpPhone] = useState(null);
  const [pWt, setpWt] = useState(null);
  const [pEmployed, setpEmployed] = useState(false);
  const [pOccupation, setpOccupation] = useState(null);
  const [pAddress, setpAddress] = useState(null);

  const [patientAdded, setpatientAdded] = useState(false);
  const [loading, setloading] = useState(false);

  const [changeDetected, setchangeDetected] = useState(false);

  // redux states
  const Patient_Id = useSelector((state) => state.patient.Patient_Id);
  const Patient_Name = useSelector((state) => state.patient.Patient_Name);
  
  const Patient_Age = useSelector((state) => state.patient.Patient_Age);
  const Patient_Gender = useSelector((state) => state.patient.Patient_Gender);
  const Patient_Height = useSelector((state) => state.patient.Patient_Height);
  const Patient_Weight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );
  const Employed = useSelector((state) => state.patient.Employed);
  const Occupation = useSelector((state) => state.patient.Occupation);
  const Address = useSelector((state) => state.patient.Address);

  const handleEmployed = () => {
    setpEmployed(!pEmployed);
  };

  const navigate = useNavigate();

  const getPatient = async () => {
    // console.log(pId);
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
        Patient_Id: Patient_Id,
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
            Assesment: res.data.Assesment,
          })
        );
        setpName(Patient_Name)
        setpAge(Patient_Age)
        setpGender(Patient_Gender)
        setpHt(Patient_Height)
        setpWt(Patient_Weight)
        setpEmployed(Employed)
        setpOccupation(Occupation)
        setpPhone(Patient_Contact_No)
        setpAddress(Address)

      })
      .catch((error) => {
        console.log(error.message);
      });
    
  };
  // notifications
  const notify = (value, text) => {
    // console.log(text);
    if (value == "success") {
      toast.success("Patient Added with ID " + text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (value == "info") {
      toast.info("Patient Details Updated", {
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

  const updatePatientDetails = async (e) => {
    e.preventDefault();
    setchangeDetected(false);
    axios
      .post("https://physioplusbackend.onrender.com/updatePatient", {
        Patient_Id: Patient_Id,
        Patient_Name: pName,
        Patient_Age: pAge,
        Patient_Gender: pGender,
        Patient_Height: pHt,
        Patient_Weight: pWt,
        Patient_Contact_No: pPhone,
        Employed: pEmployed,
        Occupation: pOccupation,
        Address: pAddress,
      })
      .then((res) => {
        console.log(res);
        setloading(false);

        notify("info");
        dispatch(
          patientActions.setPatient({
            Patient_Id: res.data.Patient_Id,
            Patient_Name: pName,
            Patient_Age: pAge,
            Patient_Gender: pGender,
            Patient_Height: pHt,
            Patient_Weight: pWt,
            Patient_Contact_No: pPhone,
            Employed: pEmployed,
            Occupation: pOccupation,
            Address: pAddress,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
        notify("error", error.message);
      });
  };


  useEffect(() => {
    getPatient();
  }, [])
  
  return (
    <>
      <ToastContainer />

      <form className="flex flex-col w-full h-full bg-white p-4 gap-4">
       
        
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <label
              for="PatientID"
              class="block text-xs font-medium text-gray-700"
            >
              Patient ID
            </label>

            <input
              type="text"
              id="PatientID"
              disabled
              value={Patient_Id}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/2">
            <label
              for="PatientName"
              class="block text-xs font-medium text-gray-700"
            >
              Name of Patient
            </label>

            <input
              type="text"
              id="PatientName"
              value={pName}
              onChange={(e) => {
                setpName(e.target.value);
                setchangeDetected(true);
              }}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/4">
            <label
              for="PatientAge"
              class="block text-xs font-medium text-gray-700"
            >
              Age of Patient
            </label>

            <input
              type="number"
              id="PatientAge"
              onChange={(e) => {
                setpAge(e.target.value);
                setchangeDetected(true);
              }}
              value={pAge}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-1/4">
            <label
              for="PatientHeight"
              class="block text-xs font-medium text-gray-700"
            >
              Height of Patient (in CM)
            </label>

            <input
              type="number"
              id="PatientHeight"
              onChange={(e) => {
                setpHt(e.target.value);
                setchangeDetected(true);
              }}
              value={pHt}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/4">
            <label
              for="PatientWeigth"
              class="block text-xs font-medium text-gray-700"
            >
              Weigth of Patient (in KG)
            </label>

            <input
              type="number"
              id="PatientWeigth"
              onChange={(e) => {
                setpWt(e.target.value);
                setchangeDetected(true);
              }}
              value={pWt}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/4">
            <label
              for="PatientPhone"
              class="block text-xs font-medium text-gray-700"
            >
              Phone
            </label>

            <input
              type="text"
              id="PatientPhone"
              onChange={(e) => {
                setpPhone(e.target.value);
                setchangeDetected(true);
              }}
              value={pPhone}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/4">
            <label
              for="PatientGender"
              class="block text-xs font-medium text-gray-700"
            >
              Gender of Patient
            </label>

            <select
              disabled
              value={pGender}
              className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-1/4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pEmployed}
                onChange={(e) => {
                  handleEmployed();
                  setchangeDetected(true);
                }}
              />
              <label className="block text-xs font-medium text-gray-700">
                Employed?
              </label>
            </div>
            <label
              for="PatientOccupation"
              class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 "
            >
              <input
                type="text"
                id="PatientOccupation"
                onChange={(e) => {
                  setpOccupation(e.target.value);
                  setchangeDetected(true);
                }}
                value={pOccupation}
                placeholder="Occupation"
                class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm "
              />

              <span class="absolute left-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Occupation
              </span>
            </label>
          </div>
          <div className="w-3/4">
            <label
              for="PatientAddress"
              class="block text-xs font-medium text-gray-700"
            >
              Address
            </label>

            <input
              type="text"
              id="PatientAddress"
              placeholder="VIT University, Tamil Nadu"
              onChange={(e) => {
                setpAddress(e.target.value);
                setchangeDetected(true);
              }}
              value={pAddress}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 font-bold w-full">
          <button
            onClick={updatePatientDetails}
            className="px-4 py-2 rounded-md shadow-md border bg-orange-500 hover:border-orange-500 hover:bg-transparent text-gray-900 flex items-center gap-2"
          >
            Edit Details of Patient <BiEdit />{" "}
          </button>
        </div>
        {changeDetected && (
          <div className="text-red-400 font-bold text-lg">
            Changes are detected! Please click update details to save the
            changes
          </div>
        )}
      </form>

      {/* <p className="text-3xl text-left font-semibold">Basic Assessment</p> */}
    </>
  );
}

export default EditPatient;
