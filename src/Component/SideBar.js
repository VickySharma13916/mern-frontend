import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";
import { routes } from "../Utils/routes";
import useWindowSize from "../hooks/UseWindowSize";

const SideBar = () => {
  const [allowedRoutes, setAllowedRoutes] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useWindowSize();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  useEffect(() => {
    setAllowedRoutes(routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <aside
      className={`pe-3 sidebar`}
      style={{
        backgroundColor: `${isSidebarOpen ? "#eeeeee" : "transparent"}`,
        width: `${!isMobile ? "256px" : !isSidebarOpen ? "50px" : "256px"}`,
      }}
    >
      {isMobile && (
        <div className="menu-icon position-absolute" onClick={toggleSidebar}>
          <AiOutlineMenu size={20} />
        </div>
      )}
      <PerfectScrollbar
        component="div"
        className={`pt-4 pb-5 ${isSidebarOpen && "pt-5"}`}
      >
        <Nav
          className={`flex-column d-md-block  pe-4 ${
            isSidebarOpen ? "d-block" : "d-none"
          }`}
        >
          {allowedRoutes?.map(({ route, icon, name }, index) => (
            <NavLink
              key={index}
              to={route}
              className="ps-4 d-flex gap-2 align-items-center nav-item"
              onClick={closeSidebar}
            >
              {icon}
              {name}
            </NavLink>
          ))}
        </Nav>
      </PerfectScrollbar>
    </aside>
  );
};

export default SideBar;
