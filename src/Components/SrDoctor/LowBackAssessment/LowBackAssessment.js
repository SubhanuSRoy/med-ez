import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function LowBackAssessment({pDOA}) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);

  const [formData, setFormData] = useState({
    recentHistory: "",
    pastHistory: "",
    surgicalHistory: "",
    onsetDuration: "",
    aggravatingFactor: "",
    relievingFactor: "",
    radiatingPain: "",
    built: "",
    posture: "",
    gait: "",
    inflammationSwelling: "",
    muscleWasting: "",
    compensatoryMovements: "",
    alignment: "",
    swelling: "",
    tendernessWarmth: "",
    forwardBending: "",
    bendingToNormalPosition: "",
    extension: "",
    sideFlexion: "",
    sideRotation: "",
    straightLegRaise: "",
    ehl: "",
    lltt: "",
    singleLimbStanding: "",
    psis: "",
    spinalRotation: "",
    rotation: "",
    leftMusclePower: "",
    rightMusclePower: "",
    flexersExtensorsAbductors: "",
    adductors: "",
    internalRotators: "",
    
    stairClimbing: "",
    cycling: "",
    walking: "",
    squatting: "",
    ADL: "",
    investigation: "",
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

  const getLowBackAssessment = () => {
    axios
      .post("https://physioplusbackend.onrender.com/GetLowBackAssessment", {
        Patient_Id: patientID,
        Date: pDOA,
      })
      .then((res) => {
        if (res.data.Status != "Not Found" && Object.keys(res.data).length != 0) {
          setFormData({
            recentHistory: res.data.recentHistory,
            pastHistory: res.data.pastHistory,
            surgicalHistory: res.data.surgicalHistory,
            onsetDuration: res.data.onsetDuration,
            aggravatingFactor: res.data.aggravatingFactor,
            relievingFactor: res.data.relievingFactor,
            radiatingPain: res.data.radiatingPain,
            built: res.data.built,
            posture: res.data.posture,
            gait: res.data.gait,
            inflammationSwelling: res.data.inflammationSwelling,
            muscleWasting: res.data.muscleWasting,
            compensatoryMovements: res.data.compensatoryMovements,
            alignment: res.data.alignment,
            swelling: res.data.swelling,
            tendernessWarmth: res.data.tendernessWarmth,
            forwardBending: res.data.forwardBending,
            bendingToNormalPosition: res.data.bendingToNormalPosition,
            extension: res.data.extension,
            sideFlexion: res.data.sideFlexion,
            sideRotation: res.data.sideRotation,
            straightLegRaise: res.data.straightLegRaise,
            ehl: res.data.ehl,
            lltt: res.data.lltt,
            singleLimbStanding: res.data.singleLimbStanding,
            psis: res.data.psis,
            spinalRotation: res.data.spinalRotation,
            rotation: res.data.rotation,
            leftMusclePower: res.data.leftMusclePower,
            rightMusclePower: res.data.rightMusclePower,
            flexersExtensorsAbductors: res.data.flexersExtensorsAbductors,
            adductors: res.data.adductors,
            internalRotators: res.data.internalRotators,
           
            stairClimbing: res.data.stairClimbing,
            cycling: res.data.cycling,
            walking: res.data.walking,
            squatting: res.data.squatting,
            ADL: res.data.ADL,
            investigation: res.data.investigation,

          });
          notify("success", "Partial Low Back Assessment Fetched for ");
        }
        else {
          notify("info", "No Low Back Assessment previously added for ");
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
      getLowBackAssessment();
    }

    return () => (effectRan.current = true);
  }, []);

  const AddBackAssessment = async (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/LowBackAssessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        recentHistory: formData.recentHistory,
        pastHistory: formData.pastHistory,
        surgicalHistory: formData.surgicalHistory,
        onsetDuration: formData.onsetDuration,
        aggravatingFactor: formData.aggravatingFactor,
        relievingFactor: formData.relievingFactor,
        radiatingPain: formData.radiatingPain,
        built: formData.built,
        posture: formData.posture,
        gait: formData.gait,
        inflammationSwelling: formData.inflammationSwelling,
        muscleWasting: formData.muscleWasting,
        compensatoryMovements: formData.compensatoryMovements,
        alignment: formData.alignment,
        swelling: formData.swelling,
        tendernessWarmth: formData.tendernessWarmth,
        forwardBending: formData.forwardBending,
        bendingToNormalPosition: formData.bendingToNormalPosition,
        extension: formData.extension,
        sideFlexion: formData.sideFlexion,
        sideRotation: formData.sideRotation,
        straightLegRaise: formData.straightLegRaise,
        ehl: formData.ehl,
        lltt: formData.lltt,
        singleLimbStanding: formData.singleLimbStanding,
        psis: formData.psis,
        spinalRotation: formData.spinalRotation,
        rotation: formData.rotation,
        leftMusclePower: formData.leftMusclePower,
        rightMusclePower: formData.rightMusclePower,
        flexersExtensorsAbductors: formData.flexersExtensorsAbductors,
        adductors: formData.adductors,
        internalRotators: formData.internalRotators,
        
        stairClimbing: formData.stairClimbing,
        cycling: formData.cycling,
        walking: formData.walking,
        squatting: formData.squatting,
        ADL: formData.ADL,
        investigation: formData.investigation,
      })
      .then((res) => {
        console.log(res);
        notify("success", "Low Back Assessment Added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };
  
  return (
    <form className="flex flex-col w-full h-full bg-white p-4 gap-4" onSubmit={AddBackAssessment}>
      <ToastContainer />
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            for="recentHistory"
            class="block text-xs font-medium text-gray-700"
          >
            Recent History
          </label>

          <input
            type="text"
            name="recentHistory"
            id="recentHistory"
            
            value={formData.recentHistory}
            onChange={handleChange}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            for="pastHistory"
            class="block text-xs font-medium text-gray-700"
          >
            Past History
          </label>

          <input
            type="text"
            name="pastHistory"
            id="pastHistory"
            
            value={formData.pastHistory}
            onChange={handleChange}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
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
            htmlFor="onsetDuration"
            className="block text-xs font-medium text-gray-700"
          >
            Onset Duration
          </label>
          <input
            type="text"
            name="onsetDuration"
            id="onsetDuration"
            
            value={formData.onsetDuration}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="aggravatingFactor"
            className="block text-xs font-medium text-gray-700"
          >
            Aggravating Factor
          </label>
          <input
            type="text"
            name="aggravatingFactor"
            id="aggravatingFactor"
            
            value={formData.aggravatingFactor}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="relievingFactor"
            className="block text-xs font-medium text-gray-700"
          >
            Relieving Factor
          </label>
          <input
            type="text"
            name="relievingFactor"
            id="relievingFactor"
            
            value={formData.relievingFactor}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Repeat the above pattern for other variable pairs */}
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="radiatingPain"
            className="block text-xs font-medium text-gray-700"
          >
            Radiating Pain
          </label>
          <input
            type="text"
            name="radiatingPain"
            id="radiatingPain"
            
            value={formData.radiatingPain}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="built"
            className="block text-xs font-medium text-gray-700"
          >
            Built
          </label>
          <input
            type="text"
            name="built"
            id="built"
            
            value={formData.built}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="posture"
            className="block text-xs font-medium text-gray-700"
          >
            Posture
          </label>
          <input
            type="text"
            name="posture"
            id="posture"
            
            value={formData.posture}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="gait"
            className="block text-xs font-medium text-gray-700"
          >
            Gait
          </label>
          <input
            type="text"
            name="gait"
            id="gait"
            
            value={formData.gait}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="inflammationSwelling"
            className="block text-xs font-medium text-gray-700"
          >
            Inflammation Swelling
          </label>
          <input
            type="text"
            name="inflammationSwelling"
            id="inflammationSwelling"
            
            value={formData.inflammationSwelling}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="muscleWasting"
            className="block text-xs font-medium text-gray-700"
          >
            Muscle Wasting
          </label>
          <input
            type="text"
            name="muscleWasting"
            id="muscleWasting"
            
            value={formData.muscleWasting}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="compensatoryMovements"
            className="block text-xs font-medium text-gray-700"
          >
            Compensatory Movements
          </label>
          <input
            type="text"
            name="compensatoryMovements"
            id="compensatoryMovements"
            
            value={formData.compensatoryMovements}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="alignment"
            className="block text-xs font-medium text-gray-700"
          >
            Alignment
          </label>
          <input
            type="text"
            name="alignment"
            id="alignment"
            
            value={formData.alignment}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="swelling"
            className="block text-xs font-medium text-gray-700"
          >
            Swelling
          </label>
          <input
            type="text"
            name="swelling"
            id="swelling"
            
            value={formData.swelling}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="tendernessWarmth"
            className="block text-xs font-medium text-gray-700"
          >
            Tenderness Warmth
          </label>
          <input
            type="text"
            name="tendernessWarmth"
            id="tendernessWarmth"
            
            value={formData.tendernessWarmth}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="forwardBending"
            className="block text-xs font-medium text-gray-700"
          >
            Forward Bending
          </label>
          <input
            type="text"
            name="forwardBending"
            id="forwardBending"
            
            value={formData.forwardBending}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="bendingToNormalPosition"
            className="block text-xs font-medium text-gray-700"
          >
            Bending to Normal Position Extension
          </label>
          <input
            type="text"
            name="bendingToNormalPosition"
            id="bendingToNormalPosition"
            
            value={formData.bendingToNormalPosition}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="sideFlexion"
            className="block text-xs font-medium text-gray-700"
          >
            Side Flexion
          </label>
          <input
            type="text"
            name="sideFlexion"
            id="sideFlexion"
            
            value={formData.sideFlexion}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="sideRotation"
            className="block text-xs font-medium text-gray-700"
          >
            Side Rotation
          </label>
          <input
            type="text"
            name="sideRotation"
            id="sideRotation"
            
            value={formData.sideRotation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="straightLegRaise"
            className="block text-xs font-medium text-gray-700"
          >
            Straight Leg Raise
          </label>
          <input
            type="text"
            name="straightLegRaise"
            id="straightLegRaise"
            
            value={formData.straightLegRaise}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="ehl"
            className="block text-xs font-medium text-gray-700"
          >
            EHL
          </label>
          <input
            type="text"
            name="ehl"
            id="ehl"
            
            value={formData.ehl}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Repeat the above pattern for other variable pairs */}
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="lltt"
            className="block text-xs font-medium text-gray-700"
          >
            LLTT
          </label>
          <input
            type="text"
            name="lltt"
            id="lltt"
            
            value={formData.lltt}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="singleLimbStanding"
            className="block text-xs font-medium text-gray-700"
          >
            Single Limb Standing
          </label>
          <input
            type="text"
            name="singleLimbStanding"
            id="singleLimbStanding"
            
            value={formData.singleLimbStanding}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="psis"
            className="block text-xs font-medium text-gray-700"
          >
            PSIS
          </label>
          <input
            type="text"
            name="psis"
            id="psis"
            
            value={formData.psis}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="spinalRotation"
            className="block text-xs font-medium text-gray-700"
          >
            Spinal Rotation
          </label>
          <input
            type="text"
            name="spinalRotation"
            id="spinalRotation"
            
            value={formData.spinalRotation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Repeat the above pattern for other variable pairs */}
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="rotation"
            className="block text-xs font-medium text-gray-700"
          >
            Rotation
          </label>
          <input
            type="text"
            name="rotation"
            id="rotation"
            
            value={formData.rotation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="leftMusclePower"
            className="block text-xs font-medium text-gray-700"
          >
            Left Muscle Power
          </label>
          <input
            type="text"
            name="leftMusclePower"
            id="leftMusclePower"
            
            value={formData.leftMusclePower}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="rightMusclePower"
            className="block text-xs font-medium text-gray-700"
          >
            Right Muscle Power
          </label>
          <input
            type="text"
            name="rightMusclePower"
            id="rightMusclePower"
            
            value={formData.rightMusclePower}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="flexersExtensorsAbductors"
            className="block text-xs font-medium text-gray-700"
          >
            Flexers Extensors Abductors
          </label>
          <input
            type="text"
            name="flexersExtensorsAbductors"
            id="flexersExtensorsAbductors"
            
            value={formData.flexersExtensorsAbductors}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Repeat the above pattern for other variable pairs */}
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="adductors"
            className="block text-xs font-medium text-gray-700"
          >
            Adductors
          </label>
          <input
            type="text"
            name="adductors"
            id="adductors"
            
            value={formData.adductors}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
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
      </div>

      

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="stairClimbing"
            className="block text-xs font-medium text-gray-700"
          >
            Stair Climbing
          </label>
          <input
            type="text"
            name="stairClimbing"
            id="stairClimbing"
            
            value={formData.stairClimbing}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="cycling"
            className="block text-xs font-medium text-gray-700"
          >
            Cycling
          </label>
          <input
            type="text"
            name="cycling"
            id="cycling"
            
            value={formData.cycling}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Repeat the above pattern for other variable pairs */}
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="walking"
            className="block text-xs font-medium text-gray-700"
          >
            Walking
          </label>
          <input
            type="text"
            name="walking"
            id="walking"
            
            value={formData.walking}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="squatting"
            className="block text-xs font-medium text-gray-700"
          >
            Squatting
          </label>
          <input
            type="text"
            name="squatting"
            id="squatting"
            
            value={formData.squatting}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="ADL"
            className="block text-xs font-medium text-gray-700"
          >
            ADL
          </label>
          <input
            type="text"
            name="ADL"
            id="ADL"
            
            value={formData.ADL}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="investigation"
            className="block text-xs font-medium text-gray-700"
          >
            Investigation
          </label>
          <input
            type="text"
            name="investigation"
            id="investigation"
            
            value={formData.investigation}
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
        Update Back Assessment
        </span>
      </button>
    </form>
  );
}

export default LowBackAssessment;
