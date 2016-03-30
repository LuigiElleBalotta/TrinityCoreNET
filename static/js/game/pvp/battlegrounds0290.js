$(document).ready(function() {
	var target = $('.target');
	var $pvpSubSection = $('[data-accordion]');
	$('clicker').click(function() {
		target.toggle();
	})

	$pvpSubSection.accordion();
}); 
