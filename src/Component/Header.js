import React from "react";
import { Container, NavDropdown, Navbar } from "react-bootstrap";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/UseWindowSize";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useWindowSize();
  const User = localStorage.getItem("user");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Navbar sticky="top" className="header">
      <Container fluid className={`${isMobile ? "px-3" : "px-4"}`}>
        <Navbar.Brand to="/">
          <div className="logo-brand">MERN</div>
        </Navbar.Brand>
        {User?.length > 0 && (
          <NavDropdown title={User} id="navbarScrollingDropdown">
            <NavDropdown.Item className="w-auto" onClick={() => handleLogout()}>
              <IoIosLogOut size={20} color="red" /> Logout
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
