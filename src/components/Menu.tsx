import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "@headlessui/react";

const Sidemenu = () => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button onClick={close}>Close</Menu.Button>
          <Menu.Items>
            <Menu.Item>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default Menu;
