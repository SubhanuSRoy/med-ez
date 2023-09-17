import React, { useEffect, useRef, useState } from "react";
import fms1 from "../../../assets/fms1.png";
import fms2 from "../../../assets/fms2.png";
import fms3 from "../../../assets/fms3.png";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
function FMSAssessment({ pDOA }) {
  const patientID = useSelector((state) => state.patient.Patient_Id);
  const patientName = useSelector((state) => state.patient.Patient_Name);

  const [formData, setFormData] = useState({
    singleLimbStanding: "",
    shoulderFlexibility: "",
    extraTips: "",
    squat: "",
    plank: "",
    quadripod: "",
    lunges: "",
    slr: "",
    neckFlexion: "",
    spinalExtension: "",
    spinalFlexion: "",
    spinalRotation: "",
    namazFlexion: "",
    sittingFlexion: "",
    crossFlexion: "",
    sapineFlexion: "",
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

  const getFMSAssessment = () => {
    axios
      .post("https://physioplusbackend.onrender.com/GetFMSAssessment", {
        Patient_Id: patientID,
        Date: pDOA,
      })
      .then((res) => {
        if (
          res.data &&
          res.data.Status != "Not Found" &&
          Object.keys(res.data).length != 0
        ) {
          setFormData({
            singleLimbStanding: res.data.singleLimbStanding,
            shoulderFlexibility: res.data.shoulderFlexibility,
            squat: res.data.squat,
            plank: res.data.plank,
            quadripod: res.data.quadripod,
            lunges: res.data.lunges,
            slr: res.data.slr,
            neckFlexion: res.data.neckFlexion,
            spinalExtension: res.data.spinalExtension,
            spinalFlexion: res.data.spinalFlexion,
            spinalRotation: res.data.spinalRotation,

            namazFlexion: res.data.namazFlexion,
            sittingFlexion: res.data.sittingFlexion,
            crossFlexion: res.data.crossFlexion,
            sapineFlexion: res.data.sapineFlexion,
            extraTips: res.data.extraTips,
          });
          notify("success", "Partial FMS Assessment Fetched for ");
        } else {
          notify("info", "No FMS Assessment previously added for ");
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
      getFMSAssessment();
    }

    return () => (effectRan.current = true);
  }, []);

  const AddFMSQAssessment = async (e) => {
    e.preventDefault();
    axios
      .post("https://physioplusbackend.onrender.com/FMSAssessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        singleLimbStanding: formData.singleLimbStanding,
        shoulderFlexibility: formData.shoulderFlexibility,
        squat: formData.squat,
        plank: formData.plank,
        quadripod: formData.quadripod,
        lunges: formData.lunges,
        slr: formData.slr,
        neckFlexion: formData.neckFlexion,
        spinalExtension: formData.spinalExtension,
        spinalFlexion: formData.spinalFlexion,
        spinalRotation: formData.spinalRotation,
        namazFlexion: formData.namazFlexion,
        sittingFlexion: formData.sittingFlexion,
        crossFlexion: formData.crossFlexion,
        sapineFlexion: formData.sapineFlexion,
        extraTips: formData.extraTips,
      })
      .then((response) => {
        console.log(response);
        notify("success", "FMS Assessment Added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });
  };

  return (
    <form
      className="flex flex-col w-full h-full p-4 bg-white"
      onSubmit={AddFMSQAssessment}
    >
      <ToastContainer />
      <div className="flex items-center w-full gap-4">
        <img src={fms1} className="w-1/2" />
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-4">
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

            <div className="w-1/2">
              <label
                htmlFor="shoulderFlexibility"
                className="block text-xs font-medium text-gray-700"
              >
                FMS Flexibility
              </label>

              <input
                type="text"
                name="shoulderFlexibility"
                id="shoulderFlexibility"
                value={formData.shoulderFlexibility}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="plank"
                className="block text-xs font-medium text-gray-700"
              >
                Plank
              </label>

              <input
                type="text"
                name="plank"
                id="plank"
                value={formData.plank}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="quadripod"
                className="block text-xs font-medium text-gray-700"
              >
                Quadripod
              </label>

              <input
                type="text"
                name="quadripod"
                id="quadripod"
                value={formData.quadripod}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="lunges"
                className="block text-xs font-medium text-gray-700"
              >
                Lunges
              </label>

              <input
                type="text"
                name="lunges"
                id="lunges"
                value={formData.lunges}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="slr"
                className="block text-xs font-medium text-gray-700"
              >
                SLR
              </label>

              <input
                type="text"
                name="slr"
                id="slr"
                value={formData.slr}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="squat"
                className="block text-xs font-medium text-gray-700"
              >
                Squat
              </label>

              <input
                type="text"
                name="squat"
                id="squat"
                value={formData.squat}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="extraTips"
                className="block text-xs font-medium text-gray-700"
              >
                Extra Tips
              </label>

              <input
                type="text"
                name="extraTips"
                id="extraTips"
                value={formData.extraTips}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full gap-4">
        <img src={fms2} className="w-1/2" />
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="neckFlexion"
                className="block text-xs font-medium text-gray-700"
              >
                Neck Flexion
              </label>

              <input
                type="text"
                name="neckFlexion"
                id="neckFlexion"
                value={formData.neckFlexion}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="spinalExtension"
                className="block text-xs font-medium text-gray-700"
              >
                Spinal Extension
              </label>

              <input
                type="text"
                name="spinalExtension"
                id="spinalExtension"
                value={formData.spinalExtension}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="spinalFlexion"
                className="block text-xs font-medium text-gray-700"
              >
                Spinal Flexion
              </label>

              <input
                type="text"
                name="spinalFlexion"
                id="spinalFlexion"
                value={formData.spinalFlexion}
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
        </div>
      </div>
      <div className="flex items-center w-full gap-4">
        <img src={fms3} className="w-1/2" />
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="namazFlexion"
                className="block text-xs font-medium text-gray-700"
              >
                Namaz Flexion
              </label>

              <input
                type="text"
                name="namazFlexion"
                id="namazFlexion"
                value={formData.namazFlexion}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="sittingFlexion"
                className="block text-xs font-medium text-gray-700"
              >
                Sitting Flexion
              </label>

              <input
                type="text"
                name="sittingFlexion"
                id="sittingFlexion"
                value={formData.sittingFlexion}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1/2">
              <label
                htmlFor="crossFlexion"
                className="block text-xs font-medium text-gray-700"
              >
                Cross Flexion
              </label>

              <input
                type="text"
                name="crossFlexion"
                id="crossFlexion"
                value={formData.crossFlexion}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="sapineFlexion"
                className="block text-xs font-medium text-gray-700"
              >
                Sapine Flexion
              </label>

              <input
                type="text"
                name="sapineFlexion"
                id="sapineFlexion"
                value={formData.sapineFlexion}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
              />
            </div>
          </div>
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
          Update FMS Assessment
        </span>
      </button>
    </form>
  );
}

export default FMSAssessment;
