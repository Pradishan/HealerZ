<?php

namespace classes;

require_once "DBconnector.php";

use PDOException;
use PDO;


class Event
{
	private $Event_ID;
	private $Patient_ID;
	private $email;
	private $name;
	private $nic;
	private $phone_no;
	private $address;
	private $event;
	private $date;

	public function __construct($Event_ID, $Patient_ID, $email, $name, $nic, $phone_no, $address, $event, $date)
	{

		$this->Event_ID = $Event_ID;
		$this->Patient_ID = $Patient_ID;
		$this->email = $email;
		$this->name = $name;
		$this->nic = $nic;
		$this->phone_no = $phone_no;
		$this->address = $address;
		$this->event = $event;
		$this->date = $date;
	}
	

	public function getEvent_ID()
	{
		return $this->Event_ID;
	}

	public function setEvent_ID($value)
	{
		$this->Event_ID = $value;
	}

	public function getPatient_ID()
	{
		return $this->Patient_ID;
	}

	public function setPatient_ID($value)
	{
		$this->Patient_ID = $value;
	}

	public function getEmail()
	{
		return $this->email;
	}

	public function setEmail($value)
	{
		$this->email = $value;
	}

	public function getName()
	{
		return $this->name;
	}

	public function setName($value)
	{
		$this->name = $value;
	}

	public function getNic()
	{
		return $this->nic;
	}

	public function setNic($value)
	{
		$this->nic = $value;
	}

	public function getPhone_no()
	{
		return $this->phone_no;
	}

	public function setPhone_no($value)
	{
		$this->phone_no = $value;
	}

	public function getAddress()
	{
		return $this->address;
	}

	public function setAddress($value)
	{
		$this->address = $value;
	}

	public function getEvent()
	{
		return $this->event;
	}

	public function setEvent($value)
	{
		$this->event = $value;
	}
	public function getDate()
	{
		return $this->date;
	}

	public function setDate($value)
	{
		$this->date = $value;
	}



	public static function displayEvent()
	{
		try {
			$dbcon = new DBconnector();
			$conn = $dbcon->getConnection();

			$sql = "SELECT * from event ORDER BY date DESC";

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

	public function deleteEvent()
	{
		$dbcon = new DBconnector();
		$conn = $dbcon->getConnection();
		$query = "DELETE FROM event WHERE Event_ID = :Event_ID";
		$stmt = $conn->prepare($query);
		$stmt->bindValue(':Event_ID', $this->Event_ID);
		$res = $stmt->execute();

		if ($res) {
			return true;
		} else {
			return false;
		}
	}

	public function addevent()
	{
		try {
			$dbcon = new DBconnector;
			$conn = $dbcon->getConnection();
			$currentDate = date("Y-m-d H:i:s");
			$query = "INSERT INTO event (Event_ID, Patient_ID, email, name, nic, phone_no, address,event,Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
			$stmt =  $conn->prepare($query);
			$stmt->bindValue(1, $this->Event_ID);
			$stmt->bindValue(2, $this->Patient_ID);
			$stmt->bindValue(3, $this->email);
			$stmt->bindValue(4, $this->name);
			$stmt->bindValue(5, $this->nic);
			$stmt->bindValue(6, $this->phone_no);
			$stmt->bindValue(7, $this->address);
			$stmt->bindValue(8, $this->event);
			$stmt->bindValue(9, $currentDate);
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

	public function updateEvent()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "UPDATE event  SET Patient_ID = :Patient_ID, email = :email, name= :name, nic = :nic, phone_no = :phone_no, address = :address, event = :event, Date = :Date WHERE Event_ID = :Event_ID";
            $pstmt = $conn->prepare($query);
            $pstmt->bindValue(':Patient_ID', $this->Patient_ID);
            $pstmt->bindValue(':email', $this->email);
            $pstmt->bindValue(':name', $this->name);
            $pstmt->bindValue(':nic', $this->nic);
            $pstmt->bindValue(':phone_no', $this->phone_no);
            $pstmt->bindValue(':address', $this->address);
            $pstmt->bindValue(':event', $this->event);
            $pstmt->bindValue(':Date', $this->date);
            $pstmt->bindValue(':Event_ID', $this->Event_ID);
            $res = $pstmt->execute();
            return  $res;
        } catch (PDOException $e) {
            return false;
        }
    }



}
