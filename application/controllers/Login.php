<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function index()
    {
        $this->load->view("account/login");
    }

    public function logout()
    {
        $this->session->sess_destroy();
    }

    public function DoLogin()
    {
        $array = json_decode(trim(file_get_contents('php://input')), true);
        $email = $this->AuthDB->escape_str(strtoupper($array["accountName"]));
        $password = $this->AuthDB->escape_str(strtoupper($array["password"]));
        $sql = "SELECT battlenet_accounts.id as 'bnetid', account.id, battlenet_accounts.email, username, firstname, lastname, age, country FROM battlenet_accounts JOIN account ON battlenet_accounts.id = battlenet_account WHERE battlenet_accounts.email = ? AND battlenet_accounts.sha_pass_hash = ?;";
        $hash_pass = strtoupper(bin2hex(strrev(hex2bin(strtoupper(hash("sha256",strtoupper(hash("sha256", strtoupper($email)).":".strtoupper($password))))))));
        $query = $this->AuthDB->query($sql, array($email, $hash_pass));
        if($query->num_rows() == 1)
        {
            $row = $query->row();
            $_SESSION["bnetid"] = $row->bnetid;
            $_SESSION["websiteid"] = $row->id;
            $_SESSION["email"] = $row->email;
            $_SESSION["username"] = $row->username;
            $_SESSION["firstname"] = $row->firstname;
            $_SESSION["lastname"] = $row->lastname;
            $_SESSION["age"] = $row->age;
            $_SESSION["country"] = $row->country;
            echo "true";
        }
        else
            echo "Invalid credentials!";
    }
}
