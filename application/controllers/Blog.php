<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends CI_Controller {

    public function index($id, $linkrewrite)
    {
        $query = $this->db->query("SELECT id, title, description, summary, content, date, last_modify, link_rewrite, isPinned FROM blog WHERE id = ? AND link_rewrite = ?;", array($id, $linkrewrite));
        foreach($query->result() as $row)
        {
            $data["id"] = $row->id;
            $data["title"] = $row->title;
            $data["description"] = $row->description;
            $data["summary"] = $row->summary;
            $data["content"] = $row->content;
            $data["date"] = $row->date;
            $data["last_modify"] = $row->last_modify;
            $data["link_rewrite"] = $row->link_rewrite;
            $data["isPinned"] = $row->isPinned;
            $tmp_arr_date = explode(" ", $row->date);
            $data["amd"] = $tmp_arr_date[0];
        }

        $dataHeader["title"] = $data["title"];
        $dataHeader["content_trail"] = $this->load->view("content_trail", NULL, TRUE);
        $dataHeader["slideshow"] = "";
        $dataHeader["right_sidebar"] = $this->load->view("right_sidebar", NULL, TRUE);
        $this->load->view("header", $dataHeader);
        $this->load->view('blog', $data);

    }
}
