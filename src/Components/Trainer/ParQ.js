import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ParQ({ pDOA, prefilledData }) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);

  const questions = [
    "Has your doctor ever said that you have a heart condition or high blood pressure?",
    "Do you feel pain in your chest at rest, during your daily activities of living, or when you do physical activity?",
    "Do you lose balance because of dizziness or have you lost consciousness in the last 12 months?",
    "Have you ever been diagnosed with another chronic medical condition (other than heart disease or high blood pressure)?",
    "Are you currently taking prescribed medications for a chronic medical condition?",
    "Do you currently have (or have had within the past 12 months) a bone, joint, or soft tissue problem that could be made worse by becoming more physically active?",
    "Has your doctor ever said that you should only do medically supervised physical activity?",
    "Participant declaration (to be signed)",
    "Do you have arthritis, osteoporosis, or back problems?",
    "Do you have difficulty controlling your condition with medications or other physician-prescribed therapies?",
    "Do you have joint problems causing pain, a recent fracture or fracture caused by osteoporosis or cancer, displaced vertebra, and/or spondylolysis/pars defect?",
    "Have you had steroid injections or taken steroid tablets regularly for more than 3 months?",
    "Do you currently have cancer of any kind?",
    "Does your cancer diagnosis include any of the following types: lung/bronchogenic, multiple myeloma, head, and/or neck?",
    "Are you currently receiving cancer therapy (such as chemotherapy or radiotherapy)?",
    "Do you have a heart or cardiovascular condition?",
    "Do you have difficulty controlling your condition with medications or other physician-prescribed therapies?",
    "Do you have an irregular heart beat that requires medical management?",
    "Do you have chronic heart failure?",
    "Do you have diagnosed coronary artery (cardiovascular) disease and have not participated in regular physical activity in the last 2 months?",
    "Do you have high blood pressure?",
    "Do you have difficulty controlling your high blood pressure with medications or other physician-prescribed therapies?",
    "Do you have a resting blood pressure equal to or greater than 160/90 mmHg with or without medication?",
    "Do you have any metabolic conditions such as Type 1 Diabetes, Type 2 Diabetes, or Pre-Diabetes?",
    "Do you often have difficulty controlling your blood sugar levels with foods, medications, or other physician-prescribed therapies?",
    "Do you often suffer from signs and symptoms of low blood sugar (hypoglycemia) following exercise and/or during activities of daily living?",
    "Do you have any signs or symptoms of diabetes complications such as heart or vascular disease and/or complications affecting your eyes, kidneys, or the sensation in your toes and feet?",
    "Do you have other metabolic conditions such as current pregnancy-related diabetes, chronic kidney disease, or liver problems?",
    "Are you planning to engage in unusually high (or vigorous) intensity exercise in the near future?",
    "Do you have any mental health problems or learning difficulties such as Alzheimer's, Dementia, Depression, Anxiety Disorder, Eating Disorder, Psychotic Disorder, Intellectual Disability, or Down Syndrome?",
    "Do you have difficulty controlling your mental health condition with medications or other physician-prescribed therapies?",
    "Do you have Down Syndrome and back problems affecting nerves or muscles?",
    "Do you have a respiratory disease such as Chronic Obstructive Pulmonary Disease, Asthma, or Pulmonary High Blood Pressure?",
    "Do you have difficulty controlling your respiratory condition with medications or other physician-prescribed therapies?",
    "Has your doctor ever said your blood oxygen level is low at rest or during exercise and/or that you require supplemental oxygen therapy?",
    "If asthmatic, do you currently have symptoms of chest tightness, wheezing, labored breathing, or a consistent cough?",
    "Has your doctor ever said you have high blood pressure in the blood vessels of your lungs?",
    "Do you have a Spinal Cord Injury, including Tetraplegia and Paraplegia?",
    "Do you have difficulty controlling your spinal cord injury condition with medications or other physician-prescribed therapies?",
    "Do you commonly exhibit low resting blood pressure significant enough to cause dizziness, light-headedness, and/or fainting?",
    "Has your physician indicated that you exhibit sudden bouts of high blood pressure (known as Autonomic Dysreflexia)?",
    "Have you had a Stroke, including Transient Ischemic Attack (TIA) or Cerebrovascular Event?",
    "Do you have difficulty controlling your stroke condition with medications or other physician-prescribed therapies?",
    "Do you have any impairment in walking or mobility?",
    "Have you experienced a stroke or impairment in nerves or muscles in the past 6 months?",
    "Do you have any other medical condition not listed above or do you have two or more medical conditions?",
    "Have you experienced a blackout, fainted, or lost consciousness as a result of a head injury within the last 12 months or had a diagnosed concussion within the last 12 months?",
    "Do you have a medical condition that is not listed (such as epilepsy, neurological conditions, kidney problems)?",
    "Do you currently live with two or more medical conditions?",
  ];
  const [formData, setFormData] = useState(
    prefilledData
      ? prefilledData
      : {
          general_health_q1: "NO",
          general_health_q2: "NO",
          general_health_q3: "NO",
          general_health_q4: "NO",
          general_health_q5: "NO",
          general_health_q6: "NO",
          general_health_q7: "NO",
          general_health_q8: "NO",
          general_health_q9: "NO",
          general_health_q10: "NO",
          general_health_q11: "NO",
          general_health_q12: "NO",
          general_health_q13: "NO",
          general_health_q14: "NO",
          general_health_q15: "NO",
          general_health_q16: "NO",
          general_health_q17: "NO",
          general_health_q18: "NO",
          general_health_q19: "NO",
          general_health_q20: "NO",
          general_health_q21: "NO",
          general_health_q22: "NO",
          general_health_q23: "NO",
          general_health_q24: "NO",
          general_health_q25: "NO",
          general_health_q26: "NO",
          general_health_q27: "NO",
          general_health_q28: "NO",
          general_health_q29: "NO",
          general_health_q30: "NO",
          general_health_q31: "NO",
          general_health_q32: "NO",
          general_health_q33: "NO",
          general_health_q34: "NO",
          general_health_q35: "NO",
          general_health_q36: "NO",
          general_health_q37: "NO",
          general_health_q38: "NO",
          general_health_q39: "NO",
          general_health_q40: "NO",
          general_health_q41: "NO",
          general_health_q42: "NO",
          general_health_q43: "NO",
          general_health_q44: "NO",
          general_health_q45: "NO",
          general_health_q46: "NO",
          general_health_q47: "NO",
          general_health_q48: "NO",
          general_health_q49: "NO",
        }
  );

  // The participant is cleared for physical activity if the answer to all general health questions is NO
  const isClearedForPhysicalActivity = Object.values(formData)
    .filter((value, index) => index < 7) // Select the first 7 general health questions
    .every((answer) => answer === "NO");

  // Usage: isClearedForPhysicalActivity will be true if all general health questions are answered with NO

  const handleChange = (event) => {
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
      toast.info(text + patientName, {
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

  const AddPARQAssessment = async (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/trainer/PARQ_Assessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        general_health_q1: formData.general_health_q1,
        general_health_q2: formData.general_health_q2,
        general_health_q3: formData.general_health_q3,
        general_health_q4: formData.general_health_q4,
        general_health_q5: formData.general_health_q5,
        general_health_q6: formData.general_health_q6,
        general_health_q7: formData.general_health_q7,
        general_health_q8: formData.general_health_q8,
        general_health_q9: formData.general_health_q9,
        general_health_q10: formData.general_health_q10,
        general_health_q11: formData.general_health_q11,
        general_health_q12: formData.general_health_q12,
        general_health_q13: formData.general_health_q13,
        general_health_q14: formData.general_health_q14,
        general_health_q15: formData.general_health_q15,
        general_health_q16: formData.general_health_q16,
        general_health_q17: formData.general_health_q17,
        general_health_q18: formData.general_health_q18,
        general_health_q19: formData.general_health_q19,
        general_health_q20: formData.general_health_q20,
        general_health_q21: formData.general_health_q21,
        general_health_q22: formData.general_health_q22,
        general_health_q23: formData.general_health_q23,
        general_health_q24: formData.general_health_q24,
        general_health_q25: formData.general_health_q25,
        general_health_q26: formData.general_health_q26,
        general_health_q27: formData.general_health_q27,
        general_health_q28: formData.general_health_q28,
        general_health_q29: formData.general_health_q29,
        general_health_q30: formData.general_health_q30,
        general_health_q31: formData.general_health_q31,
        general_health_q32: formData.general_health_q32,
        general_health_q33: formData.general_health_q33,
        general_health_q34: formData.general_health_q34,
        general_health_q35: formData.general_health_q35,
        general_health_q36: formData.general_health_q36,
        general_health_q37: formData.general_health_q37,
        general_health_q38: formData.general_health_q38,
        general_health_q39: formData.general_health_q39,
        general_health_q40: formData.general_health_q40,
        general_health_q41: formData.general_health_q41,
        general_health_q42: formData.general_health_q42,
        general_health_q43: formData.general_health_q43,
        general_health_q44: formData.general_health_q44,
        general_health_q45: formData.general_health_q45,
        general_health_q46: formData.general_health_q46,
        general_health_q47: formData.general_health_q47,
        general_health_q48: formData.general_health_q48,
        general_health_q49: formData.general_health_q49,
      })
      .then((res) => {
        console.log(res);
        notify("success", "PARQPlus Assessment Added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  if (prefilledData) {
    return (
      <div className="flex flex-col w-full h-full p-4 bg-white">
        <div className="flex flex-col text-sm gap-4 mb-4">
          {questions.map((question, index) => (
            <div
              className="flex flex-row gap-4 border border-gray-400"
              key={index}
            >
              <div className="w-11/12 p-2 ">{question}</div>
              <div className="w-1/12 p-2 ">
                {formData[`general_health_q${index + 1}`]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <form
        className="flex flex-col w-full h-full p-4 bg-white"
        onSubmit={AddPARQAssessment}
      >
        <ToastContainer />
        <div className="flex flex-col text-sm gap-4 mb-4">
          {questions.map((question, index) => (
            <div
              className="flex flex-row gap-4 border border-gray-400"
              key={index}
            >
              <div className="w-4/5 p-4 ">{question}</div>
              <div className="w-1/5 p-2 ">
                <select
                  id={`general_health_q${index + 1}`}
                  name={`general_health_q${index + 1}`}
                  value={formData[`general_health_q${index + 1}`]}
                  onChange={handleChange}
                  className="w-full rounded-md shadow-sm sm:text-sm outline-none p-2 "
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
              </div>
            </div>
          ))}
        </div>
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
            Update PARQ Assessment
          </span>
        </button>
      </form>
    );
  }
}

export default ParQ;
