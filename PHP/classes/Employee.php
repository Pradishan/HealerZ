<?php

namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDOException;
use PDO;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class employee
{
    private $employee_ID;
    private $employeeName;
    private $regNo;
    private $phoneNo;
    private $email;
    private $address;
    private $password;
    private $userType;
    

    public function __construct($employee_ID, $employeeName, $phoneNo, $email, $address, $password, $regNo, $userType)
    {
        $this->employee_ID = $employee_ID;
        $this->employeeName = $employeeName;
        $this->phoneNo = $phoneNo;
        $this->email = $email;
        $this->address = $address;
        $this->password = $password;
        $this->regNo = $regNo;
        $this->userType = $userType;
    }



public function getEmployee_ID() {
    return $this->employee_ID;
}

public function getEmployeeName() {
    return $this->employeeName;
}

public function getRegNo() {
    return $this->regNo;
}

public function getPhoneNo() {
    return $this->phoneNo;
}

public function getEmail() {
    return $this->email;
}

public function getAddress() {
    return $this->address;
}

public function getPassword() {
    return $this->password;
}

public function getUserType() {
    return $this->userType;
}

public function setEmployee_ID($employee_ID): void {
    $this->employee_ID = $employee_ID;
}

public function setEmployeeName($employeeName): void {
    $this->employeeName = $employeeName;
}

public function setRegNo($regNo): void {
    $this->regNo = $regNo;
}

public function setPhoneNo($phoneNo): void {
    $this->phoneNo = $phoneNo;
}

public function setEmail($email): void {
    $this->email = $email;
}

public function setAddress($address): void {
    $this->address = $address;
}

public function setPassword($password): void {
    $this->password = $password;
}

public function setUserType($userType): void {
    $this->userType = $userType;
}





    public function addEmployee()
    {
        try {
            $dbcon = new DBconnector();
            $conn = $dbcon->getConnection();
            $query = "INSERT INTO employee (employee_ID, employeeName, phoneNo, email, address, password, regNo, userType) VALUES (:employee_ID, :employeeName, :phoneNo, :email, :address, :password, :regNo,  :userType)";
            $stmt = $conn->prepare($query);
            $stmt->bindValue(':employee_ID', $this->employee_ID);
            $stmt->bindValue(':employeeName', $this->employeeName);
            $stmt->bindValue(':phoneNo', $this->phoneNo);
            $stmt->bindValue(':email', $this->email);
            $stmt->bindValue(':address', $this->address);
            $stmt->bindValue(':password', $this->password);
            $stmt->bindValue(':regNo', $this->regNo);
            $stmt->bindValue(':userType', $this->userType);
            $res = $stmt->execute();

            if ($res) {
                // Check user type and add specific attributes to respective tables
                switch ($this->userType) {
                    case 'doctor':
                        $this->addDoctorAttributes($conn);
                        break;
                    case 'pharmacist':
                        $this->addPharmacistAttributes($conn);
                        break;
                    case 'admin':
                        $this->addAdminAttributes($conn);
                        break;
                    case 'clubadmin':
                        $this->addClubadminAttributes($conn);
                        break;
                    
                    default:
                        // Default case if user type doesn't match any specific type
                        break;
                }
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }

    private function addDoctorAttributes($conn)
    {
        
        $query = "INSERT INTO doctor (Doctor_ID,  Doctor_Name, Password, Designation, Email, PhoneNo, Address,  SLMC ) VALUES (:Doctor_ID, :Doctor_Name, :Password, :Designation, :Email, :PhoneNo, :Address, :SLMC)";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':Doctor_ID', $this->employee_ID);
        $stmt->bindValue(':Doctor_Name', $this->employeename);
        $stmt->bindValue(':Password', $this->password);
        $stmt->bindValue(':PhoneNo', $this->phoneNo);
        $stmt->bindValue(':Email', $this->email);
        $stmt->bindValue(':Address', $this->address);
        $stmt->bindValue(':SLMC', $this->regNo);
        $stmt->bindValue(':Designation', $this->userType);
        $stmt->execute();
    }

    private function addPharmacistAttributes($conn)
    {
        
        $query = "INSERT INTO pharmacist (Pharmacist_ID, Pharmacist_Name, Password, Designation, Email, PhoneNo, Address,  SLMC ) VALUES (:Pharmacist_ID, :Pharmacist_Name, :Password, :Designation, :Email, :PhoneNo, :Address, :SLMC)";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':Pharmacist_ID', $this->employee_ID);
        $stmt->bindValue(':Pharmacist_Name', $this->employeename);
        $stmt->bindValue(':Password', $this->password);
        $stmt->bindValue(':PhoneNo', $this->phoneNo);
        $stmt->bindValue(':Email', $this->email);
        $stmt->bindValue(':Address', $this->address);
        $stmt->bindValue(':SLMC', $this->regNo);
        $stmt->bindValue(':Designation', $this->userType);
        $stmt->execute();
        employee::SendMail($this->employee_ID,$this->Password,$this->Email,$this->employeeName);
        if ($res) {
           
            return true;
        } else {
            return false;
        }
    } catch (PDOException $e) {
        return false;
    }


    }

    private function addAdminAttributes($conn)
    {
        $query = "INSERT INTO admin (Admin_ID, Admin_Name, Password) VALUES (:Admin_ID, :Admin_Name, :Password)";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':Admin_ID', $this->employee_ID);
        $stmt->bindValue(':Admin_Name', $this->employeename);
        $stmt->bindValue(':Password', $this->password);
        $stmt->execute();
    }

    private function addClubadminAttributes($conn)
    {
        $query = "INSERT INTO admin (Admin_ID, Admin_Name, Password) VALUES (:Admin_ID, :Admin_Name, :Password)";
        $stmt = $conn->prepare($query);
        $stmt->bindValue(':Admin_ID', $this->employee_ID);
        $stmt->bindValue(':Admin_Name', $this->employeename);
        $stmt->bindValue(':Password', $this->password);
        $stmt->execute();
    }


           
    public function deleteEmployee(){
        $dbcon=new DBconnector();
        $conn=$dbcon->getConnection();
        $query="DELETE FROM employee WHERE employee_ID = :employee_ID";
        $stmt=$conn->prepare($query);
        $stmt->bindValue(':employee_ID',$this->employee_ID);
        $res=$stmt->execute();

        if($res){
            return true;
        }else{
            return false;
        }
    }


    public function updateEmployee(){
        try {
            $dbcon= new DBconnector();
            $conn=$dbcon->getConnection();
            $query="UPDATE employee SET employeeName = :employeeName, phoneNo = :phoneNo, email = :email, address = :address,  password = :password, userType = :userType WHERE employee_ID = :employee_ID";
            $pstmt=$conn->prepare($query);
            $stmt->bindValue(':employee_ID', $this->employee_ID);
            $stmt->bindValue(':employeeName', $this->employeeName);
            $stmt->bindValue(':phoneNo', $this->phoneNo);
            $stmt->bindValue(':email', $this->email);
            $stmt->bindValue(':address', $this->address);
            $stmt->bindValue(':password', $this->password);
            $stmt->bindValue(':regNo', $this->regNo);
            $stmt->bindValue(':userType', $this->userType);
            $res=$pstmt->execute();
    
            return  $res;
        } catch (PDOException $e) {
            return false;
        }
       
    }

    public static function SendMail($UserName, $password, $email,$name) {
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
        $mail->Subject = 'employee Registration for HealerZ !';
        $message = "Dear ".$name." ,<br>"."<br>";
        $message .= "<span style='color: green;'>Welcome to Healerz! , Your account has been successfully created.</span>"."<br>";
        $message .= "<hr>"."<br>";
        $message .= "We've generated a secure password for you, and it can be found in the registration email we sent, ";
        $message .= "<span style='color: red;'>Please  keep the login credentials with you  and don't share it with others.</span>"."<br>";
        $message .= "<br>"."<br>";
        $message .= "<span style='font-weight: bold;'>Username &nbsp;: &nbsp;&nbsp;</span>".$UserName."<br>";
        $message .= "<span style='font-weight: bold;'>Password &nbsp; : &nbsp;&nbsp;</span>".$password."<br>"."<br>";
        $message .= "You can use this password to log in to your account for the first time. After logging in, we recommend changing your password to something more memorable and secure"."<br>"."<br>";
        $message .= "<hr>"."<br>"."<br>";
        $message .= "Best regards ,"."<br>"."<br>";
        $message .= "HealerZ ,"."<br>";
        $message .= "Medical System of UWU ,"."<br>";
        $message .= "Uva Wellassa University of Srilanka ,"."<br>"."<br>";
        $message .= "<img src='https://lh3.googleusercontent.com/Qtl6yF3Qn3ma6vEdSuG82hh3U-DJ2g-mmteKeERMawrrecQVh9Mr5RNasI8Id9n2iOQ5FoTIQD30gvmhCnq5znTZcFNosr8bXa1iweg' alt='Your Logo' height='100' width='200'>" . "<br>" . "<br>";


        $mail->Body = $message;

        try {
            $mail->send();
            return true;
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    public static function isemployeeID($employee_ID)
    {
        try {
            $dbcon = new DBconnector();
            $con = $dbcon->getConnection();
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "SELECT employee_ID FROM employee WHERE employee_ID = ?"; 
            $pstmt = $con->prepare($query);
            $pstmt->bindValue(1, $employee_ID);
            $pstmt->execute();
    
            $result = $pstmt->fetch(PDO::FETCH_ASSOC);
    
            if ($result) {
                // employee ID exists
                return true;
            } else {
                // employee ID does not exist
                return false;
            }
        } catch (PDOException $e) {
            // Handle any database connection errors
            return ['error' => $e->getMessage()];
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
    


