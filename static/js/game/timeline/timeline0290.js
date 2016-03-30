/*
 *
 * WoW Timeline game contents functions.
 * That page path is http://us.battle.net/wow/en/game/timeline/chapter1
 *
 */

var Timeline = {

	/*
	 * This means chapters total size
	 */
	total: null,

	/*
	 * This means current chapter number
	 */
	chapter: null,

	/*
	 * To store data what's already loaded
	 */
	cached: {},

	/*
	 * Discussion keys array and sigs, built on page load.
	 */
	discussionKeys: [],

	/*
	 * To put some delay fetching content data
	 */
	fetchTimeout: null,

	/*
	 * To detect if IE browser version is lower than IE9
	 */
	isLowerIe9: false,

	/*
	 * Delay time for ajax call
	 */
	DELAY_TIME: 300,

	/*
	 * Animate speed for all effects
	 * The number means milliseconds. 3s = 3000
	 */
	ANIMATE_SPEED: 10,

	/*
	 * Top standard position for logo buttons
	 */
	TOP_POSITION: 96,

	/*
	 * Left standard positions for logo buttons
	 */
	LOGO_POSITIONS: [-400, -80, 110, 500, 730, 924, 1500],

	/*
	 * Standard position for arrow buttons to animate browser scroll
	 */
	SCROLL_BASIC_POSITION: 230,

	/*
	 * If support CSS transform and transition or history API
	 */
	EFFECTS_SUPPORT: true,

	/*
	 * initialization for Timeline function
	 */
	initialize: function(chapter){

		// Detect if the browser is lower than IE9 if it's IE.
		if( Core.browser.name === 'ie' && Core.browser.version < 9 ){
			this.isLowerIe9 = true;
		}
		// Detect browsers don't support Effects and history API
		if( this.isLowerIe9 || !window.history.pushState ){
			this.EFFECTS_SUPPORT = false;
		}

		this.chapter = chapter;
		this.buttons.initialize();

		$('.ui-breadcrumb a, #menu-container a').live('click', function(){
			if(Timeline.getChapterId(this.href)){
				Timeline.load(Timeline.getChapterId(this.href), true);
				return false;
			}
		});

		//Set history back button usage for supported browsers only
		if (this.EFFECTS_SUPPORT) {

			window.history.replaceState( chapter, '', 'chapter' + chapter);
			window.onpopstate = function(event){

				if (window.history.state) {
					var chapter = window.history.state;
				} else {
					// Safari supports pushState but doesn't support history.state, so need to set chapter value separately from the location pathname for this case.
					var chapter = Timeline.getChapterId(location.pathname);
				}

				Timeline.load(chapter, false);
			}
		}

		// Lightbox is used by members of Timeline.character
		if (!Lightbox.initialized) {
			Lightbox.init();
		}

		this.character.initialize();
	},

	/*
	 * Calculator for chapter from location href
	 */
	getChapterId: function(str){

		var rexp1 = /\/the-story-of-warcraft\//,
			rexp2 = /chapter[0-9]+$/,
			chapter;

		if(rexp1.test(str)){
			if(rexp2.test(str)){
				chapter = rexp2.exec(str)[0].substr(7);
			} else {
				chapter = 1;
			}
			return chapter;
		} else {
			return null;
		}
	},

	/*
	 * Fetch Timeline page data
	 */
	fetch: function(url){

		// Use cached data if there's already loaded
		if( Timeline.cached[url] ){
			Timeline.displayUpdate(Timeline.cached[url]);
		// Fetch data when there is no cached one for the chapter
		} else{
			$.ajax({
				url: url,
				dataType: 'html',
				success: function(response) {
					Timeline.cached[url] = response; // Store data to cache array
					Timeline.displayUpdate(response);
				},
				error: function(response){
					return false;
				}
			});
		}
	},

	/*
	 * Load Timeline contents
	 */
	load: function(chapter, addHistory){

		// Chapter number checking to make safety and compare with current chapter
		if(chapter != null && Timeline.chapter != chapter){
			Timeline.chapter = parseInt(chapter);
		} else {
			return false;
		}

		// Stop the progress to fetch previous chapter data
		if(Timeline.fetchTimeout != null){
			clearTimeout(Timeline.fetchTimeout);
		}

		var url = './chapter'+ chapter;

		//Set history/ajax usage for supported browsers only
		if (!this.EFFECTS_SUPPORT) {
			location.href = url;

		} else {
			$('#timeline-content').empty().append('<div class="loading"/>');

			Timeline.buttons.logoDisplay();

			Timeline.fetchTimeout = setTimeout(function(){
				Timeline.fetch(url);
			}, Timeline.DELAY_TIME); // Set fetching data

			if(addHistory){
				window.history.pushState( chapter, '', 'chapter' + chapter );
			}
		}
	},

	/*
	 * Effects to show contents when the chapter is being loaded
	 */
	displayUpdate: function(content){
		var artworkBackground = $(content).find('#timeline-artwork').css('background-image');
		var newContent = $(content).find('#timeline-content');
		var newTitle = $(content).find('#timeline-title').text();

		$('#timeline-content').empty().append(newContent);
		$('#timeline-content .game-box').fadeIn('fast');
		$('#timeline-artwork').fadeOut('fast', function() {
			$('#timeline-artwork').css('background-image', artworkBackground).fadeIn('fast', function(){});
		});
		Timeline.buttons.arrowDisplayUpdate();

		$('.ui-breadcrumb li.last a').attr('href', location.href).text(newTitle);
		document.title = [newTitle].concat(document.title.split(' - ').slice(1,3)).join(' - ');
		// loaded new set of comments and insert into new comment-container
		this.loadComments(this.chapter);
	},

	/*
	 * Fetch comments for this chapter, when loading content via pushstate
	 */
	loadComments: function(chapter) {
		// get stored discussion keys by chapter, don't rely on array index
		var discussion = Timeline.discussionKeys.filter(function(i){
			return i.chapter == chapter;
		}).pop();

		if(discussion) {
        	Comments.initialize(discussion.key, discussion.sig);
		}
	},

	/*
	 * All buttons effects and events.
	 */
	buttons: {

		logoEffectTimeout: null,

		initialize: function(){

			if(Core.browser == 'ie6'){
				$.each($('#center-navigator a'), function(i, link){
					var $link = $(link);
					$link.attr('title', $(this).find('.timeline-title').text());
				});
			}

			// Click event for all buttons
			$('.navigator a').live('click', function(){

				var chapter = $(this).data('chapter');

				if( $(this).attr('class') == 'button-previous' ){
					chapter = Math.max(1, Timeline.chapter - 1);

				} else if( $(this).attr('class') == 'button-next' ){
					chapter = Math.min(Timeline.total, Timeline.chapter + 1);
				}
				if( (this.parentNode.id == 'bottom-navigator' || this.parentNode.id == 'center-navigator') && Timeline.EFFECTS_SUPPORT){
					Timeline.buttons.scrollTopEffect();
				}

				Timeline.load(chapter, true);
				return false;
			});

			Timeline.buttons.logoDisplay();

			// Adjustment for logos top positions
			$.each($('#top-navigator .logos a img.original'), function(i, logo){
				var $logo = $(logo);
				var $logoEffect = $logo.siblings('img.effect');
					$logoEffect.css('top', Timeline.TOP_POSITION - $logoEffect.height()/2);
					$logo.css('top', Timeline.TOP_POSITION - $logo.height()/2);
			});
		},


		/*
		 * Scrolling to top effects for some buttons
		 */
		scrollTopEffect: function(){
			$('html, body').animate({
				'scrollTop': Timeline.SCROLL_BASIC_POSITION
			}, Timeline.DELAY_TIME, function(){});
		},

		/*
		 * Set display of arrow buttons
		 */
		arrowDisplayUpdate: function(){

			if( Timeline.chapter > 1 ){
				$('.button-previous').show();
			} else {
				$('.button-previous').hide();
			}
			if( Timeline.chapter < Timeline.total ){
				$('.button-next').show();
			} else {
				$('.button-next').hide();
			}
		},

		/*
		 * Logo buttons display effects
		 */
		logoDisplay: function(){

			// Stop the progress to logo blurry effects
			if(Timeline.buttons.logoEffectTimeout != null){
				clearTimeout(Timeline.buttons.logoEffectTimeout);
			}
			Timeline.buttons.arrowDisplayUpdate();

			$.each($('#top-navigator .logos a .original'), function(i, logo){
				var $logo = $(logo);
				var logoFakeWidth = eval($logo.data('width'))/4; // This uses fake width size of each logo image to use specific position

				if( i == Timeline.chapter - 1 ){
					logoFakeWidth = logoFakeWidth*2;
					$logo.addClass('selected');

				} else {
					if( $logo.hasClass('selected') ){
						$logo.removeClass('selected');
						$logo.siblings('img.effect').hide();
					}
					// Fixes to adjust logo size for IE browsers lower than 9 version
					if(Timeline.isLowerIe9){
						$logo.width($logo.width()/2);
						logoFakeWidth = (logoFakeWidth*4 - 300)/4;
					}
				}

				if( i < (Timeline.chapter - 3) ){
					Timeline.buttons.logoAnimate($logo, 0, logoFakeWidth);

				} else if ( i > (Timeline.chapter + 2) ){
					Timeline.buttons.logoAnimate($logo, 6, logoFakeWidth);

				} else {
					Timeline.buttons.logoAnimate($logo, i - Timeline.chapter + 4, logoFakeWidth);
				}
			});
		},

		/*
		 * Left/Right animation effects for logo buttons
		 */
		logoAnimate: function(work, index, left){
			var left = Timeline.LOGO_POSITIONS[index] - Math.round(left);
				work.css('left', left);

			if( work.hasClass('selected') && !Timeline.isLowerIe9 ){
				Timeline.buttons.logoEffectTimeout = setTimeout(function(){Timeline.buttons.logoEffect(work, left)}, Timeline.DELAY_TIME*2.2); // Set logo blurry effects
			}
		},

		/*
		 * Blurry effects for logo after positioning center
		 */
		logoEffect: function(work, left){
			var $logoEffect = work.siblings('img.effect');
				$logoEffect.css('left', left + (work.width() - $logoEffect.width())/2).fadeIn(Timeline.DELAY_TIME);
		}
	},

	/*
	 * Character details popup.
	 */
	character: {
		/*
		 * Character details popup container.
		 */
		container: null,

		/**
		 * Extend Lightbox.close() by adding a custom callback.
		 */
		initialize: function() {
			Timeline.character.lightboxCallback(Timeline.character.close);
		},

		/*
		 * load character card content.
		 */
		load: function(characterId) {

			var ajaxUrl = './characters.frag?character=' + characterId;

			// Use cached data if there's already loaded
			if( Timeline.cached[ajaxUrl] ){
				Timeline.character.container = $(Timeline.cached[ajaxUrl]);
				Timeline.character.open();
			// Fetch data when there is no cached one for the character
			} else {
				$.ajax({
					url: ajaxUrl,
					dataType: 'html',
					success: function(response) {
						Timeline.cached[ajaxUrl] = response; // Store data to cache array
						Timeline.character.container = $(response);
						Timeline.character.open();
					},
					error: function(response){
						return false;
					}
				});
			}
		},

		/*
		 * Open character details popup.
		 */
		open: function(){
			Lightbox.emptyContent();
			Lightbox.setFrameDimensions(800, 550);

			Lightbox.anchor.addClass("character-lightbox");
			Timeline.character.container.find(".carousel").carousel();
			Timeline.character.container.appendTo(Lightbox.content);

			Lightbox.show();
		},

		/*
		 * Clean up the lightbox container by removing custom content.
		 */
		close: function(){
			Lightbox.anchor.removeClass("character-lightbox");
			Timeline.character.container.remove();
		},

		lightboxCallback: function(cb) {
			var defaultClose = Lightbox.close;
			var callback = $.noop;
			if (typeof cb === "function") {
				callback = cb;
			}

			// IIFE used to invoke the original close function + callback
			Lightbox.close = (function() {
				defaultClose();
				callback();
			});
		}
	}
}