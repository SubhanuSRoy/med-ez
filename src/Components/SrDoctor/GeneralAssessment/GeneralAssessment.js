import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { ToastContainer, toast } from "react-toastify";

function GeneralAssessment({ pDOA }) {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  const patientName = useSelector((state) => state.patient.Patient_Name);
  const patientID = useSelector((state) => state.patient.Patient_Id);

  // const [ass, setAss] = useState({});

  // injury date
  const [referredBy, setreferredBy] = useState(null);
  const [presentSA, setpresentSA] = useState(null);
  const [pastSA, setpastSA] = useState(null);
  const [refReason, setrefReason] = useState(null);

  const [BP, setBP] = useState(null);
  const [SPO2, setSPO2] = useState(null);
  const [Temp, setTemp] = useState(null);
  const [OtherVitals, setOtherVitals] = useState(null);
  const [RR, setRR] = useState(null);

  const [stiffness, setStiffness] = useState(null);

  const [ROMExam, setROMExam] = useState(null);
  const [dermatomes, setdermatomes] = useState(null);
  const [jointPlayMovements, setjointPlayMovements] = useState(null);
  const [dtr, setdtr] = useState(null);
  const [funcQuestionnares, setfuncQuestionnares] = useState(null);
  const [deformity, setdeformity] = useState(null);
  const [resistedIsometric, setresistedIsometric] = useState(null);
  const [specialTest, setspecialTest] = useState(null);
  const [plan, setplan] = useState(null);

  const [grading, setgrading] = useState(null);
  const [painRating, setpainRating] = useState(5);
  const [personal, setPersonal] = useState([]);
  const [painAss, setpainAss] = useState([]);
  const [duration, setduration] = useState([]);
  const [bones, setbones] = useState([]);
  const [ligament, setligament] = useState([]);
  const [muscle, setmuscle] = useState([]);
  const [arterioles, setarterioles] = useState([]);
  const [visceral, setvisceral] = useState([]);
  const [neural, setneural] = useState([]);
  const [irritability, setirritability] = useState([]);
  const [KCO, setKCO] = useState([]);

  const KCOOptions = [
    { value: "DM", label: "DM" },
    { value: "HT", label: "HT" },
    { value: "CAD", label: "CAD" },
    { value: "Thyroid", label: "Thyroid" },
    { value: "IHD", label: "IHD" },
    { value: "Osteo", label: "Osteo" },
    { value: "Hyst", label: "Hyst" },
    { value: "Choles", label: "Choles" },
    { value: "CABG", label: "CABG" },
    { value: "CA", label: "CA" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const personalOptions = [
    { value: "Married", label: "Married" },
    { value: "Smoker", label: "Smoker" },
    { value: "Alcoholic", label: "Alcoholic" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const painAssOptions = [
    { value: "Traumatic", label: "Traumatic" },
    { value: "Gradual", label: "Gradual" },
    { value: "Insidious", label: "Insidious" },
    { value: "Acute", label: "Acute" },
    { value: "Sub-acute", label: "Sub-acute" },
    { value: "Chronic", label: "Chronic" },
    { value: "Chronic Episodal", label: "Chronic Episodal" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const durationOptions = [
    { value: "Months", label: "Months" },
    { value: "Years", label: "Years" },
    { value: "Weeks", label: "Weeks" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const irritabilityOptions = [
    { value: "Continuous", label: "Continuous" },
    { value: "Intermittent", label: "Intermittent" },
    { value: "Transient", label: "Transient" },
    { value: "Sleep Disturbance", label: "Sleep Disturbance" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const muscleOptions = [
    { value: "Cramping", label: "Cramping" },
    { value: "Aching", label: "Aching" },
    { value: "Throbbing", label: "Throbbing" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const ligamentOptions = [
    { value: "Sharp", label: "Sharp" },
    { value: "Stabbing", label: "Stabbing" },
    { value: "Pricking", label: "Pricking" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const bonesOptions = [
    { value: "Deep", label: "Deep" },
    { value: "Nagging", label: "Nagging" },
    { value: "Dull", label: "Dull" },
    { value: "Boring", label: "Boring" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const arteriolesOptions = [
    { value: "Diffuse", label: "Diffuse" },
    { value: "Throbbing", label: "Throbbing" },
    { value: "Burning", label: "Burning" },
    { value: "Cramping", label: "Cramping" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const visceralOptions = [
    { value: "Referred", label: "Referred" },
    { value: "Jumping", label: "Jumping" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const neuralOptions = [
    { value: "Sharp", label: "Sharp" },
    { value: "Lightening", label: "Lightening" },
    { value: "Shooting", label: "Shooting" },
    { value: "Threading", label: "Threading" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];

  const handleKCO = (selectedOption) => {
    console.log(selectedOption);
    setKCO(selectedOption);
  };
  const handlePersonal = (selectedOption) => {
    setPersonal(selectedOption);
  };
  const handlePainAssessment = (selectedOption) => {
    setpainAss(selectedOption);
  };
  const handleDuration = (selectedOption) => {
    setduration(selectedOption);
  };
  const handleIrritability = (selectedOption) => {
    setirritability(selectedOption);
  };
  const handleBones = (selectedOption) => {
    setbones(selectedOption);
  };
  const handleLigament = (selectedOption) => {
    setligament(selectedOption);
  };
  const handleMuscle = (selectedOption) => {
    setmuscle(selectedOption);
  };
  const handleNeural = (selectedOption) => {
    setneural(selectedOption);
  };
  const handleVisceral = (selectedOption) => {
    setvisceral(selectedOption);
  };
  const handleArterioles = (selectedOption) => {
    setarterioles(selectedOption);
  };

  const [bodyBuilt, setBodyBuilt] = useState([]);
  const bodyBuiltOptions = [
    { value: "Ectomorph", label: "Ectomorph" },
    { value: "Mesomorph", label: "Mesomorph" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
    { value: "Endomorphic", label: "Endomorphic" },
  ];
  const handleBodyBuilt = (selectedOption) => {
    setBodyBuilt(selectedOption);
  };

  const [posture, setPosture] = useState([]);
  const postureOptions = [
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handlePosture = (selectedOption) => {
    setPosture(selectedOption);
  };

  const [cervical, setCervical] = useState([]);
  const cervicalOptions = [
    { value: "FHP", label: "FHP" },
    { value: "Chin Poke", label: "Chin Poke" },
    { value: "Flat Neck", label: "Flat Neck" },
    {
      value: "Mid Cervical Hinge (C4-C5)",
      label: "Mid Cervical Hinge (C4-C5)",
    },
    { value: "Dowager's", label: "Dowager's" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleCervical = (selectedOption) => {
    setCervical(selectedOption);
  };

  const [lumbarSpine, setLumbarSpine] = useState([]);
  const lumbarSpineOptions = [
    { value: "Kyphosis", label: "Kyphosis" },
    { value: "Scoliosis", label: "Scoliosis" },
    { value: "Sway Back", label: "Sway Back" },
    { value: "Hyper Lordosis", label: "Hyper Lordosis" },
    { value: "Flat Back", label: "Flat Back" },
    { value: "Lordosis", label: "Lordosis" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleLumbarSpine = (selectedOption) => {
    setLumbarSpine(selectedOption);
  };

  const [scapula, setScapula] = useState([]);
  const scapulaOptions = [
    { value: "Elevated Tipped", label: "Elevated Tipped" },
    { value: "Downward Rotated", label: "Downward Rotated" },
    { value: "Inferior Tipped", label: "Inferior Tipped" },
    { value: "Winging", label: "Winging" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleScapula = (selectedOption) => {
    setScapula(selectedOption);
  };

  const [oedema, setOedema] = useState([]);
  const oedemaOptions = [
    { value: "Pitting", label: "Pitting" },
    { value: "Non-pitting", label: "Non-pitting" },
    { value: "Skin Changes", label: "Skin Changes" },
    { value: "Temperature", label: "Temperature" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleOedema = (selectedOption) => {
    setOedema(selectedOption);
  };

  const [muscleWasting, setMuscleWasting] = useState([]);
  const muscleWastingOptions = [
    { value: "Yes", label: "Yes" },

    { value: "No", label: "No" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleMuscleWasting = (selectedOption) => {
    setMuscleWasting(selectedOption);
  };

  const [attitudeOfLimb, setAttitudeOfLimb] = useState([]);
  const attitudeOfLimbOptions = [
    { value: "Wound", label: "Wound" },
    { value: "Scars", label: "Scars" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleAttitudeOfLimb = (selectedOption) => {
    setAttitudeOfLimb(selectedOption);
  };

  const [onPalpation, setOnPalpation] = useState([]);
  const onPalpationOptions = [
    { value: "Warmth", label: "Warmth" },
    { value: "Crepitus", label: "Crepitus" },
    { value: "Nodules", label: "Nodules" },
    { value: "Spasm", label: "Spasm" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleOnPalpation = (selectedOption) => {
    setOnPalpation(selectedOption);
  };

  const [limbLength, setLimbLength] = useState([]);
  const limbLengthOptions = [
    { value: "True", label: "True" },
    { value: "Apparent", label: "Apparent" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleLimbLength = (selectedOption) => {
    setLimbLength(selectedOption);
  };

  const [gait, setGait] = useState([]);
  const gaitOptions = [
    { value: "Trendelenburg", label: "Trendelenburg" },
    { value: "Antalgic", label: "Antalgic" },
    { value: "Lurching", label: "Lurching" },
    { value: "Waddling", label: "Waddling" },
    { value: "Others", label: "Others" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleGait = (selectedOption) => {
    setGait(selectedOption);
  };

  const [endFeel, setEndFeel] = useState([]);
  const endFeelOptions = [
    { value: "Bony/Hard", label: "Bony/Hard" },
    { value: "Soft Tissue", label: "Soft Tissue" },
    { value: "Firm", label: "Firm" },
    { value: "Empty", label: "Empty" },
    { value: "Nill", label: "Nill" },
    { value: "Normal", label: "Normal" },
  ];
  const handleEndFeel = (selectedOption) => {
    setEndFeel(selectedOption);
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

  // to delay the next statement
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const navigate = useNavigate();

  const getGeneralAssessment = () => {
    axios
      .post("https://physioplusbackend.onrender.com/GetGeneralAssessment", {
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
          setrefReason(res.data.ReferrenceReason);
          setreferredBy(res.data.ReferredBy);
          setBP(res.data.VitalSigns.BP);
          setTemp(res.data.VitalSigns.Temp);
          setSPO2(res.data.VitalSigns.SPO2);
          setRR(res.data.VitalSigns.RR);
          setOtherVitals(res.data.VitalSigns.OtherVitals);
          setpastSA(res.data.pastSA);
          setpresentSA(res.data.presentSA);
          setKCO(res.data.medKCO);
          setPersonal(res.data.personal);
          setStiffness(res.data.stiffness);
          setduration(res.data.duration);
          setpainAss(res.data.painAssesment);
          setirritability(res.data.irritability);
          setbones(res.data.nature.bones);
          setligament(res.data.nature.ligament);
          setmuscle(res.data.nature.muscle);
          setarterioles(res.data.nature.arterioles);
          setvisceral(res.data.nature.visceral);
          setneural(res.data.nature.neural);
          setBodyBuilt(res.data.observation.bodyBuilt);
          setPosture(res.data.observation.posture);
          setCervical(res.data.observation.cervical);
          setLumbarSpine(res.data.observation.lumbarSpine);
          setScapula(res.data.observation.scapula);
          setOedema(res.data.observation.oedema);
          setMuscleWasting(res.data.observation.muscleWasting);
          setAttitudeOfLimb(res.data.observation.attitudeOfLimb);
          setOnPalpation(res.data.observation.onPalpation);
          setLimbLength(res.data.examination.limbLength);
          setGait(res.data.examination.gait);
          setROMExam(res.data.examination.ROMExam);
          setEndFeel(res.data.examination.endFeel);
          setgrading(res.data.sensoryExamination.grading);
          setdermatomes(res.data.sensoryExamination.dermatomes);
          setdtr(res.data.sensoryExamination.dtr);
          setjointPlayMovements(res.data.sensoryExamination.jointPlayMovements);
          setfuncQuestionnares(res.data.funcQuestionnares);
          setdeformity(res.data.deformity);
          setresistedIsometric(res.data.resistedIsometric);
          setspecialTest(res.data.specialTest);
          setplan(res.data.plan);

          delay(1000);
          notify("success", "General Assessment fetched for ");
        } else {
          notify(
            "info",
            "No General Assessment previously added for this date for "
          );
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
      getGeneralAssessment();
    }

    return () => effectRan.current = true;
  }, []);

  const AddGeneralAssessment = async (e) => {
    e.preventDefault();

    axios
      .post("https://physioplusbackend.onrender.com/GeneralAssessment", {
        Patient_Id: patientID,
        DateOfAssessment: pDOA,
        ReferrenceReason: refReason,
        ReferredBy: referredBy,
        VitalSigns: {
          BP: BP,
          Temp: Temp,
          SPO2: SPO2,
          RR: RR,
          OtherVitals: OtherVitals,
        },
        pastSA: pastSA,
        presentSA: presentSA,
        medKCO: KCO,
        personal: personal,
        stiffness: stiffness,
        duration: duration,
        painAssesment: painAss,
        irritability: irritability,
        nature: {
          bones: bones,
          ligament: ligament,
          muscle: muscle,
          arterioles: arterioles,
          visceral: visceral,
          neural: neural,
        },
        observation: {
          bodyBuilt: bodyBuilt,
          posture: posture,
          cervical: cervical,
          lumbarSpine: lumbarSpine,
          scapula: scapula,
          oedema: oedema,
          muscleWasting: muscleWasting,
          attitudeOfLimb: attitudeOfLimb,
          onPalpation: onPalpation,
        },
        examination: {
          limbLength: limbLength,
          gait: gait,
          ROMExam: ROMExam,
          endFeel: endFeel,
        },
        sensoryExamination: {
          grading: grading,
          dermatomes: dermatomes,
          dtr: dtr,
          jointPlayMovements: jointPlayMovements,
        },
        funcQuestionnares: funcQuestionnares,
        deformity: deformity,
        resistedIsometric: resistedIsometric,
        specialTest: specialTest,
        plan: plan,
      })
      .then((res) => {
        console.log(res);
        notify("success", "General Assessment added for ");
      })
      .catch((error) => {
        console.log(error.message);
        notify(error.message);
      });

    // e.target.reset();
  };

  return (
    <form
      onSubmit={AddGeneralAssessment}
      className="flex flex-col w-full h-full bg-white p-4 gap-4"
    >
      <ToastContainer />

      <div className="flex items-center gap-4">
        <div className="w-3/4">
          <label
            for="ReferenceReason"
            class="block text-xs font-medium text-gray-700"
          >
            Reason for Reference
          </label>

          <input
            type="text"
            placeholder="Head concussion"
            id="ReferenceReason"
            value={refReason}
            onChange={(e) => {
              setrefReason(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/4">
          <label
            for="ReferredBy"
            class="block text-xs font-medium text-gray-700"
          >
            Referred By
          </label>

          <input
            type="text"
            id="ReferredBy"
            value={referredBy}
            onChange={(e) => {
              setreferredBy(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        Vital Signs :
        <div className="w-1/6">
          <label for="BP" class="block text-xs font-medium text-gray-700">
            BP
          </label>

          <input
            type="text"
            id="BP"
            value={BP}
            onChange={(e) => {
              setBP(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/6">
          <label for="Temp" class="block text-xs font-medium text-gray-700">
            Temp
          </label>

          <input
            type="text"
            id="Temp"
            value={Temp}
            onChange={(e) => {
              setTemp(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/6">
          <label for="SPO2" class="block text-xs font-medium text-gray-700">
            SPO2
          </label>

          <input
            type="text"
            id="SPO2"
            value={SPO2}
            onChange={(e) => {
              setSPO2(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/6">
          <label for="RR" class="block text-xs font-medium text-gray-700">
            RR
          </label>

          <input
            type="text"
            id="RR"
            value={RR}
            onChange={(e) => {
              setRR(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
        <div className="w-1/6">
          <label
            for="OtherVitals"
            class="block text-xs font-medium text-gray-700"
          >
            Other Vitals
          </label>

          <input
            type="text"
            id="OtherVitals"
            value={OtherVitals}
            onChange={(e) => {
              setOtherVitals(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            class="block text-xs font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Subjective Assesment (PAST)
          </label>
          <textarea
            value={pastSA}
            onChange={(e) => {
              setpastSA(e.target.value);
            }}
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
        <div className="w-1/2">
          <label
            class="block text-xs font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Subjective Assesment (Present)
          </label>
          <textarea
            value={presentSA}
            onChange={(e) => {
              setpresentSA(e.target.value);
            }}
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
      </div>

      <div className="w-full">
        <label for="Worst" class="block text-xs font-medium text-gray-700">
          Medical K/C/O
        </label>

        <CreatableSelect
          required
          options={KCOOptions}
          onChange={handleKCO}
          isMulti
          value={KCO}
          className="mt-2"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-3/5">
          <label for="Worst" class="block text-xs font-medium text-gray-700">
            Personal
          </label>

          <CreatableSelect
            required
            options={personalOptions}
            req
            onChange={handlePersonal}
            isMulti
            value={personal}
            className="mt-2"
          />
        </div>
        <div className="w-1/5">
          <label
            htmlFor="effective"
            class="block text-xs font-medium text-gray-700"
          >
            Morning Stiffness
          </label>
          <select
            id="effective"
            value={stiffness}
            onChange={(e) => {
              setStiffness(e.target.value);
            }}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-1/5">
          <label for="Worst" class="block text-xs font-medium text-gray-700">
            Duration
          </label>

          <CreatableSelect
            required
            options={durationOptions}
            onChange={handleDuration}
            isMulti
            value={duration}
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-3/4">
          <label for="Worst" class="block text-xs font-medium text-gray-700">
            Pain Assessment
          </label>

          <CreatableSelect
            required
            options={painAssOptions}
            onChange={handlePainAssessment}
            isMulti
            value={painAss}
            className="mt-2"
          />
        </div>
        <div className="w-3/4">
          <label for="Worst" class="block text-xs font-medium text-gray-700">
            Irritability
          </label>

          <CreatableSelect
            required
            options={irritabilityOptions}
            onChange={handleIrritability}
            isMulti
            value={irritability}
            className="mt-2"
          />
        </div>
      </div>
      <p className="text-lg font-bold">Nature</p>
      <div className="flex items-center gap-4">
        <div className="w-1/3">
          <label for="Bones" class="block text-xs font-medium text-gray-700">
            Bones
          </label>

          <CreatableSelect
            required
            options={bonesOptions}
            onChange={handleBones}
            isMulti
            value={bones}
            className="mt-2"
          />
        </div>
        <div className="w-1/3">
          <label for="Ligament" class="block text-xs font-medium text-gray-700">
            Ligament/Tendon/Cap
          </label>

          <CreatableSelect
            required
            options={ligamentOptions}
            onChange={handleLigament}
            isMulti
            value={ligament}
            className="mt-2"
          />
        </div>
        <div className="w-1/3">
          <label for="Muscle" class="block text-xs font-medium text-gray-700">
            Muscle
          </label>

          <CreatableSelect
            required
            options={muscleOptions}
            onChange={handleMuscle}
            isMulti
            value={muscle}
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/3">
          <label for="Bones" class="block text-xs font-medium text-gray-700">
            Arterioles
          </label>

          <CreatableSelect
            required
            options={arteriolesOptions}
            onChange={handleArterioles}
            isMulti
            value={arterioles}
            className="mt-2"
          />
        </div>
        <div className="w-1/3">
          <label for="Ligament" class="block text-xs font-medium text-gray-700">
            Visceral
          </label>

          <CreatableSelect
            required
            options={visceralOptions}
            onChange={handleVisceral}
            isMulti
            value={visceral}
            className="mt-2"
          />
        </div>
        <div className="w-1/3">
          <label for="Muscle" class="block text-xs font-medium text-gray-700">
            Neural
          </label>

          <CreatableSelect
            required
            options={neuralOptions}
            onChange={handleNeural}
            isMulti
            value={neural}
            className="mt-2"
          />
        </div>
      </div>
      <div className="w-full">
        <label for="PainRating" class="block text-xs font-medium text-gray-700">
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
      <p className="text-lg font-bold">On Observation</p>
      <div className="flex items-center gap-4">
        <div className="w-1/3">
          <label
            htmlFor="BodyBuilt"
            className="block text-xs font-medium text-gray-700"
          >
            Body Built
          </label>

          <CreatableSelect
            required
            options={bodyBuiltOptions}
            onChange={handleBodyBuilt}
            isMulti
            value={bodyBuilt}
            className="mt-2"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="Posture"
            className="block text-xs font-medium text-gray-700"
          >
            Posture
          </label>

          <CreatableSelect
            required
            options={postureOptions}
            onChange={handlePosture}
            isMulti
            value={posture}
            className="mt-2"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="Cervical"
            className="block text-xs font-medium text-gray-700"
          >
            Cervical
          </label>

          <CreatableSelect
            required
            options={cervicalOptions}
            onChange={handleCervical}
            isMulti
            value={cervical}
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/3">
          <label
            htmlFor="LumbarSpine"
            className="block text-xs font-medium text-gray-700"
          >
            Lumbar Spine
          </label>

          <CreatableSelect
            required
            options={lumbarSpineOptions}
            onChange={handleLumbarSpine}
            isMulti
            value={lumbarSpine}
            className="mt-2"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="Scapula"
            className="block text-xs font-medium text-gray-700"
          >
            Scapula
          </label>

          <CreatableSelect
            required
            options={scapulaOptions}
            onChange={handleScapula}
            isMulti
            value={scapula}
            className="mt-2"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="Oedema"
            className="block text-xs font-medium text-gray-700"
          >
            Oedema
          </label>

          <CreatableSelect
            required
            options={oedemaOptions}
            onChange={handleOedema}
            isMulti
            value={oedema}
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/3">
          <label
            htmlFor="MuscleWasting"
            className="block text-xs font-medium text-gray-700"
          >
            Muscle Wasting
          </label>

          <CreatableSelect
            required
            options={muscleWastingOptions}
            onChange={handleMuscleWasting}
            isMulti
            value={muscleWasting}
            className="mt-2"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="AttitudeOfLimb"
            className="block text-xs font-medium text-gray-700"
          >
            Attitude of Limb
          </label>

          <CreatableSelect
            required
            options={attitudeOfLimbOptions}
            onChange={handleAttitudeOfLimb}
            isMulti
            value={attitudeOfLimb}
            className="mt-2"
          />
        </div>

        <div className="w-1/3">
          <label
            htmlFor="OnPalpation"
            className="block text-xs font-medium text-gray-700"
          >
            On Palpation
          </label>

          <CreatableSelect
            required
            options={onPalpationOptions}
            onChange={handleOnPalpation}
            isMulti
            value={onPalpation}
            className="mt-2"
          />
        </div>
      </div>
      <p className="text-lg font-bold">On Examination</p>
      <div className="flex items-center gap-4">
        <div className="w-1/2">
          <label
            htmlFor="LimbLength"
            className="block text-xs font-medium text-gray-700"
          >
            Limb Length
          </label>

          <CreatableSelect
            required
            options={limbLengthOptions}
            onChange={handleLimbLength}
            isMulti
            value={limbLength}
            className="mt-2"
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="Gait"
            className="block text-xs font-medium text-gray-700"
          >
            Gait
          </label>
          <CreatableSelect
            required
            options={gaitOptions}
            onChange={handleGait}
            isMulti
            value={gait}
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-3/4">
          <label
            class="block text-xs font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            ROM & Motor Examination (ROM,R,L,R,L,POWER)
          </label>
          <textarea
            value={ROMExam}
            onChange={(e) => {
              setROMExam(e.target.value);
            }}
            placeholder="Enter like this: (ROM,R,L,R,L,POWER),(ROM,R,L,R,L,POWER)"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
        <div className="w-1/4">
          <label
            htmlFor="EndFeel"
            className="block text-xs font-medium text-gray-700"
          >
            End Feel
          </label>
          <CreatableSelect
            required
            options={endFeelOptions}
            onChange={handleEndFeel}
            isMulti
            value={endFeel}
            className="mt-2"
          />
        </div>
      </div>
      <p className="text-lg font-bold">Sensory Examination</p>
      <div className="flex items-center gap-4">
        <div className="w-1/4">
          <label for="Grading" class="block text-xs font-medium text-gray-700">
            Grading
          </label>

          <select
            value={grading}
            onChange={(e) => {
              setgrading(e.target.value);
            }}
            className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
          >
            <option>S0</option>
            <option>S1</option>
            <option>S2</option>
            <option>S3+</option>
            <option>S4</option>
          </select>
        </div>
        <div className="w-3/4">
          <label
            for="dermatomes"
            class="block text-xs font-medium text-gray-700"
          >
            Dermatomes
          </label>

          <input
            type="text"
            id="dermatomes"
            value={dermatomes}
            onChange={(e) => {
              setdermatomes(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-1/4">
          <label for="DTR" class="block text-xs font-medium text-gray-700">
            DTR
          </label>

          <select
            value={dtr}
            onChange={(e) => {
              setdtr(e.target.value);
            }}
            className="mt-1 w-full p-4 rounded-md border-gray-200 shadow-sm sm:text-sm outline-none border-2"
          >
            <option>0+</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
          </select>
        </div>
        <div className="w-3/4">
          <label
            for="jointPlayMovement"
            class="block text-xs font-medium text-gray-700"
          >
            Joint Play Movements
          </label>

          <input
            type="text"
            id="jointPlayMovement"
            value={jointPlayMovements}
            onChange={(e) => {
              setjointPlayMovements(e.target.value);
            }}
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-3/4">
          <label
            class="block text-xs font-medium text-gray-700 mb-2"
            for="grid-password"
          >
            Functional Questionnares
          </label>
          <textarea
            value={funcQuestionnares}
            onChange={(e) => {
              setfuncQuestionnares(e.target.value);
            }}
            rows={5}
            placeholder="Enter like this: (Scale Used,SCORE,D/O/A,D/Q/A,SCORE),(Scale Used,SCORE,D/O/A,D/Q/A,SCORE)"
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
        <div className="w-1/4 flex flex-col">
          <div>
            <label
              for="deformity"
              class="block text-xs font-medium text-gray-700"
            >
              Deformity
            </label>

            <input
              type="text"
              id="deformity"
              value={deformity}
              onChange={(e) => {
                setdeformity(e.target.value);
              }}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
          <div>
            <label
              for="resistedIsometric"
              class="block text-xs font-medium text-gray-700"
            >
              Resisted Isometric
            </label>

            <input
              type="text"
              id="resistedIsometric"
              value={resistedIsometric}
              onChange={(e) => {
                setresistedIsometric(e.target.value);
              }}
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-none p-4 border-2"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <label
          class="block text-xs font-medium text-gray-700 mb-2"
          for="grid-password"
        >
          Special Test
        </label>
        <textarea
          value={specialTest}
          onChange={(e) => {
            setspecialTest(e.target.value);
          }}
          rows={5}
          placeholder="Enter tests separated by comma"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>
      <div className="w-full">
        <label
          class="block text-xs font-medium text-gray-700 mb-2"
          for="grid-password"
        >
          Plan
        </label>
        <textarea
          value={plan}
          onChange={(e) => {
            setplan(e.target.value);
          }}
          rows={5}
          placeholder="Enter plan, if multiple separate by comma"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>

      <button class="w-1/2  group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500">
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
          Update General Assessment
        </span>
      </button>
    </form>
  );
}

export default GeneralAssessment;
