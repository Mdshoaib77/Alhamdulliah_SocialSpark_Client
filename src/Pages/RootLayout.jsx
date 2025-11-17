import React from "react";
import Navbar from "../Components/Navbar";
import Home from "./Home/Home";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <section className="flex-1 ">
        <Outlet></Outlet>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
