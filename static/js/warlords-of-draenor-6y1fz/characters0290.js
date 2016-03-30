/**
 * CharacterSelect
 * @type {Object}
 * @requires Lightbox, ModelVideo
 */
var CharacterSelect = {

	models: {},
	config: {},

	ui: {},
	assetPath: "",

	selected: {},
	selectedRace: "",
	selectedGender: "",
	selectedAnimation: "",

	init: function(config,models){

		CharacterSelect.config = $.extend({
			"assetPath":"",
			"cdnPath":"",
			"defaultAnimationType":"idle"
		},config);

		// Get model object and assetPath
		CharacterSelect.models = models;
		CharacterSelect.assetPath = config.assetPath;

		// UI elements
		CharacterSelect.ui.genderSelect = $(".gender-select");
		CharacterSelect.ui.selectContainer = $(".character-bg");
		CharacterSelect.ui.raceSelect = $(".race-select");
		CharacterSelect.ui.raceTitle = $(".race-title");
		CharacterSelect.ui.stage = $(".stage");

		// Lightbox Images
		CharacterSelect.ui.lightBoxImages = $(".lightbox-image");

		// Video on stage
		CharacterSelect.ui.modelVideo = ModelVideo.build($(".model-video"));

		// Idle and rotate buttons
		CharacterSelect.ui.animationSelect = $(".animation-select");

		// Background image
		CharacterSelect.ui.characterBackground = $(".character-bg");

		// Select default animation type
		CharacterSelect.selectAnimationType(CharacterSelect.config.defaultAnimationType);

		CharacterSelect.bindEvents();

	},

	bindEvents: function(){

		// Bind race select
		CharacterSelect.ui.raceSelect.delegate("li","click.race-select",function(event){
			CharacterSelect.loadModel($(this).attr("data-race"),CharacterSelect.selectedGender);
			event.preventDefault();
		});

		// Bind gender select
		CharacterSelect.ui.genderSelect.delegate("a","click.race-select",function(event){
			CharacterSelect.loadModel(CharacterSelect.selectedRace,$(this).attr("data-gender"));
			event.preventDefault();
		});

		// Bind lightbox images
		CharacterSelect.ui.lightBoxImages.each(function(index){
			$(this).bind("click",function(event){
				Lightbox.loadImage([
					{"src":CharacterSelect.assetPath + CharacterSelect.selected.images[0].full},
					{"src":CharacterSelect.assetPath + CharacterSelect.selected.images[1].full},
					{"src":CharacterSelect.assetPath + CharacterSelect.selected.images[2].full}
				],false,index);
			});
		});

		// Bind animation buttons
		CharacterSelect.ui.animationSelect.delegate("a","click.animation-select",function(event){
			var type = $(this).attr("data-type");

			if(type && CharacterSelect.selected.animations[type]){
				CharacterSelect.selectAnimationType(type);
				CharacterSelect.playAnimation(CharacterSelect.selected.animations,type);

				if(type === "rotation" && !CharacterSelect.ui.selectContainer.hasClass("draggable")) {
					if (ModelVideo.supportsVideo && !$('html').hasClass('ie')) {
						CharacterSelect.ui.selectContainer.addClass("draggable");
					}  else {
						CharacterSelect.ui.selectContainer.removeClass("draggable");
					}
				} else {
					CharacterSelect.ui.selectContainer.removeClass("draggable");
				}
				
			}

			event.preventDefault();
		});

	},

	loadModel: function(race, gender){
		// Early out if the supplied race is not valid
		if(!(race in CharacterSelect.models)) { return; }

		// Verify that the selected gender is available for the selected race, if
		// not fall back to a valid gender.
		if (race in CharacterSelect.models && !CharacterSelect.models[race][gender]) {

			// NOTE: IE8 doesn't support Objects.keys, so we must use a For-In to
			// fetch the 0th object property.
			for (var key in CharacterSelect.models[race]) {
				if (CharacterSelect.models[race].hasOwnProperty(key)) {
					gender = key;
					break;
				}
			}

		}

		if(!(race == CharacterSelect.selectedRace && gender == CharacterSelect.selectedGender)){

			CharacterSelect.selectedRace = race;
			CharacterSelect.selectedGender = gender;
			CharacterSelect.selected = CharacterSelect.models[race][gender];

			CharacterSelect.ui.raceSelect.find("li").removeClass("selected");
			CharacterSelect.ui.raceSelect.find("li."+race).addClass("selected");
			CharacterSelect.updateGenderButtons();

			if(!CharacterSelect.selected.loaded){
				CharacterSelect.loadModelAssets(function(){
					CharacterSelect.applyModel();
				});
			} else {
				CharacterSelect.applyModel();
			}

			CharacterSelect.models[race][gender].loaded = true;
		}

	},

	updateGenderButtons: function() {
		var race = CharacterSelect.selectedRace;

		CharacterSelect.setGenderButtonInternal(race, "male");
		CharacterSelect.setGenderButtonInternal(race, "female");
	},

	setGenderButtonInternal: function(race, gender) {
		var button = CharacterSelect.ui.genderSelect.find("." + gender);
		var state = "";

		if (CharacterSelect.models[race].hasOwnProperty(gender)) {
			// If this gender is a valid option, it is "enabled" and MAY be selected
			if (CharacterSelect.selected === CharacterSelect.models[race][gender]) {
				state = "selected";
			}
			CharacterSelect.setGenderState(button, state);
		} else {
			// This gender is not valid -- disable the button
			CharacterSelect.setGenderState(button, "disabled");
		}
	},

	setGenderState: function(el, state) {
		el.removeClass("selected disabled");
		if (state !== "") {
			el.addClass(state);
		}
	},

	loadModelAssets: function(callback){

		callback();

	},

	setContainerAttributes: function() {

		CharacterSelect.ui.selectContainer.attr({
			"data-animation": CharacterSelect.selectedAnimation,
			"data-gender": CharacterSelect.selectedGender,
			"data-race": CharacterSelect.selectedRace
		});

	},

	setTitle: function(raceName){

		CharacterSelect.ui.raceTitle.html(raceName);

	},

	setStaticImage: function(path){

		CharacterSelect.ui.stage.css({'background-image':'url(' + CharacterSelect.assetPath + path + ')' });

	},

	setBackground: function(path){
		CharacterSelect.ui.characterBackground.css({'background-image':'url(' + CharacterSelect.assetPath + path + ')' });
	},

	setAccessoryImages: function(images){

		CharacterSelect.ui.lightBoxImages.each(function(i){
			$(this).css({'background-image': 'url(' + CharacterSelect.assetPath + images[i].thumb + ')' });
		});

	},

	selectAnimationType: function(type){

		CharacterSelect.ui.animationSelect.find("a").removeClass("selected");
		CharacterSelect.ui.animationSelect.find("a[data-type='"+type+"']").addClass("selected");

		CharacterSelect.selectedAnimation = type;

	},

	playAnimation: function(animations, type){

		if (!ModelVideo.supportsVideo()) {
			return;
		}

		var animationType = type || CharacterSelect.selectedAnimation;

		if(animations[animationType]){
			var path = CharacterSelect.assetPath + animations[animationType][CharacterSelect.ui.modelVideo.playFormat];

			CharacterSelect.ui.modelVideo.playAnimation(path);
		}

	},

	applyModel: function(){

		var model = CharacterSelect.selected;

		// Add relevant data to the DOM so CSS can dynamically react
		CharacterSelect.setContainerAttributes();

		// Race title
		CharacterSelect.setTitle(model.name);

		// Static image
		CharacterSelect.setStaticImage(model.static);

		// Background image
		CharacterSelect.setBackground(model.background);

		// Play selected animation type video
		CharacterSelect.playAnimation(model.animations);

		// Accessory shot images
		CharacterSelect.setAccessoryImages(model.images);

	}

}

