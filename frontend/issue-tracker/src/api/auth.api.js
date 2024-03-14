import axios from "axios";
import delay from "delay";

const BASE_URL = "http://localhost:8080/auth";

export const loginUser = async (payload) => {
  const { data } = { ...payload };
  await delay(2000);
  const res = await axios.post(`${BASE_URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const signupUser = async (payload) => {
  const { data } = { ...payload };
  await delay(2000);
  const res = await axios.post(`${BASE_URL}/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
