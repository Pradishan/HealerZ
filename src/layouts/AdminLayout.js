import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from "react-pro-sidebar";
import './AdminLayout.css';
import Bell from "../assets/bell.svg";
import logo from "../assets/logo.png";
import jana from "../assets/jana.jpg";
// import CloseButton from 'react-bootstrap/CloseButton';
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListIcon from '@mui/icons-material/List';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import thanu from "../assets/thanu.jpg";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';




function Layout({children}) {
    const [currentImage, setCurrentImage] = useState(jana); 
    useEffect(() => {
        const imageInterval = setInterval(() => {
          if (currentImage === jana) {
            setCurrentImage(thanu);
          } else {
            setCurrentImage(jana);
          }
        }, 5000);
    
        // Clear the interval when the component unmounts
        return () => clearInterval(imageInterval);
      }, [currentImage]);

    const [collapsed, setCollapsed] = React.useState(false);
   
    const logoutt = ()=>{
        sessionStorage.setItem('admin',false);
 
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
            <Sidebar className="sidebar  " collapsed={collapsed} style={{backgroundColor:'white'}}
             rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    width: !collapsed ? '240px' : '85px',
                    backgroundColor:  'rgba(255, 255, 255)',
                },
              }}>
                    <Menu>
                    <MenuItem >
                     <button className="sb-button" style={{backgroundColor:'white',borderRadius:'5px'}} onClick={() => setCollapsed(!collapsed)}>
                     {!collapsed?<MenuOpenIcon />:
                        <MenuOpenIcon style={{ transform: 'rotate(180deg)' }}/>}
                        </button>:
                      
                        
                    </MenuItem>
                    <hr/>

                    <div className='card mt-5 mb-2 shadow  border-0'>
                    <div class="card-body p-1">
                        {!collapsed ?<div className=" ms-2 ">
                                   
                                        
                                            <div className='d-flex align-items-center justify-content-center mb-2'>
                                                <div className='d-flex align-items-center justify-content-center ms-1'>
                                                    <img src={currentImage} alt='avatar' className='rounded-circle me-2' width='80px' height='80px' />
                                                </div>
                
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <div>
                                                        <h5 className='m-0'>Admin Panel</h5>
                                                        {/* <p className='txt  m-0 text-muted'>emp20345</p> */}
                                                        <p className='txt m-0 text-muted'>admin@std.uwu.ac.lk</p>
                                                        {/* <p className='txt m-0 text-muted'>0771234567</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        
                                
                                        </div>:
                                        <div className="w-100px shadow">
                                            
                                            <img src={jana} alt='avatar' className='rounded-circle me-2' width='80px' height='80px' />
                                           
                                        </div>}
                        </div>
                    </div>
                    <hr/>
                    <div className='mt-5'>
                    <MenuItem className="menu-item"
                        component={<Link to="/admin/dashboard"  />}
                        icon={<GridViewRoundedIcon />}> Dashboard</MenuItem>
                    
                    <SubMenu selected className="subline menu-item" label="Doctor" icon={<HealthAndSafetyIcon />} sx={{fontSize:'16px'}} >
                        <MenuItem  className="menu-item" sx={{ pl: 0 }}
                        component={<Link to="/admin/adddoctor"  />}
                        icon={<PersonAddIcon />}>Add Doctor</MenuItem>
                        <MenuItem className="menu-item " sx={{ pl: 0 }}
                        component={<Link to="/admin/doctorlist"  />}
                        icon={<ListIcon />}>Doctor List</MenuItem>
                    </SubMenu>
                    
                    <SubMenu className="subline menu-item" label="Patient" icon={<WheelchairPickupIcon />}>
                        <MenuItem className="menu-item "
                        component={<Link to="/admin/addpatient"  />}
                        icon={<PersonAddAlt1Icon />}>Add Patient</MenuItem>
                        <MenuItem className="menu-item "
                        component={<Link to="/admin/editpatient"  />}
                        icon={<EditNoteIcon />}>Edit Patient</MenuItem>
                        <MenuItem className="menu-item "
                        component={<Link to="/admin/patientlist"  />}
                        icon={<ListIcon />}>Patient List</MenuItem>
                    </SubMenu>

                    <SubMenu className="subline menu-item" label="Human Resource" icon={<Diversity3Icon />}>
                        <MenuItem className="menu-item "
                        component={<Link to="/admin/addemployee" />}
                        icon={<PersonAddAlt1Icon />}>Add Employee</MenuItem>
                        <MenuItem className="menu-item "
                        component={<Link to="/admin/employeelist"  />}
                        icon={<ListIcon />}>Employee List</MenuItem>
                    </SubMenu>

                    <MenuItem className="menu-item"
                    component={<Link to="/logininventory"  />}
                    icon={<VaccinesIcon />}>Inventory</MenuItem>

                     <MenuItem className="menu-item"
                    component={<Link to="/clubs/dashboard"  />}
                    icon={<AdminPanelSettingsIcon />}>Club Admin</MenuItem>

                    <MenuItem className="menu-item"
                    component={<Link to="/admin/medicalreports"  />}
                    icon={<SummarizeIcon />}>Medical Reports </MenuItem>
                     <br/>
                    <hr/>
                    <br/>
                    <MenuItem className="menu-item"
                    component={<Link to="/admin/settings"  />}
                    icon={<SettingsIcon />}>Settings </MenuItem>
  
                    <MenuItem className="menu-item" component={<Link to="/loginAdmin"  />} onClick={logoutt} icon={<LogoutRoundedIcon />}> Logout </MenuItem>
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
                                    <li className="nav-item">
                                        <a className="nav-link active position-relative px-2" aria-current="page"
                                           href="#">
                                            <div className="red-dot"/>
                                            <img src={Bell} alt={""}/>
                                        </a>
                                    </li>
                                    <li className="nav-item px-2">
                                        <a className="nav-link  position-relative p-0" aria-current="page" href="#">

                                            <img src={currentImage} alt='avatar' className='rounded-circle me-2' width='40px' height='40px'/>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
           
        </div>

        
    );
}

export default Layout;