import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    <Menu>


      <a className="menu-item" href="/Home">
        Overview
      </a>

      <a className="menu-item" href="/Analytics">
        Analytics
      </a>

      <a className="menu-item" href="/Report">
        Report
      </a>

      <a className="menu-item" href="/Seting">
        Seting
      </a>
    </Menu>
  );
};