import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import SideClose from "../assets/carbon_side-panel-close.svg";
import FeatherIcon from 'feather-icons-react';
import logo from '../assets/logo.png';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { changeToggle } from "../redux/actions";
import Card from 'react-bootstrap/Card';
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import './AdminLayout.css';

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
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
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";




function AdminLayout({ children }) {

    
    const [collapsed, setCollapsed] = React.useState(false);


    return (
        
        <div className="container-fluid ">
            
                
                {/**  Nav bar */}
                <div className=" p-0">
                    <nav className="navbar navbar-expand-lg bg-white shadow fixed-top py-0">
                <div className="container-fluid d-flex align-items-center">
                <a
                    href="/"
                    className="text-decoration-none color-gradident text-dark fs-5 nav-hover ms-5">
                </a>
                <div className="d-flex align-items-center justify-content-center">
                    {/* logo */}
                    <img src={logo} alt="HealerZ" height="48px" />
                </div>
                {/* right */}
                <div className="d-flex align-items-center me-3">
                    {/* notification */}
                    <div
                    className="position-relative me-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#medicalNotification"
                    aria-controls="offcanvasExample"
                    >
                    <FeatherIcon
                        icon="bell"
                        className="icon-hover p-2 fs-1"
                        height="38px"
                        width="38px"
                    />

                    <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger fs-7 p-1 mt-1">
                        99+
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    </div>
                    {/* profile */}
                    <div className="dropdown me-5">
                    <div
                        className="d-flex align-items-center icon-hover rounded p-2"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                        src="https://source.unsplash.com/random/1"
                        alt="avatar"
                        height="38px"
                        width="38px"
                        className="rounded-circle me-2"
                        />
                        <p className="mb-0">Janarthanan</p>
                    </div>

                    
                    </div>
                </div>
                </div>
            </nav>
                    <div>
                        {children}
                    </div>
                </div>


            <div className='col mt-5' style={{ display: "", height: "100vh", backgroundColor: "#00000000"}}>
            <div  className='row  mt-5  d-flex  flex-start'>
                            <div className='col m3'>

                            {!collapsed ?<div className="logodashboard ms-5 mt-5">
                                    <Card className=" usercard shadow">
                                    <Card.Body>   
                                        
                                            <div className='d-flex align-items-center justify-content-center mb-2'>
                                                <div className='d-flex align-items-center justify-content-center ms-2'>
                                                    <img src={'https://source.unsplash.com/random/2'} alt='avatar' className='rounded-circle me-2' width='80px' height='80px' />
                                                </div>
                
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <div>
                                                        <h5 className='m-0'>Janarthanan</h5>
                                                        <p className='m-0 text-muted'>emp20345</p>
                                                        <p className='m-0 text-muted'>admin@std.uwu.ac.lk</p>
                                                        <p className='m-0 text-muted'>0771234567</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    </Card.Body>
                                </Card>
                                        </div>:
                                        <div className="logodashboard ms-5 mt-5">
                                            <Card className="w-100px shadow">
                                            <Card.Body> 
                                            <img src={'https://source.unsplash.com/random/2'} alt='avatar' className='rounded-circle me-2' width='50px' height='50px' />
                                            
                                            </Card.Body>
                                            </Card>
                                        </div>}
                            </div>
                            </div>
                <Sidebar className="sidebar ms-5 mt-3 row flex-nowarp " collapsed={collapsed}>
                    <Menu>
                    <MenuItem>
                        <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                        {<MenuRoundedIcon  />}
                        </button>
                    
                    
                    </MenuItem>
                    
                    <MenuItem className="menu-item"
                        component={<Link to="/admin/dashboard"  />}
                        icon={<GridViewRoundedIcon />}> Dashboard</MenuItem>
                    
                    <SubMenu selected className="subline menu-item" label="Doctor" icon={<HealthAndSafetyIcon />} sx={{fontSize:'16px'}} >
                        <MenuItem  className="menu-item ms-5" sx={{ pl: 0 }}
                        component={<Link to="/admin/adddoctor"  />}
                        icon={<PersonAddIcon />}>Add Doctor</MenuItem>
                        <MenuItem className="menu-item ms-5" sx={{ pl: 0 }}
                        component={<Link to="/admin/doctorlist"  />}
                        icon={<ListIcon />}>Doctor List</MenuItem>
                    </SubMenu>
                    
                    <SubMenu className="subline menu-item" label="Patient" icon={<WheelchairPickupIcon />}>
                        <MenuItem className="menu-item ms-5"
                        component={<Link to="/admin/addpatient"  />}
                        icon={<PersonAddAlt1Icon />}>Add Patient</MenuItem>
                        <MenuItem className="menu-item ms-5"
                        component={<Link to="/admin/editpatient"  />}
                        icon={<EditNoteIcon />}>Edit Patient</MenuItem>
                        <MenuItem className="menu-item ms-5"
                        component={<Link to="/admin/patientlist"  />}
                        icon={<ListIcon />}>Patient List</MenuItem>
                    </SubMenu>

                    <SubMenu className="subline menu-item" label="Human Resource" icon={<Diversity3Icon />}>
                        <MenuItem className="menu-item ms-5"
                        component={<Link to="/admin/addemployee" />}
                        icon={<PersonAddAlt1Icon />}>Add Employee</MenuItem>
                        <MenuItem className="menu-item ms-5"
                        component={<Link to="/admin/employeelist"  />}
                        icon={<ListIcon />}>Employee List</MenuItem>
                    </SubMenu>

                    <MenuItem className="menu-item"
                    component={<Link to="/admin/inventory"  />}
                    icon={<VaccinesIcon />}>Inventory</MenuItem>

                    <MenuItem className="menu-item"
                    component={<Link to="/admin/medicalreports"  />}
                    icon={<SummarizeIcon />}>Medical Reports </MenuItem>

                    
                    <MenuItem className="menu-item" icon={<LogoutRoundedIcon />}> Logout </MenuItem>
                    </Menu>
                </Sidebar>
                <section>
                    
                </section>
                </div>
       

        </div>
    

    );
}

export default AdminLayout;
