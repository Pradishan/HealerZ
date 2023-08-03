import React, { useState } from 'react';
import SideClose from "../assets/carbon_side-panel-close.svg";
import FeatherIcon from 'feather-icons-react';
import logo from '../assets/logo.png';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { changeToggle } from "../redux/actions";
import Card from 'react-bootstrap/Card';
import './AdminLayout.css';

function AdminLayout({ children }) {

    const dispatch = useDispatch()
    const open = useSelector(state => {
        return state.setting.toggle
    });

    function toggleDrawer() {
        dispatch(changeToggle(!open));
        // setOpen(!open)
    }

    console.log(open);



    return (
        <div className="container-fluid">
            
                
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
{/** User card */}   
                <div  className='row  mt-5  d-flex  flex-start'>
                <div className='col m3'>

                {!open ?<div className="logodashboard ms-5 mt-5">
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
{/** END User card */}               
            <div  className='row mt-1'>
  

            {/** Side menu */}    
            
                <div className="col mt-4" >

                <div   
                    className={(!open ? " sidebaar col-xl-2" : " w-100px") + " col-auto col-md-1 bg-transparant px-0 py-0  border-right min-vh-auto trans sidebaar ms-5"  }>
                    <div className={"close-btn-container"} onClick={toggleDrawer}>
                        <img src={SideClose} alt="SideClose" className={!!open && "rotate-180"} />
                    </div>
            
                    <div className={'w-100 border-bottom-d1d1d1'} />
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-2 text-white">



                        <div className={"w-100 px-sm-2 bg-white mb-1"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active " : "menu-item "}
                                to={"/admin/dashboard"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="layout"  className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={'trans-1'}>Dashboard</div>}
                                </div>
                            </NavLink>
                        </div>


                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item" }
                                to={"/doctor"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="activity" className={!open ? 'me-2' : "ms-1"} />    
                                    {!open && <div className={''}>Doctor</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/AddDoctor"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="users" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={'trans-1'}>Add Doctor</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/doctorList"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="shopping-cart" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={'trans-1'}>Doctor List</div>}
                                </div>
                            </NavLink>
                        </div>

                        
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/addpatient"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="user-plus" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={'trans-1'}>ADD Patient</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/editpatient"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="edit" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={''}>Edit Patient</div>}
                                </div>
                            </NavLink>
                        </div>

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/patientlist"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="list" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={''}>Patient List</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/humanresource"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="users" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={''}>Human Resource</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/loginInventory"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="shopping-cart" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={''}>Inventory</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/admin/medicalreports"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="layers" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={''}>Medical Reports</div>}
                                </div>
                            </NavLink>
                        </div>




                        <div className={'w-100 border-bottom-d1d1d1 mb-3'} />

                       

                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
                                to={"/loginInventory"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="log-out" className={!open ? 'me-2' : "ms-1"} />
                                    {!open && <div className={''}>Logout</div>}
                                </div>
                            </NavLink>
                        </div>


                    </div>
                </div>



            </div>
        
        </div>
        

        </div>


    );
}

export default AdminLayout;