import React, { lazy } from "react";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/General/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/auth/auth-slice";
import AddPatient from "./Components/Receptionist/AddPatient/AddPatient";
import AddBasicAssessment from "./Components/Receptionist/AddBasicAssessment/AddBasicAssessment";

import PatientFeedback from "./Components/Receptionist/PatientFeedback/PatientFeedback";
import ViewPatient from "./Components/Common/ViewPatient/ViewPatient";
import TodayPatients from "./Components/Common/TodayPatients/TodayPatients";
import AddAssessment from "./Components/SrDoctor/AddAssessment/AddAssessment";

import ViewPatients from "./Components/Common/ViewPatients/ViewPatients";
import EditPatient from "./Components/Receptionist/EditPatient/EditPatient";
import TreatmentTracker from "./Components/JrDoctor/TreatmentTracker/TreatmentTracker";
import AddReview from "./Components/Common/Review/AddReview";
import AllReviews from "./Components/Common/Review/AllReviews";
import ViewReview from "./Components/Common/Review/ViewReview";
import AddBasicParQ from "./Components/Trainer/AddBasicParQ";
import RehabDetails from "./Components/Trainer/RehabDetails";
import ExerciseSchedule from "./Components/Trainer/ExerciseSchedule";
import ExerciseTracker from "./Components/Trainer/ExerciseTracker";
import CreateBill from "./Components/Receptionist/Bill/CreateBill";
import AllRevisits from "./Components/SrDoctor/Revisits/AllRevisits";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const isLoggedIn=true;
  const userType = useSelector((state) => state.auth.userType);
  // const userType="Receptionist"

  const userExists = localStorage.getItem("user_exists");
  const userName = localStorage.getItem("username");
  const password = localStorage.getItem("passwords");

  const dispatch = useDispatch();

  // dispatch(
  //   authActions.login({
  //     userPassword: password,
  //     userName: userName,
  //     userType: userType,
  //   })
  // );

  return (
    <div>
      {!isLoggedIn && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {isLoggedIn && userType == "Receptionist" && (
        <Routes>
          <Route
            path="/receptionist/dashboard/addPatient"
            element={
              <Dashboard>
                <AddPatient />
              </Dashboard>
            }
          />
          <Route
            path="/receptionist/dashboard/addBasicAssessment/:pId"
            element={
              <Dashboard>
                <AddBasicAssessment />
              </Dashboard>
            }
          />
          <Route
            path="/receptionist/dashboard/viewPatients"
            element={
              <Dashboard>
                <ViewPatients />
              </Dashboard>
            }
          />
          <Route
            path="/receptionist/dashboard/editPatient/:pId"
            element={
              <Dashboard>
                <EditPatient />
              </Dashboard>
            }
          />
          <Route
            path="/receptionist/dashboard/viewPatient/:pId"
            element={
              <Dashboard>
                <ViewPatient />
              </Dashboard>
            }
          />
          <Route
            path="/receptionist/dashboard/patientFeedback"
            element={
              <Dashboard>
                <PatientFeedback />
              </Dashboard>
            }
          />
          <Route
            path="/receptionist/dashboard/createBill"
            element={
              <Dashboard>
                <CreateBill />
              </Dashboard>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/receptionist/dashboard/addPatient" />}
          />
        </Routes>
      )}
      {isLoggedIn && userType == "Senior Doctor" && (
        <Routes>
          <Route
            path="/srDoctor/dashboard/todayPatients"
            element={
              <Dashboard>
                <TodayPatients />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/addDocAssessment/:pId"
            element={
              <Dashboard>
                <AddAssessment />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/viewPatients"
            element={
              <Dashboard>
                <ViewPatients />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/viewPatient/:pId"
            element={
              <Dashboard>
                <ViewPatient />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/allReviews"
            element={
              <Dashboard>
                <AllReviews />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/ViewReview/:pid/:DateOfReview"
            element={
              <Dashboard>
                <ViewReview />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/rehabDetails"
            element={
              <Dashboard>
                <RehabDetails />
              </Dashboard>
            }
          />
          <Route
            path="/srDoctor/dashboard/revisits"
            element={
              <Dashboard>
                <AllRevisits />
              </Dashboard>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/srDoctor/dashboard/todayPatients" />}
          />
        </Routes>
      )}
      {isLoggedIn && userType == "Junior Doctor" && (
        <Routes>
          <Route
            path="/jrDoctor/dashboard/todayPatients"
            element={
              <Dashboard>
                <TodayPatients />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/addDocAssessment/:pId"
            element={
              <Dashboard>
                <AddAssessment />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/viewPatients"
            element={
              <Dashboard>
                <ViewPatients />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/viewPatient/:pId"
            element={
              <Dashboard>
                <ViewPatient />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/treatmentTracker"
            element={
              <Dashboard>
                <TreatmentTracker />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/addReview"
            element={
              <Dashboard>
                <AddReview />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/viewReviews"
            element={
              <Dashboard>
                <AllReviews />
              </Dashboard>
            }
          />
          <Route
            path="/jrDoctor/dashboard/ViewReview/:pid/:DateOfReview"
            element={
              <Dashboard>
                <ViewReview />
              </Dashboard>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/jrDoctor/dashboard/todayPatients" />}
          />
        </Routes>
      )}
      {isLoggedIn && userType == "Trainer" && (
        <Routes>
          <Route
            path="/trainer/dashboard/todayPatients"
            element={
              <Dashboard>
                <TodayPatients />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/addBasicParQ/:pId"
            element={
              <Dashboard>
                <AddBasicParQ />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/viewPatients"
            element={
              <Dashboard>
                <ViewPatients />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/viewPatient/:pId"
            element={
              <Dashboard>
                <ViewPatient />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/treatmentTracker"
            element={
              <Dashboard>
                <TreatmentTracker />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/rehabDetails"
            element={
              <Dashboard>
                <RehabDetails />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/addReview"
            element={
              <Dashboard>
                <AddReview />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/allReviews"
            element={
              <Dashboard>
                <AllReviews />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/ViewReview/:pid/:DateOfReview"
            element={
              <Dashboard>
                <ViewReview />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/exerciseSchedule"
            element={
              <Dashboard>
                <ExerciseSchedule />
              </Dashboard>
            }
          />
          <Route
            path="/trainer/dashboard/exerciseTracker"
            element={
              <Dashboard>
                <ExerciseTracker />
              </Dashboard>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/trainer/dashboard/todayPatients" />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
