import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const TopNav = () => {
  const location = useLocation();

  // Local state for active nav
  const [active, setActive] = useState(location.pathname);

  // Sync active state with route changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <Menu
      mode="horizontal"
      theme="light"
      selectedKeys={[active]}
      style={{ marginBottom: 20 }}
    >
      {/* <Menu.Item
        key="/"
        onClick={() => {setActive("/")}}
      >
        <Link to="/">Home</Link>
      </Menu.Item> */}
{/* 
      <Menu.Item
        key="/provider-dashboard"
        onClick={() => {setActive("/provider-dashboard")}}
      >
        <Link to="/provider-dashboard">Provider Dashboard</Link>
      </Menu.Item> */}

      <Menu.Item
        key="/patient/dashboard"
        onClick={() => {setActive("/patient/dashboard")}}
      >
        <Link to="/patient/dashboard">Patient Dashboard</Link>
      </Menu.Item>

      <Menu.Item
        key="/patient/Profile"
        onClick={() => {setActive("/patient/Profile")}}
      >
        <Link to="/patient/Profile">My Profile</Link>
      </Menu.Item>

      <Menu.Item
        key="/patient/goals"
        onClick={() => {setActive("/patient/goals")}}
      >
        <Link to="/patient/goals">Goals Tracker</Link>
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
