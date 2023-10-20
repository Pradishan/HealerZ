<?php

namespace classes;

require_once "DBconnector.php";
use classes\DBconnector;
use PDOException;


class MedicalReport
{
    private $Report_ID;
    private $Request_ID;
    private $Patient_ID;
    private $Doctor_ID;
    private $IssueDate;
    private $StartDate;
    private $EndDate;
    private $Message;


    public function __construct($Request_ID, $Report_ID, $Patient_ID, $Doctor_ID, $IssueDate, $StartDate, $EndDate, $Message)
    {
        $this->Request_ID = $Request_ID;
        $this->Report_ID = $Report_ID;
        $this->Patient_ID = $Patient_ID;
        $this->Doctor_ID = $Doctor_ID;
        $this->IssueDate = $IssueDate;
        $this->StartDate = $StartDate;
        $this->EndDate = $EndDate;
        $this->Message = $Message;
    }


    public function getRequest_ID()
    {
        return $this->Request_ID;
    }


    public function setRequest_ID($Request_ID)
    {
        $this->Request_ID = $Request_ID;
    }
    public function getReport_ID()
    {
        return $this->Report_ID;
    }


    public function setReport_ID($Report_ID)
    {
        $this->Report_ID = $Report_ID;
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


    public function getIssueDate()
    {
        return $this->IssueDate;
    }


    public function setIssueDate($IssueDate)
    {
        $this->IssueDate = $IssueDate;
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


    public function createReport()
    {
        try {
            $con = new DBconnector();
            $conn = $con->getConnection();
            $sql = "INSERT INTO medicalreport (Report_ID, MedicalRequest_ID, patient_ID, Doctor_ID, IssueDate, StartDate, EndDate, Message) VALUES (?,?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$this->Request_ID, $this->Report_ID, $this->Patient_ID, $this->Doctor_ID, $this->IssueDate, $this->StartDate, $this->EndDate, $this->Message]);
            $conn = null;
            return true;
        } catch (PDOException $ex) {
            return false;
        }
    }
}