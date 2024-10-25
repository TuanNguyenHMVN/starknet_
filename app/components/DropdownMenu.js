import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation

const DropdownMenu = () => {
  return (
    <div className="menu-dropdown-icon">
      <Dropdown>
        <Dropdown.Toggle variant="link" className="text-decoration-none">
          <i className="bi bi-list dropdown-icon"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/home">Home</Dropdown.Item>
          <Dropdown.Item href="/staking">Staking</Dropdown.Item>
          <Dropdown.Item href="/faq">FAQs</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
