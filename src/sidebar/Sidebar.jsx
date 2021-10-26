import React from "react";
import "./Sidebar.css";
import {
  Storefront,
  Description,
  AddPhotoAlternateOutlined,
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <img className="logo" src="../img/sarno_logo.png" alt="" />

        <div className="menuWrapper">
          <NavLink to="/POS" className="iconItem" activeClassName="active">
            <Storefront className="icon" />
            <div className="tooltip">ขายสินค้า</div>
          </NavLink>

          <NavLink to="/product" className="iconItem" activeClassName="active">
            <AddPhotoAlternateOutlined className="icon" />
            <div className="tooltip">รายการสินค้า</div>
          </NavLink>

          <NavLink to="/report" className="iconItem" activeClassName="active">
            <Description className="icon" />
            <div className="tooltip">รายงานขาย</div>
          </NavLink>
        </div>
      </div>
      <Link to="/" className="logout">
        <div>logout</div>
      </Link>
    </div>
  );
}
