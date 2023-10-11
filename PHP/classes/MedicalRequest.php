<?php

namespace classes;
require_once "DBconnector.php";
use classes\DBconnector;
use PDOException;


class MedicalRequest
{
    private $Request_ID;
    private $Patient_ID;
    private $Doctor_ID;
    private $ConsultationDate;
    private $StartDate;
    private $EndDate;
    private $Message;
    private $State;

    public function __construct($Request_ID = null, $Patient_ID = null, $Doctor_ID = null, $ConsultationDate = null, $StartDate = null, $EndDate = null, $Message = null, $State = null)
    {
        $this->Request_ID = $Request_ID;
        $this->Patient_ID = $Patient_ID;
        $this->Doctor_ID = $Doctor_ID;
        $this->ConsultationDate = $ConsultationDate;
        $this->StartDate = $StartDate;
        $this->EndDate = $EndDate;
        $this->Message = $Message;
        $this->State = $State;
    }


    public function getRequest_ID()
    {
        return $this->Request_ID;
    }


    public function setRequest_ID($Request_ID)
    {
        $this->Request_ID = $Request_ID;
    }


    public function getPatient_ID()
    {
        return $this->Patient_ID;
    }


    public function setPatient_ID($Patient_ID)
    {
        $this->Patient_ID = $Patient_ID;
    }


    public function getDoctor_ID()
    {
        return $this->Doctor_ID;
    }


    public function setDoctor_ID($Doctor_ID)
    {
        $this->Doctor_ID = $Doctor_ID;
    }


    public function getConsultationDate()
    {
        return $this->ConsultationDate;
    }


    public function setConsultationDate($ConsultationDate)
    {
        $this->ConsultationDate = $ConsultationDate;
    }


    public function getStartDate()
    {
        return $this->StartDate;
    }


    public function setStartDate($StartDate)
    {
        $this->StartDate = $StartDate;
    }


    public function getEndDate()
    {
        return $this->EndDate;
    }


    public function setEndDate($EndDate)
    {
        $this->EndDate = $EndDate;
    }


    public function getMessage()
    {
        return $this->Message;
    }


    public function setMessage($Message)
    {
        $this->Message = $Message;
    }


    public function getState()
    {
        return $this->State;
    }


    public function setState($State)
    {
        $this->State = $State;
    }

    public function createRequest()
    {
        try {
            $con = new DBconnector();
            $conn = $con->getConnection();
            $sql = "INSERT INTO medicalrequest (Patient_ID, Doctor_ID, ConsultationDate, StartDate, EndDate, Message, State) VALUES (?, NULL, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$this->Patient_ID, $this->ConsultationDate, $this->StartDate, $this->EndDate, $this->Message, $this->State]);
            $conn = null;
            return true;
        } catch (PDOException $ex) {
            return false;
        }
    }
}