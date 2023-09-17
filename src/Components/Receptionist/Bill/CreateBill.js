import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { patientActions } from "../../../features/patient/patient-slice";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../features/auth/auth-slice";

function CreateBill() {
  const [isPatient, setisPatient] = useState(false);

  //to change tab no when component comes to focus
  const dispatch = useDispatch();
  const tabNo = useSelector((state) => state.auth.rTabNo);
  dispatch(authActions.setRTabNo(3));

  const navigate = useNavigate();

  const [searchPatientId, setsearchPatientId] = useState(null);

  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const patientWeight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const Patient_Address = useSelector((state) => state.patient.Address);

  const [numberOfDays, setnumberOfDays] = useState(null);
  const [date, setDate] = useState(null);
  const [NormalBillAmount, setNormalBillAmount] = useState(null);

  const [packageProgram, setpackageProgram] = useState(null);
  const [RehabBillAmount, setRehabBillAmount] = useState(null);

  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);

  // to delay the next statement
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // notifications
  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text + patientName, {
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
        Patient_Id: searchPatientId,
      })
      .then((res) => {
        // console.log(res.data);
        if (!res.data.Status) {
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
              Employed: res.data.Employed,
              Occupation: res.data.Occupation,
              Address: res.data.Address,
              Assesment: res.data.Assessment,
              Assesment: res.data.Assessment,
            })
          );
          notify("success", "Fetched patient ");
        } else {
          setisPatient(false);
          notify("error", "Wrong Patient ID or Patient does not exist");
        }
      })
      .catch((error) => {
        // console.log(error.message);
        notify(error.message);
      });
  };

  const makeNormalBill = async (e) => {
    e.preventDefault();
    setloading1(true);
    axios
      .post(
        process.env.REACT_APP_HOPE_BACKEND + "GetNormalBill",
        {
          Patient_Id: patientID,
          date: date,
          name: patientName,
          address: Patient_Address,
          cell_no: Patient_Contact_No,
          no_days: numberOfDays,
          amount_paid: NormalBillAmount,
        },
        {
          resType: "blob", // Set the res type to 'blob' to receive binary data
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (!res.data.Status) {
          // Create a Blob from the res data
          const pdfBlob = new Blob([res.data], {
            type: "application/pdf",
          });

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(pdfBlob);

          // Create a temporary <a> element to trigger the download
          const tempLink = document.createElement("a");
          tempLink.href = url;
          tempLink.setAttribute(
            "download",
            `normal_bill_${patientID}_${date}.pdf`
          ); // Set the desired filename for the downloaded file

          // Append the <a> element to the body and click it to trigger the download
          document.body.appendChild(tempLink);
          tempLink.click();

          // Clean up the temporary elements and URL
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(url);
          notify("success", "Normal Bill Made for ");
          setloading1(false);
        } else {
          setloading1(false);
          notify("error", "Bill not made for ");
        }
      })
      .catch((error) => {
        // console.log(error.message);
        notify(error.message);
      });
  };

  const makeRehabBill = async (e) => {
    e.preventDefault();
    setloading2(true);
    axios
      .post(
        process.env.REACT_APP_HOPE_BACKEND + "GetRehabBill",
        {
          Patient_Id: patientID,
          date: date,
          name: patientName,
          address: Patient_Address,
          cell_no: Patient_Contact_No,
          package_program: packageProgram,
          amount_paid: RehabBillAmount,
        },
        {
          resType: "blob", // Set the res type to 'blob' to receive binary data
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (!res.data.Status) {
          // Create a Blob from the res data
          const pdfBlob = new Blob([res.data], {
            type: "application/pdf",
          });

          // Create a temporary URL for the Blob
          const url = window.URL.createObjectURL(pdfBlob);

          // Create a temporary <a> element to trigger the download
          const tempLink = document.createElement("a");
          tempLink.href = url;
          tempLink.setAttribute(
            "download",
            `rehab_bill_${patientID}_${date}.pdf`
          ); // Set the desired filename for the downloaded file

          // Append the <a> element to the body and click it to trigger the download
          document.body.appendChild(tempLink);
          tempLink.click();

          // Clean up the temporary elements and URL
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(url);
          setloading2(false);
          notify("success", "Rehab Bill Made for ");
          //   navigate("/receptionist/dashboard/viewPatient/" + patientID);
        } else {
          setloading2(false);
          notify("error", "Bill not made for ");
        }
      })
      .catch((error) => {
        // console.log(error.message);
        notify(error.message);
      });
  };
  return (
    <div className="flex flex-col w-full h-full ">
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
              value={searchPatientId}
              onChange={(e) => {
                setsearchPatientId(e.target.value.toUpperCase());
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
          <div className="w-full flex flex-wrap items-start gap-4">
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

      <div className="flex w-full p-4 gap-4">
        {isPatient && (
          <form
            onSubmit={makeNormalBill}
            className="flex flex-col w-1/2 h-full bg-gray-100 rounded-md p-4 gap-4"
          >
            <div className="w-full">
              <label
                htmlFor="date"
                class="block text-xs font-medium text-gray-700"
              >
                Date of Assessment for which bill is to be made
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="numberOfDays"
                class="block text-xs font-medium text-gray-700"
              >
                Number of Days
              </label>
              <input
                type="number"
                id="numberOfDay"
                value={numberOfDays}
                onChange={(e) => {
                  setnumberOfDays(Number(e.target.value));
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="NormalBillAmount"
                class="block text-xs font-medium text-gray-700"
              >
                Normal Bill Amount
              </label>
              <input
                type="number"
                id="numberOfDay"
                value={NormalBillAmount}
                onChange={(e) => {
                  setNormalBillAmount(Number(e.target.value));
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <input
              type="submit"
              value="Create Normal Bill"
              className="w-full mt-2 cursor-pointer px-4 py-2 text-white font-medium bg-orange-400 hover:bg-primary active:bg-primary rounded-lg duration-150"
            />
            {loading1 && (
              <img
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                width="30px"
              />
            )}
          </form>
        )}
        {isPatient && (
          <form
            onSubmit={makeRehabBill}
            className="flex flex-col w-1/2 h-full bg-gray-100 rounded-md p-4 gap-4"
          >
            <div className="w-full">
              <label
                htmlFor="date"
                class="block text-xs font-medium text-gray-700"
              >
                Date of Assessment for which bill is to be made
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="packageProgram"
                class="block text-xs font-medium text-gray-700"
              >
                Package Progam
              </label>
              <input
                type="text"
                id="packageProgram"
                value={packageProgram}
                onChange={(e) => {
                  setpackageProgram(e.target.value);
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="RehabBillAmount"
                class="block text-xs font-medium text-gray-700"
              >
                Rehab Bill Amount
              </label>
              <input
                type="number"
                id="numberOfDay"
                value={RehabBillAmount}
                onChange={(e) => {
                  setRehabBillAmount(Number(e.target.value));
                }}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <input
              type="submit"
              value="Create Rehab Bill"
              className="w-full mt-2 cursor-pointer px-4 py-2 text-white font-medium bg-purple-600 hover:bg-primary active:bg-primary rounded-lg duration-150"
            />
            {loading2 && (
              <img
                src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                width="30px"
              />
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateBill;
