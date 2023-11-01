<?php

namespace classes;

require_once "DBconnector.php";

use PDOException;
use PDO;

class BloodDonation
{
	private $BDId;
	private $BloodGroup;
	private $Date;
	private $PatientId;
	private $name;

	public function __construct($BDId, $BloodGroup, $Date, $PatientId, $name)
	{

		$this->BDId = $BDId;
		$this->BloodGroup = $BloodGroup;
		$this->Date = $Date;
		$this->PatientId = $PatientId;
		$this->name = $name;
	}

	public function getBDId()
	{
		return $this->BDId;
	}

	public function setBDId($value)
	{
		$this->BDId = $value;
	}

	public function getBloodGroup()
	{
		return $this->BloodGroup;
	}

	public function setBloodGroup($value)
	{
		$this->BloodGroup = $value;
	}

	public function getDate()
	{
		return $this->Date;
	}

	public function setDate($value)
	{
		$this->Date = $value;
	}

	public function getPatientId()
	{
		return $this->PatientId;
	}

	public function setPatientId($value)
	{
		$this->PatientId = $value;
	}

	public function getName()
	{
		return $this->name;
	}

	public function setName($value)
	{
		$this->name = $value;
	}


	public function addBlood()
	{
		try {
			$dbcon = new DBconnector;
			$conn = $dbcon->getConnection();
			$currentDate = date("Y-m-d H:i:s");
			$query = "INSERT INTO blood_donation_status (BDId, BloodGroup,Date, PatientId,name) VALUES (?, ?, ?, ?, ?);";
			$stmt =  $conn->prepare($query);
			$stmt->bindValue(1, $this->BDId);
			$stmt->bindValue(2, $this->BloodGroup);
			$stmt->bindValue(3, $currentDate);
			$stmt->bindValue(4, $this->PatientId);
			$stmt->bindValue(5, $this->name);
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

	public function getDonationRecordsByPatientId($id)
	{
		$dbcon = new DBconnector;
		$conn = $dbcon->getConnection();
		$stmt = $conn->prepare("SELECT DISTINCT * FROM blood_donation_status WHERE PatientId = :id ORDER BY Date desc");
		$stmt->execute(['id' => $id]);
		$result = $stmt->fetchAll();

		if ($result) {
			return ["message" => "Donated", "details" => $result];
		} else {
			return ["message" => "Not Donated"];
		}
	}
}
