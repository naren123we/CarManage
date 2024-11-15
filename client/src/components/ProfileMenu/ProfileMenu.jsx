import React, { useContext } from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import UserDetailContext from "../../context/UserDetailContext";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.image} alt="user image" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
          Favourites
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            setUserDetails({
              email: "",
              token: null,
              favourites: [],
            });
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
