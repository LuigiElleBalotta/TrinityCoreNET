<?php

class UtilityManager extends CI_Controller
{
    private $db = null;
    private $AuthDB = null;
    private $CharDB = null;
    public function __construct() {
        require_once BASEPATH.'database/DB.php';
        $this->db = DB('default', true); // you can set the database.php config's group, or a full DSN string here
        $this->AuthDB = DB('AuthDB', true);
        $this->CharDB = DB('CharDB', true);
    }

    public function GetRaceNameByID($id)
    {
        $query = $this->db->query("SELECT name FROM races WHERE ID = ?;", array($id));
        $row = $query->row();
        return $row->name;
    }

    public function GetClassNameByID($id)
    {
        $query = $this->db->query("SELECT name FROM classes WHERE ID = ?;", array($id));
        $row = $query->row();
        return $row->name;
    }

    public function GetAccountUsernameByBNetID($bnetID)
    {
        $query = $this->AuthDB->query("SELECT username FROM account WHERE battlenet_account = ?;", array($bnetID));
        $row = $query->row();
        return $row->username;
    }
}