<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Forum extends CI_Controller {

    public function index()
    {
        $query = $this->db->query("SELECT ID, name FROM forum_types;");
        $array = array();
        $c = 0;
        foreach($query->result() as $row)
        {
            $array[$c]["ForumTypeID"] = $row->ID;
            $array[$c]["ForumTypeName"] = $row->name;
            $c++;
        }
        $data["json_forum_types"] = json_encode($array);
        $dataHeader["title"] = "Forum";
        $dataHeader["content_trail"] = $this->load->view("content_trail", NULL, TRUE);
        $dataHeader["slideshow"] = "";
        $dataHeader["right_sidebar"] = "";
        $dataHeader["bodyClasses"] = "forums forums-home";
        $dataHeader["custom_css"] = "
        <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"/static/cms-overlay/css/build/cms.min0290.css?v=103\" />
        <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"/static/css/forums/forums-index0290.css?v=103\" />
        <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"/static/css/forums/view-forum0290.css?v=103\" />
        <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"/static/css/forums/view-topic0290.css?v=103\" />
        <link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"/static/css/forums/blizz-tracker0290.css?v=103\" />
        ";
        $this->load->view("header", $dataHeader);
        $this->load->view("forum/forumindex", $data);
        $this->load->view("footer");

    }
}
