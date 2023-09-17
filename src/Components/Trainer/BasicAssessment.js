import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


function BasicAssessment({ pDOA }) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const Patient_Gender = useSelector((state) => state.patient.Patient_Gender);
  const Patient_Height = useSelector((state) => state.patient.Patient_Height);
  const Patient_Weight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const [formData, setFormData] = useState({
    Diagnosis: "",
    TreatmentGiven: "",
    Package: "",
    FollowUp: "",
    ReviewDate: "",
    Contradiction: "",
    Category: "Beginner",
    InvestigationDone: "",
    TargetingMuscle: "",
    TargetingJoint: "",
    PainScale: "",
    AssessmentDoneBy: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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
    } else if (value == "info") {
      toast.info(text, {
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

  const AddBasicAssessment = async (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND +"trainer/AddPatientBasic", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        Patient_Name: patientName,
        Patient_Age: patientAge,
        Patient_Gender:  Patient_Gender,
        Patient_Height: Patient_Height,
        Patient_Weight: Patient_Weight,
        Patient_Contact_No: Patient_Contact_No,
        Diagnosis: formData.Diagnosis,
        TreatmentGiven: formData.TreatmentGiven,
        Package: formData.Package,
        FollowUp: formData.FollowUp,
        ReviewDate: formData.ReviewDate,
        Contradiction: formData.Contradiction,
        Category: formData.Category,
        InvestigationDone: formData.InvestigationDone,
        TargetingMuscle: formData.TargetingMuscle,
        TargetingJoint: formData.TargetingJoint,
        PainScale: formData.PainScale,
        AssessmentDoneBy: formData.AssessmentDoneBy,
      })
      .then((response) => {
        console.log(response);
        {
          console.log(response.data.Status);
          if(response.data.Status=="successful")
          {
            notify("success", "Basic Assessment Added for ");
          }
          else notify("error", "2 Assessments cannot be added for same day ")
        }
       
      })
      .catch((error) => {
        console.log(error.message);
        notify("error",error.message);
      });
  };

  return (
    <form
      className="flex flex-col w-full h-full p-4 bg-white gap-4"
      onSubmit={AddBasicAssessment}
    >
      <ToastContainer />
      
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Diagnosis"
            className="block text-xs font-medium text-gray-700"
          >
            Diagnosis
          </label>

          <input
            type="text"
            name="Diagnosis"
            id="Diagnosis"
            required
            value={formData.Diagnosis}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="TreatmentGiven"
            className="block text-xs font-medium text-gray-700"
          >
            Treatment Given
          </label>

          <input
            type="date"
            name="TreatmentGiven"
            id="TreatmentGiven"
            required
            value={formData.TreatmentGiven}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Package"
            className="block text-xs font-medium text-gray-700"
          >
            Package
          </label>

          <input
            type="text"
            name="Package"
            id="Package"
            required
            value={formData.Package}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="FollowUp"
            className="block text-xs font-medium text-gray-700"
          >
            FollowUp
          </label>

          <input
            type="text"
            name="FollowUp"
            id="FollowUp"
            required
            value={formData.FollowUp}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="ReviewDate"
            className="block text-xs font-medium text-gray-700"
          >
            ReviewDate
          </label>

          <input
            type="date"
            name="ReviewDate"
            id="ReviewDate"
            required
            value={formData.ReviewDate}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="Contradiction"
            className="block text-xs font-medium text-gray-700"
          >
            Contradiction
          </label>

          <input
            type="text"
            name="Contradiction"
            id="Contradiction"
            required
            value={formData.Contradiction}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label for="Category" class="block text-xs font-medium text-gray-700">
            Category
          </label>

          <select
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            required
            className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
          >
            <option>Beginner</option>
            <option>Moderate</option>
            <option>Active</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Investigation Done
          </label>

          <input
            type="text"
            name="InvestigationDone"
            id="InvestigationDone"
            required
            value={formData.InvestigationDone}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Targeting Muscle
          </label>

          <input
            type="text"
            name="TargetingMuscle"
            id="TargetingMuscle"
            required
            value={formData.TargetingMuscle}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Targeting Joint
          </label>

          <input
            type="text"
            name="TargetingJoint"
            id="TargetingJoint"
            required
            value={formData.TargetingJoint}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Pain Scale
          </label>

          <input
            type="text"
            name="PainScale"
            id="PainScale"
            required
            value={formData.PainScale}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700">
            Assessment Done By
          </label>

          <input
            type="text"
            name="AssessmentDoneBy"
            id="AssessmentDoneBy"
            required
            value={formData.AssessmentDoneBy}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="w-full"></div>

      <button class="w-full  group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500">
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
          Add Basic Assessment
        </span>
      </button>
    </form>
  );
}

export default BasicAssessment;
