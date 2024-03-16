import { Alert, Button, ColorSwatch, PasswordInput } from "@mantine/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../../../api/hooks/useAuthUser";
import { useStateValue } from "../../../context/StateProvider";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import Spinner from "../../../components/Spinner";
import { resetPasswordSchema } from "../../../lib/validation/auth.schema";
import viteLogo from "/vite.svg";

const ResetPasswordPage = () => {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const params = useParams();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const {
    data: res,
    isSuccess,
    error,
    mutate: resetPassword,
  } = useResetPassword();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = handleSubmit((data) => {
    setIsFormSubmitting(true);

    const payload = {
      token: params?.token,
      data: data,
    };

    console.log(payload);
    resetPassword(payload);
  });

  useEffect(() => {
    if (error) setIsFormSubmitting(false);
    if (isSuccess) {
      setIsFormSubmitting(false);

      navigate("/auth/login");
    }
  }, [dispatch, isSuccess, error, navigate]);

  return (
    <>
      <div className="flex p-4 sm:justify-center md:justify-center justify-between rounded-lg bg-[#f6f6f6]">
        {" "}
        <div
          className="hidden lg:block lg:w-2/5 bg-cover bg-center"
          style={{
            backgroundImage: "url('/reset-password-img.svg')",
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
              <h3 className="font-bold">Reset Password</h3>
            </div>

            <form className="mt-8 space-y-2 md:space-y-6" action="#">
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
              <div>
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
                Change Password
              </Button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Go back to
                    <Link
                      to="/"
                      className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Home
                    </Link>
                  </p> */}
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>Want to go back to Home ?</p>
              <Link
                to="/"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                <Button variant="default"> Go Home</Button>
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

export default ResetPasswordPage;
