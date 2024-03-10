"use client";
import { createContext, useContext, useReducer } from "react";
import reducer, { getInitialState } from "./reducer";
// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, getInitialState())}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
