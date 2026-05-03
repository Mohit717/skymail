"use client";
import React from "react";
import { logout } from "../actions/auth";
import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
  const [showSetting, setShowSetting] = React.useState(false);

  // const handleMenuToggle = () => {
  //   const body = document.querySelector("body");
  //   if (body) {
  //     body.classList.toggle("sidebar-icon-only");
  //   }
  // };
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <Link className="navbar-brand brand-logo me-5" href="/dashboard">
          <Image src="/logo.png" className="me-2" alt="logo" width={"127"} height={"34"} loading="eager"/>
        </Link>
        <Link className="navbar-brand brand-logo-mini" href="/dashboard">
          <Image src="/logo-mini.svg" alt="logo" width={"34"} height={"34"} />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        {/* <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={() => handleMenuToggle()}
        >
          <span className="icon-menu"></span>
        </button> */}

        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <div
              className={`d-flex align-items-center nav-link dropdown-toggle ${showSetting ? "show" : ""}`}
              onClick={() => setShowSetting((prev) => !prev)}
            >
              <Image src="/face.jpg" alt="profile" width={"40"} height={"40"} />
            </div>
            <div
              className={`dropdown-menu dropdown-menu-right navbar-dropdown ${showSetting ? "show" : ""}`}
              aria-labelledby="profileDropdown"
            >
              <a className="dropdown-item">
                <i className="ti-settings"></i>
                Settings
              </a>
              <div className="dropdown-item" onClick={() => logout()}>
                <i className="ti-power-off"></i>
                Logout
              </div>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
