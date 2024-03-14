import { Menu } from "@mantine/core";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProfileButton from "../../components/ProfileButton";
import { useStateValue } from "../../context/StateProvider";

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  const refreshPage = () => {
    navigate(0);
  };
  const getInitials = () => {
    let name = user ? user.name : "John Sammmmmy";
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();
    return initials;
  };
  return (
    <nav className="flex space-x-6 px-5 py-2 h-10 items-center justify-between">
      <Link to="/">{/* <AiFillBug /> */}</Link>
      <ul className="flex space-x-4 items-center">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              to={link.href}
              className="nav-link rounded-md"
            >
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}

        <Menu
          shadow="md"
          width={200}
          trigger="click-hover"
          openDelay={100}
          closeDelay={200}
          transitionProps={{ transition: "pop-bottom-left", duration: 400 }}
        >
          <Menu.Target>
            <ProfileButton
              image={
                user ? (
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ) : (
                  <FaUser />
                )
              }
              name={user ? getInitials() : null}
              email="hspoonlicker@outlook.com"
            />
          </Menu.Target>

          <Menu.Dropdown>
            {user?.accessToken ? (
              <>
                <Menu.Label>{user?.name}</Menu.Label>
                <Menu.Item>
                  <span
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                      refreshPage();
                    }}
                  >
                    Logout
                  </span>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <Link to="/auth/login">Login</Link>
                </Menu.Item>
                <Menu.Item><Link to="/auth/signup">Signup</Link></Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      </ul>
    </nav>
  );
};

export default Navbar;
