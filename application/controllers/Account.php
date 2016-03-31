<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Account extends CI_Controller {

    public function index()
    {
        $dataHeader["title"] = "404 | World of Warcraft";
        $dataHeader["content_trail"] = $this->load->view("content_trail", NULL, TRUE);
        $dataHeader["slideshow"] = "";
        $dataHeader["right_sidebar"] = "";
        $dataHeader["bodyClasses"] = "server-error";
        $dataHeader["custom_css"] = "";
        $this->load->view("header", $dataHeader);
        $this->load->view('errors/404notfound');
        $this->load->view("footer");
    }

    public function create()
    {
        $this->load->view("account/createAccountForm");
    }

    public function createAccount()
    {
        $array = json_decode(trim(file_get_contents('php://input')), true);
        $country = $array["country"];
        $firstname = $array["firstname"];
        $lastname = $array["lastname"];
        $emailAddress = $this->AuthDB->escape_str(strtoupper($array["emailAddress"]));
        $password = strtoupper($array["password"]);
        $rePassword = strtoupper($array["rePassword"]);
        $age = $array["age"];
        $username = strtoupper($array["username"]);

        if($password == $rePassword)
        {
            //BNET Password:
            $bnet_password = strtoupper(bin2hex(strrev(hex2bin(strtoupper(hash("sha256",strtoupper(hash("sha256", strtoupper($emailAddress)).":".strtoupper($password))))))));;

            //Site Password:
            $sha_pass_hash = strtoupper(sha1($username.":".$password));

            $bnetData = array("email" => $emailAddress,
                              "sha_pass_hash" => $bnet_password);
            $this->AuthDB->insert("battlenet_accounts", $bnetData);

            $query = $this->AuthDB->query("SELECT id FROM battlenet_accounts WHERE email = ? AND sha_pass_hash = ?;", array($emailAddress, $bnet_password));
            $BnetID = 0;
            foreach($query->result() as $row)
                $BnetID = $row->id;

            if($BnetID > 0)
            {
                $gameData = array("username" => $username,
                                  "sha_pass_hash" => $sha_pass_hash,
                                  "email" => $emailAddress,
                                  "reg_mail" => $emailAddress,
                                  "expansion" => 5,
                                  "battlenet_account" => $BnetID,
                                  "battlenet_index" => 1,
                                  "country" => $country,
                                  "firstname" => $firstname,
                                  "lastname" => $lastname,
                                  "age" => $age);
                $this->AuthDB->insert("account", $gameData);
                echo "true";
            }
            else
                echo "Error: BNetID <= 0";
        }
        else
            echo "Passwords don't match!";


    }
}
