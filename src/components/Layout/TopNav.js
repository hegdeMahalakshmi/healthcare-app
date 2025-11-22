import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const TopNav = () => {
  const location = useLocation();

  const [active, setActive] = useState("/patient/dashboard");

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
      <Menu.Item
        key="/patient/dashboard"
        onClick={() => setActive("/patient/dashboard")}
      >
        <Link to="/patient/dashboard">Patient Dashboard</Link>
      </Menu.Item>

      <Menu.Item
        key="/patient/my-profile"
        onClick={() => setActive("/patient/my-profile")}
      >
        <Link to="/patient/my-profile">My Profile</Link>
      </Menu.Item>

      <Menu.Item
        key="/patient/goals"
        onClick={() => setActive("/patient/goals")}
      >
        <Link to="/patient/goals">Goals Tracker</Link>
      </Menu.Item>
    </Menu>
  );
};

export default TopNav;
