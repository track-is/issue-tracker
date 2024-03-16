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
      <div className="flex p-4 sm:justify-center md:justify-center justify-between rounded-lg bg-[#f6f6f6]">
        {" "}
        <div
          className="hidden lg:block lg:w-2/5 bg-cover bg-center"
          style={{
            backgroundImage: "url('/signup-img.svg')",
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
            style={{ minWidth: "420px" }}
          >
            <div className="flex items-center gap-4">
              <ColorSwatch size={12} color="rgba(120, 113, 108, 0.5)" />
              <h3 className="font-bold">Signup Here</h3>
            </div>
            <form className="mt-8 space-y-2 md:space-y-2" action="#">
              {/* {error && (
                  <Alert variant="light" color="red" radius="md">
                    <span className="text-red-800 flex items-center gap-2">
                      <span>Incorrect email or password</span>
                    </span>
                  </Alert>
                )} */}
              <div className="flex gap-2">
                <div>
                <div className="flex items-center gap-2 mb-2">
                  <ColorSwatch size={5} color="rgba(41,37,36, 0.5)" />
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
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
                <div className="flex items-center gap-2 mb-2">
                  <ColorSwatch size={5} color="rgba(41,37,36, 0.5)" />
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
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
                    defaultValue="Foster"
                    placeholder="Foster"
                    {...register("lastName")}
                    leftSection={<MdTextFields size={16} />}
                  />
                  {errors.lastName && (
                    <Alert variant="light" color="red" radius="md">
                      <span className="text-red-800 flex items-center gap-2">
                        <IoInformationCircleOutline /> {errors.lastName.message}
                      </span>
                    </Alert>
                  )}
                </div>
              </div>
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
              <div className="flex gap-2">
                <div className="w-full">
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
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                        <IoInformationCircleOutline /> {errors.password.message}
                      </span>
                    </Alert>
                  )}
                </div>
                <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                  <ColorSwatch size={5} color="rgba(41,37,36, 0.5)" />
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
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
              </div>

              <Button
                fullWidth
                className="text-base cursor-pointer"
                style={{ marginTop: "24px" }}
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
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                      Already have an account yet?{" "}
                      <Link
                        to="/auth/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign In
                      </Link>
                    </p> */}
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>Already have an account ?</p>
              <Link
                to="/auth/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                <Button variant="default"> Sign In</Button>
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

export default SignupPage;
