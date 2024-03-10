import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchIssue,
  fetchIssuesList,
  createIssue,
  updateIssue,
} from "../issue.api";

export const useFetchIssue = (id) => {
  return useQuery({
    queryKey: ["issue"],
    queryFn: () => fetchIssue(id),
  });
};

export const useFetchIssuesList = (searchParams) => {
  return useQuery({
    queryKey: ["issues"],
    queryFn: () => fetchIssuesList(searchParams),
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export const useCreateIssue = () => {
  return useMutation({
    mutationFn: createIssue,
    onSuccess: () => {},
  });
};

export const useUpdateIssue = () => {
  return useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {},
  });
};
