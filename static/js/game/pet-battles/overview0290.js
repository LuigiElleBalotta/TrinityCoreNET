/* Overriding/Extending Lightbox.preloadImage() */
var preloadImage = function(loadingImage,callback) {
	var tempImage = new Image();
	if (callback) {
		$(tempImage).load(function () {
			callback(tempImage);
		});
	}
	tempImage.src = loadingImage.src;
	tempImage.title = loadingImage.title;
	$("#lightbox-container").find("em").empty().html(tempImage.title);
	return tempImage;
}

/* Overriding/Extending Lightbox.next() */
var next = function() {
	var totalContent = Lightbox.contents.length;
	if (totalContent > 1) {
		//increment index
		Lightbox.currentIndex++;

		if (Lightbox.currentIndex >= totalContent) {
			Lightbox.currentIndex = 0;
		}
		Lightbox.setImage(Lightbox.preloadImage(Lightbox.contents[Lightbox.currentIndex]));
	}
}

/* Overriding/Extending Lightbox.previous() */
var previous = function() {
	var totalContent = Lightbox.contents.length;

	if (totalContent > 1) {
		//decrement
		Lightbox.currentIndex--;

		if (Lightbox.currentIndex < 0) {
			Lightbox.currentIndex = Lightbox.contents.length -1;
		}
		Lightbox.setImage(Lightbox.preloadImage(Lightbox.contents[Lightbox.currentIndex]));
	}
}


$(function () {
    /* Override Lightbox functions */
    Lightbox.preloadImage = preloadImage;
    Lightbox.next = next;
    Lightbox.previous = previous;

    /*Smooth scoll to page sections */
    $(".how-to .scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate( { scrollTop: $(this.hash).offset().top }, 900);
    });

    /* Append subtitles in lightbox window */ 
    $("#progression .thumbs").click(function(){
        $("#lightbox-container em").remove();
        $("#lightbox-container").append('<em>' + Lightbox.contents[0]["title"] + '</em>');
    });

    /* Inject Flash animation at the top right of the page */
    Flash.defaultVideoParams.wmode = "transparent";
    swfobject.embedSWF(Core.staticUrl + "/flash/game/petbattles.swf",
        "flash-container", "810", "570", "10", Flash.expressInstall, {}, Flash.defaultVideoParams);
})
