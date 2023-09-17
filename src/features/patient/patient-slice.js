import { createSlice } from "@reduxjs/toolkit";

const nullState = {
  Patient_Id: null,
  Patient_Name: null,
  Patient_Email: null,
  Patient_Age: null,
  Patient_Gender: null,
  Patient_Height: null,
  Patient_Weight: null,
  Patient_Contact_No: null,
  Employed: false,
  Occupation: null,
  Address: null,
  Assesment: [],
};

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    Patient_Id: null,
    Patient_Name: null,
    Patient_Email: null,
    Patient_Age: null,
    Patient_Gender: null,
    Patient_Height: null,
    Patient_Weight: null,
    Patient_Contact_No: null,
    Employed: false,
    Occupation: null,
    Address: null,
    Assesment: [],
  },
  reducers: {
    addPatient(state, action) {
      state.Patient_Id = action.payload.Patient_Id;
      state.Patient_Name = action.payload.Patient_Name;
      state.Patient_Email= action.payload.Patient_Email;
      state.Patient_Age = action.payload.Patient_Age;
      state.Patient_Gender = action.payload.Patient_Gender;
      state.Patient_Height = action.payload.Patient_Height;
      state.Patient_Contact_No = action.payload.Patient_Contact_No;
      state.Patient_Weight = action.payload.Patient_Weight;
      state.Employed = action.payload.Employed;
      state.Address = action.payload.Address;
      state.Occupation = action.payload.Occupation;
    }, 
    setPatient(state, action) {
      state.Patient_Id = action.payload.Patient_Id;
      state.Patient_Name = action.payload.Patient_Name;
      state.Patient_Email= action.payload.Patient_Email;
      state.Patient_Age = action.payload.Patient_Age;
      state.Patient_Gender = action.payload.Patient_Gender;
      state.Patient_Height = action.payload.Patient_Height;
      state.Patient_Contact_No = action.payload.Patient_Contact_No;
      state.Patient_Weight = action.payload.Patient_Weight;
      state.Employed = action.payload.Employed;
      state.Address = action.payload.Address;
      state.Occupation = action.payload.Occupation;
      state.Assesment = action.payload.Assesment;
    },
    // logout(state) {
    //   state.isLoggedIn = false;
    //   state.userName = null
    //   state.password = null
    //   state.userType = null
    // },
    resetPatient(state) {
      Object.assign(state, nullState)
  }
  },
});

export const patientActions = patientSlice.actions;

export default patientSlice;
