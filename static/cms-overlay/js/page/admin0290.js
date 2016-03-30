/**
 * CMS Debug UI JavaScript.
 */
var cmsAdmin = {
	$admin: '#cms-page-admin',

	$button: '.button',

	$menu: '.menu',
	
	/**
	 * Name of the cookie storing discussion sort preference.
	 */
	toggleStateCookie: 'cms.admin.ui.open',

	initialize: function() {
		this.$admin = $(this.$admin);
		this.$button = $(this.$button, this.$admin);
		this.$menu = $(this.$menu, this.$admin);

		this.$button.on('click', this.toggleMenu);
		this.$menu.on('click', 'h1', this.toggleMenu);
	},

	toggleMenu: function() {
		if(cmsAdmin.$menu.is(':visible')) {
			cmsAdmin.$menu.hide();
			cmsAdmin.$button.show();
			cmsAdmin.saveMenuToggleState(false);
		} else {
			cmsAdmin.$menu.show();
			cmsAdmin.$button.hide();
			cmsAdmin.saveMenuToggleState(true);
		}
	},
	
	saveMenuToggleState: function(open) {
		Cookie.create(cmsAdmin.toggleStateCookie, open, {
			expires: 8760, // 1 year of hours
			path: '/'
		});
	},
	
	isMenuOpen: function() {
		return Cookie.read(cmsAdmin.toggleStateCookie);
	}

};
