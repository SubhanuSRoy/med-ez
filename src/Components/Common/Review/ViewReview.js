import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { patientActions } from "../../../features/patient/patient-slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

function ViewReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { DateOfReview } = useParams();

  const userType = useSelector((state) => state.auth.userType);
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

  const [formData, setFormData] = useState({
    reviewType: "",
    reviewDesc: "",
    reviewDate: currDate,
    srDocNote: "",
    addedBy: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // notifications
  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text + patientID, {
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
  const getReview = async () => {
    axios
      .post("https://physioplusbackend.onrender.com/ViewReview", {
        Patient_Id: patientID,
        DateOfReview: DateOfReview,
      })
      .then((res) => {
        console.log(res.data);
        setFormData({
          reviewType: res.data.TypeOfReview,
          reviewDesc: res.data.Description,
          reviewDate: res.data.DateOfReview,
          srDocNote: res.data.srDocNote,
          addedBy: res.data.AddedBy,
        });
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };
  useEffect(() => {
    getReview();
  }, []);

  const updateReview = async (e) => {
    e.preventDefault();

    axios
      .post("https://physioplusbackend.onrender.com/UpdateReview", {
        Patient_Id: patientID,
        DateOfReview: formData.reviewDate,
        srDocNote: formData.srDocNote,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Status) {
          notify("success", "Closed review for ");
        } else {
          notify("error", "Can't delete review");
        }
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });

    navigate("/srDoctor/dashboard");
  };

  const viewPatient = () => {
    if (userType == "Senior Doctor") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: patientID,
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
      navigate("/srDoctor/dashboard/viewPatient/" + patientID);

    } else if (userType == "Junior Doctor") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: patientID,
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
      navigate("/jrDoctor/dashboard/viewPatient/" + patientID);
    }
    else if (userType == "Trainer") {
      axios
        .post(process.env.REACT_APP_HOPE_BACKEND + "viewPatient", {
          Patient_Id: patientID,
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
      navigate("/trainer/dashboard/viewPatient/" + patientID);
    }

  };

  return (
    <div className="flex flex-col w-full h-full bg-white p-4 gap-4">
      <ToastContainer />
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
      <form className="flex flex-col gap-2" onSubmit={updateReview}>
        <div className="w-full">
          <label class="block text-xs font-medium text-gray-700 mb-2">
            {formData.addedBy} Note
          </label>

          <textarea
            name="reviewDesc"
            disabled
            value={formData.reviewDesc}
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
        <div className="w-full">
          <label class="block text-xs font-medium text-gray-700 mb-2">
            Senior Doctor Note
          </label>

          <textarea
            name="srDocNote"
            value={formData.srDocNote}
            required
            onChange={handleChange}
            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
        <div className="flex items-center gap-4">
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
              disabled
              placeholder="13-04-2023"
              name="reviewDate"
              value={formData.reviewDate}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/2">
            <label
              for="Review Type"
              class="block text-xs font-medium text-gray-700"
            >
              Review Type
            </label>
            <input
              id="type"
              name="reviewType"
              disabled
              value={formData.reviewType}
              className="w-full rounded-md shadow-sm sm:text-sm outline-none p-2 "
            />
          </div>
          {userType == "Senior Doctor" && (
            <button class="w-full  group relative inline-flex items-center overflow-hidden rounded bg-red-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-red-500">
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
                Close Review
              </span>
            </button>
          )}
          {userType == "Senior Doctor" && (
            <p className="text-xs text-gray-600">
              Once closed, it cannot be reopened. The Junior Doctor has to add
              another review.
            </p>
          )}
        </div>
      </form>
      <button
        className="w-full p-4 rounded-md text-lg shadow-md border bg-violet-500 hover:border-violet-500 hover:bg-transparent text-gray-100 hover:text-gray-800 flex items-center justify-center gap-2"
        onClick={viewPatient}
      >
        View Patient <CgProfile />{" "}
      </button>
    </div>
  );
}

export default ViewReview;
