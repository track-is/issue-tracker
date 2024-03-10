import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../auth.api";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {},
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {},
  });
};
