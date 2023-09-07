<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDOException;

class Patient
{
    private $Patient_ID;
    private $PatientName;
    private $DateOfBirth;
    private $Gender;
    private $PhoneNo;
    private $Email;
    private $Address;
    private $BloodGroup;
    private $Password;
    private $Profile;
    private $SpecialDisease;


    public function __construct($Patient_ID, $PatientName, $DateOfBirth, $Gender, $PhoneNo, $Email, $Address, $BloodGroup, $Password)
    {

        $this->Patient_ID = $Patient_ID;
        $this->PatientName = $PatientName;
        $this->DateOfBirth = $DateOfBirth;
        $this->Gender = $Gender;
        $this->PhoneNo = $PhoneNo;
        $this->Email = $Email;
        $this->Address = $Address;
        $this->BloodGroup = $BloodGroup;
        $this->Password = $Password;
    }





    public function getPatient_ID()
    {
        return $this->Patient_ID;
    }

    public function setPatient_ID($value)
    {
        $this->Patient_ID = $value;
    }

    public function getPatientName()
    {
        return $this->PatientName;
    }

    public function setPatientName($value)
    {
        $this->PatientName = $value;
    }

    public function getDateOfBirth()
    {
        return $this->DateOfBirth;
    }

    public function setDateOfBirth($value)
    {
        $this->DateOfBirth = $value;
    }

    public function getGender()
    {
        return $this->Gender;
    }

    public function setGender($value)
    {
        $this->Gender = $value;
    }

    public function getPhoneNo()
    {
        return $this->PhoneNo;
    }

    public function setPhoneNo($value)
    {
        $this->PhoneNo = $value;
    }

    public function getEmail()
    {
        return $this->Email;
    }

    public function setEmail($value)
    {
        $this->Email = $value;
    }

    public function getAddress()
    {
        return $this->Address;
    }

    public function setAddress($value)
    {
        $this->Address = $value;
    }

    public function getBloodGroup()
    {
        return $this->BloodGroup;
    }

    public function setBloodGroup($value)
    {
        $this->BloodGroup = $value;
    }

    public function getPassword()
    {
        return $this->Password;
    }

    public function setPassword($value)
    {
        $this->Password = $value;
    }

    public function getProfile()
    {
        return $this->Profile;
    }

    public function setProfile($value)
    {
        $this->Profile = $value;
    }

    public function getSpecialDisease()
    {
        return $this->SpecialDisease;
    }

    public function setSpecialDisease($value)
    {
        $this->SpecialDisease = $value;
    }


    public function addPatient()
    {
        try {
           
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "INSERT INTO patient (Patient_ID, PatientName,DateOfBirth,Gender,PhoneNo,Email,Address,BloodGroup,Password) VALUES (:Patient_ID, :PatientName, :DateOfBirth, :Gender, :PhoneNo, :Email, :Address, :BloodGroup, :Password)";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':Patient_ID', $this->Patient_ID);
            $stmt->bindValue(':PatientName', $this->PatientName);
            $stmt->bindValue(':DateOfBirth', $this->DateOfBirth);
            $stmt->bindValue(':Gender', $this->Gender);
            $stmt->bindValue(':PhoneNo', $this->PhoneNo);
            $stmt->bindValue(':Email', $this->Email);
            $stmt->bindValue(':Address', $this->Address);
            $stmt->bindValue(':BloodGroup', $this->BloodGroup);
            $stmt->bindValue(':Password', $this->Password);
            $res = $stmt->execute();

            if ($res) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }

    public function deletePatient(){
        $dbcon=new DBconnector();
        $conn=$dbcon->getConnection();
        $query="DELETE FROM patient WHERE Patient_ID = :Patient_ID";
        $stmt=$conn->prepare($query);
        $stmt->bindValue(':Patient_ID',$this->Patient_ID);
        $res=$stmt->execute();

        if($res){
            return true;
        }else{
            return false;
        }
    }
}
