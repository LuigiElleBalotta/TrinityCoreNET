var Quest = {

  heroes: [],

  init: function initFn(heroes) {
    Quest.heroes = heroes;

    this.portraits = $('#questing .portrait');
    this.heroInfo= $('#heroinfo');

    this.bindEvents();
  },

  bindEvents: function bindEventsFn() {
    var main = this;

    this.portraits.bind('click', function(event){
      var hero = $(this).data('hero');
      var target = main.heroInfo.find('*[data-hero="' + hero +'"]');

      Lightbox.loadContent(Quest.heroes,false,hero,false);

      Core.trackEvent("WoWX","Hero_Click-Throughs",hero+" – "+Core.region);

    });
  }
}
