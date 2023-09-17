import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import videos from "../../../Data/exVideos";
import { BsPlusCircleFill } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";

function Prescribe({ pDOA }) {
  const [chosenVideoLink, setChosenVideoLink] = useState(null);

  const handleVideoClick = (link) => {
    setChosenVideoLink(link);
  };

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  // const [ass, setAss] = useState({});

  // assessment
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const patientWeight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const [cols, setCols] = useState([]);

  const [formData, setFormData] = useState({
    diagnosis: "",
    reviewNext: "",
    treatmentPlan: "",
    numberOfDays: 0,
    contraindication: "",
    followUp: "",
    homeAdvice: "",
  });

  const [genPrescription,setgenPrescription] = useState("")

  const handleChange = (event) => {
    console.log(event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData.exercise);
  };

  const notify = (value, text) => {
    if (value == "success") {
      toast.success(text, {
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
      toast.error("Error: " + value, {
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

  const AddPrescription = async (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/TreatmentPrescription", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        diagnosis: formData.diagnosis,
        reviewNext: formData.reviewNext,
        treatmentPlan: formData.treatmentPlan,
        numberOfDays: formData.numberOfDays,
        contraindication: formData.contraindication,
        followUp: formData.followUp,
        homeAdvice: formData.homeAdvice,
        exercises: cols,
      })
      .then((response) => {
        console.log(response);
        notify("success", "Prescription Added Successfully for " + patientName);
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  //dyanimc tables
  const handleColumnChange = (event, index, field) => {
    const updatedCols = [...cols];
    updatedCols[index] = {
      ...updatedCols[index],
      [field]: event.target.value,
    };

    setCols(updatedCols);
  };
  const handleAddColumn = () => {
    const newColumn = {
      SrNo: cols.length + 1,
      NameOfExercise: "",
      Reps: 0,
      Sets: 0,
      NoOfDays: 0,
      NextReview: "",
    };
    setCols([...cols, newColumn]);
  };

  const generatePrescription = () => {
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND + "generate_prescription/", {
        patient_id: patientID,
        DateOfAssessment: pDOA,
      })
      .then((response) => {
        console.log(response);
        setgenPrescription(response.data);
        notify(
          "success",
          "Prescription Generatred based on General Assessment for " +
            patientName
        );
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  useEffect(() => {
    generatePrescription();
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-4 bg-white">
      <ToastContainer />
      <form className=" gap-4" onSubmit={AddPrescription}>
       <pre className="p-4 border-md">{genPrescription}</pre>
        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <label
              htmlFor="diagnosis"
              className="block text-xs font-medium text-gray-700"
            >
              Diagnosis
            </label>

            <input
              type="text"
              name="diagnosis"
              id="diagnosis"
              required
              value={formData.diagnosis}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="reviewNext"
              className="block text-xs font-medium text-gray-700"
            >
              Review Next
            </label>

            <input
              type="date"
              name="reviewNext"
              id="reviewNext"
              required
              value={formData.reviewNext}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <label
              htmlFor="treatmentPlan"
              className="block text-xs font-medium text-gray-700"
            >
              Treatment Plan
            </label>

            <input
              type="text"
              name="treatmentPlan"
              id="treatmentPlan"
              required
              value={formData.treatmentPlan}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="numberOfDays"
              className="block text-xs font-medium text-gray-700"
            >
              Number of Days
            </label>

            <input
              type="number"
              name="numberOfDays"
              id="numberOfDays"
              required
              value={formData.numberOfDays}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-1/2">
            <label
              htmlFor="contraindication"
              className="block text-xs font-medium text-gray-700"
            >
              Contraindication
            </label>

            <input
              type="text"
              name="contraindication"
              id="contraindication"
              required
              value={formData.contraindication}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="followUp"
              className="block text-xs font-medium text-gray-700"
            >
              Follow Up
            </label>

            <input
              type="text"
              name="followUp"
              id="followUp"
              required
              value={formData.followUp}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700">
            Home Advice
          </label>

          <input
            type="text"
            name="homeAdvice"
            id="homeAdvice"
            required
            value={formData.homeAdvice}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-full flex flex-col items-center my-4">
          <div className="flex items-center gap-4 text-3xl font-bold">
            <p>Exercises</p>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleAddColumn}
            >
              <BsPlusCircleFill />
              <p className="text-sm text-gray-700">Add New Exercise</p>
            </div>
          </div>
          {cols?.map((day, index) => {
            return (
              <div key={index} className="flex items-center gap-2 w-full my-2">
                <div className="w-1/8">
                  <label class="block text-xs font-medium text-gray-700">
                    Sr No
                  </label>
                  <input
                    type="number"
                    id="date"
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
                    value={day.NameOfExercise}
                    onChange={(e) =>
                      handleColumnChange(e, index, "NameOfExercise")
                    }
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
                    value={day.Reps}
                    onChange={(e) => handleColumnChange(e, index, "Reps")}
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
                    value={day.Sets}
                    onChange={(e) => handleColumnChange(e, index, "Sets")}
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
                    value={day.NoOfDays}
                    onChange={(e) => handleColumnChange(e, index, "NoOfDays")}
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
                    value={day.NextReview}
                    onChange={(e) => handleColumnChange(e, index, "NextReview")}
                    class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-2 border-2"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          class="w-full my-4 group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500"
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
            Prescribe
          </span>
        </button>
      </form>
      <div className="flex flex-wrap gap-2 my-4 bg-yellow-100 rounded-md p-2">
        {Object.entries(videos).map(([topic, exercises]) => (
          <details
            key={topic}
            className="flex flex-col space-y-2 max-h-64 overflow-y-auto"
          >
            <summary className="text-lg font-semibold">{topic}</summary>
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 max-w-[15rem] bg-yellow-50 rounded-md p-2"
              >
                <p className="flex-grow whitespace-pre-wrap">
                  {exercise.Title}
                </p>
                <button
                  className="px-2 py-1 text-white bg-purple-500 rounded"
                  onClick={() => handleVideoClick(exercise.Link)}
                >
                  Watch
                </button>
                <CopyToClipboard
                  text={exercise.Title}
                  onCopy={() => notify("success", exercise.Title + " copied")}
                >
                  <button>
                    <AiOutlineCopy />
                  </button>
                </CopyToClipboard>
              </div>
            ))}
          </details>
        ))}
      </div>

      {chosenVideoLink && (
        <iframe
          src={chosenVideoLink}
          width="100%"
          height="500px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        ></iframe>
      )}
    </div>
  );
}

export default Prescribe;
