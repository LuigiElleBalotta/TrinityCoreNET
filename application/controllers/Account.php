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
}
