import React from "react";
import { Menu, Breadcrumb } from "antd";

const TopNav = ({ active, setActive }) => {
  return (
    <div className="topnav-container">
      <Menu
        mode="horizontal"
        selectedKeys={[active]}
        onClick={(e) => setActive(e.key)}
        className="top-menu"
      >
        <Menu.Item key="provider-dashboard">Provider Dashboard</Menu.Item>
        <Menu.Item key="profile">My Profile</Menu.Item>
        <Menu.Item key="goals">Goal Tracker</Menu.Item>
      </Menu>

      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{active}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default TopNav;
