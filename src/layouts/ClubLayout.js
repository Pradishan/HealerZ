import React, { useState, useEffect } from "react";
import Bell from "../assets/bell.svg";
import SideClose from "../assets/carbon_side-panel-close.svg";
import FeatherIcon from "feather-icons-react";
import logo from "../assets/logo.png";
import logos from "../assets/logo-small.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToggle } from "../redux/actions";
import default_dp from "../assets/default_dp.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../layouts/layout.css";
import nusnan from "../assets/nusnan.jpg";

function ClubLayout({ children }) {
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

  const dispatch = useDispatch();
  const open = useSelector((state) => {
    return state.setting.toggle;
  });

  function toggleDrawer() {
    dispatch(changeToggle(!open));
    // setOpen(!open)
  }

  console.log(open);

  const logoutt = () => {
    sessionStorage.setItem("Clubadmin", false);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className={
            (!open ? " sidebaar col-xl-2" : " w-100px") +
            " col-auto col-md-1 px-0 bg-white border-right min-vh-100 trans sidebaar"
          }
        >
          <div className={"close-btn-container"} onClick={toggleDrawer}>
            <img
              src={SideClose}
              alt="SideClose"
              className={!!open && "rotate-180"}
            />
          </div>
          {!open ? (
            <div className="logodashboard ms-5">
              <img
                src={logo}
                alt={""}
                style={{ width: "100px", height: "50px" }}
              />
            </div>
          ) : (
            <div className="logodashboard ms-3">
              <img
                src={logos}
                alt={""}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          )}
          <div className={"w-100 border-bottom-d1d1d1 mb-3"} />
          <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white pt-5">
            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/clubs/dashboard"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="layout"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Dashboard</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/clubs/Eventresponse"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="filter"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Event Response</div>}
                </div>
              </NavLink>
            </div>
            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/clubs/registration"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="edit"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Registration</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/clubs/blooddonation"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="thermometer"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Blood Donation</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/clubs/vacination"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="activity"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Vaccination</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 border-bottom-d1d1d1 mb-3"} />

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/"}
              >
                <div className={"d-flex"} onClick={logoutt}>
                  <FeatherIcon
                    icon="log-out"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Logout</div>}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col p-0">
          <nav className="navbar navbar-expand-lg bg-white border-bottom-d1d1d1 px-4 navbaar">
            <div className="container-fluid">
              <div className="panelheading">Club Admin</div>
              <button
                className="navbar-toggler ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
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
export default ClubLayout;
