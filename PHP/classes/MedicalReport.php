<?php
namespace classes;

require_once "DBconnector.php";
use classes\DBconnector;
use PDO;
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
    private $Doctor_name;
    private $Patient_Name;


    public function __construct($Report_ID, $Request_ID, $Patient_ID, $Doctor_ID, $IssueDate, $StartDate, $EndDate, $Message, $Doctor_name, $Patient_Name)

    {
        $this->Report_ID = $Report_ID;
        $this->Request_ID = $Request_ID;
        $this->Patient_ID = $Patient_ID;
        $this->Doctor_ID = $Doctor_ID;
        $this->IssueDate = $IssueDate;
        $this->StartDate = $StartDate;
        $this->EndDate = $EndDate;
        $this->Message = $Message;
        $this->Doctor_name = $Doctor_name;
        $this->Patient_Name = $Patient_Name;
    }


    public function createReport()
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "INSERT INTO medicalreport (Report_ID, MedicalRequest_ID, patient_ID, Doctor_ID, IssueDate, StartDate, EndDate, Message, 	Doctor_Name, Patient_Name) VALUES (?,?,?,?,?,?,?,?,?,?)";
            
            $pstmt = $con->prepare($query);

            $pstmt->bindParam(1, $this->Report_ID);
            $pstmt->bindParam(2, $this->Request_ID);
            $pstmt->bindParam(3,$this->Patient_ID);
            $pstmt->bindParam(4,$this->Doctor_ID);
            $pstmt->bindParam(5,$this->IssueDate);
            $pstmt->bindParam(6,$this->StartDate);
            $pstmt->bindParam(7,$this->EndDate);
            $pstmt->bindParam(8,$this->Message);
            $pstmt->bindParam(9,$this->Doctor_name);
            $pstmt->bindParam(10,$this->Patient_Name);

            if ($pstmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e->getMessage(); 
        }
    }

    
    public static function deleteMedicalreport($Report_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "DELETE FROM medicalreport WHERE Report_ID  = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Report_ID);
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

    public function updateMedicalreport($Report_ID, $Request_ID, $Patient_ID, $Doctor_ID, $IssueDate, $StartDate, $EndDate, $Message)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "UPDATE medicalreport SET Report_ID = ? , patient_ID = ? , Doctor_ID = ? , IssueDate = ? , StartDate = ? , EndDate = ? , Message = ?  WHERE MedicalRequest_ID = ?";
            
            $pstmt = $con->prepare($query);

            $pstmt->bindParam(1,$Report_ID);
            $pstmt->bindParam(2,$Patient_ID);
            $pstmt->bindParam(3,$Doctor_ID);
            $pstmt->bindParam(4,$IssueDate);
            $pstmt->bindParam(5,$StartDate);
            $pstmt->bindParam(6,$EndDate);
            $pstmt->bindParam(7,$Message);
            $pstmt->bindParam(8,$Request_ID);

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

    public static function displayMedicalreportsByPatinetID($Patient_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT * FROM medicalreport WHERE Patient_ID = ? ORDER BY IssueDate DESC";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Patient_ID);
            $pstmt->execute();
            return $pstmt;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public static function isReportForRequest($Request_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT Report_ID FROM medicalreport WHERE MedicalRequest_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Request_ID);
            $pstmt->execute();

            $result = $pstmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result['Report_ID'];
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public static function isReport($Report_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT Report_ID FROM medicalreport WHERE Report_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Report_ID);
            $pstmt->execute();

            $result = $pstmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
    public static function getReportById($Report_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT * FROM medicalreport WHERE Report_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Report_ID);
            $pstmt->execute();

            $result = $pstmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result;
            } else {
                return ['error' => 'report not available'];;
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }


}