<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDO;
use PDOException;

class Prescription
{
    private $Prescription_ID;
    private $Prescription_list_ID;
    private $Patient_ID;
    private $Drug_ID;
    private $Doctor_ID;
    private $TDS;
    private $Time;
    private $Days;
    private $status;
    private $time;

    public function __construct($Patient_ID, $Drug_ID, $Doctor_ID, $TDS, $Time, $Days)
    {
        $this->Patient_ID = $Patient_ID;
        $this->Drug_ID = $Drug_ID;
        $this->Doctor_ID = $Doctor_ID;
        $this->TDS = $TDS;
        $this->Time = $Time;
        $this->Days = $Days;
    }


    public function addDrug()
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "INSERT INTO prescription_list (Patient_ID, Drug_ID, Doctor_ID, TDS, Time, Days ) VALUES (?, ?, ?, ?, ?, ?)";

            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $this->Patient_ID);
            $pstmt->bindValue(2, $this->Drug_ID);
            $pstmt->bindValue(3, $this->Doctor_ID);
            $pstmt->bindValue(4, $this->TDS);
            $pstmt->bindValue(5, $this->Time);
            $pstmt->bindValue(6, $this->Days);
            $pstmt->execute();

            if ($pstmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e;
        }
    }
    public static function deleteDrug($Prescription_list_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "DELETE FROM prescription_list WHERE Prescription_list_ID  = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Prescription_list_ID);
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

    public static function updateDrug($Prescription_list_ID, $Patient_ID, $TDS, $Time, $Days)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "UPDATE prescription_list SET TDS = ?, Time = ?, Days = ? WHERE Prescription_list_ID = ? AND Patient_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $TDS);
            $pstmt->bindValue(2, $Time);
            $pstmt->bindValue(3, $Days);
            $pstmt->bindValue(4, $Prescription_list_ID);
            $pstmt->bindValue(5, $Patient_ID);

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

    public static function setPrescription_ID($Patient_ID, $Prescription_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "UPDATE prescription_list AS pl LEFT JOIN drug AS d ON pl.Drug_ID = d.Drug_ID SET pl.Prescription_ID = ? WHERE pl.Patient_ID = ? AND pl.Prescription_ID IS NULL";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Prescription_ID);
            $pstmt->bindValue(2, $Patient_ID);

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

    public static function addPrescription($Prescription_ID, $Patient_ID, $Doctor_ID, $status, $TimeP)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "INSERT INTO prescription_record (Prescription_ID, Patient_ID , Doctor_ID , status, TimeP ) VALUES (?, ?, ?, ?, ?)";

            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Prescription_ID);
            $pstmt->bindValue(2, $Patient_ID);
            $pstmt->bindValue(3, $Doctor_ID);
            $pstmt->bindValue(4, $status);
            $pstmt->bindValue(5, $TimeP);
            $pstmt->execute();

            if ($pstmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    public static function displayDrugs($Patient_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT prescription_list.*, drug.* FROM prescription_list LEFT JOIN drug ON prescription_list.Drug_ID = drug.Drug_ID WHERE prescription_list.Patient_ID = ? AND prescription_list.Prescription_ID IS NULL ORDER BY prescription_list.Prescription_list_ID DESC"; // Changed "= null" to "IS NULL"
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Patient_ID);
            $pstmt->execute();

            return $pstmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }


    public static function displayPrescriptions()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $query = "SELECT prescription_record.*, patient.PatientName
                  FROM prescription_record
                  LEFT JOIN patient ON prescription_record.Patient_ID = patient.Patient_ID
                  ORDER BY TimeP DESC";

            $stmt = $conn->prepare($query);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }


    public static function getPrescriptionDetails($prescriptionID)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $query = "SELECT prescription_list.*, druginventory.StockCount, drug.*
            FROM prescription_list
            LEFT JOIN druginventory ON prescription_list.Drug_ID = druginventory.Drug_ID
            LEFT JOIN drug ON prescription_list.Drug_ID = drug.Drug_ID
            WHERE prescription_list.Prescription_ID = ?";

            $stmt = $conn->prepare($query);
            $stmt->bindValue(1, $prescriptionID);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function updatePrescriptionStatus($prescriptionID, $status)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $query = "UPDATE prescription_record SET status = ? WHERE Prescription_ID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(1, $status);
            $stmt->bindValue(2, $prescriptionID);

            if ($stmt->execute()) {
                return "Status Updated Successfully";
            } else {
                return "Error updating status: " . $stmt->errorInfo();
            }
        } catch (PDOException $e) {
            return "Error updating status: " . $e->getMessage();
        }
    }

    public static function updatePrescriptionStatusReject($prescriptionID, $status)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $query = "UPDATE prescription_record SET status = ? WHERE Prescription_ID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(1, $status);
            $stmt->bindValue(2, $prescriptionID);

            if ($stmt->execute()) {
                return "Status Updated Successfully";
            } else {
                return "Error updating status: " . $stmt->errorInfo();
            }
        } catch (PDOException $e) {
            return "Error updating status: " . $e->getMessage();
        }
    }

    public static function deletePrescription($prescriptionID)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $stmt1 = $conn->prepare("DELETE FROM prescription_list WHERE Prescription_ID = :PrescriptionID");
            $stmt1->bindParam(':PrescriptionID', $prescriptionID);
            $stmt1->execute();
            $rowCount1 = $stmt1->rowCount();

            $stmt2 = $conn->prepare("DELETE FROM prescription_record WHERE Prescription_ID = :PrescriptionID");
            $stmt2->bindParam(':PrescriptionID', $prescriptionID);
            $stmt2->execute();
            $rowCount2 = $stmt2->rowCount();

            if ($rowCount1 > 0 || $rowCount2 > 0) {
                return "Prescription deleted successfully";
            } else {
                return "Prescription not found";
            }
        } catch (PDOException $e) {
            return "Database error: " . $e->getMessage();
        }
    }
}