/**
 * ModelVideo
 * @type {Object}
 */
var ModelVideo = {

		element: null, // video tag

		playFormat: null, // supported browser format
		currentSource: null,

		/**
		 * Builds and returns an instance of the ResponsiveVideo class
		 * @param element
		 * @param config
		 * @return instance of ResponsiveVideo class
		 */
		build: function(element, config){
				var instance = Object.create(ModelVideo);
				instance.init(element);
				return instance;
		},

		/**
		 * Initializes the instance of the ResponsiveVideo class
		 * @param element
		 * @param config
		 */
		init: function(element){

				this.element = element;
				this.video = this.element[0];
				// Can Play webm
				if(this.canPlay("video/webm")){
						this.playFormat = "webm";

				// Can Play mp4
				}else if(this.canPlay("video/mp4")){
						this.playFormat = "mp4";
				}

				// bind events to make ui functional
				this.initEvents();
		},

		/**
		 * Initializes any necessary browser events
		 */
		initEvents: function(){

				var that = this;

				// when the element can play, play it
				this.element.bind("canplay",function(){
						this.play();
						$(this).animate({"opacity":1},500);
						// CharacterSelect.ui.stage.animate({"opacity": 0}, 500);
				});

		},

		supportsVideo: function () {
			return !!document.createElement('video').canPlayType;
		},

		 /**
		 * Wrapper function that checks if the browser can play the supplied video type
		 * @param type
		 * @param codecs
		 * @return {Boolean}
		 */
		canPlay: function(type, codecs){

				if (!this.supportsVideo()) {
					return false;
				}

				// Add codecs if supplied
				type = (codecs) ? type + ';codecs="'+codecs+'"' : type;

				var result = this.video.canPlayType(type);

				return !!(result == "maybe" || result == "probably");
		},

		/**
		 * Attempts to play the specified source
		 * @param source
		 */
		playSource: function(source){

				// Set the source and load
				this.element.attr("src",source);

				this.video.load();

		},

		/**
		 * Prepare the animation state and initiate play of specified source
		 * @param source
		 */
		playAnimation: function(source) {

				// Pause any loaded video
				this.video.pause();

				// Hide the video element
				this.element.css({"opacity":0});
				CharacterSelect.ui.stage.animate({"opacity": 1}, 250);

				this.playSource(source);

		}

};

