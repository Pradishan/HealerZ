<?php
namespace classes;

require_once "DBconnector.php";

use classes\DBconnector;
use PDO;
use PDOException;

class Eventreg{
     private $email;
     private $name;
     private $nic;
     private $phone_no;
     private $address;
     private $event;

     public function __construct($email, $name , $nic, $phone_no, $address, $event){
        $this->email = $email;
        $this->name = $name;
        $this->nic = $nic;
        $this->phone_no = $phone_no;
        $this->address = $address;
        $this->event = $event;

     }

     public function  getemail(){
        return $this->email;
     }
     public function  getname(){
        return $this->name;
     }
     public function  getnic(){
        return $this->nic;
     }
     public function  getphone_no(){
        return $this->phone_no;
     }

     public function  getaddress(){
        return $this->address;
     }
     public function  getevent(){
        return $this->event;
     }

     public function setemail($value){
        $this->email =$value;
     }
     public function setname($value){
        $this->name =$value;
     }
     public function setnic($value){
        $this->nic =$value;
     }

     public function setphone_no($value){
        $this->phone_no =$value;
     }
     public function setadderess($value){
        $this->address =$value;
     }
     public function setevent($value){
        $this->event =$value;
     }

     public function register(){
        try{
            $dbcon = new DBconnector;
            $conn = $dbcon->getConnection();
            $query = "INSERT INTO `evtreg` (`evtreg_id`, `email`, `name`, `nic`, `phone_no`, `address`, `event`) VALUES (NULL, ?, ?, ?, ?, ?, ?);";
            $stmt =  $conn ->prepare($query);
            $stmt ->bindValue(1,$this->email);
            $stmt ->bindValue(2,$this->name);
            $stmt ->bindValue(3,$this->nic);
            $stmt ->bindValue(4,$this->phone_no);
            $stmt ->bindValue(5,$this->address);
            $stmt ->bindValue(6,$this->event);
            $res = $stmt->execute();
            if ($res) {
                return true;
            } else {
                return false;
            }
            

        }catch(PDOException $e){
            return false;
        }
     }

}