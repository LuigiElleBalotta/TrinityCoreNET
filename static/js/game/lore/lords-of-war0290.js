if(!Function.prototype.bind){
	// ignore older browsers
	Function.prototype.bind = function(){ return function(){} };
}
lordsofwar =
{ init: function(){
	this.$links = $(".episode[href]").on("click",this.click.bind(this));
	this.$container = $('.video-container').on("click",this.play.bind(this));
	this.$player = $("#videoplayer");
	var episode = $(".episode.active").data("episode");
	var hash = location.hash && location.hash.substr(1);
	if( !this.set(hash) ){
		this.set(episode);
	}
}
, set: function(episode){

	// Find episode
	if(!episode){ return false; }
	var $episode = $('.episode[data-episode="'+Core.escapeSelector(episode)+'"]');
	if(!$episode.length){ return false; }

	var videoID = $episode.data("video");
	var poster = $episode.data("poster");

	// Toggle Tabs
	this.$links.removeClass("active");
	$episode.addClass("active");

	// Save video to container
	this.$container.removeClass("started").data("video",videoID).css({backgroundImage:"url("+poster+")"});

	// Reset video player
	this.$player.attr({src:""});

	return true; //winning
	//TODO: create playbutton hover
}
, play: function(e){
	var videoID = this.$container.addClass("started").data("video");
	var url = this.$player.data("src").replace("videoID",videoID);
	this.$player.attr({src:url});
}
, click: function(e){
	e.preventDefault();
	var $episode = $(e.target).closest(".episode");
	if(!$episode.hasClass("active")){
		var episode = $episode.data("episode");
		this.set(episode);
		location.replace('#'+episode);
	}
}
};

$(function(){
	lordsofwar.init();
})
