import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles, validateLogin } from "../../utils/common";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import { toast } from "react-toastify";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const handleAddCarClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    } else {
      toast.error("Please Login to Continue", { position: "bottom-right" });
    }
  };
  return (
    <section className="h-wrapper" style={{ background: "var(--black)" }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="./logo.png" alt="logo" width={165} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/cars">Cars</NavLink>

            <a href="mailto:mohannarendra165@gmail.com">Contact</a>

            {/* add property */}
            <div onClick={handleAddCarClick}>Add Car</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
            {/* login button */}
            {validateLogin() == false ? (
              <Link to="/login">
                <button className="button">Login</button>
              </Link>
            ) : (
              <ProfileMenu />
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
