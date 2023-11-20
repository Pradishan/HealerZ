<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDOException;
use PDO;


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

    public static function handleRequest($State, $Request_ID, $Doctor_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "UPDATE medicalrequest SET State = ?, Doctor_ID = ? WHERE MedicalRequest_ID = ?";

            $pstmt = $con->prepare($query);

            $pstmt->bindParam(1, $State);
            $pstmt->bindParam(2, $Doctor_ID);
            $pstmt->bindParam(3, $Request_ID);

            $res = $pstmt->execute();

            if ($res) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e;
        }
    }
    public static function getRequestById($Request_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT * FROM medicalrequest WHERE MedicalRequest_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Request_ID);
            $pstmt->execute();

            $result = $pstmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result;
            } else {
                return ['error' => 'reqest not available'];
                ;
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
    public static function getStatusById($Request_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT State FROM medicalrequest WHERE MedicalRequest_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Request_ID);
            $pstmt->execute();

            $result = $pstmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result['State'];
            } else {
                return ['error' => 'reqest not available'];
                ;
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }



    public static function getApprovedMedicalRequests($Patient_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = "SELECT * FROM medicalrequest WHERE Patient_ID = ? AND State = 'Approved'";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Patient_ID);
            $pstmt->execute();

            $results = $pstmt->fetchAll(PDO::FETCH_ASSOC);

            if ($results) {
                return $results;
            } else {
                return [];
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
