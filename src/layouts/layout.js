import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import logo from "../assets/logo.png";
import logos from "../assets/logo-small.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToggle } from "../redux/actions";
import "./layout.css";
import default_dp from "../assets/default_dp.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


function Layout({ children }) {
  const [profilepic, setprofilepic] = useState(default_dp);
  const [userdata, setUserData] = useState([]);
  const [typingText, setTypingText] = useState("");
  const [isTextVisible, setTextVisibility] = useState(true);
  const location = useLocation();


  const dispatch = useDispatch();
  const open = useSelector((state) => {
    return state.setting.toggle;
  });

  function toggleDrawer() {
    dispatch(changeToggle(!open));
  }

  console.log(open);

  const logoutt = () => {
    sessionStorage.setItem("Pharmacist", false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/Inventory/settings/getPharmacistData.php",
        { params: { pharmacistID: sessionStorage.getItem("pharmacistID") } }
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
    const userDataArray = userdata.map((data) => data.Pharmacist_Name);
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
    if (pathname === "/inventory-interface/dashboard") {
      return "Dashboard";
    }else if (pathname === "/inventory-interface/inventory") {
      return "Inventory";
    }else if (pathname === "/inventory-interface/supply") {
        return "Supply";
      }else if (pathname === "/inventory-interface/summary") {
        return "Summary";
      }
    
    return null;
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className={
            (!open ? " sidebaar col-xl-2" : " w-100px") +
            " col-auto col-md-1 px-0 bg-white border-right min-vh-100 trans sidebaar"
          }
        >
          <div className="close-btn-container" onClick={toggleDrawer}>
            {/* <img
              src={SideClose}
              alt="SideClose"
              className={!!open && "rotate-180"}
            /> */}
            <MenuOpenIcon
              className={!!open && "rotate-180"}/>
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
                to={"/inventory-interface/dashboard"}
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
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/inventory-interface/inventory"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="hard-drive"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Inventory</div>}
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
                to={"/inventory-interface/supply"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="shopping-cart"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Supply</div>}
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
                to={"/inventory-interface/summary"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="activity"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Summary</div>}
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
                to={"/inventory-interface/settings"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="settings"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Settings</div>}
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
              <div className="panelheading">Inventory Panel</div>
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
                <div class="typewriter layoutProfilename1">
                  {isTextVisible && <h1>{typingText}</h1>}
                </div>

                <ul className="navbar-nav ms-auto align-items-center">
                  <li className="nav-item px-2 layoutProfilename">
                    {userdata.map((data) => data.Pharmacist_Name)}
                  </li>

                  <li className="nav-item px-2">
                    <a
                      className="nav-link  position-relative p-0"
                      aria-current="page"
                      href="/inventory-interface/settings"
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
