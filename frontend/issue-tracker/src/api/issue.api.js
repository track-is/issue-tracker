import axios from "axios";
import delay from "delay";
import { getFromLS } from "../lib/localstore";

const BASE_URL = "http://localhost:8080/issues";

export const fetchIssue = async (payload) => {
  const { id } = { ...payload };
  if (id) {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }
};

export const fetchIssuesList = async (searchParams) => {
  const accessToken = JSON.parse(getFromLS("user"))?.accessToken;
  const res = await axios.get(`${BASE_URL}`, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    params: searchParams,
  });
  return res.data;
};

export const createIssue = async (payload) => {
  const { data } = { ...payload };
  await delay(2000);
  const res = await axios.post(`${BASE_URL}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const updateIssue = async (payload) => {
  const { id, data } = { ...payload };
  await delay(2000);
  const res = await axios.put(`${BASE_URL}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// export const useFetchIssue = (id) => {
//   return useQuery({
//     queryKey: ["issue"],
//     queryFn: () => fetchIssue(id),
//   });
// };

// export const useFetchIssuesList = () => {
//   return useQuery({
//     queryKey: ["issues"],
//     queryFn: () => fetchIssuesList(),
//   });
// };

// export const useCreateIssue = () => {
//   return useMutation({
//     mutationFn: createIssue,
//     onSuccess: () => {},
//   });
// };

// export const useUpdateIssue = () => {
//   return useMutation({
//     mutationFn: updateIssue,
//     onSuccess: () => {},
//   });
// };