var videoController = {
	length: 0,
	time: 0,
	width: 0,
	mouse: 0,
	create: function(query){
		var controller = Object.create(videoController);
		controller.init(query);
		return controller;
	},
	init: function(query){
		this.video = document.querySelector(query);
		this.onstart = this.bind(this.start);
		this.ondrag = this.bind(this.drag);
		this.onend = this.bind(this.end);
		this.onrotationplay = this.bind(this.pause);	// keeps the video from stuttering when the user drags to rotate
		this.video.addEventListener("mousedown",this.onstart);
	},
	bind: function(callback){
		var self = this;
		var fn = function(e){ return callback.apply(self,arguments); };
		return fn;
	},
	start: function(e){

		// Only perform on rotation.
		if (CharacterSelect.selectedAnimation !== "rotation") {
			return;
		}

		var video = this.video;
		this.mouse = e.clientX;
		video.pause();
		this.time = video.currentTime;
		this.length = video.seekable.end(0);
		this.width = video.clientWidth;
		this.autoplay = false;
		CharacterSelect.ui.selectContainer.addClass('dragging');
		window.addEventListener("mousemove",this.ondrag);
		window.addEventListener("mouseup",this.onend);

		video.addEventListener("play", this.onrotationplay);
	},
	pause: function() {
		this.video.pause();
	},
	end: function(){
		this.video.removeEventListener("play", this.onrotationplay);
		this.video.play();
		CharacterSelect.ui.selectContainer.removeClass('dragging');
		window.removeEventListener("mousemove",this.ondrag);
		window.removeEventListener("mouseup",this.onend);
	},
	drag: function(e){
		var length = this.length;
		var percentOffset = (e.clientX-this.mouse) / this.width;
		var newTime = this.time + (percentOffset * length);
		while(newTime > length){ newTime-=length; }
		while(newTime < 0){ newTime+=length; }
		
		var updateFrame = newTime.toFixed(2) * 100 % 3;
		// Only update if the time changes to prevent redraw thrashing
		if (updateFrame === 0) { // && newTime !== this.time
			this.video.currentTime = newTime;
			//this.video.fastSeek(newTime);
		}

		e.preventDefault();
	}
};


$(document).ready(function() {
	if (ModelVideo.supportsVideo && !$('html').hasClass('ie')) {
		var modelVideo = videoController.create(".model-video");
	}
});