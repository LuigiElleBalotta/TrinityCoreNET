<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$query = $this->db->query("SELECT id, title, summary, date, last_modify, link_rewrite, isPinned FROM blog ORDER BY date DESC;");
		$blogsArray = array();
		$counter = 0;
		foreach($query->result() as $row)
		{
			$blogsArray[$counter]["id"] = $row->id;
			$blogsArray[$counter]["title"] = $row->title;
			$blogsArray[$counter]["summary"] = $row->summary;
			$blogsArray[$counter]["date"] = $row->date;
			$blogsArray[$counter]["last_modify"] = $row->last_modify;
			$blogsArray[$counter]["link_rewrite"] = $row->link_rewrite;
			$blogsArray[$counter]["isPinned"] = $row->isPinned;
			$tmp_arr_date = explode(" ", $row->date);
			$blogsArray[$counter]["amd"] = $tmp_arr_date[0];
			$counter++;
		}
		$data["blogs"] = json_encode($blogsArray);

		$dataHeader["title"] = "World of Warcraft";
		$dataHeader["content_trail"] = $this->load->view("content_trail", NULL, TRUE);
		$dataHeader["slideshow"] = $this->load->view("slideshow", NULL, TRUE);
		$dataHeader["right_sidebar"] = $this->load->view("right_sidebar", NULL, TRUE);
        $dataHeader["bodyClasses"] = "homepage news";
        $dataHeader["custom_css"] = "";

		if($this->session->userdata("bnetid"))
		{
			$sql = "SELECT name, race, class, gender, level FROM characters WHERE account = ?;";
			$charQuery = $this->CharDB->query($sql, array($this->session->userdata("websiteid")));
			$arrayChar = array();
			$counter = 0;
			foreach($charQuery->result() as $row)
			{
				$arrayChar[$counter]["name"] = $row->name;
				$arrayChar[$counter]["race"] = $row->race;
				$arrayChar[$counter]["class"] = $row->class;
				$arrayChar[$counter]["gender"] = $row->gender;
				$arrayChar[$counter]["level"] = $row->level;
				$counter++;
			}
			$dataHeader["characterlist"] = json_encode($arrayChar);
		}

		$this->load->view("header", $dataHeader);
		$this->load->view('start_page', $data);
		$this->load->view("footer");
	}
}
