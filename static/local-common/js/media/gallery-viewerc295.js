var GalleryViewer = {
	/**
	 * boolean to determine if init() has been run yet
	 */
	initialized: false,

	/**
	 * if browser supports html5 history
	 */
	historyEnabled: false,

	/**
	 * array to cache film strip responses
	 */
	filmStripCache: {},

	/**
	 * temporary keywords (not applied until hit 'apply')
	 */
	tempKeywords: "",

	/**
	 * list of keywords for filtering
	 */
	keywords: "",

	/**
	 * key of the active item we're viewing
	 */
	currentItemKey: "",

	/**
	 * List of thumbnail indices
	 */
	thumbnailIndices: [],

	/**
	 * Element holding image ajax target
	 */
	imageAjaxTarget: null,

	/**
	 * Element holding the thumbnails
	 */
	filmStripThumbnails: null,

	/**
	 * Object for image load timeout
	 */
	imageTimeout: null,

	/**
	 * timer for the delay of loading meta data
	 */
	metaDataTimeout: null,

	/**
	 * timer for the delay of preloading images
	 */
	imagePreloadTimeout: null,

	/**
	 * If we want to supress an ajax load (needed for first load)
	 */
	suppressAjaxLoad: false,

	/**
	 * Flag for if the scrollbar has been bound
	 */
	scrollbarBound: false,

	/**
	 * array to cache thumbnail pages
	 */
	thumbnailPageCache: {},

	/**
	 * Current thumbnail page
	 */
	currentThumbnailPage: 0,

	/**
	 * Factory method for generating GalleryViewer instances.
	 *
	 * @param query
	 * @param config
	 */
	factory: function(query, config) {
		var instance = Object.create(GalleryViewer);
			instance.init(query, config);

		return instance;
	},


	/**
	 * Initialize media with config
	 *
	 * @param query
	 * @param config
	 */
	init: function(query, config) {

		this.query = query;
		this.node = $(query);

		// Check if the wrapper exists
		if (!this.node.length) {
			return;
		}

		// Configure
		this.config = $.extend({
			dataKey:              "",
			galleryType:          "images",
			currentItemKey:        "",
			indices:               [],
			itemPaths:             [],
			discussionKeys:        [],
			discussionSigs:        [],
			imageTargetId:         "#current-image",
			suppressAjaxLoad:      false,
			activeClass:           "active-film-strip-thumb-wrapper",
			thumbnailWrapper:      "#film-strip-thumbnails",
			thumbnailHolderHeight: 630,
			thumbnailHeight:       90,
			metaDataAjaxUrl:       "media/meta-data",
			preloadContainerId:    "#media-preload-container",
			metaContainerId:       "#media-meta-data",
			flashContainerId:      "#flash-container",
			ajaxTargetWrapper:     "#film-strip-ajax-target",
			hasKeywords:           false,
			filmStripView:         false,
			keywords:              "",
			videoData:             [],
			page:                  -1,
			pagingNode:            "#thumbnail-page",
			numThumbnailPages:     0
		}, config);

		//store if we support html5 history
		this.historyEnabled = (window.history && window.history.pushState);

		this.suppressAjaxLoad = this.config.suppressAjaxLoad;

		if (this.config.filmStripView) {
			this.initializeFilmStrip();
		} else {
			this.initializeThumbnailPage();
		}

		//bind keywords
		if (this.config.hasKeywords) {
			$(".keyword-filter").on("click", $.proxy(function(event) {
				event.preventDefault();
				this.buildKeywords(event.currentTarget);
			}, this));

			$(".dropdown-toggler").on("click", $.proxy(function(event) {
				event.preventDefault();
				this.prepareKeywords(event.currentTarget);
			}, this));

			$(".cancel-filter").on("click", $.proxy(function(event) {
				event.preventDefault();
				this.cancelFilter();
			}, this));

			$(".apply-filter").on("click", $.proxy(function(event) {
				event.preventDefault();
				this.applyKeywordFilter(this.config.filmStripView);
			}, this));
		}

		//enable keyboard paging
		this.bindKeyboardPaging();

		this.initialized = true;
	},
	/**
	 * Functions specific to initializing a film strip page
	 */
	initializeFilmStrip: function() {

		this.thumbnailIndices = this.config.indices;

		//store containers
		this.filmStripThumbnails = $(this.config.thumbnailWrapper);
		this.preloadContainer = $(this.config.preloadContainerId);
		this.metaDataContainer = $(this.config.metaContainerId);
		this.ajaxTargetWrapper = $(this.config.ajaxTargetWrapper);

		var firstItemKey = this.config.indices[0];
		var currentItemKey = this.config.currentItemKey;

		//store where images will go
		if (this.config.galleryType === "images") {
			this.imageAjaxTarget = $(this.config.imageTargetId);

			//if html5 history isn't supported, don't use ajax to load pages
			if (this.historyEnabled) {
				this.ajaxTargetWrapper
				.css("cursor", "pointer")
				.on("click", $.proxy(function(event) {
					event.preventDefault();
					this.getNextItem();
				}, this));
			}
		} else {
			this.flashContainer = $(this.config.flashContainerId);
		}

		// handle empty item
		if (currentItemKey === "") {
			//if we aren't redirecting a hash, point it to the first item
			if (!this.hashRedirect()) {
				this.loadFirstItem();
			}
		} else {
			this.currentItemKey = currentItemKey;

			//nothing needs to change, fade in active image and load comments
			if (this.showActiveItem(currentItemKey)) {

				if (this.config.galleryType === "videos") {
					this.loadItem(currentItemKey, false, true);
				}
				this.loadComments(currentItemKey);

				if (firstItemKey !== currentItemKey) {
					var newIndex = this.findItemIndex(currentItemKey);

					if (newIndex > 7) {
						this.nudgeScrollContent((newIndex + 1) * this.config.thumbnailHeight, 0, newIndex, this.config.thumbnailHeight);

						//ensure selected image is on the scroll bar
						var scrollOffset = this.getScrollOffset();

						//ensure thumbnails are all loaded
						this.loadFilmStripThumbnails(scrollOffset);
					}
				}
			} else {
				//we are trying to load a node that doesn't exist, fall back to first item
				this.loadFirstItem();
			}
		}

		//binds
		this.bindFilmStripHistory();
		this.bindScrollbar();

		//cache thumbnail nodes (link and img)
		var tempNodeList = [];
		var tempImageList = [];
		try {
			var indicesLength = this.config.indices.length;
			for (var x = 0; x < indicesLength; x++) {
				tempNodeList[x] = $("#" + this.config.indices[x]);
				tempImageList[x] = tempNodeList[x].find("span");
			}
		} catch(e) { }

		this.thumbnailLinkNodes = tempNodeList;
		this.thumbnailImageNodes = tempImageList;


		//if html5 history isn't supported, don't use ajax to load pages
		if (this.historyEnabled) {
			//bind load for clicking thumbnails
			$(".film-strip-thumb-wrapper", this.node).on("click", $.proxy(function(event) {
					event.preventDefault();
					this.loadItem(event.currentTarget, true);
				}, this));

			//bind paging arrows
			$(".paging-arrow.next", this.node).on("click", $.proxy(function(event) {
				event.preventDefault();
				this.getNextItem();
			}, this));

			$(".paging-arrow.previous", this.node).on("click", $.proxy(function(event) {
				event.preventDefault();
				this.getPreviousItem();
			}, this));
		}


	},

	/**
	 * Initialize a thumbnail page
	 */
	initializeThumbnailPage: function() {

		this.currentPageDisplay = $("#start-page");

		this.thumbnailPageNode = $(this.config.pagingNode);

		//if html5 history isn't supported, don't use ajax to load pages
		if (!this.historyEnabled) {
			return;
		}

		var doc = $(document);

		doc.delegate('.pagination-wrapper .ui-pagination a', 'click', $.proxy(function(event) {
			event.preventDefault();
			var pageNode = $(event.currentTarget)
			this.loadPage(pageNode.data("pagenum") * 1, true)
		}, this));


		$("#next-item").on("click", $.proxy(function(event) {
			event.preventDefault();
			this.getNextPage();
		}, this));

		$("#previous-item").on("click", $.proxy(function(event) {
			event.preventDefault();
			this.getPreviousPage();
		}, this));

		this.bindThumbnailHistory();

		this.currentThumbnailPage = this.config.page;
	},

	/**
	 * Determines the index of an item based on its id
	 */
	findItemIndex: function(itemKey) {

		var index = this.config.indices.length - 1;

		if (index >= 0 && itemKey !== "") {
			do {
				if (this.config.indices[index] === itemKey) {
					return index;
				}
			}
			while (index--);
		}

		return false;
	},

	/**
	 * Loads first item in the gallery and sets url appropriately.
	 */
	loadFirstItem: function () {

		var firstItemKey = this.config.indices[0];
		this.currentItemKey = firstItemKey;

		if (this.historyEnabled) {
			if (this.config.keywords === "") {
				window.history.replaceState({ itemKey: firstItemKey }, firstItemKey, "?view=" + firstItemKey);
			} else {
				window.history.replaceState({ itemKey: firstItemKey }, firstItemKey, "?view=" + firstItemKey + "&keywords=" + this.config.keywords);
			}
		}

		//videos still need to be loaded, force the load
		if (this.config.galleryType === "videos") {
			this.loadItem(this.currentItemKey, false, true);
		}

		this.showActiveItem(firstItemKey);
		this.loadComments(firstItemKey);

		$("#" + firstItemKey).addClass(this.config.activeClass);

	},

	/**
	 * Load an item
	 *
	 * @param node
	 * @param addHistory
	 * @param forceLoad
	 */
	loadItem: function(node, addHistory, forceLoad) {

		if (typeof forceLoad === "undefined") {
			forceLoad = false;
		}

		if (typeof node === "string") {
			node = $("#" + node);
		} else {
			node = $(node);
		}

		var itemKey = node.data("item-key");
		var newIndex = node.data("item-index") * 1;
		var oldIndex = this.findItemIndex(this.currentItemKey);

		//don't do anything if we're clicking on the same item
		if (!forceLoad && (itemKey === this.currentItemKey || newIndex === oldIndex)) {
			return;
		}

		//move the scrollbar area to show viewing item
		this.nudgeScrollContent((newIndex + 1) * this.config.thumbnailHeight, oldIndex, newIndex, this.config.thumbnailHeight);

		//unhighlight current active item
		var currentActiveNode = $("#" + this.currentItemKey);
		currentActiveNode.removeClass(this.config.activeClass);

		//highlight new active item
		node.addClass(this.config.activeClass);
		this.currentItemKey = itemKey;

		//ensure thumbnails are being loaded
		this.loadFilmStripThumbnails();

		//load cached meta data
		if (this.filmStripCache[itemKey]) {
			this.metaDataContainer.html(this.filmStripCache[itemKey]);
			this.loadComments(itemKey);

			//preload two next/previous images
			if (this.config.galleryType === "images") {
				this.preloadImages(this.getPreloadIndices(newIndex, (oldIndex < newIndex)), "large");
			}
		} else {
			//hide image or video so we can see loader
			if (this.config.galleryType === "images") {
				this.imageAjaxTarget.hide();
			} else {
				//unload swf
				var videoObj = swfobject.getObjectById("flash-video");

				if (videoObj) {
					swfobject.removeSWF("flash-video");
					var newDiv = document.createElement("div");
					newDiv.id = "flash-video";
					this.flashContainer.html(newDiv);
				}
			}

			if (this.metaDataTimeout !== null) {
				clearTimeout(this.metaDataTimeout);
			}

			this.metaDataTimeout = setTimeout($.proxy(
				function() {
					//fetch data
					$.ajax({
						type: "GET",
						url: Core.baseUrl + "/" + this.config.metaDataAjaxUrl,
						data: ({
							id: itemKey,
							dataKey: this.config.dataKey
						}),
						dataType: "html",
						success: $.proxy(function(msg) {
							//set meta data and cache
							this.metaDataContainer.html(msg);
							this.filmStripCache[itemKey] = msg;
							this.loadComments(itemKey);

							//preload two next/previous images
							if (this.config.galleryType === "images") {
								this.preloadImages(this.getPreloadIndices(newIndex, (oldIndex < newIndex)), "large");
							}
						}, this),
						error: $.proxy(function(msg) {

						}, this)
					});
				}, this)
			, 200);
		}

		if (node.data("gallery-type") === "images") {
			this._loadImage(node);
		} else {
			this._loadVideo(node);
		}

		//change url
		if (addHistory && this.historyEnabled) {
			if (this.config.keywords === "") {
				window.history.pushState({ itemKey: itemKey }, itemKey, "?view=" + itemKey);
			} else {
				window.history.pushState({ itemKey: itemKey }, itemKey, "?view=" + itemKey + "&keywords=" + this.config.keywords);
			}
		}
	},

	/**
	 * Loads an image (called from loadItem)
	 *
	 * @param node
	 */
	_loadImage: function(node) {

		var itemKey = node.data("item-key");
		var itemIndex = node.data("item-index") * 1;

		//add image
		var newImg = new Image();
		newImg.src = this.config.itemPaths[itemIndex] + "-large.jpg";

		if (newImg.complete) {
			this.imageAjaxTarget
				.attr("src", newImg.src)
				.fadeIn("fast");
		} else {
			this.imageAjaxTarget.fadeOut("fast");
			this.imageLoader(newImg, node);
		}
	},

	/**
	 * Loads a video
	 */
	_loadVideo: function(node) {

		var itemKey = node.data("item-key");
		var itemIndex = node.data("item-index") * 1;

		var currentVideoData = this.config.videoData[itemIndex];

		var newFlashVars = $.extend({
			flvPath:           Flash.videoBase + currentVideoData.flv,
			flvWidth:          currentVideoData.w,
			flvHeight:         currentVideoData.h,
			captionsPath:      "",
			captionsDefaultOn: (Core.locale !== "en-us" && Core.locale !== "en-gb")
		}, Flash.defaultVideoFlashVars);

		//add captions
		if (typeof currentVideoData.captionsPath !== "undefined" && currentVideoData.captionsPath !== "") {
			newFlashVars.captionsPath = currentVideoData.captionsPath;
		} else {
			delete newFlashVars.captionsPath;
		}

		//change rating if needed
		if (typeof currentVideoData.customRating !== "undefined" && currentVideoData.customRating !== "") {
			if (currentVideoData.customRating === "NONE") {
				delete newFlashVars.ratingPath;
			} else {
				newFlashVars.ratingPath = currentVideoData.customRating;
			}
		} else {
			newFlashVars.ratingPath = Flash.ratingImage;
		}

		//generate no cache string
		var noCache = new Date();
		noCache = "?nocache=" + noCache.getTime();

		swfobject.embedSWF(Flash.videoPlayer + noCache, "flash-video", currentVideoData.w, currentVideoData.h, Flash.requiredVersion, Flash.expressInstall, newFlashVars, Flash.defaultVideoParams, {}, GalleryViewer.flashEmbedCallback);
	},

	/**
	 * Sets the active image
	 *
	 * @param itemKey
	 */
	showActiveItem: function(itemKey) {

		if (this.config.galleryType === "images") {
			this.imageAjaxTarget.fadeIn(100);
		} else {
			//TODO: Videos
		}

		var activeThumb = $("#" + itemKey);

		if (activeThumb.length) {
			$(activeThumb).addClass(this.config.activeClass);
			return true;
		}

		return false;
	},

	/**
	 * Loads an image and once its loaded, set as the current image
	 *
	 * @param loadingImage
	 * @param node
	 */
	imageLoader: function(loadingImage, node) {

		clearTimeout(this.imageTimeout);

		if (loadingImage.complete) {
			this.imageAjaxTarget
				.attr("src", loadingImage.src)
				.fadeIn("fast");
		} else {
			this.imageTimeout = setTimeout(
				$.proxy(function() {
					this.imageLoader(loadingImage, node)
				}, this),
				300);
		}
	},

	/**
	 * Set the background image of an element
	 *
	 * @param backgroundImage
	 * @param target
	 */
	setImageBackground: function(backgroundImage, target) {

		if (backgroundImage.complete) {
			target.css("background-image", "url(' " + backgroundImage.src + "')").removeClass("thumbnail-loader");

			if (Core.isIE(6)) {
				target.hide().show();
			}
		} else {
			setTimeout($.proxy(
				function() {
					this.setImageBackground(backgroundImage, target)
				}, this),
			100);
		}
	},

	/**
	 * Move the content area
	 */
	nudgeScrollContent: function(margin, oldIndex, newIndex, imageSize) {

		var scrollPaneHeight = 615;
		var currentOffset = this.getScrollOffset();

		//ensure scrollbar is bound
		this.bindScrollbar();

		//thumb is cut off at top
		var topLimit = newIndex * imageSize;
		if (currentOffset > topLimit) {
			this.oScrollbar.tinyscrollbar_update(topLimit);
		}

		//thumb is cut off at bottom
		if (newIndex > 6) {
			var bottomLimit = (newIndex - 6) * imageSize;
			if (currentOffset < bottomLimit) {
				this.oScrollbar.tinyscrollbar_update(bottomLimit);
			}
		}
	},

	/**
	 * Bind history for ajax calls
	 */
	bindFilmStripHistory: function() {
		if (this.historyEnabled) {
			window.onpopstate = $.proxy(
				function(event) {
					if (window.history.state) {
						if (this.suppressAjaxLoad) {
							this.suppressAjaxLoad = false;
						} else {
							var historyData = window.history.state;
							this.loadItem($("#" + historyData.itemKey), false);
						}
					}
				},
				this);
		}
	},

	/**
	 * Redirect images using the old hash url for backwards compat
	 */
	hashRedirect: function(itemKey) {

		if (location.hash && location.hash !== "") {
			var hashData = this.getHashInfo();

			var itemIndex = this.findItemIndex(hashData[1]);
			var itemKey = this.config.indices[itemIndex];

			if (itemKey !== -1) {
				var itemNode = $("#" + itemKey);

				if (itemNode.length) {

					if (this.historyEnabled) {
						window.history.replaceState({ itemKey: itemKey }, itemKey, "?view=" + itemKey);
					}

					this.loadItem(itemNode, false);

					return true;
				}
			}

			return false;

		} else {
			return false;
		}
	},

	/**
	 * Get data from the hash
	 */
	getHashInfo: function() {
		if (location.hash) {
			return(/#\/([^&]*)(?:&commentsPage=(.*))?/.exec(location.hash));
		} else {
			return [-1, -1];
		}
		return [-1, -1];
	},


	/**
	 * Load thumbnails
	 */
	loadFilmStripThumbnails: function() {

		if (this.slideTimeout !== null) {
			clearTimeout(this.slideTimeout);
		}

		var offsetTop = this.getScrollOffset();

		this.slideTimeout = setTimeout(
			$.proxy(function() {

				if (!this.initialized) {
					this.init();
				}

				var thumbnailBounds = this.getViewableRange(offsetTop);
				var minThumbnailIndex = thumbnailBounds[0];
				var maxThumbnailIndex = thumbnailBounds[1];

				for (var x = minThumbnailIndex; x <= maxThumbnailIndex; x++) {
					if (this.thumbnailLinkNodes[x].hasClass("thumbnail-loader")) {
						var bg = this.thumbnailImageNodes[x].attr("data-thumbsrc");

						var backgroundImage = new Image();
						backgroundImage.src = bg;

						this.setImageBackground(backgroundImage, this.thumbnailLinkNodes[x]);
					}
				}
			}, this),
		100);
	},

	/**
	 * Determine the viewable range
	 */
	getViewableRange: function(offsetTop) {
		if (!offsetTop) {
			var offsetTop = this.getScrollOffset();
		}

		var minThumbnailIndex = Math.floor(offsetTop / this.config.thumbnailHeight);
		var maxThumbnailIndex = Math.ceil((offsetTop + this.config.thumbnailHolderHeight) / this.config.thumbnailHeight) - 1;

		//make sure index doesn't go above max range
		if (maxThumbnailIndex >= indices.length) {
			maxThumbnailIndex = this.config.indices.length - 1;
		}

		return [minThumbnailIndex, maxThumbnailIndex];
	},

	/**
	 * Preload images
	 *
	 * @param int[] itemIndices
	 * @param string suffix
	 */
	preloadImages: function(itemIndices, suffix) {

		//delay preloading of images incase of fast paging
		if (this.imagePreloadTimeout !== null) {
			clearTimeout(this.imagePreloadTimeout);
		}

		this.imagePreloadTimeout = setTimeout($.proxy(
			function() {
				var index = itemIndices.length - 1;

				if (index >= 0) {
					do {
						var imagePreload = new Image();
						imagePreload.src = this.config.itemPaths[itemIndices[index]] + "-" + suffix + ".jpg";
						this.preloadContainer.append(imagePreload);

						//preload next thumbnail as well
						if (suffix === "large") {
							var smallImagePreload = new Image();
							smallImagePreload.src = this.config.itemPaths[itemIndices[index]] + "-small.jpg";

							this.setImageBackground(smallImagePreload, this.thumbnailLinkNodes[itemIndices[index]]);

						}
					}
					while (index--);
				}
			}, this)
		, 400);

		this.preloadMetaData(itemIndices);
	},
	/**
	 * Preload the item's meta data
	 *
	 * @param int[] itemIndices
	 */
	preloadMetaData: function(metaDataIndex) {

		var itemKey = indices[metaDataIndex];

			if (!this.filmStripCache[itemKey]) {
				$.ajax({
					type: "GET",
					url: Core.baseUrl + "/" + this.config.metaDataAjaxUrl,
					data: ({
						id: itemKey,
						dataKey: this.config.dataKey,
						preload: "preload"
					}),
					dataType: "html",
					success: $.proxy(function(msg) {
						this.filmStripCache[itemKey] = msg;
					}, this)
				});
			}

	},

	/**
	 * Get the indices of the items we're preloading
	 *
	 * @param currentIndex
	 * @param movingForward
	 */
	getPreloadIndices: function(currentIndex, movingForward) {
		var preloadIndex = 0;
		var nextPreloadIndex = 0;

		if (movingForward) {
			preloadIndex = this.getNextIndex(currentIndex);
			nextPreloadIndex = this.getNextIndex(preloadIndex);
		} else {
			preloadIndex = this.getPreviousIndex(currentIndex);
			nextPreloadIndex = this.getPreviousIndex(preloadIndex);
		}

		return [preloadIndex, nextPreloadIndex];
	},

	/*
	 * Get next item based on item type
	 */
	getNextItem: function(id) {
		if (id && id !== "") {
			this.loadItem(id);
		} else {
			if (this.currentItemKey === "") {
				this.currentItemKey = this.config.indices[0];
			}

			this.loadItem(this.getNextId(this.findItemIndex(this.currentItemKey)), this);
		}
	},
	/*
	 * Get previous item based on item type
	 */
	getPreviousItem: function(id) {
		if (this.currentItemKey === "") {
			this.currentItemKey = this.config.indices[0];
		}

		this.loadItem(this.getPreviousId(this.findItemIndex(this.currentItemKey)), this);
	},
	getNextId: function(index) {
		return this.config.indices[this.getNextIndex(index)];
	},
	getPreviousId: function(index) {
		return this.config.indices[this.getPreviousIndex(index)];
	},
	getNextIndex: function(index) {
		return ((index + 1 === this.config.indices.length) ? 0 : index + 1);
	},
	getPreviousIndex: function(index) {
		return ((index > 0) ? index - 1 : this.config.indices.length - 1);
	},

	/**
	 * Thumbnail page
	 */
	getNextPage: function() {

		var page = this.currentThumbnailPage;

		if (page + 1 > this.config.numThumbnailPages) {
			this.loadPage(1, true);
		} else {
			this.loadPage(page + 1, true);
		}

	},
	getPreviousPage: function() {

		var page = this.currentThumbnailPage;

		if (page > 1) {
			this.loadPage(page - 1, true);
		} else {
			this.loadPage(this.config.numThumbnailPages, true);
		}
	},
	/**
	 * Loads a thumbnail page
	 *
	 * @param page
	 * @param addHistory
	 */
	loadPage: function(page, addHistory) {

		if (!this.config.dataKey) {
			return;
		}

		this.thumbnailPageNode = $(this.config.pagingNode);

		this.currentThumbnailPage = page;

		//update page display
		this.currentPageDisplay.text(page);

		if (this.thumbnailPageCache[page]) {
			this.thumbnailPageNode.html(this.thumbnailPageCache[page]);
		} else {
			//get data
			$.ajax({
				type: "GET",
				url: Core.baseUrl + "/media/thumbnail-page",
				data: ({
					page: page,
					dataKey: dataKey,
					keywords: keywordParameter
				}),
				dataType: "html",
				success: $.proxy(function(msg) {
					this.thumbnailPageNode.html(msg);
					this.handleLoadPage(page);

					if (addHistory && this.historyEnabled) {
						if (this.config.keywords === "") {
							window.history.pushState({ pageNum: page }, page, "?page=" + page);
						} else {
							window.history.pushState({ pageNum: page }, page, "?page=" + page + "&keywords=" + this.config.keywords);
						}
					}

				}, this),
				error: $.proxy(function(msg) {

				}, this)
			});
		}
	},
	handleLoadPage: function(page) {

		if (!this.thumbnailPageNode) {
			this.thumbnailPageNode = $(this.config.pagingNode);
		}

		this.remainingImagesToLoad = $(".index-thumb", this.thumbnailPageNode).length;

		$(".thumbnail-loader", this.thumbnailPageNode).each($.proxy(function(i, node) {
			var thumbNode = node;
			var imgSrc = $(".thumb-frame", thumbNode).attr("data-thumbsrc");

			//load images
			var tempImage = new Image();
			tempImage.src = imgSrc;
			setTimeout($.proxy(function() {
				this.loadThumbnailPageFrame(tempImage, imgSrc, $(thumbNode), page || 1);
			}, this), 100);
		}, this));
	},
	loadThumbnailPageFrame: function(image, src, target, page) {
		if (image.complete) {

			this.setImageBackground(image, target);
			this.remainingImagesToLoad--;

			if (this.remainingImagesToLoad === 0 && this.currentThumbnailPage === page) {
				this.thumbnailPageCache[page] = this.thumbnailPageNode.html();
			}
		} else {
			setTimeout($.proxy(function() {
				this.loadThumbnailPageFrame(image, src, target, page)
			}, this), 100);
		}
	},

	/**
	 * Load comments for an item
	 *
	 * @param itemKey
	 */
	loadComments: function(itemKey) {

		if (!itemKey) {
			itemKey = (this.currentItemKey !== "" ) ? this.currentItemKey : this.config.indices[0];
		}

		var nodeIndex = this.findItemIndex(itemKey);
		var commentSig = discussionSigs[nodeIndex];
		var commentKey = discussionKeys[nodeIndex];

		//generate no cache string if needed
		var noCache = (Core.isIE()) ? new Date().getTime() : "";

		//check for keywords
		var keywordData = $("#keyword-list").data("keywords");
		if (keywordData) {
			this.keywords = keywordData;
		}

		var keywordsData = (this.keywords !== "") ? this.keywords.substring(0, this.keywords.length - 1) : "";

		Comments.initialize(commentKey, commentSig, 1);
	},

	/**
	 * Bind scrollbar for use with tiny scrollbar
	 */
	bindScrollbar: function() {

		if (this.scrollbarBound) {
			return;
		}

		if (this.config.indices.length > 7) {
			this.oScrollbar = $('#film-strip');
			this.oScrollbar.tinyscrollbar( {
				scrollbarSelector: '.viewport-scrollbar',
				viewportSelector:  '.viewport-content',
				overviewSelector:  "#film-strip-thumbnails",

				slideCallback:  $.proxy(function () {
					this.loadFilmStripThumbnails(this.getScrollOffset())
				}, this)
			});
		}

		this.scrollbarBound = true;
	},

	/**
	 * Get the current scrollbar offset
	 */
	getScrollOffset: function() {
		return Math.abs(parseInt(this.filmStripThumbnails.css("top")));
	},
	prepareKeywords: function(triggerNode) {
		//set call back for this dropdown
		Toggle.callback = $.proxy(this.cancelFilter, this);

		if (this.keywords === "") {
			var keywordData = $("#keyword-list").data("keywords");
			if (keywordData) {
				this.keywords = keywordData;
			}
		}

		//assign temporary keywords
		this.tempKeywords = this.keywords;

		//trigger the open
		Toggle.open(triggerNode, "opened", "#filter-options");
	},
	buildKeywords: function(node) {

		var keyword = $(node).data("keyword");

		if (this.tempKeywords.indexOf(keyword + ",") === -1) {
			this.tempKeywords += keyword + ",";
			node.className = "keyword-filter checked";
		} else {
			this.tempKeywords = this.tempKeywords.replace(keyword + ",", "");
			node.className = "keyword-filter";
		}
	},
	/*
	 * Join keyworks and refresh page with new urls
	 */
	applyKeywordFilter: function(onFilmStripView) {
		this.keywords = this.tempKeywords;

		var urlPrepend = "?";

		if (typeof onFilmStripView === "boolean" && onFilmStripView) {
			urlPrepend = "?view=" + this.currentItemKey + "&";
		}

		if (this.keywords !== "") {
			location.href = urlPrepend + "keywords=" + this.keywords.substring(0, this.keywords.length - 1);
		} else {
			location.href = location.pathname + (urlPrepend === "?" ? "" : urlPrepend);
		}
	},
	/*
	 * Cancels the selected filters and resets back
	 */
	cancelFilter: function() {

		//close element
		document.getElementById("filter-options").style.display = "none";

		$("#filter-options .keyword-filter").each($.proxy(function(index, node){

			var id = node.id.split("keyword-", 2)[1];

			if (this.keywords.indexOf(id) === -1) {
				node.className = "keyword-filter";
			} else {
				node.className = "keyword-filter checked";
			}
		}, this))
	},

	/**
	 * Binds the history for thumbnail paging
	 */
	bindThumbnailHistory: function() {
		if (this.historyEnabled) {
			window.onpopstate = $.proxy(
				function(event) {
					if (window.history.state) {
						if (this.suppressAjaxLoad) {
							this.suppressAjaxLoad = false;
						} else {
							var historyData = window.history.state;
							this.loadPage(historyData.pageNum, false);
						}
					}
				},
				this);
		}
	},

	bindKeyboardPaging: function() {

		//allow paging with arrow keys
		$(document).keydown($.proxy(function (currentEvent) {

			var keyNum = (window.event) ? currentEvent.keyCode : currentEvent.which;

			var currentTarget = currentEvent.target;

			if (!($(currentTarget).is("textarea") || $(currentTarget).is("input[type='text']"))) {
				if (keyNum == 37) {
					if (this.config.filmStripView) {
						this.getPreviousItem();
					} else {
						this.getPreviousPage();
					}
				} else if (keyNum == 39) {
					if (this.config.filmStripView) {
						this.getNextItem();
					} else {
						this.getNextPage();
					}
				}
			}

		}, this));

	}

};