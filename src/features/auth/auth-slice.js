import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userType: null,
    password: null,
    userName: null,
    rTabNo: 0
  },
  reducers: {
    login(state,action) {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.password = action.payload.userPassword;
      state.userType = action.payload.userType;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = null
      state.password = null
      state.userType = null
    },
    setUserType(state, action) {
      state.userType = action.payload;
    },
    setRTabNo(state,action)
    {
      state.rTabNo = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
