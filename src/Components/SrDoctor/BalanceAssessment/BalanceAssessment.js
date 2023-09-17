import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function BalanceAssessment({ pDOA }) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);

  const [formData, setFormData] = useState({
    posture: "",
    gaitAnalysis: "",
    tandemWalk: "",
    tandemWalkReverse: "",
    sitToStandTest: "",
    forwardAndBackwardWalk: "",
    circleWalk: "",
    sidewaysWalk: "",
    walkingWithHeel: "",
    walkingWithToes: "",
    rombergsSign: "",
    normalPosture: "",
    normalPostureWithEyesOccluded: "",
    pushBackwardsWithEyesOccluded: "",
    pushForwardsWithEyesOccluded: "",
    pushRightToLeftSidewaysWithEyesOccluded: "",
    pushLeftToRightSidewaysWithEyesOccluded: "",
    feetTogetherWithEyesOccluded: "",
    withSupport: "",
    withoutSupport: "",
    lookForHipAbduction: "",
    standingQuadripodPosition: "",
    frenkelsWithVariousAngles: "",
    singleLegSmallKneeBend: "",
    dorsiflexionAndPlantarflexionOnWeightBearing: "",
    ankleAndFootFullWeightBearingWithSmallKneeBend: "",
    nystagmus: "",
    fingerToFinger: "",
    fingerToNose: "",
    fingerOpposition: "",
    pronationSupination: "",
    massGrasp: "",
    handTapping: "",
    alternateHeelToKnee: "",
    alternateHeelToToe: "",
    feetTapping: "",
    drawingCircleInHand: "",
    drawingCircleInFoot: "",
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

  const getBalanceAssessment = () => {
    axios
      .post("https://physioplusbackend.onrender.com/GetBalanceAssessment", {
        Patient_Id: patientID,
        Date: pDOA,
      })
      .then((res) => {
        console.log(res);
        if (
          res.data &&
          res.data.Status != "Not Found" &&
          Object.keys(res.data).length != 0
        ) {
          setFormData({
            posture: res.data.posture,
            gaitAnalysis: res.data.gaitAnalysis,
            tandemWalk: res.data.tandemWalk,
            tandemWalkReverse: res.data.tandemWalkReverse,
            sitToStandTest: res.data.sitToStandTest,
            forwardAndBackwardWalk: res.data.forwardAndBackwardWalk,
            circleWalk: res.data.circleWalk,
            sidewaysWalk: res.data.sidewaysWalk,
            walkingWithHeel: res.data.walkingWithHeel,
            walkingWithToes: res.data.walkingWithToes,
            rombergsSign: res.data.rombergsSign,
            normalPosture: res.data.normalPosture,
            normalPostureWithEyesOccluded:
              res.data.normalPostureWithEyesOccluded,
            pushBackwardsWithEyesOccluded:
              res.data.pushBackwardsWithEyesOccluded,
            pushForwardsWithEyesOccluded: res.data.pushForwardsWithEyesOccluded,
            pushRightToLeftSidewaysWithEyesOccluded:
              res.data.pushRightToLeftSidewaysWithEyesOccluded,
            pushLeftToRightSidewaysWithEyesOccluded:
              res.data.pushLeftToRightSidewaysWithEyesOccluded,
            feetTogetherWithEyesOccluded: res.data.feetTogetherWithEyesOccluded,
            withSupport: res.data.withSupport,
            withoutSupport: res.data.withoutSupport,
            lookForHipAbduction: res.data.lookForHipAbduction,
            standingQuadripodPosition: res.data.standingQuadripodPosition,
            frenkelsWithVariousAngles: res.data.frenkelsWithVariousAngles,
            singleLegSmallKneeBend: res.data.singleLegSmallKneeBend,
            dorsiflexionAndPlantarflexionOnWeightBearing:
              res.data.dorsiflexionAndPlantarflexionOnWeightBearing,
            ankleAndFootFullWeightBearingWithSmallKneeBend:
              res.data.ankleAndFootFullWeightBearingWithSmallKneeBend,
            nystagmus: res.data.nystagmus,
            fingerToFinger: res.data.fingerToFinger,
            fingerToNose: res.data.fingerToNose,
            fingerOpposition: res.data.fingerOpposition,
            pronationSupination: res.data.pronationSupination,
            massGrasp: res.data.massGrasp,
            handTapping: res.data.handTapping,
            alternateHeelToKnee: res.data.alternateHeelToKnee,
            alternateHeelToToe: res.data.alternateHeelToToe,
            feetTapping: res.data.feetTapping,
            drawingCircleInHand: res.data.drawingCircleInHand,
            drawingCircleInFoot: res.data.drawingCircleInFoot,
          });
          notify("success", "Partial Balance Assessment Fetched for ");
        } else {
          notify("info", "No Balance Assessment previously added for ");
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
      getBalanceAssessment();
    }

    return () => (effectRan.current = true);
  }, []);

  const AddBalanceAssessment = (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/BalanceAssessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        posture: formData.posture,
        gaitAnalysis: formData.gaitAnalysis,
        tandemWalk: formData.tandemWalk,
        tandemWalkReverse: formData.tandemWalkReverse,
        sitToStandTest: formData.sitToStandTest,
        forwardAndBackwardWalk: formData.forwardAndBackwardWalk,
        circleWalk: formData.circleWalk,
        sidewaysWalk: formData.sidewaysWalk,
        walkingWithHeel: formData.walkingWithHeel,
        walkingWithToes: formData.walkingWithToes,
        rombergsSign: formData.rombergsSign,
        normalPosture: formData.normalPosture,
        normalPostureWithEyesOccluded: formData.normalPostureWithEyesOccluded,
        pushBackwardsWithEyesOccluded: formData.pushBackwardsWithEyesOccluded,
        pushForwardsWithEyesOccluded: formData.pushForwardsWithEyesOccluded,
        pushRightToLeftSidewaysWithEyesOccluded:
          formData.pushRightToLeftSidewaysWithEyesOccluded,
        pushLeftToRightSidewaysWithEyesOccluded:
          formData.pushLeftToRightSidewaysWithEyesOccluded,
        feetTogetherWithEyesOccluded: formData.feetTogetherWithEyesOccluded,
        withSupport: formData.withSupport,
        withoutSupport: formData.withoutSupport,
        lookForHipAbduction: formData.lookForHipAbduction,
        standingQuadripodPosition: formData.standingQuadripodPosition,
        frenkelsWithVariousAngles: formData.frenkelsWithVariousAngles,
        singleLegSmallKneeBend: formData.singleLegSmallKneeBend,
        dorsiflexionAndPlantarflexionOnWeightBearing:
          formData.dorsiflexionAndPlantarflexionOnWeightBearing,
        ankleAndFootFullWeightBearingWithSmallKneeBend:
          formData.ankleAndFootFullWeightBearingWithSmallKneeBend,
        nystagmus: formData.nystagmus,
        fingerToFinger: formData.fingerToFinger,
        fingerToNose: formData.fingerToNose,
        fingerOpposition: formData.fingerOpposition,
        pronationSupination: formData.pronationSupination,
        massGrasp: formData.massGrasp,
        handTapping: formData.handTapping,
        alternateHeelToKnee: formData.alternateHeelToKnee,
        alternateHeelToToe: formData.alternateHeelToToe,
        feetTapping: formData.feetTapping,
        drawingCircleInHand: formData.drawingCircleInHand,
        drawingCircleInFoot: formData.drawingCircleInFoot,
      })
      .then((res) => {
        console.log(res);
        notify("success", "Balance Assessment added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  return (
    <form
      className="flex flex-col w-full h-full bg-white p-4 gap-4"
      onSubmit={AddBalanceAssessment}
    >
      <ToastContainer />
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
            htmlFor="gaitAnalysis"
            className="block text-xs font-medium text-gray-700"
          >
            Gait Analysis
          </label>
          <input
            type="text"
            name="gaitAnalysis"
            id="gaitAnalysis"
            value={formData.gaitAnalysis}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="tandemWalk"
            className="block text-xs font-medium text-gray-700"
          >
            Tandem Walk
          </label>
          <input
            type="text"
            name="tandemWalk"
            id="tandemWalk"
            value={formData.tandemWalk}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="tandemWalkReverse"
            className="block text-xs font-medium text-gray-700"
          >
            Tandem Walk in Reverse
          </label>
          <input
            type="text"
            name="tandemWalkReverse"
            id="tandemWalkReverse"
            value={formData.tandemWalkReverse}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="sitToStandTest"
            className="block text-xs font-medium text-gray-700"
          >
            Sit to Stand Test
          </label>
          <input
            type="text"
            name="sitToStandTest"
            id="sitToStandTest"
            value={formData.sitToStandTest}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="forwardAndBackwardWalk"
            className="block text-xs font-medium text-gray-700"
          >
            Forward and Backward Walk
          </label>
          <input
            type="text"
            name="forwardAndBackwardWalk"
            id="forwardAndBackwardWalk"
            value={formData.forwardAndBackwardWalk}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="circleWalk"
            className="block text-xs font-medium text-gray-700"
          >
            Circle Walk
          </label>
          <input
            type="text"
            name="circleWalk"
            id="circleWalk"
            value={formData.circleWalk}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="sidewaysWalk"
            className="block text-xs font-medium text-gray-700"
          >
            Sideways Walk
          </label>
          <input
            type="text"
            name="sidewaysWalk"
            id="sidewaysWalk"
            value={formData.sidewaysWalk}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="walkingWithHeel"
            className="block text-xs font-medium text-gray-700"
          >
            Walking With Heel
          </label>
          <input
            type="text"
            name="walkingWithHeel"
            id="walkingWithHeel"
            value={formData.walkingWithHeel}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="walkingWithToes"
            className="block text-xs font-medium text-gray-700"
          >
            Walking With Toes
          </label>
          <input
            type="text"
            name="walkingWithToes"
            id="walkingWithToes"
            value={formData.walkingWithToes}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="rombergsSign"
            className="block text-xs font-medium text-gray-700"
          >
            Romberg's Sign
          </label>
          <input
            type="text"
            name="rombergsSign"
            id="rombergsSign"
            value={formData.rombergsSign}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="normalPosture"
            className="block text-xs font-medium text-gray-700"
          >
            Normal Posture
          </label>
          <input
            type="text"
            name="normalPosture"
            id="normalPosture"
            value={formData.normalPosture}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="normalPostureWithEyesOccluded"
            className="block text-xs font-medium text-gray-700"
          >
            Normal Posture with Eyes Occluded
          </label>
          <input
            type="text"
            name="normalPostureWithEyesOccluded"
            id="normalPostureWithEyesOccluded"
            value={formData.normalPostureWithEyesOccluded}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="pushBackwardsWithEyesOccluded"
            className="block text-xs font-medium text-gray-700"
          >
            Push Backwards with Eyes Occluded
          </label>
          <input
            type="text"
            name="pushBackwardsWithEyesOccluded"
            id="pushBackwardsWithEyesOccluded"
            value={formData.pushBackwardsWithEyesOccluded}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="pushForwardsWithEyesOccluded"
            className="block text-xs font-medium text-gray-700"
          >
            Push Forwards with Eyes Occluded
          </label>
          <input
            type="text"
            name="pushForwardsWithEyesOccluded"
            id="pushForwardsWithEyesOccluded"
            value={formData.pushForwardsWithEyesOccluded}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="pushRightToLeftSidewaysWithEyesOccluded"
            className="block text-xs font-medium text-gray-700"
          >
            Push Right to Left Sideways with Eyes Occluded
          </label>
          <input
            type="text"
            name="pushRightToLeftSidewaysWithEyesOccluded"
            id="pushRightToLeftSidewaysWithEyesOccluded"
            value={formData.pushRightToLeftSidewaysWithEyesOccluded}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="pushLeftToRightSidewaysWithEyesOccluded"
            className="block text-xs font-medium text-gray-700"
          >
            Push Left to Right Sideways with Eyes Occluded
          </label>
          <input
            type="text"
            name="pushLeftToRightSidewaysWithEyesOccluded"
            id="pushLeftToRightSidewaysWithEyesOccluded"
            value={formData.pushLeftToRightSidewaysWithEyesOccluded}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="feetTogetherWithEyesOccluded"
            className="block text-xs font-medium text-gray-700"
          >
            Feet Together with Eyes Occluded
          </label>
          <input
            type="text"
            name="feetTogetherWithEyesOccluded"
            id="feetTogetherWithEyesOccluded"
            value={formData.feetTogetherWithEyesOccluded}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="withSupport"
            className="block text-xs font-medium text-gray-700"
          >
            With Support
          </label>
          <input
            type="text"
            name="withSupport"
            id="withSupport"
            value={formData.withSupport}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="withoutSupport"
            className="block text-xs font-medium text-gray-700"
          >
            Without Support
          </label>
          <input
            type="text"
            name="withoutSupport"
            id="withoutSupport"
            value={formData.withoutSupport}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="lookForHipAbduction"
            className="block text-xs font-medium text-gray-700"
          >
            Look for Hip (Abduction)
          </label>
          <input
            type="text"
            name="lookForHipAbduction"
            id="lookForHipAbduction"
            value={formData.lookForHipAbduction}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="standingQuadripodPosition"
            className="block text-xs font-medium text-gray-700"
          >
            Standing Quadripod Position
          </label>
          <input
            type="text"
            name="standingQuadripodPosition"
            id="standingQuadripodPosition"
            value={formData.standingQuadripodPosition}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="frenkelsWithVariousAngles"
            className="block text-xs font-medium text-gray-700"
          >
            Frenkel's With Various Angles
          </label>
          <input
            type="text"
            name="frenkelsWithVariousAngles"
            id="frenkelsWithVariousAngles"
            value={formData.frenkelsWithVariousAngles}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="singleLegSmallKneeBend"
            className="block text-xs font-medium text-gray-700"
          >
            Single-Leg Small Knee Bend
          </label>
          <input
            type="text"
            name="singleLegSmallKneeBend"
            id="singleLegSmallKneeBend"
            value={formData.singleLegSmallKneeBend}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="dorsiflexionAndPlantarflexionOnWeightBearing"
            className="block text-xs font-medium text-gray-700"
          >
            Dorsiflexion and Plantarflexion on Weight Bearing
          </label>
          <input
            type="text"
            name="dorsiflexionAndPlantarflexionOnWeightBearing"
            id="dorsiflexionAndPlantarflexionOnWeightBearing"
            value={formData.dorsiflexionAndPlantarflexionOnWeightBearing}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="ankleAndFootFullWeightBearingWithSmallKneeBend"
            className="block text-xs font-medium text-gray-700"
          >
            Ankle and Foot - Full Weight Bearing With Small Knee Bend
          </label>
          <input
            type="text"
            name="ankleAndFootFullWeightBearingWithSmallKneeBend"
            id="ankleAndFootFullWeightBearingWithSmallKneeBend"
            value={formData.ankleAndFootFullWeightBearingWithSmallKneeBend}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="nystagmus"
            className="block text-xs font-medium text-gray-700"
          >
            Nystagmus
          </label>
          <input
            type="text"
            name="nystagmus"
            id="nystagmus"
            value={formData.nystagmus}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="fingerToFinger"
            className="block text-xs font-medium text-gray-700"
          >
            Finger to Finger (Speed Gradually Increased)
          </label>
          <input
            type="text"
            name="fingerToFinger"
            id="fingerToFinger"
            value={formData.fingerToFinger}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="fingerToNose"
            className="block text-xs font-medium text-gray-700"
          >
            Finger to Nose (Speed Gradually Increased)
          </label>
          <input
            type="text"
            name="fingerToNose"
            id="fingerToNose"
            value={formData.fingerToNose}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="fingerOpposition"
            className="block text-xs font-medium text-gray-700"
          >
            Finger Opposition (Speed Gradually Increased)
          </label>
          <input
            type="text"
            name="fingerOpposition"
            id="fingerOpposition"
            value={formData.fingerOpposition}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="pronationSupination"
            className="block text-xs font-medium text-gray-700"
          >
            Pronation / Supination
          </label>
          <input
            type="text"
            name="pronationSupination"
            id="pronationSupination"
            value={formData.pronationSupination}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="massGrasp"
            className="block text-xs font-medium text-gray-700"
          >
            Mass Grasp
          </label>
          <input
            type="text"
            name="massGrasp"
            id="massGrasp"
            value={formData.massGrasp}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="handTapping"
            className="block text-xs font-medium text-gray-700"
          >
            Hand Tapping
          </label>
          <input
            type="text"
            name="handTapping"
            id="handTapping"
            value={formData.handTapping}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="alternateHeelToKnee"
            className="block text-xs font-medium text-gray-700"
          >
            Alternate Heel to Knee
          </label>
          <input
            type="text"
            name="alternateHeelToKnee"
            id="alternateHeelToKnee"
            value={formData.alternateHeelToKnee}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="feetTapping"
            className="block text-xs font-medium text-gray-700"
          >
            Feet Tapping
          </label>
          <input
            type="text"
            name="feetTapping"
            id="feetTapping"
            value={formData.feetTapping}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="drawingCircleInHand"
            className="block text-xs font-medium text-gray-700"
          >
            Drawing a circle in Hand
          </label>
          <input
            type="text"
            name="drawingCircleInHand"
            id="drawingCircleInHand"
            value={formData.drawingCircleInHand}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-full">
          <label
            htmlFor="drawingCircleInFoot"
            className="block text-xs font-medium text-gray-700"
          >
            Drawing a circle in Foot
          </label>
          <input
            type="text"
            name="drawingCircleInFoot"
            id="drawingCircleInFoot"
            value={formData.drawingCircleInFoot}
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
          Update Balance Assessment
        </span>
      </button>
    </form>
  );
}

export default BalanceAssessment;
