import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from "react-toastify";
import { patientActions } from "../../../features/patient/patient-slice";

function AddBasicAssessment() {

  const dispatch = useDispatch();

  // code to get curretn date
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  // const [ass, setAss] = useState({});

  // assessment
  const [pDOA, setpDOA] = useState(date);
  // injury date
  const [pDOI, setpDOI] = useState(null);
  // sugery date
  const [pDOS, setpDOS] = useState(null);
  // thrapy date
  const [pDOT, setpDOT] = useState(null);
  const [pComplaint, setpComplaint] = useState(null);
  const [pInjury, setpInjury] = useState(null);
  const [pInjuryDesc, setpInjuryDesc] = useState(null);
  const [pTherapy, setpTherapy] = useState(null);

  const [currCondtion, setcurrCondtion] = useState("Worse");
  const [currSymptoms, setcurrSymptoms] = useState("Constant");
  const [painRating, setpainRating] = useState(5);
  const [surgicalHistory, setsurgicalHistory] = useState(null);
  const [reffDoc, setreffDoc] = useState(null);
  const [makesBetter, setmakesBetter] = useState([]);
  const [makesWorse, setmakesWorse] = useState([]);
  const [prevMedInsp, setprevMedInsp] = useState([]);
  const [medInfo, setmedInfo] = useState([]);
  const [endGoals, setendGoals] = useState(null);
  const [medications, setmedications] = useState(null);
  const [anyOtherInfo, setanyOtherInfo] = useState(null);
  const [allergies, setallergies] = useState(null);

  const params = useParams();
  // const userID = params.userID

  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientAge = useSelector((state) => state.patient.Patient_Age);
  const patientWeight = useSelector((state) => state.patient.Patient_Weight);
  const Patient_Contact_No = useSelector(
    (state) => state.patient.Patient_Contact_No
  );

  const worstOptions = [
    { value: "Bending", label: "Bending" },
    { value: "Sitting", label: "Sitting" },
    {
      value: "Rising",
      label: "Rising",
    },
    {
      value: "Prolonged Positioning",
      label: "Prolonged Positioning",
    },
    { value: "Worse as day progresses", label: "Worse as day progresses" },
    { value: "Movement", label: "Movement" },
    { value: "Standing", label: "Standing" },
    { value: "Walking", label: "Walking" },
    { value: "Lying", label: "Lying" },
    { value: "N/A Cast Just Removed", label: "N/A Cast Just Removed" },
    { value: "Rest", label: "Rest" },
    { value: "Stairs", label: "Stairs" },
    { value: "Cough", label: "Cough" },
    { value: "Worse In AM", label: "Worse In AM" },
    { value: "Sneeze", label: "Sneeze" },
    { value: "Deep Breath", label: "Deep Breath" },
    { value: "Medication", label: "Medication" },
    { value: "Worse in PM", label: "Worse in PM" },
  ];

  const betterOptions = [
    { value: "Bending", label: "Bending" },
    { value: "Sitting", label: "Sitting" },
    { value: "Rising", label: "Rising" },
    { value: "Changing Positions", label: "Changing Positions" },
    { value: "Movement", label: "Movement" },
    { value: "Rest", label: "Rest" },
    { value: "Standing", label: "Standing" },
    { value: "Walking", label: "Walking" },
    { value: "Lying", label: "Lying" },
    { value: "Heat", label: "Heat" },
    { value: "Ice", label: "Ice" },
    { value: "Medication", label: "Medication" },
    { value: "Better In Am", label: "Better In Am" },
    { value: "Better as Day Progresses", label: "Better as Day Progresses" },
    { value: "Better in PM", label: "Better in PM" },
    { value: "N/A Cast Just Remove", label: "N/A Cast Just Remove" },
  ];

  const prevMedInt = [
    { value: "X Ray MRI", label: "X Ray MRI" },
    { value: "CatScan", label: "CatScan" },
    { value: "Injections", label: "Injections" },
  ];

  const medInfoOptions = [
    { value: "Difficulty Swallowing", label: "Difficulty Swallowing" },
    { value: "Arthritis", label: "Arthritis" },
    { value: "High Blood Pressure", label: "High Blood Pressure" },
    { value: "Heart Trouble", label: "Heart Trouble" },
    { value: "Pacemaker", label: "Pacemaker" },
    { value: "Epilepsy/Seizures", label: "Epilepsy/Seizures" },
    { value: "History of Drug Abuse", label: "History of Drug Abuse" },
    { value: "Myofascial Pain", label: "Myofascial Pain" },
    { value: "Cancer", label: "Cancer" },
    { value: "Motion Sickness", label: "Motion Sickness" },
    { value: "Fever/Chills/Sweats", label: "Fever/Chills/Sweats" },
    { value: "Unexplainable Weight Loss", label: "Unexplainable Weight Loss" },
    { value: "Blood Clots", label: "Blood Clots" },
    { value: "Shortness of Breath", label: "Shortness of Breath" },
    { value: "History of Smoking", label: "History of Smoking" },
    { value: "Diabetes", label: "Diabetes" },
    { value: "Fibromyalgia", label: "Fibromyalgia" },
    { value: "Stroke", label: "Stroke" },
    { value: "Osteoporous", label: "Osteoporous" },
    { value: "Anemia", label: "Anemia" },
    { value: "Bleeding Problem", label: "Bleeding Problem" },
    { value: "HIV/Hepatitis", label: "HIV/Hepatitis" },
    { value: "History of Alcohol Abuse", label: "History of Alcohol Abuse" },
    { value: "Depression/Anxiety", label: "Depression/Anxiety" },
    { value: "Pregnancy", label: "Pregnancy" },
  ];

  const handleMakesWorse = (selectedOption) => {
    console.log("Makes Worse:", selectedOption);
    setmakesWorse(selectedOption);
  };
  const handleMakesBetter = (selectedOption) => {
    console.log("Makes Better:", selectedOption);
    setmakesBetter(selectedOption);
  };
  const handlePrevMedInsps = (selectedOption) => {
    console.log("Prev Med Inspection:", selectedOption);
    setprevMedInsp(selectedOption);
  };
  const handleMedInfo = (selectedOption) => {
    console.log("Med Info", selectedOption);
    setmedInfo(selectedOption);
  };

  // notifications
  const notify = (value) => {
    if (value == "success") {
      toast.success("Basic Assessment added for " + patientName, {
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

  const navigate = useNavigate();

  // to delay the next statement
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // when form is submitted
  const AddBasicAssessment = async (e) => {
    e.preventDefault();
    // setloading(true);
    console.log({
      Date: pDOA,
      Complaint: pComplaint,
      Injury: pInjury,
      DateOfInjury: pDOI,
      DateOfSurgery: pDOS,
      DecriptionOfInjury: pInjuryDesc,
      RecievedTherapy: pTherapy,
      DateofTherapy: pDOT,
      CurrentCondition: currCondtion,
      CurrentStatusSymptoms: currSymptoms,
      AtWorstPain: painRating,
      SurgicalHistory: surgicalHistory,
      ReferalDoctor: reffDoc,
      MakesConditionWorse: makesWorse,
      MakesConditionBetter: makesBetter,
      MedicalIntervention: prevMedInsp,
      GoalsAfterTreat: endGoals,
      MedicalInformation: medInfo,
      OtherInformation: anyOtherInfo,
      Medications: medications,
      Allergies: allergies,
    });
    axios
      .post(process.env.REACT_APP_HOPE_BACKEND+"addBasicAssessment", {
        Patient_Id: patientID,
        Assessment: {
          Date: pDOA,
          Complaint: pComplaint,
          Injury: pInjury,
          DateOfInjury: pDOI,
          DateOfSurgery: pDOS,
          DecriptionOfInjury: pInjuryDesc,
          RecievedTherapy: pTherapy,
          DateofTherapy: pDOT,
          CurrentCondition: currCondtion,
          CurrentStatusSymptoms: currSymptoms,
          AtWorstPain: painRating,
          SurgicalHistory: surgicalHistory,
          ReferalDoctor: reffDoc,
          MakesConditionWorse: makesWorse,
          MakesConditionBetter: makesBetter,
          MedicalIntervention: prevMedInsp,
          GoalsAfterTreat: endGoals,
          MedicalInformation: medInfo,
          OtherInformation: anyOtherInfo,
          Medications: medications,
          Allergies: allergies,
        },
      })
      .then((res) => {
        console.log(res);
        notify("success");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });

    
    await delay(2000);
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
    navigate("/receptionist/dashboard/viewPatient/" + patientID);
    // e.target.reset();
  };

  return (
    <form
      onSubmit={AddBasicAssessment}
      className="flex flex-col w-full h-full bg-white p-4 gap-4"
    >
      <ToastContainer />
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
            placeholder="13-04-2023"
            value={pDOA}
            required
            onChange={(e) => {
              setpDOA(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2 flex items-start gap-4">
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
      </div>

      <div className="w-full">
        <label
          class="block text-xs font-medium text-gray-700 mb-2"
          for="grid-password"
        >
          Chief Complaint
        </label>
        <textarea
          value={pComplaint}
          onChange={(e) => {
            setpComplaint(e.target.value);
          }}
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            for="PatientInjury"
            class="block text-xs font-medium text-gray-700"
          >
            Injury (if any)
          </label>

          <input
            type="text"
            placeholder="Head concussion"
            id="PatientInjury"
            value={pInjury}
            onChange={(e) => {
              setpInjury(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/4">
          <label
            for="PatientInjuryDate"
            class="block text-xs font-medium text-gray-700"
          >
            Date of Injury
          </label>

          <input
            type="date"
            id="PatientInjuryDate"
            defaultValue={date}
            value={pDOI}
            required
            onChange={(e) => {
              setpDOI(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/4">
          <label
            for="PatientSurgery"
            class="block text-xs font-medium text-gray-700"
          >
            Date of Surgery
          </label>

          <input
            type="date"
            id="PatientSurgery"
            defaultValue={date}
            value={pDOS}
            required
            onChange={(e) => {
              setpDOS(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="w-full">
        <label
          class="block text-xs font-medium text-gray-700 mb-2"
          for="grid-password"
        >
          Briefly describe how you were injured?
        </label>
        <textarea
          value={pInjuryDesc}
          onChange={(e) => {
            setpInjuryDesc(e.target.value);
          }}
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-2/3">
          <label
            for="PatientTherapy"
            class="block text-xs font-medium text-gray-700"
          >
            Therapy (if any)
          </label>

          <input
            type="text"
            placeholder="Neck excercises"
            id="PatientTherapy"
            value={pTherapy}
            onChange={(e) => {
              setpTherapy(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/3">
          <label
            for="PatientTherapyDate"
            class="block text-xs font-medium text-gray-700"
          >
            Date of Therapy
          </label>

          <input
            type="date"
            id="PatientTherapyDate"
            defaultValue={date}
            value={pDOT}
            required
            onChange={(e) => {
              setpDOT(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/4">
          <label
            for="PatientGender"
            class="block text-xs font-medium text-gray-700"
          >
            Present Condition
          </label>

          <select
            value={currCondtion}
            onChange={(e) => {
              setcurrCondtion(e.target.value);
            }}
            className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
          >
            <option>📉 Worse</option>
            <option>🟥 Same</option>
            <option>📈 Better</option>
          </select>
        </div>
        <div className="w-1/4">
          <label
            for="PatientGender"
            class="block text-xs font-medium text-gray-700"
          >
            Current Symptoms
          </label>

          <select
            value={currSymptoms}
            onChange={(e) => {
              setcurrSymptoms(e.target.value);
            }}
            className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
          >
            <option>Constant</option>
            <option>Intermittent</option>
          </select>
        </div>
        <div className="w-1/2">
          <label
            for="PainRating"
            class="block text-xs font-medium text-gray-700"
          >
            Rate your pain (1 is least pain, 10 is most pain)
          </label>

          <input
            type="range"
            min="1"
            max="10"
            value={painRating}
            id="PainRating"
            className="w-full mt-2"
            onChange={(e) => {
              setpainRating(e.target.value);
            }}
          ></input>
          <p className="w-full text-center text-lg">{painRating}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-2/3">
          <label
            for="SurgicalHistory"
            class="block text-xs font-medium text-gray-700"
          >
            Surgical History (if any)
          </label>

          <input
            type="text"
            placeholder="Neck excercises"
            id="SurgicalHistory"
            value={surgicalHistory}
            onChange={(e) => {
              setsurgicalHistory(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/3">
          <label for="reffDoc" class="block text-xs font-medium text-gray-700">
            Referral Doctor (if any)
          </label>

          <input
            type="text"
            placeholder="Dr. Reddy"
            id="reffDoc"
            value={reffDoc}
            onChange={(e) => {
              setreffDoc(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="w-full">
        <label for="Worst" class="block text-xs font-medium text-gray-700">
          What makes the condtion worse?
        </label>

        <CreatableSelect
          options={worstOptions}
          onChange={handleMakesWorse}
          isMulti
          className="mt-2"
        />
      </div>
      <div className="w-full">
        <label for="Worst" class="block text-xs font-medium text-gray-700">
          What makes the condtion better?
        </label>
        <CreatableSelect
          options={betterOptions}
          onChange={handleMakesBetter}
          isMulti
          className="mt-2"
        />
      </div>
      <div className="w-full">
        <label for="Worst" class="block text-xs font-medium text-gray-700">
          Previous medical intevention?
        </label>
        <CreatableSelect
          options={prevMedInt}
          onChange={handlePrevMedInsps}
          isMulti
          className="mt-2"
        />
      </div>
      <div className="w-full">
        <label for="Worst" class="block text-xs font-medium text-gray-700">
          Medical Information
        </label>
        <CreatableSelect
          options={medInfoOptions}
          onChange={handleMedInfo}
          isMulti
          className="mt-2"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            for="Medications"
            class="block text-xs font-medium text-gray-700"
          >
            Earlier Medications Taken (if any)
          </label>

          <input
            type="text"
            placeholder="Crocin, Dart"
            id="Medications"
            value={medications}
            onChange={(e) => {
              setmedications(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            for="allergies"
            class="block text-xs font-medium text-gray-700"
          >
            Allergies (if any)
          </label>

          <input
            type="text"
            placeholder="Dust"
            id="allergies"
            value={allergies}
            onChange={(e) => {
              setallergies(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            for="anyOtherInfo"
            class="block text-xs font-medium text-gray-700"
          >
            Any Other Info you wish to tell us
          </label>

          <input
            type="text"
            placeholder="Addtional Info"
            id="anyOtherInfo"
            value={anyOtherInfo}
            onChange={(e) => {
              setanyOtherInfo(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label for="endGoals" class="block text-xs font-medium text-gray-700">
            End Goals
          </label>

          <input
            type="text"
            placeholder="What you want to achieve?"
            id="endGoals"
            value={endGoals}
            onChange={(e) => {
              setendGoals(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <button
        class="w-1/2  group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500"
        onClick={AddBasicAssessment}
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
          Add Basic Assessment
        </span>
      </button>
    </form>
  );
}

export default AddBasicAssessment;
