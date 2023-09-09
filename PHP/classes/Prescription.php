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
    private $Pharmacist_ID;
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


}