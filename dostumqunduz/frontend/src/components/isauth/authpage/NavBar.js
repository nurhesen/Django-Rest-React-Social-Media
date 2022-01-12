import React, { Component, useState } from "react";
import Search from "../Search";
import { icons } from "../Icons";
import { Link } from "react-router-dom";
import { LogoutFunc } from "../Functions";

export default function NavBar(props) {
  const LogoutFuncT = () => {
    LogoutFunc().then((response) => {
      window.location.reload();
    });
  };

  return (
    <div className="navbar">
      <Link to="" className="brandname no-decoration ml10">
        {icons.qunduz_ikon}
      </Link>

      <div className="searchbar">
        <Search />
      </div>
      <div className="profilestuff ml10 c-p" onClick={LogoutFuncT}>
        Logout
      </div>
    </div>
  );
}
