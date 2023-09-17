import React, { useState } from "react";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function AddPatient() {
  const dispatch = useDispatch();

  // states to add the names
  const [pName, setpName] = useState("");
  const [pAge, setpAge] = useState(20);
  const [pGender, setpGender] = useState("Male");
  const [pHt, setpHt] = useState(160);
  const [pEmail, setpEmail] = useState("");
  const [pPhone, setpPhone] = useState("");
  const [pWt, setpWt] = useState(60);
  const [pEmployed, setpEmployed] = useState(false);
  const [pOccupation, setpOccupation] = useState("");
  const [pAddress, setpAddress] = useState("");

  const [patientAdded, setpatientAdded] = useState(false);
  const [loading, setloading] = useState(false);

  const [fileData, setfileData] = useState(null);

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

  const addBAss = async () => {
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
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate("/receptionist/dashboard/addBasicAssessment/" + Patient_Id);
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

  const createPatient = async (e) => {
    e.preventDefault();
    // setloading(true);
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "newPatient", {
        Patient_Name: pName,
        Patient_Age: pAge,
        Patient_Email: pEmail,
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
        if (res.data.Status) {
          notify("error", res.data.Status);
        } else {
          notify("success", res.data.Patient_Id);
          setpatientAdded(true);

          dispatch(
            patientActions.addPatient({
              Patient_Id: res.data.Patient_Id,
              Patient_Name: pName,
              Patient_Email: pEmail,
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
        }
      })
      .catch((error) => {
        console.log(error.message);
        notify("error", error.message);
      });
  };

  const updatePatientDetails = async (e) => {
    e.preventDefault();
    setchangeDetected(false);
    axios
      .post("https://physioplusbackend.onrender.com/updatePatient", {
        Patient_Id: Patient_Id,
        Patient_Name: pName,
        Patient_Email: pEmail,
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

  const onFileChange = (e) => {
    setfileData(e.target.files[0]);
  };

  const sendPatientFile = async (e) => {
    e.preventDefault();

    if (!fileData) {
      console.error("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOPE_BACKEND}extract_info/`,
        formData
      );

      console.log(response.data.extracted_info);
      setpName(response.data.extracted_info[0].name);
      notify("success", "File Uploaded Successfully");
    } catch (error) {
      console.error(error.message);
      notify("error", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {!patientAdded && (
        <div>
          <form
            onSubmit={createPatient}
            className="flex flex-col w-full h-full bg-white p-4 gap-4"
          >
            <ToastContainer />

            <div className="flex items-center gap-4">
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
                  required
                  value={pName}
                  onChange={(e) => {
                    setpName(e.target.value);
                  }}
                  class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
                />
              </div>
              <div className="w-1/4">
                <label
                  for="PatientEmail"
                  class="block text-xs font-medium text-gray-700"
                >
                  Email of Patient
                </label>

                <input
                  type="text"
                  id="PatientEmail"
                  required
                  value={pEmail}
                  onChange={(e) => {
                    setpEmail(e.target.value);
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
                  required
                  value={pAge}
                  onChange={(e) => {
                    setpAge(e.target.value);
                  }}
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
                  required
                  value={pHt}
                  onChange={(e) => {
                    setpHt(e.target.value);
                  }}
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
                  required
                  value={pWt}
                  onChange={(e) => {
                    setpWt(e.target.value);
                  }}
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
                  value={pPhone}
                  required
                  onChange={(e) => {
                    setpPhone(e.target.value);
                  }}
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
                  value={pGender}
                  onChange={(e) => {
                    setpGender(e.target.value);
                  }}
                  required
                  className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1/4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    required
                    checked={pEmployed}
                    onChange={handleEmployed}
                  />
                  <label className="block text-xs font-medium text-gray-700">
                    Employed?
                  </label>
                </div>
                <label
                  for="PatientOccupation"
                  class="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 disabled:bg-gray-100"
                >
                  <input
                    type="text"
                    disabled={!pEmployed}
                    id="PatientOccupation"
                    value={pOccupation}
                    onChange={(e) => {
                      setpOccupation(e.target.value);
                    }}
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm disabled:bg-gray-100"
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
                  value={pAddress}
                  required
                  onChange={(e) => {
                    setpAddress(e.target.value);
                  }}
                  class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
                />
              </div>
            </div>

            <button
              class="w-1/2  group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500"
              onClick={createPatient}
            >
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
                Add New Patient
              </span>
            </button>

            {/* <p className="text-3xl text-left font-semibold">Basic Assessment</p> */}
          </form>
          <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 mx-4">
            <form onSubmit={sendPatientFile}>
              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={onFileChange}
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div>{fileData?.name}</div>
                <div>{console.log(fileData)}</div>
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                        fill="#3C50E0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                        fill="#3C50E0"
                      />
                    </svg>
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span>{" "}
                    Patient ID Card
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  {/* <p>(max, 800 X 800px)</p> */}
                </div>
              </div>

              <div className="flex justify-end gap-4.5 mt-4">
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray-800 hover:bg-opacity-70"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {patientAdded && (
        <form className="flex flex-col w-full h-full bg-white p-4 gap-4">
          <ToastContainer />
          <div className="text-green-500 font-bold text-xl">
            Patient added with the below details ⬇
          </div>
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
                value={pGender}
                onChange={(e) => {
                  setpGender(e.target.value);
                }}
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
              className="px-4 py-2 rounded-md shadow-md border bg-green-500 hover:border-green-500 hover:bg-transparent text-gray-900 flex items-center gap-2"
              onClick={addBAss}
            >
              Add Basic Assesment <HiOutlineDocumentReport />
            </button>
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
      )}
      {/* <p className="text-3xl text-left font-semibold">Basic Assessment</p> */}
    </>
  );
}

export default AddPatient;
