<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDO;
use PDOException;


class Drug
{
    private $Drug_ID;
    private $Drug_Name;
    private $Category;
    private $Drug_dosage;
    private $Descriptions;
    private $StockCount;

    public function __construct($Drug_ID, $Drug_Name, $Category, $Drug_dosage, $Descriptions)
    {
        $this->Drug_ID = $Drug_ID;
        $this->Drug_Name = $Drug_Name;
        $this->Category = $Category;
        $this->Drug_dosage = $Drug_dosage;
        $this->Descriptions = $Descriptions;
    }



    public function getDrug_ID()
    {
        return $this->Drug_ID;
    }

    public function setDrug_ID($value)
    {
        $this->Drug_ID = $value;
    }

    public function getDrug_Name()
    {
        return $this->Drug_Name;
    }

    public function setDrug_Name($value)
    {
        $this->Drug_Name = $value;
    }

    public function getCategory()
    {
        return $this->Category;
    }

    public function setCategory($value)
    {
        $this->Category = $value;
    }

    public function getDrug_dosage()
    {
        return $this->Drug_dosage;
    }

    public function setDrug_dosage($value)
    {
        $this->Drug_dosage = $value;
    }

    public function getDescriptions()
    {
        return $this->Descriptions;
    }

    public function setDescriptions($value)
    {
        $this->Descriptions = $value;
    }


    public function addDrug()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $query = "INSERT INTO drug (Drug_ID, Drug_Name, Category, Drug_dosage, Descriptions) VALUES (:Drug_ID, :Drug_Name, :Category, :Drug_dosage, :Descriptions)";

            $stmt = $conn->prepare($query);
            $stmt->bindValue(':Drug_ID', $this->Drug_ID);
            $stmt->bindValue(':Drug_Name', $this->Drug_Name);
            $stmt->bindValue(':Category', $this->Category);
            $stmt->bindValue(':Drug_dosage', $this->Drug_dosage);
            $stmt->bindValue(':Descriptions', $this->Descriptions);
            $res = $stmt->execute();

            if ($res) {
                $query = "INSERT INTO druginventory (Drug_ID) VALUES (:Drug_ID)";

                $stmt = $conn->prepare($query);
                $stmt->bindValue(':Drug_ID', $this->Drug_ID);
                $res = $stmt->execute();
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }

    public function deleteDrug()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "DELETE FROM drug WHERE Drug_ID = :Drug_ID";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':Drug_ID', $this->Drug_ID);
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

    public function updateDrug()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "UPDATE drug SET Drug_Name = :Drug_Name, Category = :Category, Drug_dosage = :Drug_dosage, Descriptions = :Descriptions WHERE Drug_ID = :Drug_ID";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':Drug_Name', $this->Drug_Name);
            $stmt->bindValue(':Category', $this->Category);
            $stmt->bindValue(':Drug_dosage', $this->Drug_dosage);
            $stmt->bindValue(':Descriptions', $this->Descriptions);
            $stmt->bindValue(':Drug_ID', $this->Drug_ID);
            $res = $stmt->execute();

            return $res;
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getDrugIDbyName($Drug_Name)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "SELECT Drug_ID FROM drug WHERE Drug_Name = ?";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(1, $Drug_Name);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                return $result['Drug_ID'];
            } else {
                return null;
            }
        } catch (PDOException $e) {
            return null;
        }
    }

    public static function getDrugNamebyID($Drug_ID)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "SELECT Drug_Name FROM drug WHERE Drug_ID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(1, $Drug_ID);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                return $result['Drug_Name'];
            } else {
                return null;
            }
        } catch (PDOException $e) {
            return null;
        }
    }


    public static function displayDrug()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $sql = "SELECT drug.*, druginventory.StockCount 
                FROM drug
                LEFT JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID";

            $stmt = $conn->prepare($sql);

            if ($stmt->execute()) {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }


    public static function getDrugByID($drugID)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $query = "SELECT drug.*, druginventory.StockCount
                  FROM drug
                  INNER JOIN druginventory ON drug.Drug_ID = druginventory.Drug_ID
                  WHERE drug.Drug_ID = :drugID";

            $stmt = $conn->prepare($query);
            $stmt->bindParam(':drugID', $drugID, PDO::PARAM_INT);
            $stmt->execute();

            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $data;
        } catch (PDOException $e) {
            return false;
        }
    }


    public function updateStockCount($stockCount)
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "UPDATE druginventory SET StockCount = :stockCount WHERE Drug_ID = :drugID";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':stockCount', $stockCount, PDO::PARAM_INT);
            $stmt->bindParam(':drugID', $this->Drug_ID, PDO::PARAM_INT);
            $res = $stmt->execute();

            return $res;
        } catch (PDOException $e) {
            return false;
        }
    }
    
}
