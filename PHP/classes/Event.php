<?php

namespace classes;

require_once "DBconnector.php";
use PDOException;
use PDO;


class Event{
    private $evtreg_id;
    private $Patient_ID;
    private $email;
    private $name;
    private $nic;
    private $phone_no;
    private $address;
    private $event;

	public function __construct($evtreg_id, $Patient_ID, $email, $name, $nic, $phone_no, $address, $event) {

		$this->evtreg_id = $evtreg_id;
		$this->Patient_ID = $Patient_ID;
		$this->email = $email;
		$this->name = $name;
		$this->nic = $nic;
		$this->phone_no = $phone_no;
		$this->address = $address;
		$this->event = $event;
	}

	public function getEvtreg_id() {
		return $this->evtreg_id;
	}

	public function setEvtreg_id($value) {
		$this->evtreg_id = $value;
	}

	public function getPatient_ID() {
		return $this->Patient_ID;
	}

	public function setPatient_ID($value) {
		$this->Patient_ID = $value;
	}

	public function getEmail() {
		return $this->email;
	}

	public function setEmail($value) {
		$this->email = $value;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($value) {
		$this->name = $value;
	}

	public function getNic() {
		return $this->nic;
	}

	public function setNic($value) {
		$this->nic = $value;
	}

	public function getPhone_no() {
		return $this->phone_no;
	}

	public function setPhone_no($value) {
		$this->phone_no = $value;
	}

	public function getAddress() {
		return $this->address;
	}

	public function setAddress($value) {
		$this->address = $value;
	}

	public function getEvent() {
		return $this->event;
	}

	public function setEvent($value) {
		$this->event = $value;
	}



    public static function displayEvent()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $sql = "SELECT * from evtreg";

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
        $query = "DELETE FROM evtreg WHERE evtreg_id = :evtreg_id";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':evtreg_id', $this->evtreg_id);
        $res = $stmt->execute();

        if ($res) {
            return true;
        } else {
            return false;
        }
    }
}