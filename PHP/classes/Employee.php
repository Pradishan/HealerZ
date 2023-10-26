<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDOException;
use PDO;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Employee{
    private $employee_ID;
    private $employee_Name;
    private $role;
    private $Email;
    private $PhoneNo;
    private $Address;
    private $SLMC;
    private $Password;
    private $Profile;

	public function __construct($employee_ID, $employee_Name, $role, $Email, $PhoneNo, $Address, $SLMC, $Password) {

		$this->employee_ID = $employee_ID;
		$this->employee_Name = $employee_Name;
		$this->role = $role;
		$this->Email = $Email;
		$this->PhoneNo = $PhoneNo;
		$this->Address = $Address;
		$this->SLMC = $SLMC;
		$this->Password = $Password;
	}

	public function getEmployee_ID() {
		return $this->employee_ID;
	}

	public function setEmployee_ID($value) {
		$this->employee_ID = $value;
	}

	public function getEmployee_Name() {
		return $this->employee_Name;
	}

	public function setEmployee_Name($value) {
		$this->employee_Name = $value;
	}

	public function getRole() {
		return $this->role;
	}

	public function setRole($value) {
		$this->role = $value;
	}

	public function getEmail() {
		return $this->Email;
	}

	public function setEmail($value) {
		$this->Email = $value;
	}

	public function getPhoneNo() {
		return $this->PhoneNo;
	}

	public function setPhoneNo($value) {
		$this->PhoneNo = $value;
	}

	public function getAddress() {
		return $this->Address;
	}

	public function setAddress($value) {
		$this->Address = $value;
	}

	public function getSLMC() {
		return $this->SLMC;
	}

	public function setSLMC($value) {
		$this->SLMC = $value;
	}

	public function getPassword() {
		return $this->Password;
	}

	public function setPassword($value) {
		$this->Password = $value;
	}

	public function getProfile() {
		return $this->Profile;
	}

	public function setProfile($value) {
		$this->Profile = $value;
	}


    
    public function addEmployee()
    {
        try {

            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "INSERT INTO employee (employee_ID, employee_Name,role,Email,PhoneNo,Address,SLMC,Password) VALUES (:employee_ID, :employee_Name, :role, :Email, :PhoneNo, :Address, :SLMC, :Password)";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':employee_ID', $this->employee_ID);
            $stmt->bindValue(':employee_Name', $this->employee_Name);
            $stmt->bindValue(':role', $this->role);
            $stmt->bindValue(':Email', $this->Email);
            $stmt->bindValue(':PhoneNo', $this->PhoneNo);
            $stmt->bindValue(':Address', $this->Address);
            $stmt->bindValue(':SLMC', $this->SLMC);
            $stmt->bindValue(':Password', $this->Password);
            $res = $stmt->execute();
            Patient::SendMail($this->employee_ID, $this->Password, $this->Email, $this->employee_Name);
            if ($res) {

                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }


    public static function SendMail($UserName, $password, $email, $name)
    {
        // Create an instance; passing `true` enables exceptions

        require '../mail/Exception.php';
        require '../mail/PHPMailer.php';
        require '../mail/SMTP.php';
        $mail = new PHPMailer(true);

        //Server settings
        $mail->SMTPDebug = 0;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth = true;                                   //Enable SMTP authentication
        $mail->Username = 'healerz763@gmail.com';                     //SMTP username
        $mail->Password = 'lbnqanfdkzyvdgij';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        //Recipients
        $mail->setFrom('healerz763@gmail.com');
        $mail->addAddress($email);     //Add a recipient             //Name is optional
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Patient Registration for HealerZ !';
        $message = "Dear " . $name . " ,<br>" . "<br>";
        $message .= "<span style='color: green;'>Welcome to Healerz! , Your account has been successfully created.</span>" . "<br>";
        $message .= "<hr>" . "<br>";
        $message .= "We've generated a secure password for you, and it can be found in the registration email we sent, ";
        $message .= "<span style='color: red;'>Please  keep the login credentials with you  and don't share it with others.</span>" . "<br>";
        $message .= "<br>" . "<br>";
        $message .= "<span style='font-weight: bold;'>Username &nbsp;: &nbsp;&nbsp;</span>" . $UserName . "<br>";
        $message .= "<span style='font-weight: bold;'>Password &nbsp; : &nbsp;&nbsp;</span>" . $password . "<br>" . "<br>";
        $message .= "You can use this password to log in to your account for the first time. After logging in, we recommend changing your password to something more memorable and secure" . "<br>" . "<br>";
        $message .= "<hr>" . "<br>" . "<br>";
        $message .= "Best regards ," . "<br>" . "<br>";
        $message .= "HealerZ ," . "<br>";
        $message .= "Medical System of UWU ," . "<br>";
        $message .= "Uva Wellassa University of Srilanka ," . "<br>" . "<br>";
        $message .= "<img src='https://lh3.googleusercontent.com/Qtl6yF3Qn3ma6vEdSuG82hh3U-DJ2g-mmteKeERMawrrecQVh9Mr5RNasI8Id9n2iOQ5FoTIQD30gvmhCnq5znTZcFNosr8bXa1iweg' alt='Your Logo' height='100' width='200'>" . "<br>" . "<br>";


        $mail->Body = $message;

        try {
            $mail->send();
            return true;
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }


    public static function displayEmployee()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();

            $sql = "SELECT * from employee";

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

    public function deleteemployee()
    {
        $dbcon = new DBconnector();
        $conn = $dbcon->getConnection();
        $query = "DELETE FROM employee WHERE employee_ID = :employee_ID";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':employee_ID', $this->employee_ID);
        $res = $stmt->execute();
        if ($res) {
            return true;
        } else {
            return false;
        }
    }
}