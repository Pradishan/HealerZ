import React from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile">
      <div className="card-container cardprof">
        <div className="card card-1 cardproff">
          <h2>Profile</h2>
          <div className="card sub-card cardproff">
            <div className="info">
              <h6>Pradheeshan Sharoon</h6>
              <p className="info">cst20001</p>
              <p className="info"> N0:31, Kandy, Sri Lanka</p>
              <p className="info">0771234567</p>
            </div>
            <div></div>
          </div>
          <div className="info-2">
            <p info-2>
              Age <span className="green">22 years</span>
            </p>
            <p info-2>Gender Male</p>
            <p info-2>
              Blood Group <span className="red">B+</span>{" "}
            </p>
            <p info-2>
              Allergies <span className="blue">No</span>
            </p>
          </div>

          <div className="specialDisease">
            <h6>Special Disease</h6>
            <p>
              "Technophobia Virus" or "Technophobia Syndrome": This fictional
              disease is often portrayed in comedic settings where individuals
              exhibit an irrational fear or aversion to technology. It can lead
              to humorous situations as characters struggle to cope with modern
              devices and advancements.
            </p>
          </div>

          <Link to="http://localhost:3000/MedicalRequest">
            <div className="button">
              <button className="gradient-button">Request Medical</button>
            </div>
          </Link>
        </div>

        <div className="card card-2 cardproff">
          <form id="editProfileForm">
            <div className="container">
              <div className="column-container">
                <div className="column-1">
                  <div className="sub-row">
                    <h5>Edit Profile</h5>
                  </div>

                  <div className="personalInfo">
                    <div className="form-group">
                      <label for="age">Age:</label>
                      <input
                        type="number"
                        className="form-input"
                        id="age"
                        name="age"
                        required
                      ></input>
                    </div>

                    <div className="form-group">
                      <label for="phoneNumber">Phone Number:</label>
                      <input
                        type="tel"
                        className="form-input"
                        id="phoneNumber"
                        name="phoneNumber"
                        required
                      ></input>
                    </div>

                    <div className="form-group">
                      <label for="address">Address:</label>
                      <input
                        type="text"
                        className="form-input"
                        id="address"
                        name="address"
                        required
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="column-2">
                  <div className="sub-row">
                    <h5>Change Password</h5>
                  </div>

                  <div className="personalInfo">
                    <div className="form-group">
                      <label for="oldPassword">Old Password:</label>
                      <input
                        type="password"
                        className="form-input"
                        id="oldPassword"
                        name="oldPassword"
                        required
                      ></input>
                    </div>

                    <div className="form-group">
                      <label for="newPassword">New Password:</label>
                      <input
                        type="password"
                        className="form-input"
                        id="newPassword"
                        name="newPassword"
                        required
                      ></input>
                    </div>

                    <div class="form-group">
                      <label for="confirmPassword">Confirm Password:</label>
                      <input
                        type="password"
                        className="form-input"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <h5>Allergies and Diseases</h5>

              <div className="allergies">
                <div className="form-group">
                  <label for="allergies">Allergies:</label>
                  <input
                    type="text"
                    className="form-input"
                    id="allergies"
                    name="allergies"
                  ></input>
                </div>

                <div className="form-group">
                  <label for="diseases">Specific Diseases:</label>
                  <input
                    type="text"
                    className="form-input"
                    id="diseases"
                    name="diseases"
                  ></input>
                </div>
              </div>

              <div className="button">
                <button className="gradient-button">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
