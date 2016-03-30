$(function(){
  var AudioPlayer = {
    trackObj: {
      track: "",
      player: null
    },

    supportsAudio: function () {
      return (function(){
        var audio = document.createElement('audio');
        return !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/,''));
      })();
    },

    isPlaying: function() {
      return this.trackObj.player.playState;
    },

    updateTrackObj: function(element) {
      if (this.trackObj.track == $(element).data('track-id') ) {
        return this.trackObj;
      }

      this.trackObj = {
        el:     element,
        track:  $(element).data('track-id'),
        player: soundManager.createSound({
          url:  $(element).data('url')
        })
      };
    },

    playTrack: function(element) {
      if(this.supportsAudio()) {
        this.stopTrack();
        this.updateTrackObj(element);
        this.stopOnFinish();
        this.stopOnTimeout();

        this.trackObj.player.play();
        this.setButtonIcon('play');
      } else {
        window.location.href = $(element).data('url');
      }
    },

    stopTrack: function() {
      if (this.trackObj.player != null) {
        this.trackObj.player.stop();
        this.setButtonIcon('stop');
      }
    },

    setButtonIcon: function(state) {
      if (state == "play") {
        $(this.trackObj.el).removeClass("play-button");
        $(this.trackObj.el).addClass("stop-button");
      } else {
        $(this.trackObj.el).removeClass("stop-button");
        $(this.trackObj.el).addClass("play-button");
      }
    },

    stopOnFinish: function() {
      var self = this;
      this.trackObj.player.options.onfinish = function() {
        self.stopTrack();
      };
    },

    stopOnTimeout: function() {
      var self = this;
      this.trackObj.player.options.ontimeout = function() {
        self.stopTrack();
      };
    }
  };

  soundManager.setup({
    preferFlash: false,
    ontimeout: function() {}
  });

  var mediaSound = Object.create(AudioPlayer);

  $('.sound-media .controls').bind('click', function(event){
    if ($(event.target).hasClass('play-button')) {
      AudioPlayer.playTrack(event.target);
    } else {
      AudioPlayer.stopTrack(event.target);
    }
  });
});
