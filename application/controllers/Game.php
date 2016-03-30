<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game extends CI_Controller {

    public function index()
    {
        $dataHeader["title"] = "Gioco - World of Warcraft";
        $dataHeader["content_trail"] = $this->load->view("content_trail", NULL, TRUE);
        $dataHeader["slideshow"] = "";
        $dataHeader["right_sidebar"] = "";
        $dataHeader["bodyClasses"] = "game-index";
        $dataHeader["custom_css"] = "<link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"/static/css/game/game-index0290.css?v=103\" />";
        $dataHeader["custom_css"] .= "<link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"../../static/css/wiki/wiki0290.css?v=103\" />";
        $this->load->view("header", $dataHeader);
        $this->load->view("game/start_page");
        $this->load->view("footer");
    }

    public function race()
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

    public function class()
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

    public function profession()
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

    public function artifacts()
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


}
