import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";
// import seeker from "../../assets/images/seeker.png";
// import contributor from "../../assets/images/contributor.png";

function ChooseType() {
  const dispatch = useDispatch();
  const makeReceptionist = () => {
    dispatch(authActions.setUserType("Receptionist"));
  };
  const makeSrDoctor = () => {
    dispatch(authActions.setUserType("Senior Doctor"));
  };
  const makeJrDoctor = () => {
    dispatch(authActions.setUserType("Junior Doctor"));
  };
  const makeTrainer = () => {
    dispatch(authActions.setUserType("Trainer"));
  };
  return (
    <div>
      <h1 class="relative p-4 rounded-md text-center mb-12 text-gray-100 font-extrabold text-5xl bg-purple-900">
        Med-ez
      </h1>
      <div className="flex flex-wrap w-full justify-center gap-4 md:gap-12">
        {/* Receptionist */}
        <motion.div
          class="  cursor-pointer"
          whileHover={{ scale: 0.9 }}
          onClick={makeReceptionist}
        >
          <div class="max-w-sm mx-auto shadow-lg ">
            <div class="relative bg-white border-gray-800 border-2 rounded-lg shadow-lg p-2 sm:p-5 ">
              <div class="flex flex-col items-center justify-center gap-4">
                <div class="text-xl sm:text-2xl text-center flex-wrap font-bold uppercase text-gray-900 tracking-widest mb-2">
                  Receptionist
                </div>
                <img
                  src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?w=740&t=st=1681289914~exp=1681290514~hmac=07b8e7ebe8a66e1d46aab222cd4189b9b638a0ed25f94720a83cc2a3339df6ea"
                  className="h-32 sm:h-40"
                />

                <a
                  class="inline-flex w-11 h-11 justify-center items-center bg-purple-600 hover:bg-purple-600-300 text-pink-50 hover:text-white rounded-full transition duration-150"
                  href="#0"
                >
                  <span class="sr-only">Read more</span>{" "}
                  <span class="font-bold -mt-px">▶</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Senior Doctor */}
        <motion.div
          class="h-full cursor-pointer"
          whileHover={{ scale: 0.9 }}
          onClick={makeSrDoctor}
        >
          <div class="max-w-sm mx-auto shadow-lg">
            <div class="relative bg-white border-gray-800 border-2 rounded-lg shadow-lg p-2 sm:p-5 overflow-hidden h-1/2">
              <div class="flex flex-col items-center justify-center gap-4 h-full">
                <div class="text-xl sm:text-2xl text-center flex-wrap font-bold uppercase text-gray-900 tracking-widest mb-2">
                  Senior Doctor
                </div>
                <img
                  src="https://img.freepik.com/free-vector/doctor-nurse-study-discuss-xray-patient-lung-image-man-pulmonologist-woman-therapist-assistant-examine-fluorography-result-disease-determination_575670-456.jpg?w=740&t=st=1681290762~exp=1681291362~hmac=b7ba9c2eb7113273f7ccf84d96ca6234d064f99ecc0c3f5ce68f94596a56a972"
                  className="h-32 sm:h-40"
                />
                {/* <h3 class="text-2xl font-extrabold text-purple-600 leading-snug mb-2">
                  Find jobs, courses, mentors
                </h3> */}
                {/* <p class="text-gray-500 text-center">
                To <span className="text-purple-600">assess</span> and
                  <span className="text-purple-600"> prescribe</span> patients
                </p> */}
                <a
                  class=" inline-flex w-11 h-11 justify-center items-center bg-purple-600 hover:bg-purple-600-300 text-pink-50 hover:text-white rounded-full transition duration-150"
                  href="#0"
                >
                  <span class="sr-only">Read more</span>{" "}
                  <span class="font-bold -mt-px">▶</span>
                </a>
              </div>
            </div>
          </div>
          {/* Junior Doctor */}
        </motion.div>{" "}
        <motion.div
          class="h-full cursor-pointer"
          whileHover={{ scale: 0.9 }}
          onClick={makeJrDoctor}
        >
          <div class="max-w-xs mx-auto shadow-lg">
            <div class="relative bg-white border-gray-800 border-2 rounded-lg shadow-lg p-2 sm:p-5 overflow-hidden h-1/2">
              <div class="flex flex-col items-center justify-center gap-4 h-full">
                <div class="text-xl sm:text-2xl text-center font-bold uppercase text-gray-900 tracking-widest mb-2 flex-wrap">
                  Junior Doctor
                </div>
                <img
                  src="https://img.freepik.com/free-vector/doctor-taking-blood-sample-old-patient-hospital-man-doing-checkup-examination-clinic-senior-sitting-chair_575670-1318.jpg?size=626&ext=jpg&ga=GA1.1.464764741.1681289865"
                  className="h-32 sm:h-40"
                />
                {/* <h3 class="text-2xl font-extrabold text-purple-600 leading-snug mb-2">
                  Find jobs, courses, mentors
                </h3> */}
                {/* <p class="text-gray-500 text-center">
                To <span className="text-purple-600">assess</span> and
                  <span className="text-purple-600"> prescribe</span> patients
                </p> */}
                <a
                  class=" inline-flex w-11 h-11 justify-center items-center bg-purple-600 hover:bg-purple-600-300 text-pink-50 hover:text-white rounded-full transition duration-150"
                  href="#0"
                >
                  <span class="sr-only">Read more</span>{" "}
                  <span class="font-bold -mt-px">▶</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Trainer */}
        <motion.div
          class="h-full cursor-pointer"
          whileHover={{ scale: 0.9 }}
          onClick={makeTrainer}
        >
          <div class="w-64 mx-auto shadow-lg">
            <div class="relative bg-white border-gray-800 border-2 rounded-lg shadow-lg p-2 sm:p-5 overflow-hidden h-1/2">
              <div class="flex flex-col items-center justify-center gap-4 h-full">
                <div class="text-xl sm:text-2xl text-center font-bold uppercase text-gray-900 tracking-widest mb-2 flex-wrap">
                  Trainer
                </div>
                <img
                  src="https://img.freepik.com/free-vector/man-doctor-woman-nurse-stand-with-patient-card-medical-staff-uniform-study-discuss-examination-result-make-note-therapist-giving-treatment-recommendation-prescription-putting-signature_575670-1316.jpg?w=740&t=st=1681291120~exp=1681291720~hmac=bcf5750ea5c45f712a6ae8a69fd886862efceede1cabaa1bb6fd32e6f33168f4"
                  className="h-32 sm:h-40"
                />
                {/* <h3 class="text-2xl font-extrabold text-purple-600 leading-snug mb-2">
                  Find jobs, courses, mentors
                </h3> */}
                {/* <p class="text-gray-500 text-center">
                To <span className="text-purple-600">assess</span> and
                  <span className="text-purple-600"> prescribe</span> patients
                </p> */}
                <a
                  class=" inline-flex w-11 h-11 justify-center items-center bg-purple-600 hover:bg-purple-600-300 text-pink-50 hover:text-white rounded-full transition duration-150"
                  href="#0"
                >
                  <span class="sr-only">Read more</span>{" "}
                  <span class="font-bold -mt-px">▶</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ChooseType;
