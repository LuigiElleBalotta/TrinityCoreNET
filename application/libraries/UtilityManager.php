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

    public function GetRealmName()
    {
        $query = $this->AuthDB->query("SELECT name FROM realmlist LIMIT 1;");
        $row = $query->row();
        return $row->name;
    }

    public function GetForumTypeName($ID)
    {
        $query = $this->db->query("SELECT name FROM forum_types WHERE ID = ?", array($ID));
        $forumname = "ERR_NO_NAME";
        $row = $query->row();
        $forumname = $row->name;
        return $forumname;
    }

    public function GetForumsChild($ForumTypeID)
    {
        $query = $this->db->query("SELECT ID, name, description, icon FROM forums WHERE forum_type = ?;", array($ForumTypeID));
        $array = array();
        $c = 0;
        foreach($query->result() as $row)
        {
            $array[$c]["ID"] = $row->ID;
            $array[$c]["name"] = $row->name;
            $array[$c]["description"] = $row->description;
            $array[$c]["icon"] = $row->icon;
            $c++;
        }
        return json_encode($array);
    }
}