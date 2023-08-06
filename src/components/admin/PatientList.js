
import React, { useState } from 'react';

import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Logosmall from "../../assets/logo-small.png";
import FeatherIcon from 'feather-icons-react';

import AdminLayout from '../../layouts/AdminLayout';



function PatientList(props) {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm3, setSearchTerm] = useState('');
    const [searchTerm4, setSearchTerm2] = useState('');

    const handleChange3 = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleChange4 = (event) => {
        setSearchTerm2(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle search logic here
        console.log(`Searching for ${searchTerm3}...`);
    } 
    const handleSubmit2 = (event) => {
        event.preventDefault();
        // handle search logic here
        console.log(`Searching for ${searchTerm4}...`);
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const [PatientList, setPatientList] = useState([
        { Student_ID: "CST20001", f_name: "John" ,l_name: "Fernando", address: "Kilinochchi", mobile: '(123) 456-7890', DOB: '11/05/2000', gender: "Male"  , email: 'john11@gmail.com' , B_group: 'A-'},
        { Student_ID: "CST20002", f_name: "Caryy",l_name: "Michel"  , address: "Mannar"     , mobile: '(123) 476-7811', DOB: '15/06/2000', gender: "Female", email: 'caryy15@gmail.com', B_group: 'B+'},
        { Student_ID: "CST20003", f_name: "Mich" ,l_name: "Robert"  , address: "Colombo"    , mobile: '(123) 856-7820', DOB: '25/04/2000', gender: "Male"  , email: 'mich25@gmail.com' , B_group: 'AB'},
        { Student_ID: "CST20005", f_name: "Ram"  ,l_name: "Williams", address: "Kandy"      , mobile: '(123) 656-7892', DOB: '16/09/2000', gender: "Male"  , email: 'ram16@gmail.com'  , B_group: 'O-'},
        { Student_ID: "CST20006", f_name: "Divya",l_name: "Canoon"  , address: "Jaffna"     , mobile: '(123) 456-7870', DOB: '05/05/2000', gender: "Female", email: 'divya05@gmail.com', B_group: 'A-'},
        { Student_ID: "CST20010", f_name: "Stiv" ,l_name: "Willson" , address: "Gampaha"    , mobile: '(123) 956-7590', DOB: '11/11/2000', gender: "Male"  , email: 'stiv11@gmail.com' , B_group: 'A+'},
        { Student_ID: "CST20016", f_name: "Rosee",l_name: "Croos"   , address: "Badulla"    , mobile: '(123) 455-7890', DOB: '18/07/2000', gender: "Female", email: 'rosee18@gmail.com', B_group: 'AB'},
        { Student_ID: "DCST2017", f_name: "Jems" ,l_name: "Fernando", address: "Trincomale" , mobile: '(123) 356-7890', DOB: '30/06/2000', gender: "Feale" , email: 'jems30@gmail.com' , B_group: 'B+'},
        { Student_ID: "CST20018", f_name: "Zimba",l_name: "Whisper" , address: "Batticalo"  , mobile: '(123) 436-7890', DOB: '29/09/2000', gender: "Male"  , email: 'zimba29@gmail.com', B_group: 'O+'},
        { Student_ID: "CST20019", f_name: "Jack" ,l_name: "Farwin"  , address: "jaffna"     , mobile: '(123) 756-7890', DOB: '09/08/2000', gender: "Male"  , email: 'jack09@gmail.com' , B_group: 'B-'},
        { Student_ID: "CST20020", f_name: "Bindi",l_name: "Franklin", address: "Kilinochchi", mobile: '(123) 556-7820', DOB: '19/11/2000', gender: "Female", email: 'bindi19@gmail.com', B_group: 'O-'},
        { Student_ID: "CST20028", f_name: "Nick" ,l_name: "Sharoon" , address: "Mullaitivu" , mobile: '(123) 256-4490', DOB: '10/02/2000', gender: "Male"  , email: 'nick10@gmail.com' , B_group: 'AB'},
        { Student_ID: "CST20029", f_name: "Stela",l_name: "Been"    , address: "Vavuniya"   , mobile: '(123) 406-7000', DOB: '07/12/2000', gender: "Female", email: 'stela07@gmail.com', B_group: 'O-'},
        { Student_ID: "CST20030", f_name: "Wick" ,l_name: "Roman"   , address: "Ampara"     , mobile: '(123) 256-7000', DOB: '05/05/2000', gender: "Male"  , email: 'wick05@gmail.com' , B_group: 'B+'},
        { Student_ID: "CST20031", f_name: "Henry",l_name: "Anand"   , address: "Kalutara"   , mobile: '(123) 435-7825', DOB: '01/03/2000', gender: "Male"  , email: 'henry01@gmail.com', B_group: 'O+'},
        { Student_ID: "CST20032", f_name: "Sofia",l_name: "Paul"    , address: "Badulla"    , mobile: '(123) 646-2550', DOB: '09/07/2000', gender: "Female", email: 'sofia09@gmail.com', B_group: 'A+'},
        { Student_ID: "CST20035", f_name: "Smith",l_name: "Charles" , address: "Matara"     , mobile: '(123) 231-4569', DOB: '12/04/2000', gender: "Male"  , email: 'smith12@gmail.com', B_group: 'B-'},
        { Student_ID: "CST20040", f_name: "Liza" ,l_name: "Singh"   , address: "Matale"     , mobile: '(123) 444-8769', DOB: '17/01/2000', gender: "Female", email: 'liza17@gmail.com' , B_group: 'A+'}
    ])
    // console.log(PatientList)
    // console.log(PatientList[0])


    return (
        <AdminLayout>
            

            <div className={"container"}>
                <div className={"p-5"}>
                    <div className={"SearchSection"} style={{ display: 'flex', flexDirection: 'row' }}>
                        <div><h3 className={"content-heading"}>Filter the Results : </h3></div>
                        <div className={"SearchSection2"}>
                            {/* <SearchBarID onSearch={handleSearch} /> */}
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
                                <input className={"SearchBox1"}
                                    type="text"
                                    placeholder="STUDENT_ID "
                                    value={searchTerm3}
                                    onChange={handleChange3}
                                />
                                <button type="submit" className="filterbutt" onClick={toggleModal}>Filter</button>
                            </form>
                            <form onSubmit={handleSubmit2} style={{ display: 'flex', flexDirection: 'row' }}>
                                <input className={"SearchBox1"}
                                    type="text"
                                    placeholder="STUDENT_NAME"
                                    value={searchTerm4}
                                    onChange={handleChange4}
                                />
                                <button type="submit" className="filterbutt" onClick={toggleModal}>Filter</button>
                            </form>
                            {/* <SearchBarName onSearch={handleSearch1} /> */}
                        </div>

                    </div>
                    <div className={"table-container "}>
                        <table className={"table table-hover table-striped "}>
                            <thead className={"top-0 position-sticky h-45"}>
                                <tr>
                                    <th scope="col">STUDENT_ID</th>
                                    <th scope="col">F_NAME</th>
                                    <th scope="col">L_NAME</th>
                                    <th scope="col">ADDRESS</th>
                                    <th scope="col">MOBILE</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">GENDER</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">B_GROUP</th>
                                    <th scope="col">VIEW</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PatientList.map((data, index) => (<tr>
                                    <th scope="row">{data.Student_ID}</th>
                                    <td>{data.f_name}</td>
                                    <td>{data.l_name}</td>
                                    <td>{data.address}</td>
                                    <td>{data.mobile}</td>
                                    <td>{data.DOB}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.email}</td>
                                    <td>{data.B_group}</td>
                                    <td>
                                        <FeatherIcon className={"viewbutt"} icon={"eye"} onClick={toggleModal} />


                                    </td>
                                </tr>))}

                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
            
            </AdminLayout>
        
  );

}                               
export default PatientList;
