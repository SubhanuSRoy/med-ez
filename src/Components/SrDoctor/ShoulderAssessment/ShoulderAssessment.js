import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ShoulderAssessment({ pDOA }) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);

  const [formData, setFormData] = useState({
    presentHistory: "",
    pastHistory: "",
    surgicalHistory: "",
    painHistory: "",
    onset: "",
    duration: "",
    aggravatingFactor: "",
    relievingFactor: "",
    panScaleVAS: "",
    bodyBuilt: "",
    posture: "",
    inflammation: "",
    swelling: "",
    muscleWasting: "",
    compensatoryMovements: "",
    tenderness: "",
    warmth: "",
    joint: "",
    rightActive: "",
    leftActive: "",
    rightPassive: "",
    leftPassive: "",
    painPainFree: "",
    shoulder: "",
    flexors: "",
    extensors: "",
    abductors: "",
    adductors: "",
    internalRotators: "",
    externalRotators: "",
    glenohumeralJoint: "",
    acromioclavicularJoint: "",
    scaputoHumeralRhythm: "",
    dressing: "",
    combing: "",
    washing: "",
    toileting: "",
    eating: "",
    impingement: "",
    instability: "",
    rotatorCuffPathology: "",
    stiffShoulder: "",
  });

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

  const getShoulderAssessment = () => {
    axios
      .post("https://physioplusbackend.onrender.com/GetShoulderAssessment", {
        Patient_Id: patientID,
        Date: pDOA,
      })
      .then((res) => {
        if (
          res.data.Status != "Not Found" &&
          Object.keys(res.data).length != 0
        ) {
          setFormData({
            presentHistory: res.data.presentHistory,
            pastHistory: res.data.pastHistory,
            surgicalHistory: res.data.surgicalHistory,
            painHistory: res.data.painHistory,
            onset: res.data.onset,
            duration: res.data.duration,
            aggravatingFactor: res.data.aggravatingFactor,
            relievingFactor: res.data.relievingFactor,
            panScaleVAS: res.data.panScaleVAS,
            bodyBuilt: res.data.bodyBuilt,
            posture: res.data.posture,
            inflammation: res.data.inflammation,
            swelling: res.data.swelling,
            muscleWasting: res.data.muscleWasting,
            compensatoryMovements: res.data.compensatoryMovements,
            tenderness: res.data.tenderness,
            warmth: res.data.warmth,
            joint: res.data.joint,
            rightActive: res.data.rightActive,
            leftActive: res.data.leftActive,
            rightPassive: res.data.rightPassive,
            leftPassive: res.data.leftPassive,
            painPainFree: res.data.painPainFree,
            shoulder: res.data.shoulder,
            flexors: res.data.flexors,
            extensors: res.data.extensors,
            abductors: res.data.abductors,
            adductors: res.data.adductors,
            internalRotators: res.data.internalRotators,
            externalRotators: res.data.externalRotators,
            glenohumeralJoint: res.data.glenohumeralJoint,
            acromioclavicularJoint: res.data.acromioclavicularJoint,
            scaputoHumeralRhythm: res.data.scaputoHumeralRhythm,
            dressing: res.data.dressing,
            combing: res.data.combing,
            washing: res.data.washing,
            toileting: res.data.toileting,
            eating: res.data.eating,
            impingement: res.data.impingement,
            instability: res.data.instability,
            rotatorCuffPathology: res.data.rotatorCuffPathology,
            stiffShoulder: res.data.stiffShoulder,
          });
          notify("success", "Partial Shoulder Assessment Fetched for ");
        } else {
          notify("info", "No Shoulder Assessment previously added for ");
        }
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      getShoulderAssessment();
    }

    return () => (effectRan.current = true);
  }, []);

  const AddShoulderAssessment = async (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/ShoulderAssessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        presentHistory: formData.presentHistory,
        pastHistory: formData.pastHistory,
        surgicalHistory: formData.surgicalHistory,
        painHistory: formData.painHistory,
        onset: formData.onset,
        duration: formData.duration,
        aggravatingFactor: formData.aggravatingFactor,
        relievingFactor: formData.relievingFactor,
        panScaleVAS: formData.panScaleVAS,
        bodyBuilt: formData.bodyBuilt,
        posture: formData.posture,
        inflammation: formData.inflammation,
        swelling: formData.swelling,
        muscleWasting: formData.muscleWasting,
        compensatoryMovements: formData.compensatoryMovements,
        tenderness: formData.tenderness,
        warmth: formData.warmth,
        joint: formData.joint,
        rightActive: formData.rightActive,
        leftActive: formData.leftActive,
        rightPassive: formData.rightPassive,
        leftPassive: formData.leftPassive,
        painPainFree: formData.painPainFree,
        shoulder: formData.shoulder,
        flexors: formData.flexors,
        extensors: formData.extensors,
        abductors: formData.abductors,
        adductors: formData.adductors,
        internalRotators: formData.internalRotators,
        externalRotators: formData.externalRotators,
        glenohumeralJoint: formData.glenohumeralJoint,
        acromioclavicularJoint: formData.acromioclavicularJoint,
        scaputoHumeralRhythm: formData.scaputoHumeralRhythm,
        dressing: formData.dressing,
        combing: formData.combing,
        washing: formData.washing,
        toileting: formData.toileting,
        eating: formData.eating,
        impingement: formData.impingement,
        instability: formData.instability,
        rotatorCuffPathology: formData.rotatorCuffPathology,
        stiffShoulder: formData.stiffShoulder,
      })
      .then((res) => {
        console.log(res);
        notify("success", "Shoulder Assessment Added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  return (
    <form
      className="flex flex-col w-full h-full bg-white p-4 gap-4"
      onSubmit={AddShoulderAssessment}
    >
      <ToastContainer />
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="presentHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Present History
          </label>
          <input
            type="text"
            name="presentHistory"
            id="presentHistory"
            value={formData.presentHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="pastHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Past History
          </label>
          <input
            type="text"
            name="pastHistory"
            id="pastHistory"
            value={formData.pastHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="surgicalHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Surgical History
          </label>
          <input
            type="text"
            name="surgicalHistory"
            id="surgicalHistory"
            value={formData.surgicalHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="painHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Pain History
          </label>
          <input
            type="text"
            name="painHistory"
            id="painHistory"
            value={formData.painHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="onset"
            className="block text-xs font-medium text-gray-700"
          >
            Onset
          </label>
          <input
            type="text"
            name="onset"
            id="onset"
            value={formData.onset}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="duration"
            className="block text-xs font-medium text-gray-700"
          >
            Duration
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="internalRotators"
            className="block text-xs font-medium text-gray-700"
          >
            Internal Rotators
          </label>
          <input
            type="text"
            name="internalRotators"
            id="internalRotators"
            value={formData.internalRotators}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="externalRotators"
            className="block text-xs font-medium text-gray-700"
          >
            External Rotators
          </label>
          <input
            type="text"
            name="externalRotators"
            id="externalRotators"
            value={formData.externalRotators}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="glenohumeralJoint"
            className="block text-xs font-medium text-gray-700"
          >
            Glenohumeral Joint
          </label>
          <input
            type="text"
            name="glenohumeralJoint"
            id="glenohumeralJoint"
            value={formData.glenohumeralJoint}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="acromioclavicularJoint"
            className="block text-xs font-medium text-gray-700"
          >
            Acromioclavicular Joint
          </label>
          <input
            type="text"
            name="acromioclavicularJoint"
            id="acromioclavicularJoint"
            value={formData.acromioclavicularJoint}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="scaputoHumeralRhythm"
            className="block text-xs font-medium text-gray-700"
          >
            Scaputo Humeral Rhythm
          </label>
          <input
            type="text"
            name="scaputoHumeralRhythm"
            id="scaputoHumeralRhythm"
            value={formData.scaputoHumeralRhythm}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="dressing"
            className="block text-xs font-medium text-gray-700"
          >
            Dressing
          </label>
          <input
            type="text"
            name="dressing"
            id="dressing"
            value={formData.dressing}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="combing"
            className="block text-xs font-medium text-gray-700"
          >
            Combing
          </label>
          <input
            type="text"
            name="combing"
            id="combing"
            value={formData.combing}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="washing"
            className="block text-xs font-medium text-gray-700"
          >
            Washing
          </label>
          <input
            type="text"
            name="washing"
            id="washing"
            value={formData.washing}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="toileting"
            className="block text-xs font-medium text-gray-700"
          >
            Toileting
          </label>
          <input
            type="text"
            name="toileting"
            id="toileting"
            value={formData.toileting}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="eating"
            className="block text-xs font-medium text-gray-700"
          >
            Eating
          </label>
          <input
            type="text"
            name="eating"
            id="eating"
            value={formData.eating}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="impingement"
            className="block text-xs font-medium text-gray-700"
          >
            Impingement
          </label>
          <input
            type="text"
            name="impingement"
            id="impingement"
            value={formData.impingement}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="instability"
            className="block text-xs font-medium text-gray-700"
          >
            Instability
          </label>
          <input
            type="text"
            name="instability"
            id="instability"
            value={formData.instability}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="rotatorCuffPathology"
            className="block text-xs font-medium text-gray-700"
          >
            Rotator Cuff Pathology
          </label>
          <input
            type="text"
            name="rotatorCuffPathology"
            id="rotatorCuffPathology"
            value={formData.rotatorCuffPathology}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="stiffShoulder"
            className="block text-xs font-medium text-gray-700"
          >
            Stiff Shoulder
          </label>
          <input
            type="text"
            name="stiffShoulder"
            id="stiffShoulder"
            value={formData.stiffShoulder}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
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
          Update Shoulder Assessment
        </span>
      </button>
    </form>
  );
}

export default ShoulderAssessment;
