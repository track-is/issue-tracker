import {
  Alert,
  Anchor,
  AspectRatio,
  Button,
  Checkbox,
  Image,
  Input,
  PasswordInput,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";
import { useSignupUser } from "../../../api/hooks/useAuthUser";

import viteLogo from "/vite.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail, MdTextFields } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { signupSchema } from "../../../lib/validation/auth.schema";
import Spinner from "../../../components/Spinner";

const SignupPage = () => {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { data: res, isSuccess, error, mutate: signup } = useSignupUser();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = handleSubmit((data) => {
    setIsFormSubmitting(true);

    const payload = {
      data: data,
    };
    console.log(payload);
    signup(payload);
  });

  useEffect(() => {
    if (error) setIsFormSubmitting(false);
    if (isSuccess) {
      setIsFormSubmitting(false);
      navigate("/auth/login");
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
      <div className="flex gap-4 py-8 px-16 items-center rounded-lg bg-violet-50">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2 lg:w-1/2">
          <img
            className=""
            // width="300"
            // height="300"
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Login Image"
          />
        </div>

        {/* Right Login Form */}
        <section className="w-full rounded-lg dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 lg:py-2">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-8 h-8 mr-2" src={viteLogo} alt="logo" />
              Track-us
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 drop-shadow-lg">
              <div className="space-y-4 md:space-y-6 sm:p-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y-2 md:space-y-2" action="#">
                  {/* {error && (
                  <Alert variant="light" color="red" radius="md">
                    <span className="text-red-800 flex items-center gap-2">
                      <span>Incorrect email or password</span>
                    </span>
                  </Alert>
                )} */}
                  <div className="flex gap-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Name
                      </label>
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
                        defaultValue="Jane"
                        placeholder="Jane"
                        {...register("name")}
                        leftSection={<MdTextFields size={16} />}
                      />
                      {errors.name && (
                        <Alert variant="light" color="red" radius="md">
                          <span className="text-red-800 flex items-center gap-2">
                            <IoInformationCircleOutline /> {errors.name.message}
                          </span>
                        </Alert>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Last Name
                      </label>
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
                        defaultValue="Foster"
                        placeholder="Foster"
                        {...register("lastName")}
                        leftSection={<MdTextFields size={16} />}
                      />
                      {errors.lastName && (
                        <Alert variant="light" color="red" radius="md">
                          <span className="text-red-800 flex items-center gap-2">
                            <IoInformationCircleOutline />{" "}
                            {errors.lastName.message}
                          </span>
                        </Alert>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Email
                    </label>
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
                      defaultValue="janefoster@email.com"
                      placeholder="janefoster@gmail.com"
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
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Password
                    </label>
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
                      defaultValue="P@sswd123."
                      {...register("password")}
                      leftSection={<RiLockPasswordFill size={16} />}
                    />
                    {errors.password && (
                      <Alert variant="light" color="red" radius="md">
                        <span className="text-red-800 flex items-center gap-2">
                          <IoInformationCircleOutline />{" "}
                          {errors.password.message}
                        </span>
                      </Alert>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="passwordConfirm"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Confirm Password
                    </label>
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
                      placeholder=""
                      defaultValue=""
                      {...register("passwordConfirm")}
                      leftSection={<RiLockPasswordFill size={16} />}
                    />
                    {errors.passwordConfirm && (
                      <Alert variant="light" color="red" radius="md">
                        <span className="text-red-800 flex items-center gap-2">
                          <IoInformationCircleOutline />{" "}
                          {errors?.passwordConfirm?.message}
                        </span>
                      </Alert>
                    )}
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                       
                        <Checkbox
                          defaultChecked={false}
                          label="Remember Me"
                          color="blue"
                          size="sm"
                          {...register("rememberMe")}
                        />
                      </div>
                    
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                  <div className="mt-4">
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
                      Sign Up
                    </Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                      Already have an account yet?{" "}
                      <Link
                        to="/auth/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <Button color="violet" onClick={handleLogin}>
        Please Login
      </Button> */}
      </div>
    </>
  );
};

export default SignupPage;
