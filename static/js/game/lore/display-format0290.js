$(document).ready(function() {
	$(".group-display .icon").click(function() {
		if ($(this).hasClass("lore-list")) {
			if ($(".group-column").hasClass("expanded")) {
				$(".group-column").removeClass("expanded").addClass("compact");
				$(".lore-children").hide();		
				$(".lore-children-view").removeClass("show-children");
			}
		} else {
			$(".group-column").removeClass("compact").addClass("expanded");
			$(".lore-children").show();
		}
	});	
	
	$(".lore-children-view").click(function() {
		$(this).toggleClass("show-children").next(".lore-info").children(".lore-children").toggle();
	});

	$("#menu-tier-base-game-lore a").live('click',function() {
		typeURL = $(this).attr('href');
		typeID = typeURL.substring(typeURL.indexOf('#')+1,typeURL.length);
		node =  $('.navigation li a.lore-section-' + typeID);
		LoreWikiDirectory.view(node,typeID);
	});
});

