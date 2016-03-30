$(function(){

  // Define youtube videos
  var youtubeData = {
    left: {
      'de-de': 'ydd0mC1jWw4',
      'en-gb': '0KeeGtO_YwM',
      'en-us': 'TLzhlsEFcVQ',
      'es-es': '5xEPSKsqpes',
      'es-mx': 'ywjzRbvbxbc',
      'fr-fr': 'AyYCMxF4pmk',
      'it-it': 'L3lxbvAjfTM',
      'ko-kr': 'MnQ69DvgxaY',
      'pl-pl': '0KeeGtO_YwM',
      'pt-br': 'iCkOpOJWweY',
      'pt-pt': 'iCkOpOJWweY',
      'ru-ru': 'o_accAVzhoE',
      'zh-cn': 'TLzhlsEFcVQ',
      'zh-tw': 'g31Nyvg6TdU'
    },
    right: {
      'de-de': 'WMn-QalU2sU?list=PLlHsqg0MXgJ-zNr08yAvfvPycLbK4og-5',
      'en-gb': 'TAfbM4J5dM0?list=PLY0KbDiiFYePAe0Wbb2B28SRBB042Zfoj',
      'en-us': 'LG3RVCEwCPg?list=PLY0KbDiiFYeP8hkPrVS3y0Ua45EJlWRBw',
      'es-es': '6aWeUaFGAh0?list=PLxRkXtc0P-6JVx7GMzDvkRfVYbq3mvizJ',
      'es-mx': 'svBu-OdKUyE?list=PLD1OzE4FLO-9hwSr1I_8qNc77391Wk1_4',
      'fr-fr': 'U9PiabKje7c?list=PL_FpZbpy2DgNaqwNOqJzUNC95TH5aE4ad',
      'it-it': '2Io65BRwIRI?list=PLY0KbDiiFYeP9hBh378Kb37BxRrd9Urpo',
      'ko-kr': '-lurey0nMqg?list=PLGUh4aFN2oKXTV82xDfx6-8kGMZjX1cyy',
      'pl-pl': 'TAfbM4J5dM0?list=PLY0KbDiiFYePAe0Wbb2B28SRBB042Zfoj',
      'pt-br': 'X6U4DMTAWmU?list=PL0Vrll8QqveG-Bu3lIqLQzcBT-ziNpxr2',
      'pt-pt': 'X6U4DMTAWmU?list=PL0Vrll8QqveG-Bu3lIqLQzcBT-ziNpxr2',
      'ru-ru': 'BVZ7l3w29V8?list=PLwO41LW1utyJksHCx_SD2AAIGwlB3YqNT',
      'zh-cn': 'LG3RVCEwCPg?list=PLY0KbDiiFYeP8hkPrVS3y0Ua45EJlWRBw',
      'zh-tw': 'omU-9pk12cU?list=PL0gyLBsW5p88fXKTGwmOcUWqLHxhTcVZO'
    }
  };

  var neteaseData = {
    left: {
      coverpic: "http://vimg3.ws.126.net/image/snapshot/2014/8/R/N/VA2NKH9RN.jpg",
      vid: "VA2NKH9RM"
    },
    right: {
      coverpic: "http://vimg1.ws.126.net/image/snapshot/2014/8/V/2/VA2NJIPV2.jpg",
      vid: "VA2NJIPV1"
    }
  }

  var loadYT = function(data) {
    Lightbox.loadEmbed( [{
      type: "youtube",
      src: data[Core.locale],
      height: 520,
      width: 924
    }]);
  }

  var loadNE = function(data) {
    Lightbox.loadEmbed( [{
      topicid: "0031",
      type: "netease",
      height: "520",
      width: "924",
      coverpic: data.coverpic,
      vid: data.vid,
      sid: "V5KBLH2CT",
    }]);
  }

  var loadLeft = function() {
    if (Core.region == "cn") {
      loadNE(neteaseData.left);
    } else {
      loadYT(youtubeData.left);
    }
  }

  var loadRight = function() {
    if (Core.region == "cn") {
      loadNE(neteaseData.right);
    } else {
      loadYT(youtubeData.right);
    }
  }

  // Play videos in lightbox on click
  var container = $(".section-home");
  $(".video-left .button-container", container).bind("click", function(event) {
    loadLeft();
  });

  $(".video-right .button-container", container).bind("click", function(event) {
    loadRight();
  });

	switch(getURLParameter("autoplay")){
		case "true":
			loadLeft();
			break;
		case "cinematic":
			loadLeft();
			break;
		case "lordsofwar":
			loadRight();
			break;
		default :
			break;
	};

  $videoThumbnails = $(".video-wrapper video");
  $videoThumbnails.each(function(){
    this.play();
  });

});

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
