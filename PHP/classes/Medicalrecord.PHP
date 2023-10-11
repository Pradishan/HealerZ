<?php
namespace classes;

require_once "DBconnector.php";
use classes\DBconnector;
use PDO;
use PDOException;

class Medicalrecord
{
    private $MedicalRecord_ID;
    private $Patient_ID;
    private $Doctor_ID;
    private $DateandTime;
    private $Patientcomplaint;
    private $OnExamination;
    private $Tests;
    private $Confirmeddiagnosis;
    private $Prescription_ID;

    public function __construct($Patient_ID, $Doctor_ID, $DateandTime, $Patientcomplaint, $OnExamination, $Tests, $Confirmeddiagnosis, $Prescription_ID)
    {
        $this->Patient_ID = $Patient_ID;
        $this->Doctor_ID = $Doctor_ID;
        $this->DateandTime = $DateandTime;
        $this->Patientcomplaint = $Patientcomplaint;
        $this->OnExamination = $OnExamination;
        $this->Tests = $Tests;
        $this->Confirmeddiagnosis = $Confirmeddiagnosis;
        $this->Prescription_ID = $Prescription_ID;
    }

    public function addMedicalRecord()
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "INSERT INTO medicalrecord (Patient_ID, Doctor_ID, DateandTime, Patientcomplaint, OnExamination, Tests, Confirmeddiagnosis, Prescription_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            $pstmt = $con->prepare($query);
            $pstmt->bindParam(1, $this->Patient_ID);
            $pstmt->bindParam(2, $this->Doctor_ID);
            $pstmt->bindParam(3, $this->DateandTime);
            $pstmt->bindParam(4, $this->Patientcomplaint);
            $pstmt->bindParam(5, $this->OnExamination);
            $pstmt->bindParam(6, $this->Tests);
            $pstmt->bindParam(7, $this->Confirmeddiagnosis);
            $pstmt->bindParam(8, $this->Prescription_ID);

            if ($pstmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e->getMessage(); // Return the error message for debugging.
        }
    }

    public static function deleteMedicalrecord($MedicalRecord_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "DELETE FROM medicalrecord WHERE MedicalRecord_ID  = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $MedicalRecord_ID);
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

    public static function updateMedicalrecord($MedicalRecord_ID, $Patient_ID, $Doctor_ID, $DateandTime, $Patientcomplaint, $OnExamination, $Tests, $Confirmeddiagnosis, $Prescription_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "UPDATE medicalrecord SET Doctor_ID = ?, DateandTime = ?, Patientcomplaint = ?, OnExamination = ?, Tests = ?, Confirmeddiagnosis = ? Prescription_ID = ? WHERE MedicalRecord_ID = ? AND Patient_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Doctor_ID);
            $pstmt->bindValue(2, $DateandTime);
            $pstmt->bindValue(3, $Patientcomplaint);
            $pstmt->bindValue(4, $OnExamination);
            $pstmt->bindValue(5, $Tests);
            $pstmt->bindValue(6, $Confirmeddiagnosis);
            $pstmt->bindValue(7, $Prescription_ID);
            $pstmt->bindValue(8, $MedicalRecord_ID);
            $pstmt->bindValue(9, $Patient_ID);

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
    public static function addPrescription($MedicalRecord_ID, $Patient_ID, $Prescription_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $query = "UPDATE medicalrecord SET Prescription_ID = ? WHERE MedicalRecord_ID = ? AND Patient_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Prescription_ID);
            $pstmt->bindValue(2, $MedicalRecord_ID);
            $pstmt->bindValue(3, $Patient_ID);

            $res = $pstmt->execute();

            if ($res) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e->getMessage(); // Return the error message
        }
    }

    public static function displayMedicalrecords($Patient_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT * FROM medicalrecord WHERE Patient_ID = ? ORDER BY DateandTime DESC";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $Patient_ID);
            $pstmt->execute();
            return $pstmt;
        } catch (PDOException $e) {
            return $e;
        }
    }


}