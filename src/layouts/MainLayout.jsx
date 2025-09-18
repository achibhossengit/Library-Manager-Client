import React from "react";
import Navbar from "../pages/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <Toaster></Toaster>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="min-h-screen bg-base-200">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
