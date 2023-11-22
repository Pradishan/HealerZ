<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDOException;
use PDO;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Employee
{
    private $employee_ID;
    private $employee_Name;
    private $role;
    private $Email;
    private $PhoneNo;
    private $Address;
    private $SLMC;
    private $Password;
    private $Profile;

    public function __construct($employee_ID, $employee_Name, $role, $Email, $PhoneNo, $Address, $SLMC, $Password)
    {

        $this->employee_ID = $employee_ID;
        $this->employee_Name = $employee_Name;
        $this->role = $role;
        $this->Email = $Email;
        $this->PhoneNo = $PhoneNo;
        $this->Address = $Address;
        $this->SLMC = $SLMC;
        $this->Password = $Password;
    }

    public function getEmployee_ID()
    {
        return $this->employee_ID;
    }

    public function setEmployee_ID($value)
    {
        $this->employee_ID = $value;
    }

    public function getEmployee_Name()
    {
        return $this->employee_Name;
    }

    public function setEmployee_Name($value)
    {
        $this->employee_Name = $value;
    }

    public function getRole()
    {
        return $this->role;
    }

    public function setRole($value)
    {
        $this->role = $value;
    }

    public function getEmail()
    {
        return $this->Email;
    }

    public function setEmail($value)
    {
        $this->Email = $value;
    }

    public function getPhoneNo()
    {
        return $this->PhoneNo;
    }

    public function setPhoneNo($value)
    {
        $this->PhoneNo = $value;
    }

    public function getAddress()
    {
        return $this->Address;
    }

    public function setAddress($value)
    {
        $this->Address = $value;
    }

    public function getSLMC()
    {
        return $this->SLMC;
    }

    public function setSLMC($value)
    {
        $this->SLMC = $value;
    }

    public function getPassword()
    {
        return $this->Password;
    }

    public function setPassword($value)
    {
        $this->Password = $value;
    }

    public function getProfile()
    {
        return $this->Profile;
    }

    public function setProfile($value)
    {
        $this->Profile = $value;
    }



    public function addEmployee()
    {
        try {

            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $hashedPassword = password_hash($this->Password, PASSWORD_DEFAULT);
            $query = "INSERT INTO employee (employee_ID, employee_Name,role,Email,PhoneNo,Address,SLMC,Password) VALUES (:employee_ID, :employee_Name, :role, :Email, :PhoneNo, :Address, :SLMC, :Password)";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':employee_ID', $this->employee_ID);
            $stmt->bindValue(':employee_Name', $this->employee_Name);
            $stmt->bindValue(':role', $this->role);
            $stmt->bindValue(':Email', $this->Email);
            $stmt->bindValue(':PhoneNo', $this->PhoneNo);
            $stmt->bindValue(':Address', $this->Address);
            $stmt->bindValue(':SLMC', $this->SLMC);
            $stmt->bindValue(':Password', $hashedPassword);
            $res = $stmt->execute();
            Employee::SendMail($this->employee_ID, $this->Password, $this->Email, $this->employee_Name, $this->role);
            if ($res) {

                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }


    public static function SendMail($UserName, $password, $email, $name, $role)
    {

        require '../mail/Exception.php';
        require '../mail/PHPMailer.php';
        require '../mail/SMTP.php';
        $mail = new PHPMailer(true);

        $mail->SMTPDebug = 0;                     
        $mail->isSMTP();                                        
        $mail->Host = 'smtp.gmail.com';                     
        $mail->SMTPAuth = true;                                 
        $mail->Username = 'healerz763@gmail.com';                    
        $mail->Password = 'srpz rprs atxc dzww';                             
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;           
        $mail->Port = 465;                                   
        $mail->setFrom('healerz763@gmail.com');
        $mail->addAddress($email);   
        $mail->isHTML(true);                         
        $mail->Subject = $role . ' Registration for HealerZ !';
        $message = "Dear " . $name . " ( " . $role . " ) ,<br>" . "<br>";
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
        $message .= "<img src='https://ibb.co/XW6mfhL' alt='Your Logo' height='100' width='200'>" . "<br>" . "<br>";


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

    public function updateEmployee()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "UPDATE employee SET employee_Name = :employee_Name, role = :role, Email= :Email, PhoneNo = :PhoneNo, Address = :Address, SLMC = :SLMC, Password = :Password WHERE employee_ID = :employee_ID";
            $pstmt = $conn->prepare($query);
            $pstmt->bindValue(':employee_Name', $this->employee_Name);
            $pstmt->bindValue(':role', $this->role);
            $pstmt->bindValue(':Email', $this->Email);
            $pstmt->bindValue(':PhoneNo', $this->PhoneNo);
            $pstmt->bindValue(':Address', $this->Address);
            $pstmt->bindValue(':SLMC', $this->SLMC);
            $pstmt->bindValue(':Password', $this->Password);
            $pstmt->bindValue(':employee_ID', $this->employee_ID);
            $res = $pstmt->execute();
            return  $res;
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getNameById($employee_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT employee_Name,Profile FROM employee WHERE employee_ID = ?";
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $employee_ID);
            $pstmt->execute();

            $result = $pstmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result;
            } else {
                return ['error' => 'employee not available'];;
            }
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
