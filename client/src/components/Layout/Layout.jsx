import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import useFavourites from "../../hooks/useFavourites";

const Layout = () => {
  useFavourites();

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
