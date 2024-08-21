import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: 1,
  email: "admin@email.com",
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return { ...state, ...action.payload };
  });
});

export default userReducer;
