import {
  Alert,
  Anchor,
  AspectRatio,
  Button,
  Checkbox,
  ColorSwatch,
  Image,
  Input,
  PasswordInput,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";
import { useLoginUser } from "../../../api/hooks/useAuthUser";

import viteLogo from "/vite.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { loginSchema } from "../../../lib/validation/auth.schema";
import Spinner from "../../../components/Spinner";

const LoginPage = () => {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { data: res, isSuccess, error, mutate: login } = useLoginUser();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    setIsFormSubmitting(true);

    const payload = {
      data: data,
    };
    console.log(payload);
    login(payload);
  });

  useEffect(() => {
    if (error) setIsFormSubmitting(false);
    if (isSuccess && res?.tokenResponse?.token) {
      setIsFormSubmitting(false);
      dispatch({
        type: "SET_USER",
        user: {
          accessToken: res.tokenResponse.token,
          name: res.name,
        },
      });
      if (isSuccess && locationState) {
        navigate(locationState.from?.pathname);
      } else navigate("/dashboard");
    }
  }, [dispatch, isSuccess, error, res, locationState, navigate]);

  const handleLogin = () => {
    dispatch({
      type: "SET_USER",
      user: {
        accessToken: "sample-token",
        name: "John Sammy",
      },
    });
    if (locationState) {
      navigate(locationState.from?.pathname);
    }
  };
  return (
    <>
      <div className="flex p-4 sm:justify-center md:justify-center justify-between rounded-lg bg-[#f6f6f6]">
        {" "}
        <div
          className="hidden lg:block lg:w-2/5 bg-cover bg-center"
          style={{
            backgroundImage: "url('/login-img.svg')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex flex-col justify-center items-center">
          {" "}
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={viteLogo} alt="logo" />
            Track-us
          </p>
          <div
            className="bg-white rounded-md p-8"
            style={{ minWidth: "480px" }}
          >
            <div className="flex items-center gap-4">
              <ColorSwatch size={12} color="rgba(120, 113, 108, 0.5)" />
              <h3 className="font-bold">Login Here</h3>
            </div>

            <form className=" mt-8 space-y-2 md:space-y-6" action="#">
              {/* {error && (
                  <Alert variant="light" color="red" radius="md">
                    <span className="text-red-800 flex items-center gap-2">
                      <span>Incorrect email or password</span>
                    </span>
                  </Alert>
                )} */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ColorSwatch size={5} color="rgba(41,37,36, 0.5)" />
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                </div>
                {/* <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  /> */}
                <Input
                  variant="default"
                  size="md"
                  radius="md"
                  defaultValue=""
                  placeholder="john@gmail.com"
                  {...register("email")}
                  leftSection={<MdEmail size={16} />}
                />
                {errors.email && (
                  <Alert variant="light" color="red" radius="md">
                    <span className="text-red-800 flex items-center gap-2">
                      <IoInformationCircleOutline /> {errors.email.message}
                    </span>
                  </Alert>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ColorSwatch size={5} color="rgba(41,37,36, 0.5)" />
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                </div>
                {/* <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  /> */}
                <PasswordInput
                  variant="default"
                  size="md"
                  radius="md"
                  placeholder="********"
                  defaultValue=""
                  {...register("password")}
                  leftSection={<RiLockPasswordFill size={16} />}
                />
                {errors.password && (
                  <Alert variant="light" color="red" radius="md">
                    <span className="text-red-800 flex items-center gap-2">
                      <IoInformationCircleOutline /> {errors.password.message}
                    </span>
                  </Alert>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    {/* <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      /> */}
                    <Checkbox
                      defaultChecked={false}
                      label="Remember Me"
                      color="blue"
                      size="sm"
                      {...register("rememberMe")}
                    />
                  </div>
                  {/* <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div> */}
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                fullWidth
                className="text-base cursor-pointer"
                variant="filled"
                color="blue"
                size="sm"
                radius="md"
                rightSection={
                  isFormSubmitting ? (
                    <Spinner />
                  ) : (
                    <FaArrowRightLong size={16} />
                  )
                }
                disabled={isFormSubmitting}
                onClick={onSubmit}
              >
                Sign In
              </Button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p> */}
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account yet ?</p>
              <Link
                to="/auth/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                <Button variant="default"> Sign up</Button>
              </Link>
              {/* <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">
                Register
              </button> */}
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default LoginPage;
