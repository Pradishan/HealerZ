import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import "./AdminLayout.css";
import Bell from "../assets/bell.svg";
import logo from "../assets/logo.png";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ListIcon from "@mui/icons-material/List";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import thanu from "../assets/thanu.jpg";
import default_dp from "../assets/default_dp.png";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [profilepic, setprofilepic] = useState(default_dp);
  const [userdata, setUserData] = useState([]);
  const [typingText, setTypingText] = useState("");
  const [isTextVisible, setTextVisibility] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const location = useLocation();

  const logoutt = () => {
    sessionStorage.setItem("admin", false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/admin/getadminData.php",
        { params: { adminID: sessionStorage.getItem("adminID") } }
      );

      console.log(response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setUserData(response.data);
      } else {
        console.error("No data found or invalid response structure");
      }
      if (response.data[0].Profile) {
        convertBase64ProfileImage(
          response.data[0].Profile,
          response.data[0].ProfileType
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const convertBase64ProfileImage = (base64, type) => {
    const image = new Image();
    image.src = `data:${type};base64,${base64}`;
    image.onload = () => {
      setprofilepic(image.src);
    };
  };

  useEffect(() => {
    const userDataArray = userdata.map((data) => data.Admin_Name);
    const activeRoute = getActiveRoute(location.pathname);

    let textToType = "";
    if (activeRoute) {
      textToType = `Welcome to  ${activeRoute} Section..!`;
    } else {
      textToType = `Hi..! ${userDataArray.join(", ")} Welcome..!`;
    }

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= textToType.length) {
        setTypingText(textToType.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setTextVisibility(false);
        }, 5000);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [userdata]);

  function getActiveRoute(pathname) {
    if (pathname === "/admin/dashboard") {
      return "Dashboard";
    } else if (pathname === "/admin/addpatient") {
      return "Patient ADD";
    } else if (pathname === "/admin/editpatient") {
      return "Patient Update";
    } else if (pathname === "/admin/patientlist") {
      return "Patient Display";
    } else if (pathname === "/admin/adddoctor") {
      return "Doctor ADD";
    } else if (pathname === "/admin/doctorlist") {
      return "Doctor Display";
    } else if (pathname === "/admin/addemployee") {
      return "Employee ADD";
    } else if (pathname === "/admin/employeelist") {
      return "Doctor Display";
    }
    // Add more conditions for other routes if needed
    return null;
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar
          className="sidebaradmin col-xl-2 w-100px min-vh-100"
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              width: !collapsed ? "240px" : "85px",
              backgroundColor: "rgba(255, 255, 255)",
            },
          }}
        >
          <Menu>
            <MenuItem>
              <button
                className="sb-button"
                style={{ backgroundColor: "white", borderRadius: "5px" }}
                onClick={() => setCollapsed(!collapsed)}
              >
                {!collapsed ? (
                  <MenuOpenIcon />
                ) : (
                  <MenuOpenIcon style={{ transform: "rotate(180deg)" }} />
                )}
              </button>
              :
            </MenuItem>
            <hr />

            {/* <div className="mt-5"> */}
            <MenuItem
              className="menu-item"
              component={<Link to="/admin/dashboard" />}
              icon={<GridViewRoundedIcon />}
            >
              {" "}
              Dashboard
            </MenuItem>

            <SubMenu
              className="subline menu-item"
              label="Patient"
              icon={<WheelchairPickupIcon />}
            >
              <MenuItem
                className="menu-item "
                component={<Link to="/admin/addpatient" />}
                icon={<PersonAddAlt1Icon />}
              >
                Add Patient
              </MenuItem>
              <MenuItem
                className="menu-item "
                component={<Link to="/admin/editpatient" />}
                icon={<EditNoteIcon />}
              >
                Edit Patient
              </MenuItem>
              <MenuItem
                className="menu-item "
                component={<Link to="/admin/patientlist" />}
                icon={<ListIcon />}
              >
                Patient List
              </MenuItem>
            </SubMenu>

            <SubMenu
              selected
              className="subline menu-item"
              label="Doctor"
              icon={<HealthAndSafetyIcon />}
              sx={{ fontSize: "16px" }}
            >
              <MenuItem
                className="menu-item"
                sx={{ pl: 0 }}
                component={<Link to="/admin/adddoctor" />}
                icon={<PersonAddIcon />}
              >
                Add Doctor
              </MenuItem>
              <MenuItem
                className="menu-item "
                sx={{ pl: 0 }}
                component={<Link to="/admin/doctorlist" />}
                icon={<ListIcon />}
              >
                Doctor List
              </MenuItem>
            </SubMenu>

            <SubMenu
              className="subline menu-item"
              label="Human Resource"
              icon={<Diversity3Icon />}
            >
              <MenuItem
                className="menu-item "
                component={<Link to="/admin/addemployee" />}
                icon={<PersonAddAlt1Icon />}
              >
                Add Employee
              </MenuItem>
              <MenuItem
                className="menu-item "
                component={<Link to="/admin/employeelist" />}
                icon={<ListIcon />}
              >
                Employee List
              </MenuItem>
            </SubMenu>

            <MenuItem
              className="menu-item"
              component={<Link to="/admin/medicalreports" />}
              icon={<SummarizeIcon />}
            >
              Medical Reports{" "}
            </MenuItem>
            <br />
            <hr />
            <MenuItem
              className="menu-item"
              component={<Link to="/" />}
              onClick={logoutt}
              icon={<LogoutRoundedIcon />}
            >
              {" "}
              Logout{" "}
            </MenuItem>
            {/* </div> */}
          </Menu>
        </Sidebar>

        <div className="col p-0">
          <nav className="navbar navbar-expand-lg bg-white  border-bottom-d1d1d1 px-4 naavbar ">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-center">
                <img src={logo} alt="HealerZ" height="48px" />
              </div>
              <div className="collapse navbar-collapse" id="navbarNav">
              <div class="typewriter layoutProfilename2">
                  {isTextVisible && <h1>{typingText}</h1>}
                </div>
                <ul className="navbar-nav ms-auto align-items-center">
                  <li className="nav-item px-2 layoutProfilename">
                    {userdata.map((data) => data.Admin_Name)}
                  </li>
                  <li className="nav-item px-2">
                    <a
                      className="nav-link  position-relative p-0"
                      aria-current="page"
                      href="#"
                    >
                      <img
                        src={profilepic}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="40px"
                        height="40px"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
