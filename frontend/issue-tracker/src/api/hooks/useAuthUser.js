import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser } from "../auth.api";
import { toast } from "sonner";

const TITLE_LOGIN_SUCCESS = "Login success";
const DESC_LOGIN_SUCCESS = "Welcome to the Track-is";
const TITLE_LOGIN_FAIL = "Login failed";
const DESC_LOGIN_FAIL = "Incorrect email or password";

const TITLE_SIGNUP_SUCCESS = "Signup success";
const TITLE_SIGNUP_FAIL = "Signup failed";

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success(TITLE_LOGIN_SUCCESS, {
        description: DESC_LOGIN_SUCCESS,
      });
    },
    onError: () => {
      toast.error(TITLE_LOGIN_FAIL, {
        description: DESC_LOGIN_FAIL,
      });
    },
  });
};

export const useSignupUser = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success(TITLE_SIGNUP_SUCCESS);
    },
    onError: () => {
      toast.error(TITLE_SIGNUP_FAIL);
    },
  });
};
