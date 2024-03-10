import { Button } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";

const LoginPage = () => {
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

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
      <Button color="violet" onClick={handleLogin}>
        Please Login
      </Button>
    </>
  );
};

export default LoginPage;
