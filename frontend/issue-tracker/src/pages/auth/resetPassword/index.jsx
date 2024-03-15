import { Alert, Button, PasswordInput } from "@mantine/core";
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
      <div className="flex gap-4 py-16 px-16 items-center rounded-lg bg-violet-50">
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
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 drop-shadow-lg">
              <div className="space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Change Password now
                </h1>
                <form className="space-y-2 md:space-y-6" action="#">
                  {/* {error && (
                    <Alert variant="light" color="red" radius="md">
                      <span className="text-red-800 flex items-center gap-2">
                        <span>Incorrect email or password</span>
                      </span>
                    </Alert>
                  )} */}
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
                      defaultValue=""
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
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Go back to
                    <Link
                      to="/"
                      className="ml-2 font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Home
                    </Link>
                  </p>
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

export default ResetPasswordPage;
