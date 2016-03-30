/**
 * Map class to bind interaction events on zone map
 * @type {Object}
 */
var Map = {

	zones: [],

	init: function(zones){
		Map.zones = zones;
		Map.bindEvents();
	},

	bindEvents: function(){

		$("#draenor").delegate("area","click",function(e){
			Core.trackEvent("WoWX","Map_Click-Throughs",this.id+" – "+Core.region);

			Lightbox.loadContent(Map.zones,false,this.id,false);

			e.preventDefault();
		});

		$("#draenor").delegate("area","mouseover",function(){
			$(".zone."+this.id).show();
		});

		$("#draenor").delegate("area","mouseout",function(){
			$(".zone."+this.id).hide();
		});
	}
}
