$(function(){
  // Cache the page
  var $page = $('html, body');

  // Set the speed of the assisted page scroll
  var pageScrollSpeed = 500;

  // Section Waypoints options
  var wpOpts = {};

// ----------------------------------------------------------------------------
// SETUP - NAVIGATION
// ----------------------------------------------------------------------------

  // Cache Navigation in jQuery objects
  var $navContainer = $('.navigation');
  var $mainNav = $('#main-nav');

  // All nav items
  var $navItems = $('.nav-item');
  // Specific nav item, e.g., navItem.$home
  var navItem = {
    "$home":   $navItems.filter('.home'),
    "$game":   $navItems.filter('.game'),
    "$news":   $navItems.filter('.news'),
    "$media":  $navItems.filter('.media'),
    "$forums": $navItems.filter('.forums'),
    "$social": $navItems.filter('.social')
  };

  // All nav links
  var $navLinks = $('> a', $navItems);
  // Specific nav link, e.g., navLink.$home
  var navLink = {
    "$home":     $('> a', navItem.$home),
    "$game":     $('> a', navItem.$game),
    "$news":     $('> a', navItem.$news),
    "$media":    $('> a', navItem.$media),
    "$forums":   $('> a', navItem.$forums),
    "$facebook": $('.facebook.nav-link'),
    "$twitter":  $('.twitter.nav-link'),
    "$tencent":  $('.tencent.nav-link'),
    "$sina":     $('.sina.nav-link'),
    "$control":  $('.nav-link.nav-control')
  };

  // All subnav items
  var $subnavItems = $('.subnav-item');
  // Speicic subnav item, e.g., subnavItem.$characters
  var subnavItem = {
    "$characters":  $subnavItems.filter('.characters'),
    "$questing":    $subnavItems.filter('.questing'),
    "$charUpgrade": $subnavItems.filter('.character-upgrade'),
    "$garrisons":   $subnavItems.filter('.garrisons'),
    "$world":       $subnavItems.filter('.world')
  };

  // All subnav links
  var $subnavLinks = $('> a', $subnavItems);
  // Specific subnav link, e.g., subnavLink.$characters
  var subnavLink = {
    "$characters":  $('> a', subnavItem.$characters),
    "$questing":    $('> a', subnavItem.$questing),
    "$charUpgrade": $('> a', subnavItem.$charUpgrade),
    "$garrisons":   $('> a', subnavItem.$garrisons),
    "$world":       $('> a', subnavItem.$world)
  };

// ----------------------------------------------------------------------------
// SETUP - PAGE CONTENT
// ----------------------------------------------------------------------------

  // Cache the main content container and subsections in jQuery objects
  var $mainContent = $('.main-content');

  // All sections
  var $sections = $('.section', $mainContent);
  // Specific section, e.g., section.$home
  var section = {
    "$home":        $('#home'),
    "$story":       $('#story'),
    "$characters":  $('#characters'),
    "$garrisons":   $('#garrisons'),
    "$charUpgrade": $('#character-upgrade'),
    "$questing":    $('#questing'),
    "$world":       $('#world'),
    "$news":        $('#news'),
    "$media":       $('#media'),
    "$outro":       $('#outro'),
  };

// ----------------------------------------------------------------------------
// SETUP - HELPER FUNCTIONS
// ----------------------------------------------------------------------------

  var pageScrollTo = function (target) {
    target = target > 0 ? target : target.offset().top;

    $page.animate({ 'scrollTop': target }, pageScrollSpeed);
  };

  navItem.updateActive = function (target, group) {
    $(group).removeClass('active');
    $(target).addClass('active');
  };

  // This prevents needless on/off flicker of the "game" group of sections
  // when the "game" nav item is already set to active
  navItem.confirmActive = function (target, group) {
    var $group  = group ? $(group) : $navItems;
    var $target = $(target);
    if (!$target.hasClass('active')) navItem.updateActive($target, $group)
  };

// ----------------------------------------------------------------------------
// SETUP - SECTION WAYPOINTS
// ----------------------------------------------------------------------------

  wpOpts.nav = {
    isSubnav:     false,
    isBottom:     false,
    checkNavItem: false,
    section:      section.$home,
    target:       navItem.$home,
    group:        $navItems
  };

  wpOpts.subnav = $.extend({}, wpOpts.nav, {
    isSubnav: true,
    group:    $subnavItems
  });

  wpOpts.gameSubnav = $.extend({}, wpOpts.subnav, {
    checkNavItem: navItem.$game
  });

  wpOpts.characters = $.extend({}, wpOpts.gameSubnav, {
    section: section.$characters,
    target:  subnavItem.$characters
  });

  wpOpts.garrisons = $.extend({}, wpOpts.gameSubnav, {
    section: section.$garrisons,
    target:  subnavItem.$garrisons
  });

  wpOpts.questing = $.extend({}, wpOpts.gameSubnav, {
    section: section.$questing,
    target:  subnavItem.$questing
  });

  wpOpts.charUpgrade = $.extend({}, wpOpts.gameSubnav, {
    section: section.$charUpgrade,
    target:  subnavItem.$charUpgrade
  });

  wpOpts.world = $.extend({}, wpOpts.gameSubnav, {
    section: section.$world,
    target:  subnavItem.$world,
    offset:  -section.$world.height() - 277
  });

  wpOpts.home = $.extend({}, wpOpts.nav, {
    section: section.$home,
    target:  navItem.$home
  });

  wpOpts.news = $.extend({}, wpOpts.nav, {
    section: section.$news,
    target:  navItem.$news
  });

  wpOpts.media = $.extend({}, wpOpts.nav, {
    section: section.$media,
    target:  navItem.$media
  });

  wpOpts.outro = $.extend({}, wpOpts.nav, {
    section: section.$outro,
    target: false
  });

  // Waypoint option automagic builder thing
  function WaypointOptions(options, overrides) {
    this.options = $.extend({}, options, overrides);

    return this.init();
  }

  WaypointOptions.prototype = {
    init: function () {
      var opts = this.options;
      var obj  = {};

      obj.handler = this.getHandler(opts);

      if (opts.isBottom) {
        obj.offset = this.getOffset(opts);
      }

      return obj;
    },
    getHandler: function (opts) {
      return (function () {
        if (opts.isSubnav && opts.checkNavItem) {
          navItem.confirmActive(opts.checkNavItem)
        }

        navItem.updateActive(opts.target, opts.group);
      });
    },
    getOffset: function (opts) {
      return opts.offset || -$(opts.section).height();
    }
  };

// ----------------------------------------------------------------------------
// SETUP - EVENT BINDINGS
// ----------------------------------------------------------------------------

  // CLICK EVENTS -------------------------------------------------------------
  navLink.$control.bind('click', function (event) {
    var $this = $(this);
    var destination = $this.attr('href');

    event.preventDefault();
    pageScrollTo($(destination));
  });

  // Facebook - Global
  navLink.$facebook.bind('click', function (event) {
    event.preventDefault();

    _gaq.push(['_trackEvent', 'WoWX - SNS', 'Liking - Facebook', Core.locale]);
    window.open(this.href, '', 'height=450, width=550').focus();
  });

  // Twitter - Global
  navLink.$twitter.bind('click', function (event) {
    event.preventDefault();

    _gaq.push(['_trackEvent', 'WoWX - SNS', 'Tweet - Twitter', Core.locale]);
    window.open(this.href, '', 'height=450, width=550').focus();
  });

  // Sina - CN
  navLink.$sina.bind('click', function(event){
    event.preventDefault();

    _gaq.push(['_trackEvent', 'WoWX - SNS', 'Weibo - Sina', Core.locale]);
    window.open(this.href,'','height=680,width=700').focus();
  });

  // Tencent - CN
  navLink.$tencent.bind('click', function(event){
    event.preventDefault();

    _gaq.push(['_trackEvent', 'WoWX - SNS', 'Weibo - Tencent', Core.locale]);
    window.open(this.href,'','height=523,width=607').focus();
  });

  // END CLICK EVENTS ---------------------------------------------------------

  // WAYPOINT BINDINGS --------------------------------------------------------
  section.$home.waypoint({
    handler: function (direction) {
      if (direction === 'down') {
        $navContainer.addClass('sticky');
      } else {
        $navContainer.removeClass('sticky');
        $navItems.removeClass('active');
        $subnavItems.removeClass('active');
      }
    },
    offset: function() {
      return -$(this).height();
    }
  });
  section.$home.waypoint(new WaypointOptions(wpOpts.home, {
    isBottom: true
  }));

  // Bind waypoint to the top & bottom of the characters container
  section.$characters.waypoint(new WaypointOptions(wpOpts.characters));
  section.$characters.waypoint(new WaypointOptions(wpOpts.characters, {
    isBottom: true
  }));

  // Bind waypoint to the top & bottom of the garrisons container
  section.$garrisons.waypoint(new WaypointOptions(wpOpts.garrisons));
  section.$garrisons.waypoint(new WaypointOptions(wpOpts.garrisons, {
    isBottom: true
  }));

  // Bind waypoint to the top & bottom of the character-upgrade container
  section.$charUpgrade.waypoint(new WaypointOptions(wpOpts.charUpgrade));
  section.$charUpgrade.waypoint(new WaypointOptions(wpOpts.charUpgrade, {
    isBottom: true
  }));

  // And so on...
  section.$questing.waypoint(new WaypointOptions(wpOpts.questing));
  section.$questing.waypoint(new WaypointOptions(wpOpts.questing, {
    isBottom: true
  }));

  // ...
  section.$world.waypoint(new WaypointOptions(wpOpts.world));
  section.$world.waypoint(new WaypointOptions(wpOpts.world, {
    isBottom: true
  }));

  // ...you get the idea
  section.$news.waypoint(new WaypointOptions(wpOpts.news));
  // Curveball -- Wait until the news section has loaded it's content,
  // THEN bind the waypoint to the bottom of the news container
  $(window).bind('newsContent.ready', function () {
    section.$news.waypoint(new WaypointOptions(wpOpts.news, {
      isBottom: true
    }));
  });

  // ...and we're back  ...zzz...
  section.$media.waypoint(new WaypointOptions(wpOpts.media));
  section.$media.waypoint(new WaypointOptions(wpOpts.media, {
    isBottom: true
  }));

  // Set the top of the "outro" container to trigger leaving the bottom of
  // the "Media" section
  section.$outro.waypoint(new WaypointOptions(wpOpts.outro));
  // END WAYPOINT BINDINGS ----------------------------------------------------
});
