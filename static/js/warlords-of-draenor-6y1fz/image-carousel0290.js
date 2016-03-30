// Config options:
//  - "showIndicators": Controls display of indicator elements below the main
//    carousel. (true)
//  - "showPagination": Show current position using pagination-style 'X of Y'
//    formatting. (false)
//  - "showLightboxControls": Controls whether or not previous/next buttons
//    will appear in the lightbox. (false)

var ImageCarousel = {
  /* 'defaults' is defined in the super, not the instance. */
  defaults: {
    showIndicators: true,
    showPagination: false,
    showLightboxControls: false
  },
  build: function(element, config){
    var instance = Object.create(ImageCarousel);
    instance.init(element, config);
    return instance;
  },

  init: function(element, config){
    this.element = null;
    this.ui = {};
    this.items = [];
    this.indicators = [];
    this.currentIndex = null;

    this.element = $(element);
    this.config = {};
    // NOTE: this.defaults is defined in the prototype while
    //       this.config is instance-specific.
    $.extend(this.config, this.defaults, config);

    // identify UI elements
    this.ui.prevButton = this.element.find(".prev-button");
    this.ui.nextButton = this.element.find(".next-button");
    this.ui.zoomButton = this.element.find(".zoom-button");
    this.ui.indicators = this.element.find(".indicators");
    this.ui.pagination = this.element.find(".pagination");
    this.ui.lastItem = this.element.find(".pagination .last");
    this.ui.currentItem = this.element.find(".pagination .current");

    // traverse the dom and find the items
    this.loadItems();

    // bind events to make ui functional
    this.initEvents();

    this.hideUnused();
  },

  hideUnused: function(){

    var showHide = function(el, visible){
      if(visible){
        el.removeClass("hidden");
      }else{
        el.addClass("hidden");
      }
    }

    showHide(this.ui.indicators, this.config.showIndicators);
    showHide(this.ui.pagination, this.config.showPagination);
  },

  initEvents: function(){
    var _this = this;

    this.ui.prevButton.bind("click.carousel", function(){
      _this.prev();
    });

    this.ui.nextButton.bind("click.carousel", function(){
      _this.next();
    });

    this.ui.zoomButton.bind("click.carousel", function(){
      _this.zoom();
    });

    this.ui.indicators.find(".indicator").bind("click.carousel",function(event){
      var item = (event.target.className.indexOf('indicator') !== -1) ? event.target : event.target.parentNode;
      _this.showItem($(item).data("index"));
    });
  },

  loadItems: function(){
    var items = this.element.find(".carousel-item");

    // Build local array of images
    for (var i = 0; i < items.length; i++){
      this.createItem(items[i]);
      this.createItemIndicator(i);
    }

    // Build indicators
    for(i = 0; i < this.indicators.length; i++){
      this.ui.indicators.append(this.indicators[i].element);
    }

    // Set current to first item in array
    this.showItem(0);

    // Update pagination
    this.ui.lastItem.html(items.length);
  },

  createItem: function(element){
    this.items.push({
      element: $(element),
      thumb: $(element).attr("src"),
      src: $(element).data("full"),
      title: $(element).data("title")
    });
  },

  createItemIndicator: function(index){
    var element = $('<span />').addClass('indicator thin-frame pos-' + index).attr("data-index",index);
    element.append($('<span />').addClass('sides'));
    element.append($('<span />').addClass('bottom'));
    element.append($('<span />').addClass('top'));

    this.indicators.push({
      element: element
    });
  },

  next: function(){
    var showIndex = (this.currentIndex+1 <= this.items.length-1) ? this.currentIndex+1 : 0;
    this.showItem(showIndex);
  },

  prev: function(){
    var showIndex = (this.currentIndex-1 >= 0) ? this.currentIndex-1 : this.items.length-1;
    this.showItem(showIndex);
  },

  zoom: function(){
    if(this.config.showLightboxControls) {
      // Carousel lightbox
      Lightbox.storeContentData(this.items, "image");
      Lightbox.loadImage(this.currentIndex,true);
    } else {
      // Single image lightbox
      Lightbox.storeContentData([this.items[this.currentIndex]], "image");
      Lightbox.loadImage(0,true);
    }
  },

  showDefered: function() {
    var current = $(this.items[this.currentIndex].element);
    if (current.data('defer-src')) {
      current.attr('src', current.data('defer-src'));
      current.removeAttr('data-defer-src');
    }
  },

  showItem: function(itemIndex){
    if(this.currentIndex != null){
      this.items[this.currentIndex].element.removeClass("active");
      this.indicators[this.currentIndex].element.removeClass("active");
    }

    // set new current
    this.currentIndex = itemIndex;

    this.showDefered();
    this.items[this.currentIndex].element.addClass("active");
    this.indicators[this.currentIndex].element.addClass("active");
    this.ui.currentItem.html(itemIndex+1);
  }
};