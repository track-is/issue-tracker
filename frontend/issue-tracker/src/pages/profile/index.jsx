import { useStateValue } from "../../context/StateProvider";

const ProfilePage = () => {
  const [{ user }] = useStateValue();
  return <div>{user.name}</div>;
};

export default ProfilePage;
