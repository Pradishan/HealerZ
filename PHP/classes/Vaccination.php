<?php

namespace classes;

require_once "DBconnector.php";

use PDOException;
use PDO;


class Vaccination{
    private $vaccinationId;
    private $VaccinationName;
    private $Date;
    private $PatientId;

	public function __construct($vaccinationId, $VaccinationName, $Date, $PatientId) {

		$this->vaccinationId = $vaccinationId;
		$this->VaccinationName = $VaccinationName;
		$this->Date = $Date;
		$this->PatientId = $PatientId;
	}

	public function getVaccinationId() {
		return $this->vaccinationId;
	}

	public function setVaccinationId($value) {
		$this->vaccinationId = $value;
	}

	public function getVaccinationName() {
		return $this->VaccinationName;
	}

	public function setVaccinationName($value) {
		$this->VaccinationName = $value;
	}

	public function getDate() {
		return $this->Date;
	}

	public function setDate($value) {
		$this->Date = $value;
	}

	public function getPatientId() {
		return $this->PatientId;
	}

	public function setPatientId($value) {
		$this->PatientId = $value;
	}


    public function addVaccine()
	{
		try {
			$dbcon = new DBconnector;
			$conn = $dbcon->getConnection();
			$currentDate = date("Y-m-d H:i:s");
			$query = "INSERT INTO vaccination_details (vaccinationId, VaccinationName,Date, PatientId) VALUES (?, ?, ?, ?);";
			$stmt =  $conn->prepare($query);
			$stmt->bindValue(1, $this->vaccinationId);
			$stmt->bindValue(2, $this->VaccinationName);
			$stmt->bindValue(3, $currentDate);
			$stmt->bindValue(4, $this->PatientId);
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


    public function checkVaccinationStatus($patientId, $vaccinationType)
{
    try {
        $dbcon = new DBconnector;
        $conn = $dbcon->getConnection();
        
        $stmt = $conn->prepare("SELECT DISTINCT * FROM vaccination_details WHERE PatientId = ? AND VaccinationName = ?");
        $stmt->bindValue(1, $patientId);
        $stmt->bindValue(2, $vaccinationType);
        $stmt->execute();
        
        $result = $stmt->fetch();

        if ($result) {
            return true;
        } else {
            return false;
        }
    } catch (PDOException $e) {
        return false;
    }
}

}