import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function KneeAssessment({ pDOA }) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);
  const [formData, setFormData] = useState({
    PastHistory: "",
    SurgicalHistory: "",
    PainHistory: "",
    Onset: "",
    Duration: "",
    AggravatingFactor: "",
    RelievingFactor: "",
    RadiatingPain: "",
    VAS: 0,
    OnObservation: "",
    BodyBuilt: "",
    Posture: "",
    Gait: "",
    Swelling: "",
    Inflammation: "",
    Deformity: "",
    ValgusKnee: "",
    VarusKnee: "",
    OnPalpation: "",
    Tenderness: "",
    Warmth: "",
    OnExamination: "",
    MusclepowerFlexorsRight: "",
    MusclepowerFlexorsLeft: "",
    MusclepowerExtensorsRight: "",
    MusclepowerExtensorsLeft: "",
    RangeOfMotionFlexorsRight: "",
    RangeOfMotionFlexorsLeft: "",
    RangeOfMotionExtensorsRight: "",
    RangeOfMotionExtensorsLeft: "",
    FunctionalAssessmentStairClimbing: "",
    FunctionalAssessmentCycling: "",
    FunctionalAssessmentWalking: "",
    FunctionalAssessmentSquatting: "",
    FunctionalAssessmentOthers: "",
    SpecialTestVarusTest: "",
    SpecialTestACQTest: "",
    SpecialTestSmallKneeBend: "",
    SpecialTestKneeToWall: "",
    SpecialTestProneLyingKneeFlexingTest: "",
    SpecialTestPatellaTapTest: "", 
    LimbLengthDiscrepancy: "",
    FootAngulations: "",
    MedialDeviation: "",
    LateralDeviation: "",
    AdductorTightness: "",
    ITBandTightness: "",
    InvestigationXRay: "",
    InvestigationMRI: "",
    InvestigationCTScan: "",
    InvestigationOther: "",
    Diagnosis: "",
  });

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
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

  const getKneeAssessment = () => {
    axios
      .post("https://physioplusbackend.onrender.com/GetKneeAssessment", {
        Patient_Id: patientID,
        Date: pDOA,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.Status != "Not Found" && Object.keys(res.data).length != 0) {
          setFormData({
            ...formData,
            PastHistory: res.data.PastHistory,
            SurgicalHistory: res.data.SurgicalHistory,
            PainHistory: res.data.PainHistory,
            Onset: res.data.Onset,
            Duration: res.data.Duration,
            AggravatingFactor: res.data.AggravatingFactor,
            RelievingFactor: res.data.RelievingFactor,
            RadiatingPain: res.data.RadiatingPain,
            VAS: res.data.VAS,
            OnObservation: res.data.OnObservation,
            BodyBuilt: res.data.BodyBuilt,
            Posture: res.data.Posture,
            Gait: res.data.Gait,
            Swelling: res.data.Swelling,
            Inflammation: res.data.Inflammation,
            Deformity: res.data.Deformity,
            ValgusKnee: res.data.ValgusKnee,
            VarusKnee: res.data.VarusKnee,
            OnPalpation: res.data.OnPalpation,
            Tenderness: res.data.Tenderness,
            Warmth: res.data.Warmth,
            OnExamination: res.data.OnExamination,

            MusclepowerFlexorsLeft: res.data.Musclepower.Flexors.Left,
            MusclepowerFlexorsRight: res.data.Musclepower.Flexors.Right,
            MusclepowerExtensorsLeft: res.data.Musclepower.Extensors.Left,
            MusclepowerExtensorsRight: res.data.Musclepower.Extensors.Right,

            RangeOfMotionFlexorsLeft: res.data.RangeOfMotion.Flexors.Left,
            RangeOfMotionFlexorsRight: res.data.RangeOfMotion.Flexors.Right,
            RangeOfMotionExtensorsLeft: res.data.RangeOfMotion.Extensors.Left,
            RangeOfMotionExtensorsRight: res.data.RangeOfMotion.Extensors.Right,

            FunctionalAssessmentStairClimbing: res.data.FunctionalAssessment.StairClimbing,
            FunctionalAssessmentCycling: res.data.FunctionalAssessment.Cycling,
            FunctionalAssessmentWalking: res.data.FunctionalAssessment.Walking,
            FunctionalAssessmentSquatting: res.data.FunctionalAssessment.Squatting,
            FunctionalAssessmentOthers: res.data.FunctionalAssessment.Others,

            SpecialTestVarusTest: res.data.SpecialTest.VarusTest,
            SpecialTestACQTest: res.data.SpecialTest.ACQTest,
            SpecialTestSmallKneeBend: res.data.SpecialTest.SmallKneeBend,
            SpecialTestKneeToWall: res.data.SpecialTest.KneeToWall,
            SpecialTestProneLyingKneeFlexingTest: res.data.SpecialTest.ProneLyingKneeFlexingTest,
            SpecialTestPatellaTapTest: res.data.SpecialTest.PatellaTapTest,

            LimbLengthDiscrepancy: res.data.LimbLengthDiscrepancy,
            FootAngulations: res.data.FootAngulations,
            MedialDeviation: res.data.MedialDeviation,
            LateralDeviation: res.data.LateralDeviation,
            AdductorTightness: res.data.AdductorTightness,
            ITBandTightness: res.data.ITBandTightness,
            
            InvestigationCTScan: res.data.Investigation.CTScan,
            InvestigationMRI: res.data.Investigation.MRI,
            InvestigationXRay: res.data.Investigation.XRay,
            InvestigationOther: res.data.Investigation.Other,
            Diagnosis: res.data.Diagnosis,
          });
          notify("success", "Partial Knee Assessment Fetched for ");
        } else {
          notify("info", "No Knee Assessment previously added for ");
        }

        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };


  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      getKneeAssessment();
    }

    return () => (effectRan.current = true);
  }, []);


  const AddKneeAssessment = (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/KneeAssessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        PastHistory: formData.PastHistory,
        SurgicalHistory: formData.SurgicalHistory,
        PainHistory: formData.PainHistory,
        Onset: formData.Onset,
        Duration: formData.Duration,
        AggravatingFactor: formData.AggravatingFactor,
        RelievingFactor: formData.RelievingFactor,
        RadiatingPain: formData.RadiatingPain,
        VAS: formData.VAS,
        OnObservation: formData.OnObservation,
        BodyBuilt: formData.BodyBuilt,
        Posture: formData.Posture,
        Gait: formData.Gait,
        Swelling: formData.Swelling,
        Inflammation: formData.Inflammation,
        Deformity: formData.Deformity,
        ValgusKnee: formData.ValgusKnee,
        VarusKnee: formData.VarusKnee,
        OnPalpation: formData.OnPalpation,
        Tenderness: formData.Tenderness,
        Warmth: formData.Warmth,
        OnExamination: formData.OnExamination,
        Musclepower: {
          Flexors: {
            Right: formData.MusclepowerFlexorsRight,
            Left: formData.MusclepowerFlexorsLeft,
          },
          Extensors: {
            Right: formData.MusclepowerExtensorsRight,
            Left: formData.MusclepowerExtensorsLeft,
          },
        },
        RangeOfMotion: {
          Flexors: {
            Right: formData.RangeOfMotionFlexorsRight,
            Left: formData.RangeOfMotionFlexorsLeft,
          },
          Extensors: {
            Right: formData.RangeOfMotionExtensorsRight,
            Left: formData.RangeOfMotionExtensorsLeft,
          },
        },
        FunctionalAssessment: {
          StairClimbing: formData.FunctionalAssessmentStairClimbing,
          Cycling: formData.FunctionalAssessmentCycling,
          Walking: formData.FunctionalAssessmentWalking,
          Squatting: formData.FunctionalAssessmentSquatting,
          Others: formData.FunctionalAssessmentOthers,
        },
        SpecialTest: {
          VarusTest: formData.SpecialTestVarusTest,
          ACQTest: formData.SpecialTestACQTest,
          SmallKneeBend: formData.SpecialTestSmallKneeBend,
          KneeToWall: formData.SpecialTestKneeToWall,
          ProneLyingKneeFlexingTest:
            formData.SpecialTestProneLyingKneeFlexingTest,
          PatellaTapTest: formData.SpecialTestPatellaTapTest,
        },
        LimbLengthDiscrepancy: formData.LimbLengthDiscrepancy,
        FootAngulations: formData.FootAngulations,
        MedialDeviation: formData.MedialDeviation,
        LateralDeviation: formData.LateralDeviation,
        AdductorTightness: formData.AdductorTightness,
        ITBandTightness: formData.ITBandTightness,
        Investigation: {
          XRay: formData.InvestigationXRay,
          MRI: formData.InvestigationMRI,
          CTScan: formData.InvestigationCTScan,
          Other: formData.InvestigationOther,
        },
        Diagnosis: formData.Diagnosis,
      })
      .then((res) => {
        console.log(res);
        notify("success", "Knee Assessment added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  return (
    <form
      className="flex flex-col w-full h-full bg-white p-4 gap-4"
      onSubmit={AddKneeAssessment}
    >
      <ToastContainer />
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="PastHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Past History
          </label>
          <input
            type="text"
            name="PastHistory"
            id="PastHistory"
            value={formData.PastHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="SurgicalHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Surgical History
          </label>
          <input
            type="text"
            name="SurgicalHistory"
            id="SurgicalHistory"
            value={formData.SurgicalHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="PainHistory"
            className="block text-xs font-medium text-gray-700"
          >
            Pain History
          </label>
          <input
            type="text"
            name="PainHistory"
            id="PainHistory"
            value={formData.PainHistory}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Onset"
            className="block text-xs font-medium text-gray-700"
          >
            Onset
          </label>
          <input
            type="text"
            name="Onset"
            id="Onset"
            value={formData.Onset}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Duration"
            className="block text-xs font-medium text-gray-700"
          >
            Duration
          </label>
          <input
            type="text"
            name="Duration"
            id="Duration"
            value={formData.Duration}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="AggravatingFactor"
            className="block text-xs font-medium text-gray-700"
          >
            Aggravating Factor
          </label>
          <input
            type="text"
            name="AggravatingFactor"
            id="AggravatingFactor"
            value={formData.AggravatingFactor}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="RelievingFactor"
            className="block text-xs font-medium text-gray-700"
          >
            Relieving Factor
          </label>
          <input
            type="text"
            name="RelievingFactor"
            id="RelievingFactor"
            value={formData.RelievingFactor}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="RadiatingPain"
            className="block text-xs font-medium text-gray-700"
          >
            Radiating Pain
          </label>
          <input
            type="text"
            name="RadiatingPain"
            id="RadiatingPain"
            value={formData.RadiatingPain}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="VAS"
            className="block text-xs font-medium text-gray-700"
          >
            VAS
          </label>
          <input
            type="number"
            name="VAS"
            id="VAS"
            value={formData.VAS}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="OnObservation"
            className="block text-xs font-medium text-gray-700"
          >
            On Observation
          </label>
          <input
            type="text"
            name="OnObservation"
            id="OnObservation"
            value={formData.OnObservation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="BodyBuilt"
            className="block text-xs font-medium text-gray-700"
          >
            Body Built
          </label>
          <input
            type="text"
            name="BodyBuilt"
            id="BodyBuilt"
            value={formData.BodyBuilt}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Posture"
            className="block text-xs font-medium text-gray-700"
          >
            Posture
          </label>
          <input
            type="text"
            name="Posture"
            id="Posture"
            value={formData.Posture}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Gait"
            className="block text-xs font-medium text-gray-700"
          >
            Gait
          </label>
          <input
            type="text"
            name="Gait"
            id="Gait"
            value={formData.Gait}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Swelling"
            className="block text-xs font-medium text-gray-700"
          >
            Swelling
          </label>
          <input
            type="text"
            name="Swelling"
            id="Swelling"
            value={formData.Swelling}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Inflammation"
            className="block text-xs font-medium text-gray-700"
          >
            Inflammation
          </label>
          <input
            type="text"
            name="Inflammation"
            id="Inflammation"
            value={formData.Inflammation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Deformity"
            className="block text-xs font-medium text-gray-700"
          >
            Deformity
          </label>
          <input
            type="text"
            name="Deformity"
            id="Deformity"
            value={formData.Deformity}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="ValgusKnee"
            className="block text-xs font-medium text-gray-700"
          >
            Valgus Knee
          </label>
          <input
            type="text"
            name="ValgusKnee"
            id="ValgusKnee"
            value={formData.ValgusKnee}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="VarusKnee"
            className="block text-xs font-medium text-gray-700"
          >
            Varus Knee
          </label>
          <input
            type="text"
            name="VarusKnee"
            id="VarusKnee"
            value={formData.VarusKnee}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="OnPalpation"
            className="block text-xs font-medium text-gray-700"
          >
            On Palpation
          </label>
          <input
            type="text"
            name="OnPalpation"
            id="OnPalpation"
            value={formData.OnPalpation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Swelling"
            className="block text-xs font-medium text-gray-700"
          >
            Swelling
          </label>
          <input
            type="text"
            name="Swelling"
            id="Swelling"
            value={formData.Swelling}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Tenderness"
            className="block text-xs font-medium text-gray-700"
          >
            Tenderness
          </label>
          <input
            type="text"
            name="Tenderness"
            id="Tenderness"
            value={formData.Tenderness}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Warmth"
            className="block text-xs font-medium text-gray-700"
          >
            Warmth
          </label>
          <input
            type="text"
            name="Warmth"
            id="Warmth"
            value={formData.Warmth}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="OnExamination"
            className="block text-xs font-medium text-gray-700"
          >
            On Examination
          </label>
          <input
            type="text"
            name="OnExamination"
            id="OnExamination"
            value={formData.OnExamination}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="Musclepower"
            className="block text-xs font-medium text-gray-700"
          >
            Muscle Power
          </label>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="FlexorsRight"
                className="block text-xs font-medium text-gray-700"
              >
                Flexors (Right)
              </label>
              <input
                type="text"
                name="MusclepowerFlexorsRight"
                id="FlexorsRight"
                value={formData.MusclepowerFlexorsRight}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="FlexorsLeft"
                className="block text-xs font-medium text-gray-700"
              >
                Flexors (Left)
              </label>
              <input
                type="text"
                name="MusclepowerFlexorsLeft"
                id="FlexorsLeft"
                value={formData.MusclepowerFlexorsLeft}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="Extensors"
            className="block text-xs font-medium text-gray-700"
          >
            Extensors
          </label>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="ExtensorsRight"
                className="block text-xs font-medium text-gray-700"
              >
                Extensors (Right)
              </label>
              <input
                type="text"
                name="MusclepowerExtensorsRight"
                id="ExtensorsRight"
                value={formData.MusclepowerExtensorsRight}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="ExtensorsLeft"
                className="block text-xs font-medium text-gray-700"
              >
                Extensors (Left)
              </label>
              <input
                type="text"
                name="MusclepowerExtensorsLeft"
                id="ExtensorsLeft"
                value={formData.MusclepowerExtensorsLeft}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="RangeOfMotionFlexors"
            className="block text-xs font-medium text-gray-700"
          >
            Range of Motion - Flexors
          </label>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="FlexorsRight"
                className="block text-xs font-medium text-gray-700"
              >
                Flexors (Right)
              </label>
              <input
                type="text"
                name="RangeOfMotionFlexorsRight"
                id="RangeOfMotionFlexorsRight"
                value={formData.RangeOfMotionFlexorsRight}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="FlexorsLeft"
                className="block text-xs font-medium text-gray-700"
              >
                Flexors (Left)
              </label>
              <input
                type="text"
                name="RangeOfMotionFlexorsLeft"
                id="RangeOfMotionFlexorsLeft"
                value={formData.RangeOfMotionFlexorsLeft}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="RangeOfMotionExtensors"
            className="block text-xs font-medium text-gray-700"
          >
            Range of Motion - Extensors
          </label>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="ExtensorsRight"
                className="block text-xs font-medium text-gray-700"
              >
                Extensors (Right)
              </label>
              <input
                type="text"
                name="RangeOfMotionExtensorsRight"
                id="RangeOfMotionExtensorsRight"
                value={formData.RangeOfMotionExtensorsRight}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="ExtensorsLeft"
                className="block text-xs font-medium text-gray-700"
              >
                Extensors (Left)
              </label>
              <input
                type="text"
                name="RangeOfMotionExtensorsLeft"
                id="RangeOfMotionExtensorsLeft"
                value={formData.RangeOfMotionExtensorsLeft}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="FunctionalAssessmentStairClimbing"
            className="block text-xs font-medium text-gray-700"
          >
            Functional Assessment - Stair Climbing
          </label>
          <input
            type="text"
            name="FunctionalAssessmentStairClimbing"
            id="FunctionalAssessmentStairClimbing"
            value={formData.FunctionalAssessmentStairClimbing}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="FunctionalAssessmentCycling"
            className="block text-xs font-medium text-gray-700"
          >
            Functional Assessment - Cycling
          </label>
          <input
            type="text"
            name="FunctionalAssessmentCycling"
            id="FunctionalAssessmentCycling"
            value={formData.FunctionalAssessmentCycling}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="FunctionalAssessmentWalking"
            className="block text-xs font-medium text-gray-700"
          >
            Functional Assessment - Walking
          </label>
          <input
            type="text"
            name="FunctionalAssessmentWalking"
            id="FunctionalAssessmentWalking"
            value={formData.FunctionalAssessmentWalking}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="FunctionalAssessmentSquatting"
            className="block text-xs font-medium text-gray-700"
          >
            Functional Assessment - Squatting
          </label>
          <input
            type="text"
            name="FunctionalAssessmentSquatting"
            id="FunctionalAssessmentSquatting"
            value={formData.FunctionalAssessmentSquatting}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="FunctionalAssessmentOthers"
            className="block text-xs font-medium text-gray-700"
          >
            Functional Assessment - Others
          </label>
          <input
            type="text"
            name="FunctionalAssessmentOthers"
            id="FunctionalAssessmentOthers"
            value={formData.FunctionalAssessmentOthers}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestVarusTest"
            className="block text-xs font-medium text-gray-700"
          >
            Special Test - Varus Test
          </label>
          <input
            type="text"
            name="SpecialTestVarusTest"
            id="SpecialTestVarusTest"
            value={formData.SpecialTestVarusTest}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="SpecialTestACQTest"
            className="block text-xs font-medium text-gray-700"
          >
            Special Test - ACQ Test
          </label>
          <input
            type="text"
            name="SpecialTestACQTest"
            id="SpecialTestACQTest"
            value={formData.SpecialTestACQTest}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestSmallKneeBend"
            className="block text-xs font-medium text-gray-700"
          >
            Special Test - Small Knee Bend
          </label>
          <input
            type="text"
            name="SpecialTestSmallKneeBend"
            id="SpecialTestSmallKneeBend"
            value={formData.SpecialTestSmallKneeBend}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="SpecialTestKneeToWall"
            className="block text-xs font-medium text-gray-700"
          >
            Special Test - Knee To Wall
          </label>
          <input
            type="text"
            name="SpecialTestKneeToWall"
            id="SpecialTestKneeToWall"
            value={formData.SpecialTestKneeToWall}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestProneLyingKneeFlexingTest"
            className="block text-xs font-medium text-gray-700"
          >
            Special Test - Prone Lying Knee Flexing Test
          </label>
          <input
            type="text"
            name="SpecialTestProneLyingKneeFlexingTest"
            id="SpecialTestProneLyingKneeFlexingTest"
            value={formData.SpecialTestProneLyingKneeFlexingTest}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="SpecialTestPatellaTapTest"
            className="block text-xs font-medium text-gray-700"
          >
            Special Test - Patella Tap Test
          </label>
          <input
            type="text"
            name="SpecialTestPatellaTapTest"
            id="SpecialTestPatellaTapTest"
            value={formData.SpecialTestPatellaTapTest}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestLimbLengthDiscrepancy"
            className="block text-xs font-medium text-gray-700"
          >
            Limb Length Discrepancy
          </label>
          <input
            type="text"
            name="LimbLengthDiscrepancy"
            id="SpecialTestLimbLengthDiscrepancy"
            value={formData.LimbLengthDiscrepancy}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="SpecialTestFootAngulations"
            className="block text-xs font-medium text-gray-700"
          >
            Foot Angulations
          </label>
          <input
            type="text"
            name="FootAngulations"
            id="SpecialTestFootAngulations"
            value={formData.FootAngulations}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestMedialDeviation"
            className="block text-xs font-medium text-gray-700"
          >
            Medial Deviation
          </label>
          <input
            type="text"
            name="MedialDeviation"
            id="SpecialTestMedialDeviation"
            value={formData.MedialDeviation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="LateralDeviation"
            className="block text-xs font-medium text-gray-700"
          >
            Laterals Deviation
          </label>
          <input
            type="text"
            name="LateralDeviation"
            id="SpecialTestLateralsDeviation"
            value={formData.LateralDeviation}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestAdductorTightness"
            className="block text-xs font-medium text-gray-700"
          >
            Adductor Tightness
          </label>
          <input
            type="text"
            name="AdductorTightness"
            id="SpecialTestAdductorTightness"
            value={formData.AdductorTightness}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="SpecialTestITBandTightness"
            className="block text-xs font-medium text-gray-700"
          >
            IT Band Tightness
          </label>
          <input
            type="text"
            name="ITBandTightness"
            id="SpecialTestITBandTightness"
            value={formData.ITBandTightness}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="InvestigationXRay"
            className="block text-xs font-medium text-gray-700"
          >
            Investigation - X-Ray
          </label>
          <input
            type="text"
            name="InvestigationXRay"
            id="InvestigationXRay"
            value={formData.InvestigationXRay}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="InvestigationMRI"
            className="block text-xs font-medium text-gray-700"
          >
            Investigation - MRI
          </label>
          <input
            type="text"
            name="InvestigationMRI"
            id="InvestigationMRI"
            value={formData.InvestigationMRI}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="InvestigationCTScan"
            className="block text-xs font-medium text-gray-700"
          >
            Investigation - CT Scan
          </label>
          <input
            type="text"
            name="InvestigationCTScan"
            id="InvestigationCTScan"
            value={formData.InvestigationCTScan}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>

        <div className="w-1/2">
          <label
            htmlFor="InvestigationOther"
            className="block text-xs font-medium text-gray-700"
          >
            Investigation - Other
          </label>
          <input
            type="text"
            name="InvestigationOther"
            id="InvestigationOther"
            value={formData.InvestigationOther}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      {/* Continue adding the remaining JSX elements following the same pattern */}

      <div className="flex items-center gap-4">
        <div className="w-full">
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
            value={formData["Diagnosis"]}
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
          Update Knee Assessment
        </span>
      </button>

      {/* Continue adding the remaining JSX elements following the same pattern */}
    </form>
  );
}

export default KneeAssessment;
