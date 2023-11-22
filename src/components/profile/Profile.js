import React, { useState, useEffect } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import profprofimg from "../../assets/Profilesideimg.webp";
import default_dp from "../../assets/avatar.svg";
import AgeCalculator from "../doctorinterface/algorithms/AgeCalculator";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import personalsetting from "../../assets/Personal settings.svg";
import jsPDF from "jspdf";
import signature from "../../assets/Signature.png";
import pdfback from "../../assets/PDF back.jpg";

const Profile = () =>
{
  const [ profilepic, setprofilepic ] = useState( default_dp );
  const [ userdata, setuserdata ] = useState( [] );
  const [ editedPhoneNo, setEditedPhoneNo ] = useState( "" );
  const [ editedAddress, setEditedAddress ] = useState( "" );
  const [ editedAllDiseases, setEditedAllDiseases ] = useState( "" );
  const [ editedProfilePic, setEditedProfilePic ] = useState( null );
  const [ currpw, setcurrpw ] = useState( null );
  const [ changepw, setchangepw ] = useState( null );
  const [ confirmpw, setconfirmpw ] = useState( null );
  const [ showSecondCard, setShowSecondCard ] = useState( false );
  const [ medicallist, setmedicallist ] = useState( [] );

  useEffect( () =>
  {
    fetchData2();
  }, [] );

  const fetchData2 = async () =>
  {
    try
    {
      const patientID = sessionStorage.getItem( "patientID" );

      const response = await axios.get(
        `http://localhost/Healerz/PHP/patient/getmedicalreport.php?patientID=${ patientID }`
      );

      setmedicallist( response.data );
    } catch ( error )
    {
      console.error( error );
    }
  };

  const handleOpen = () =>
  {
    setShowSecondCard( !showSecondCard );
  };

  useEffect( () =>
  {
    fetchData();
  }, [] );

  const passwordchange = async () => {
    try {
      if (!currpw) {
        toast.warning("Fill the Current Password");
      } else {
        const response = await axios.get(
          `http://localhost/HealerZ/PHP/patient/getPassword.php?patientID=${userdata[0].Patient_ID}`
        );

        const hashedPasswordFromServer = response.data.Password;
        const isCurrentPasswordCorrect = await axios.post(
          "http://localhost/HealerZ/PHP/Inventory/settings/verifyPassword.php",
          {
            currentPassword: currpw,
            hashedPassword: hashedPasswordFromServer,
          }
        );

        if (isCurrentPasswordCorrect.data.isValid) {
          if (!changepw) {
            toast.warning("Fill the New Password");
          } else if (changepw === confirmpw) {
            if (currpw === changepw) {
              toast.info("Existing Password !");
            } else {
              await axios.put(
                "http://localhost/HealerZ/PHP/patient/changePassword.php",
                { patientID: userdata[0].Patient_ID, newPassword: changepw }
              );

              toast.success("Password Changed Successfully");
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            }
          } else if (!confirmpw) {
            toast.warning("Fill the Confirm Password");
          } else {
            toast.error("Wrong Confirm Password !");
          }
        } else {
          toast.error("Wrong Current Password !");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileUpdate = () =>
  {
    if (
      editedPhoneNo.length < 10 ||
      editedPhoneNo.length > 10 ||
      editedPhoneNo[ 0 ] !== 0
    )
    {
      toast.info( "Invalid Phone Number" );
    } else if (
      userdata[ 0 ].Address === editedAddress &&
      userdata[ 0 ].PhoneNo === editedPhoneNo &&
      editedProfilePic == null
    )
    {
      toast.info( "No changes made" );
    } else
    {
      const formData = new FormData();
      formData.append( "Patient_ID", sessionStorage.getItem( "patientID" ) );
      formData.append( "PhoneNo", editedPhoneNo );
      formData.append( "Address", editedAddress );
      editedProfilePic && formData.append( "Profile", editedProfilePic );

      axios
        .post(
          "http://localhost/HealerZ/PHP/patient/updateProfile.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then( ( res ) =>
        {
          res.data.error && toast.error( res.data.error );
          toast.success( "Profile updated Successfully" );
          setTimeout( function ()
          {
            window.location.reload();
          }, 1000 );
        } )
        .catch( ( err ) =>
        {
          console.log( err );
        } );
    }
  };

  const handleAlergyUpdate = () =>
  {
    if ( userdata[ 0 ].SpecialDisease === editedAllDiseases )
    {
      toast.error( "No changes made" );
      return;
    }
    const formData1 = new FormData();
    formData1.append( "Patient_ID", sessionStorage.getItem( "patientID" ) );
    formData1.append( "SpecialDisease", editedAllDiseases );
    axios
      .post(
        "http://localhost/HealerZ/PHP/patient/updateProfile.php",
        formData1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then( ( res ) =>
      {
        if ( res.data.message )
        {
          const messages = res.data.message.split( "." );
          for ( const message of messages )
          {
            message && toast.success( message );
          }
        }
        res.data.error && toast.error( res.data.error );
        setTimeout( function ()
        {
          window.location.reload();
        }, 1000 );
      } )
      .catch( ( err ) =>
      {
        console.log( err );
      } );
  };

  const fetchData = async () =>
  {
    try
    {
      const response = await axios.get(
        "http://localhost/Healerz/PHP/patient/getPatientData.php",
        { params: { patientID: sessionStorage.getItem( "patientID" ) } }
      );
      console.log( response.data );
      if ( Array.isArray( response.data ) && response.data.length > 0 )
      {
        setuserdata( response.data );
      } else
      {
        console.error( "No data found or invalid response structure" );
      }
      setEditedAddress( response.data[ 0 ].Address );
      setEditedPhoneNo( response.data[ 0 ].PhoneNo );
      setEditedAllDiseases( response.data[ 0 ].SpecialDisease );
      console.log( 'the profile type is :' + response.data[ 0 ].ProfileType );

      if ( response.data[ 0 ].Profile )
      {
        convertBase64ProfileImage(
          response.data[ 0 ].Profile,
          response.data[ 0 ].ProfileType
        );
      }
    } catch ( error )
    {
      console.error( "Error fetching data:", error );
    }
  };

  const convertBase64ProfileImage = ( base64, type ) =>
  {
    const image = new Image();
    image.src = `data:${ type };base64,${ base64 }`;
    image.onload = () =>
    {
      setprofilepic( image.src );
    };
  };

  const generatePDF = ( data ) =>
  {
    const pdf = new jsPDF();
    const img = new Image();
    img.src = pdfback;

    img.onload = function ()
    {
      pdf.addImage( img, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height );
      pdf.setFontSize( 20 );
      pdf.setFont( "helvetica", "bold" );
      pdf.setTextColor( 0, 0, 139 );
      pdf.text( "Medical Request Confirmation", 105, 20, { align: "center" } );
      pdf.setTextColor( 0, 0, 0 );
      pdf.setFont( "helvetica", "normal" );
      pdf.setFontSize( 12 );
      pdf.text( `Patient ID: ${ data.Patient_ID }`, 20, 40 );
      pdf.text( `Consultation Date: ${ data.ConsultationDate }`, 20, 50 );
      pdf.setFontSize( 12 );
      pdf.text( "We are pleased to inform you that your medical request has been reviewed and approved.", 20, 70 );
      pdf.text( `Approved Period: From ${ data.StartDate } to ${ data.EndDate }`, 20, 80 );
      pdf.text( `If you have any further questions or concerns regarding your approved medical request,`, 20, 100 );
      pdf.text( `please do not hesitate to contact [Medical Center Of Uva Wellassa University]`, 20, 110 );
      pdf.text( `Contact Number : 021-221-0721`, 20, 120 );
      pdf.text( `Email : healerz763@gmail.com`, 20, 130 );

      pdf.addImage( signature, "PNG", 30, 150, 30, 20 );

      pdf.line( 20, 170, 80, 170 );
      pdf.setFontSize( 12 );
      pdf.text( "Doctor Signature", 20, 180 );
      pdf.text( "HealerZ ( Medical Center Of UWU )", 20, 190 );
      pdf.addImage( logo, "PNG", 20, 200, 40, 20 );

      pdf.save( `${ data.Patient_ID }_medical_record.pdf` );
    };
  };


  const handleAddMedicalRequest = async ( e ) =>
  {
    e.preventDefault();
    const formData = new FormData( e.target );
    if (
      formData.get( "consultationDate" ) === "" ||
      formData.get( "duration" ) === "" ||
      formData.get( "message" ) === ""
    )
    {
      toast.error( "Please fill all the fields" );
      return;
    } else if ( formData.get( "duration" ) < 1 )
    {
      toast.error( "Please enter a valid duration" );
      return;
    }
    formData.append( "patientID", sessionStorage.getItem( "patientID" ) );
    const data = Object.fromEntries( formData );
    console.log( data );
    const response = await axios
      .post( "http://localhost/Healerz/PHP/patient/addMedicalRequest.php", data )
      .then( ( res ) =>
      {
        console.log( res );
        toast.success( res.data.message );
        setTimeout( function ()
        {
          window.location.reload();
        }, 2000 );
      } )
      .catch( ( err ) =>
      {
        console.log( err );
      } );
    console.log( response );
  };

  const logout = () =>
  {
    sessionStorage.setItem( "patient", false );
    sessionStorage.setItem( "patientID", null );
    sessionStorage.setItem( "loginStatus", "Logged out successfully!" );
  };

  const [ menuOpen, setMenuOpen ] = useState( false );

  const toggleMenu = () =>
  {
    setMenuOpen( !menuOpen );
  };

  return (
    <div>
      <nav
        className={ `navbar navbar-expand-lg shadow top navbarh ${ menuOpen ? "open" : "close"
          }` }
        style={ { zIndex: "1000" } }
      >
        <div className="container-fluid">
          <a className="navbar-brand navbar-brand1" href="/">
            <img src={ logo } alt="HealerZ" height="48px" />
          </a>
          <button className="navbar-toggler" type="button" onClick={ toggleMenu }>
            { menuOpen ? (
              <span className="close-icon">&times;</span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            ) }
          </button>
          <div
            className={ `navbar-collapse navbar-collapse1 collapse ${ menuOpen ? "show" : ""
              }` }
          >
            <ul className="navbar-nav">
              <li className="nav-item nav-link nav-hover navicoon">
                <a className="nav-link" href="/home">
                  <IconButton aria-label="delete">
                    <HomeIcon className="naviccon2 " />
                  </IconButton>
                  <span className="lettnav">HOME</span>
                </a>
              </li>
              <li className="nav-item" style={ { paddingLeft: "30px" } }>
                <a
                  className="nav-link nav-hover "
                  href="/login"
                  onClick={ logout }
                >
                  <img
                    src={ profilepic }
                    alt="avatar"
                    className="rounded-circle me-2 loginiccontt"
                    width="40px"
                    height="40px"
                    style={ { objectFit: "cover" } }
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <div className="profile">
        <div className="card-container cardprof">
          <div className="card card-1 cardproff">
            <h3 className="serhed7">Profile</h3>
            <hr />
            { userdata.map( ( data, index ) => (
              <div key={ index }>
                <div
                  className="d-flex justify-content-center mb-2"
                  style={ { gap: "25px" } }
                >
                  <div className="d-flex align-items-center justify-content-center ms-2">
                    <div className="image-containertt2">
                      <img
                        src={ profilepic }
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="100px"
                        height="100px"
                        style={ { objectFit: "cover" } }
                      />
                      <div className="zoomed-image2">
                        <img
                          src={ profilepic }
                          alt="zoomed-avatar"
                          width="150px"
                          height="150px"
                          style={ { objectFit: "cover" } }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div>
                      <h4 className="m-0">{ data.PatientName }</h4>
                      <p className="fs-5 m-0">{ data.Patient_ID }</p>
                      <p className="fs-9 m-0">{ data.Address }</p>
                      <p className="fs-10 m-0">{ data.PhoneNo }</p>
                    </div>
                  </div>
                </div>
                <button
                  className="btn shadow gradient-button"
                  onClick={ handleOpen }
                  style={ { marginTop: "10px" } }
                >
                  { showSecondCard ? "Close Profile" : "Edit Profile" }
                </button>
                <hr />
                <div className="info-2">
                  <p info-2>
                    Age :{ " " }
                    <span className="green">
                      <AgeCalculator dateOfBirth={ data.DateOfBirth } /> years
                    </span>
                  </p>
                  <p info-2>Gender : { data.Gender }</p>
                  <p info-2>
                    Blood Group : <span className="red">{ data.BloodGroup }</span>{ " " }
                  </p>
                  <p info-2>
                    Allergies :{ " " }
                    <span className="blue">{ data.SpecialDisease }</span>
                  </p>
                </div>
              </div>
            ) ) }

            <div className="specialDisease">
              <h6>Special Disease</h6>
              <p>{ userdata.map( ( data ) => data.SpecialDisease ) }</p>
            </div>
            <hr />
            <br />

            <div>
              <h3 className="serhed7">Medical</h3>
              <hr />
              <table className={ "table table-hover table-striped " }>
                <thead className={ "top-0 position-sticky h-45" }>
                  <th>No</th>
                  <th>Date</th>
                  <th>Download</th>
                </thead>
                <tbody>
                  { medicallist.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No medical Reports available
                      </td>
                    </tr>
                  ) : (
                    medicallist.map( ( data, index ) => (
                      <tr key={ index }>
                        <th scope="row">{ index + 1 }</th>
                        <td style={ { fontSize: "12px" } }>
                          { data.ConsultationDate }
                        </td>
                        <td>
                          <div className="button">
                            <button
                              className="btn shadow gradient-buttonnn"
                              onClick={ () => generatePDF( data ) }
                            >
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) )
                  ) }
                </tbody>
              </table>
              <hr />
            </div>
          </div>
          { showSecondCard ? (
            <div className="card card-2 cardproff">
              <div className="form-container">
                <h3 className="serhed6">Edit Profile Details</h3>
                <hr />
                <form id="editProfileForm" encType="multipart/form-data">
                  <div className="container">
                    <div className="column-container">
                      <div className="column-1">
                        <div className="sub-row">
                          <h5>Edit Profile</h5>
                        </div>
                        { userdata.map( ( data, index ) => (
                          <div className="personalInfo">
                            <div className="form-floating">
                              <input
                                type="number"
                                className="form-control"
                                id="phoneNo"
                                placeholder="New Password"
                                style={ { width: "100%" } }
                                value={ editedPhoneNo }
                                onChange={ ( e ) =>
                                {
                                  setEditedPhoneNo( e.target.value );
                                } }
                              />
                              <label htmlFor="phoneNo">Change PhoneNo</label>
                            </div>
                            <br />
                            <div className="form-floating">
                              <textarea
                                type="text"
                                className="form-control"
                                id="address_field"
                                placeholder="New Password"
                                style={ { width: "100%" } }
                                value={ editedAddress }
                                onChange={ ( e ) =>
                                {
                                  setEditedAddress( e.target.value );
                                } }
                              />
                              <label htmlFor="address_field">
                                Change Address
                              </label>
                            </div>
                            <br />
                            <div className="form-floating">
                              <input
                                type="file"
                                name="Profile"
                                className="form-control"
                                accept=".jpg, .jpeg, .png"
                                id="profilePic"
                                placeholder="Change Profile pic"
                                style={ { width: "100%" } }
                                onChange={ ( e ) =>
                                {
                                  setEditedProfilePic( e.target.files[ 0 ] );
                                } }
                              />
                              <label htmlFor="ProfilePic">
                                Change profile pic
                              </label>
                            </div>
                            <hr />
                            <div className="button">
                              <button
                                className="btn shadow gradient-button"
                                onClick={ ( e ) =>
                                {
                                  e.preventDefault();
                                  handleProfileUpdate();
                                } }
                              >
                                Update Profile{ " " }
                              </button>
                            </div>
                          </div>
                        ) ) }
                      </div>

                      <div className="column-2">
                        <div className="sub-row">
                          <h5>Change Password</h5>
                        </div>

                        <div className="personalInfo">
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              id="currentPassword"
                              placeholder="Current Password"
                              onChange={ ( e ) =>
                              {
                                setcurrpw( e.target.value );
                              } }
                              style={ { width: "100%" } }
                            />
                            <label htmlFor="currentPassword">
                              Current Password
                            </label>
                          </div>
                          <br />
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              placeholder="New Password"
                              onChange={ ( e ) =>
                              {
                                setchangepw( e.target.value );
                              } }
                              style={ { width: "100%" } }
                            />
                            <label htmlFor="newPassword">New Password</label>
                          </div>
                          <br />
                          <div className="form-floating">
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              onChange={ ( e ) =>
                              {
                                setconfirmpw( e.target.value );
                              } }
                              style={ { width: "100%" } }
                            />
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                          </div>
                          <hr />
                          <div className="button">
                            <button
                              className="btn shadow gradient-button"
                              onClick={ ( e ) =>
                              {
                                e.preventDefault();
                                passwordchange();
                              } }
                            >
                              Update Password{ " " }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5>Allergies and Diseases</h5>
                    <div className="allergies">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          id="diseases"
                          placeholder="Confirm Password"
                          value={ editedAllDiseases }
                          rows={ 7 }
                          onChange={ ( e ) =>
                          {
                            setEditedAllDiseases( e.target.value );
                          } }
                        ></textarea>
                        <label htmlFor="diseases">Specific Diseases</label>
                        <hr />
                        <div className="button">
                          <button
                            className="btn shadow gradient-button"
                            onClick={ ( e ) =>
                            {
                              e.preventDefault();
                              handleAlergyUpdate();
                            } }
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="personalsettingimg">
                <img src={ personalsetting } alt="" />
              </div>
            </div>
          ) : (
            <div className="card card-2 cardproff">
              <div className="justify-content-center mb-2 profilesideimg">
                <img src={ profprofimg } alt="Background" />
              </div>

              <div className="">
                <div className="form-container">
                  <h3 className="serhed6">Request Medical</h3>
                  <hr />
                  <form
                    id="medical-request-form"
                    onSubmit={ ( e ) => handleAddMedicalRequest( e ) }
                  >
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="Date_field"
                        name="consultationDate"
                        placeholder="New Password"
                        style={ { width: "100%" } }
                      />
                      <label htmlFor="Date_field">Consulatation Date</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="Duration-Days"
                        placeholder="New Password"
                        name="duration"
                        style={ { width: "100%" } }
                      />
                      <label htmlFor="Duration-Days">Duration (In Days)</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        id="message"
                        placeholder="New Password"
                        name="message"
                        style={ { width: "100%" } }
                      />
                      <label htmlFor="message">Message</label>
                    </div>
                    <hr />
                    <div className="button">
                      <button
                        className="btn shadow gradient-button"
                        type="submit"
                      >
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              <hr />
              <br />
            </div>
          ) }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
