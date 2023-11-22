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
import logo from "../assets/logo.png";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListIcon from "@mui/icons-material/List";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import default_dp from "../assets/avatar.svg";
import axios from "axios";

function Layout({ children }) {
  const [profilepic, setprofilepic] = useState(default_dp);
  const [userdata, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/Inventory/settings/getemployeeData.php",
        { params: { employeeID: sessionStorage.getItem("employeeID") } }
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

  const [collapsed, setCollapsed] = React.useState(false);

  const logoutt = () => {
    sessionStorage.setItem("admin", false);
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar
          className="sidebar sidebarrt min-vh-100 w-100px"
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

            <div className="card mt-5 mb-2 shadow border-0">
              <div class="card-body p-1">
                {!collapsed ? (
                  <div className="ms-2" style={{marginTop:'-20px'}}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div className="d-flex align-items-center justify-content-center ms-1">
                        <img
                          src={profilepic}
                          alt="avatar"
                          className="rounded-circle me-2"
                          width="80px"
                          height="80px"
                        />
                      </div>

                      <div className="d-flex align-items-center justify-content-center">
                        <div>
                          <h5 className="m-0">
                            {userdata.map((data) => data.employee_Name)}
                          </h5>
                          {/* <p className='txt  m-0 text-muted'>emp20345</p> */}
                          <p className="txt m-0 text-muted" style={{fontSize:'12px'}}>
                            {userdata.map((data) => data.Email)}
                          </p>
                          {/* <p className='txt m-0 text-muted'>0771234567</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-100px shadow sidebarrt" style={{marginTop:'-20px'}}>
                    <img
                      src={profilepic}
                      alt="avatar"
                      className="rounded-circle me-2"
                      width="80px"
                      height="80px"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* <hr/> */}
            <div className="mt-5">
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
                component={<Link to="/admin/settingsAdmin" />}
                icon={<SettingsIcon />}
              >
                Settings{" "}
              </MenuItem>

              <MenuItem
                className="menu-item"
                component={<Link to="/" />}
                onClick={logoutt}
                icon={<LogoutRoundedIcon />}
              >
                {" "}
                Logout{" "}
              </MenuItem>
            </div>
          </Menu>
        </Sidebar>

        <div className="col p-0">
          <nav className="navbar navbar-expand-lg bg-white  border-bottom-d1d1d1 px-4 naavbar ">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-center">
                <img src={logo} alt="HealerZ" height="48px" />
              </div>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item px-2 layoutProfilename">
                    {userdata.map((data) => data.employee_Name)}
                  </li>
                  <li className="nav-item px-2">
                      <img
                        src={profilepic}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="40px"
                        height="40px"
                      />
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
