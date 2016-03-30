
////////////////////////////////////////////////////////////////////////////////
/*!
 * Simple jQuery image carousel. Based on jQuery Boilerplate's prototypal
 * inheritance boilerplate.
 * Author: Simeon Vincent
 * Boilerplate: https://github.com/jquery-boilerplate/patterns/blob/master/patterns/jquery.prototypal-inheritance.plugin-boilerplate.js
 * Licensed under the MIT license
 */


/* Invoke by calling SimpleCarousel.initialize($jQueryObject); */
/* <div class="character-carousel" data-image-count="3"></div> */

/**
 * SimpleCorousel is a utility class that will crate and wire up the HTML for
 * a simple image carousel. Images that appear in this carousel must follow a
 * well known URL scheme where images are uniquely identified by an incrementing
 * integer (from 1..n).
 */

// myImageCarousel - base object for the simple image carousel plugin
var myImageCarousel = {
  /* Internal objects */
  _animating: false,
  _current: 1,
  _previous: 1,
  _fragments: {},
  _defaults: {
    imageCount: 1
  },

  /** Prepare the image carousel object */
  init: function(options, elem) {
    // Prepare internal objects for use
    this._preflight(options, elem);
    // Build the DOM's initial structure
    this._build();
    // Hook up events and callback handlers
    this._events();
    // Attach the temp objects to the
    this._attach();

    // return this so that we can chain and use the bridge with less code.
    return this;
  },

  /**  */
  _preflight: function(options, elem) {
    // Mix in the passed-in options with the default options
    this._userOptions = options;
    this.options = $.extend({}, this._defaults, this._userOptions);

    // Save the element reference as both as a jQuery and a normal reference
    this._el  = elem;
    this._$el = $(elem);
    this._setImageCountFromDom();
  },

  _build: function(){
    // Create DOM fragments that will hold our images and controls
    this._fragments['images']   = $('<div/>', { 'class': 'image-container' }),
    this._fragments['controls'] = $('<ol/>', { 'class': 'control-container' });
    var images   = this._fragments['images'],
        controls = this._fragments['controls'];

    /* PREPARE IMAGES FRAG */
    for (var i = 1; i <= this.options.imageCount; i++) {
      // This slightly abnormal loop syntax is due to 1-based image indices
      var img = $('<div/>').addClass('image-' + i);
      img.data("image-number", i);
      img.appendTo(images);

      if (i === 1) {
        img.addClass('show');
      }
    };
    /* END IMAGES */

    /* PREPARE CONTROLS FRAG */
    $('<li/>').addClass('prev').data('target', 'prev').appendTo(controls);

    for (var i = 1; i <= this.options.imageCount; i++) {
      // This slightly abnormal loop syntax is due to 1-based image indices
      var btn = $('<li/>').addClass("radio image-"+i);
      btn.data("target", i);
      btn.appendTo(controls);

      if (i === 1) {
        btn.addClass('current');
      }
    };

    $('<li/>').addClass('next').data('target', 'next').appendTo(controls);
    /* END CONTROLS */

    return this._fragments;
  },

  _events: function() {
    var self = this
        controls = this._fragments['controls'],
        prevButton = controls.children().first(),
        nextButton = controls.children().last(),
        bullets = controls.find('.radio');
    if (bullets.length < 2) { return; }

    /* Bind click on previous and next buttons. Invoke "public" functions using
     * fn.call() to bind the function with the correct carousel instance context
     */
    bullets.click(function(){
      self.go.call(self, $.data(this, 'target'));
    });
    prevButton.click(function() {
      self.prev.call(self);
    });
    nextButton.click(function() {
      self.next.call(self);
    });
  },

  _attach: function() {
    // Attach the fragments to the parent node.
    this._$el.append(this._fragments['images']);

    if (this._fragments['images'].children().length > 1) {
      // Only attach the controls if there's more than 1 image.
      this._$el.append(this._fragments['controls']);
    }

    return this._$el;
  },

  /* == Workers ============================================================= */
  /* They do they heavy lifting - */
  go: function(target) {
    if (target > this.options.imageCount) {
      target = 1;
    }
    if (target < 1) {
      target = this.options.imageCount;
    }

    // ----------------------------
    this._previous = this._current;
    this._current = target;

    // ----------------------------
    this.updateNav();
    this.updateImg();
  },

  next: function() {
    this.go(this._current + 1);
  },

  prev: function() {
    this.go(this._current - 1);
  },

  updateNav: function(index) {
    var prev   = this._previous - 1,
        cur    = this._current - 1,
        bullet = this._fragments['controls'].find('.radio');

    $(bullet[prev]).removeClass("current");
    $(bullet[cur]).addClass("current");
  },

  updateImg: function() {
    var prev = this._previous - 1,
        cur  = this._current - 1,
        imgs = this._fragments['images'].children();

    $(imgs[prev]).removeClass("show");
    $(imgs[cur]).addClass("show");
  },

  /* == Utility ============================================================= */
  /** Set the internal image count value. */
  _setImageCount : function(count) {
    this.options.imageCount = count;
  },
  /** Fetch the carousel image count using the user-specified DOM element */
  _setImageCountFromDom: function() {
    this._setImageCount(this._$el.data('image-count'));
  }
};

// Object.create support test, and fallback for browsers without it
if (typeof Object.create !== "function") {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// Create a plugin based on a defined object
$.plugin = function(name, object) {
  $.fn[name] = function(options) {
    return this.each(function() {
      if (! $.data(this, name)) {
        $.data(this, name, Object.create(object).init(
        options, this));
      }
    });
  };
};

// Usagekey: "value",
// With myObject, we could now essentially do this:
$.plugin('carousel', myImageCarousel);

// and at this point we could do the following
// $('#elem').myobj({name: "John"});
// var inst = $('#elem').data('myobj');
// inst.myMethod('I am a method');