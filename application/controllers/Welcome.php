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
		$query = $this->db->query("SELECT id, title, summary, date, last_modify, link_rewrite, isPinned FROM blog;");
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
		$this->load->view('start_page', $data);

	}
}
