var TalentCalculator = Class.extend({

	container: null,
	requiredLevel: null,
	resetButton: null,
	linkBuild: null,

	specsContainer: null,
	specsButtons: null,
	specs: null,

	spellsContainer: null,
	spellRows: null,

	petSpecsContainer: null,
	petSpecsButtons: null,
	petSpecs: null,

	petSpellsContainer: null,
	petSpellRows: null,

	talentsContainer: null,
	talentsTiers: null,
	talents: null,

	currentSpec: -1,
	currentTier: -1,
	currentLevel: 1,
	currentTalents: [],
	currentFilter: 'all',

	currentPetSpec: -1,
	currentPetTier: -1,
	currentPetLevel: 1,
	currentPetTalents: [],
	currentPetFilter: 'pet-spec',

	classId: 0,
	data: {},
	exportHash: '',
	glyphHash: '',
	glyphCalculator: null,

	MAX_TIERS: 7,
	MAX_LEVEL: 100,

	init: function(classId, data) {
		this.classId = classId;
		this.data = data;

		// DOM nodes
		this.container = $('#talent-calculator-' + classId);
		this.requiredLevel = this.container.find('.requiredlevel span.value');
		this.linkBuild = this.container.find('.link-build');

		this.resetButton = this.container.find('.reset button');
		this.resetButton.click( $.proxy(this.reset, this) );

		this.specsContainer = this.container.find('.spec-selector');
		this.specs = this.specsContainer.find('.spec');
		this.specsButtons = this.specsContainer.find('.cell');
		this.specs.click( $.proxy(this.specHandler, this) );

		this.spellsContainer = this.container.find('.spells');
		this.spellsContainer.find('.filters a').click( $.proxy(this.filterHandler, this) );
		this.spellRows = this.spellsContainer.find('tr');

		this.petSpecsContainer = this.container.find('.pet-specs');
		this.petSpecs = this.petSpecsContainer.find('.pet-spec');
		this.petSpecsButtons = this.petSpecsContainer.find('.pet-cell');
		this.petSpecsButtons.click( $.proxy(this.petSpecHandler, this) );

		this.petSpellsContainer = this.container.find('.pet-spells');
		this.petSpellsContainer.find('.pet-filters a').click( $.proxy(this.petFilterHandler, this) );
		this.petSpellRows = this.petSpellsContainer.find('tr');

		this.talentsContainer = this.container.find('.talents');
		this.talentsTiers = this.talentsContainer.find('.tier');
		this.talents = this.talentsContainer.find('.cell');
		this.talents.bind('click contextmenu', $.proxy(this.talentHandler, this) );

		this.container.find('.sharing a').click( $.proxy(this.shareHandler, this) );

		// Data
		for (var i = 0, l = this.MAX_TIERS, arr = []; i < l; i++) {
			arr[i] = null;
		}

		// Create a new GC for this instance
		this.glyphCalculator = new GlyphCalculator(classId, data, this);

		this.currentTalents = arr;

		this.chooseFirstSpec();
		this.swapPetSpecs();
		this.chooseFirstPetSpec();
		this.spellsContainer.find("a[data-type='spec']").click();

		this.importBuild();

		this.applyStyles();
	},

	/**
	 * Apply styles / classes on init
	 */
	applyStyles: function() {

	   $( this.specs ).filter(":first").addClass('first');
	   $( this.specs ).filter(":last").addClass('last');

	},

	/**
	 * Choose a specification and swap to the spells view.
	 *
	 * @param e
	 */
	specHandler: function(e) {
		e.preventDefault();
		e.stopPropagation();

		var node = $(e.currentTarget);

		this.chooseSpec( $(node).data('index') );

		this.update();
		return false;

	},

	petSpecHandler: function(e) {

		e.preventDefault();
		e.stopPropagation();

		var node = $(e.currentTarget);

		this.choosePetSpec( $(node).data('index') );
		this.update();
		return false;

	},

	/**
	 * Click handler for talents. If left click, confirm and go to the next.
	 * If right click, remove and go to the previous.
	 *
	 * @param e
	 */
	talentHandler: function(e) {
		e.preventDefault();
		e.stopPropagation();

		var node = $(e.currentTarget),
			index = node.data('index'),
			tier = node.data('tier');

		// If right click, remove
		if (e.which == 3) {
			this.removeTalent(tier, true);
		} else {
			this.chooseTalent(tier, index);
		}

		this.update();

		return false;
	},

	/**
	 * Handler to do with filter clicks.
	 *
	 * @param e
	 */
	filterHandler: function(e) {

		e.preventDefault();
		e.stopPropagation();

		var node = $(e.currentTarget),
			type = node.data('type');

		this.currentFilter = type;

		node.siblings().removeClass('filter-active');
		node.addClass('filter-active');
		this.filterSpells(type);
	},

	petFilterHandler: function(e) {

		e.preventDefault();
		e.stopPropagation();

		var node = $(e.currentTarget),
			type = node.data('type');

		this.currentPetFilter = type;

		node.siblings().removeClass('pet-filter-active');
		node.addClass('pet-filter-active');

		this.filterPetSpells(type);
	},

	/**
	 * Handles the logic for sharing of builds.
	 *
	 * @param e
	 */
	shareHandler: function(e) {
		e.preventDefault();
		e.stopPropagation();

		var node = $(e.currentTarget),
			rel = node.attr('rel'),
			href = node.data('url'),
			label = '';

		if (rel === 'facebook') {
			label = 'Facebook';
			window.open(href + '&u=' + encodeURIComponent(location.href), 'facebook', 'toolbar=0,status=0,width=630,height=440');

		} else if (rel === 'twitter') {
			label = 'Twitter';
			window.open(href + '&url=' + encodeURIComponent(location.href), 'twitter', 'toolbar=0,status=0,width=700,height=300');

		} else if (rel === 'me2day') {
			label = 'Me2Day (KR)';
			window.open(href + ' ' + encodeURIComponent(location.href), 'me2day');

		} else if (rel === 'weibo') {
			label = 'WeiBo';
			window.open(href + '&url=' + encodeURIComponent(location.href), 'weibo');

		} else if (rel == 'link') {
			label = '(Manual)';
			window.open(location.href);
		}

		try {
			_gaq.push(['_trackEvent', 'WoW:MoP Talent Calculator', 'Share', label + ' ' + this.exportHash]);
		} catch(e) { }

		return false;
	},

	/**
	 * Remove the talent from the selected tier.
	 *
	 * @param tier
	 */
	removeTalent: function(tier) {
		this.unlockTier(tier);

		this.currentTier = tier;
		this.currentTalents[tier] = null;

		this.swapPetSpecs();

	},

	/**
	 * Choose a talent and disable the tier and activate the next tier.
	 *
	 * @param tier
	 * @param index
	 */
	chooseTalent: function(tier, index) {
		this.lockTier(tier);

		this.currentTier = tier;
		this.currentTalents[tier] = index;
		this.talentsTiers.eq(tier).find('.cell[data-index="' + index + '"]')
			.removeClass('cell-disabled')
			.addClass('cell-selected');

		this.swapPetSpecs();

		},

	/**
	 * Choose a specification and swap to the spells view.
	 *
	 * @param index
	 */
	chooseSpec: function(index) {

		var node = this.specsButtons.eq(index);

		this.currentSpec = index;

		this.specsContainer.addClass('compact');

		this.specsButtons.removeClass('cell-selected').attr('rel', '');

		node.addClass('cell-selected');

		this.specs.removeClass('spec-selected');

		node.parent().parent().addClass('spec-selected');

		this.spellsContainer.find('.filters a[data-type="' + this.currentFilter + '"]').click();

		var classid = $(node).data('classid');
		$('#talent-calculator-' + classid + ' li.talent a').hide();
		$('#talent-calculator-' + classid + ' li.talent a[data-specid="0"]').show();
		var specid = $(node).data('specid');
		var talentSelector = "a[data-specid='" + specid + "']";
		var parent = $( talentSelector).parent();
		$( parent).find("a[data-specid='0']").hide();
		$('#talent-calculator-' + classid + ' li.talent ' + talentSelector).show();

		this.swapPetSpecs();

	},

	chooseFirstSpec: function()
	{

		var nodes = this.specsButtons;
		var index = $( nodes ).filter(':first').data('index');
		this.chooseSpec(index);

	},

	choosePetSpec: function(index) {

		var node = this.petSpecsButtons.eq(index);

		this.currentPetSpec = index;

		this.petSpecsButtons.removeClass('pet-cell-selected').attr('rel', '');
		node.addClass('pet-cell-selected');

		this.petSpecs.removeClass('pet-spec-selected');
		node.parent().addClass('pet-spec-selected');

		this.petSpellsContainer.detach().appendTo(node.parent());

		this.filterPetSpells(node.data('spec'));

	},

	chooseFirstPetSpec: function()
	{
		var nodes = this.petSpecsButtons;
		var index = $( nodes ).filter(':visible').filter(':first').data('index');
		this.choosePetSpec(index);
	},

	swapPetSpecs: function()
	{
		if(this.classId == 3){
			if(this.currentSpec == 0 && this.currentTalents[6] == 2){
				this.petSpecsContainer.find('.normal').hide();
				this.petSpecsContainer.find('.enhanced').show();
				if(this.currentPetSpec <= 2) {
					this.choosePetSpec(this.currentPetSpec + 3);
				}
			} else {
				this.petSpecsContainer.find('.enhanced').hide();
				this.petSpecsContainer.find('.normal').show();
				if(this.currentPetSpec >= 3){
					this.choosePetSpec(this.currentPetSpec - 3);
				}
			}
		}
	},

	/**
	 * Filter down the spells table.
	 *
	 * @param type
	 */
	filterSpells: function(type) {

		var filter = '';

		if (type == 'all') {
			filter = '.type--1, .type-' + this.currentSpec;
		} else if (type == 'class') {
			filter = '.type--1';
		} else if (type == 'spec') {
			filter = '.type-' + this.currentSpec;
		}

		this.spellRows.hide().removeClass('row1').filter(function() {
			return $(this).is(filter);
		}).show().filter(':even').addClass('row1');
	},

	filterPetSpells: function(spec) {
		var filter = '[data-spec="' + spec + '"]';
		this.petSpellRows.hide().removeClass('row1').filter(function() {
			return $(this).is(filter);
		}).show().filter(':even').addClass('row1');
	},

	/**
	 * Update everything.
	 */
	update: function() {
		var tier = -1,
			level = 1;

		for (var i = 0, l = this.currentTalents.length; i < l; i++) {
			if (this.currentTalents[i] !== null && this.currentTalents[i] >= 0) {
				tier = i;
			}
		}

		if (tier == -1) {
			if (this.currentSpec >= 0) {
				level = 10;
			}else{
				level = 1;
			}
		} else if (this.classId == 6 && (tier == 0 || tier == 1 || tier == 2)) {
			level = (tier + 1) + 55;
		} else {
			level = (tier + 1) * 15;
		}

		if (level > this.MAX_LEVEL)
			level = this.MAX_LEVEL;
		else if (level <= 0)
			level = 1;

		if (this.classId == 6 && level < 55) {
			level = 55;
		}

		this.currentLevel = level;

		if(this.glyphCalculator.currentLevel < this.currentLevel) {
			this.requiredLevel.text(level);
		}

		if (this.currentPetSpec >= 0 || this.currentSpec >= 0 || this.currentTier >= 0) {
			this.resetButton
				.removeAttr('disabled')
				.removeClass('disabled');
		}

		this.exportBuild();
	},

	/**
	 * Lock the tier by applying disabled classes.
	 *
	 * @param tier
	 */
	lockTier: function(tier) {
		this.talentsTiers.eq(tier).find('.cell')
			.addClass('cell-disabled')
			.removeClass('cell-selected');
	},

	/**
	 * Remove the disabled classes.
	 *
	 * @param tier
	 */
	unlockTier: function(tier) {
		this.talentsTiers.eq(tier).find('.cell')
			.removeClass('cell-disabled')
			.removeClass('cell-selected');
	},

	/**
	 * Export the build to a hash.
	 */
	exportBuild: function(glyphHash) {
		var meta = Hash.encode([ this.classId, this.currentSpec, this.currentPetSpec ]),
			talents = '';

		for (var i = 0, l = this.MAX_TIERS; i < l; i++) {
			if (this.currentTalents[i] != null) {
				talents += this.currentTalents[i];
			} else {
				talents += Hash.empty;
			}
		}

		if (talents == '......') {
			talents = '';
		}

		if (glyphHash){
			this.glyphHash = glyphHash;
		}

		this.exportHash = meta + Hash.delimiter + talents + this.glyphHash;

		location.replace('#' + this.exportHash);

		this.linkBuild.attr('href', location.href);
	},

	/**
	 * Import the current build if the hash exists.
	 */
	importBuild: function(hash) {

		var build = hash || Core.getHash();

		if (!build || build == '.')
			return;

		var parts = build.split(Hash.delimiter),
			meta = Hash.decode(parts[0]),
			points = parts[1].split(''),
			glyphs = parts[2];

		// Choose character spec
		if (meta[1] >= 0) {
			this.chooseSpec(meta[1]);
		}

		// Choose pet spec
		if (meta[2] >= 0) {
			//$('.pet-specs').prepend("<h2>" + meta[2] + "</h2>");
			this.choosePetSpec(meta[2]);
		}

		// Choose talents
		for (var i = 0, l = points.length; i < l; i++) {
			if (points[i] !== Hash.empty)
				this.chooseTalent(i, parseInt(points[i]));
		}

		// Choose glyphs
		if(glyphs){
			this.glyphHash = Hash.delimiter + glyphs;
		}

		this.update();
	},

	/**
	 * Reset everything.
	 */
	reset: function() {

		this.currentPetSpec = -1;
		this.currentSpec = -1;
		this.currentTier = -1;
		this.currentLevel = 1;

		for (var i = 0, l = this.MAX_TIERS; i < l; i++) {
			this.currentTalents[i] = null;
			this.unlockTier(i);
		}

		this.requiredLevel.text(1);

		this.resetButton
			.attr('disabled', 'disabled')
			.addClass('disabled');

		this.specsContainer.removeClass('compact');
		this.petSpecsContainer.removeClass('pet-compact');
		this.specsButtons.removeClass('cell-selected').attr('rel', 'np');
		this.petSpecsButtons.removeClass('pet-cell-selected').attr('rel', 'np');
		this.specs.removeClass('spec-selected');
		this.petSpecs.removeClass('pet-spec-selected');

		this.chooseFirstSpec();
		this.chooseFirstPetSpec();

		this.spellsContainer.find("a[data-type='spec']").click();

		// Reset Glyphs
		this.glyphHash = '';
		this.glyphCalculator.reset();

		this.update();
	}

	});

	var GlyphCalculator = Class.extend({

	// State
	classId: null,
	overviewPaneVisible: true,
	dataLoaded: false,
	updating: false,
	talentCalculator: null,
	currentLevel: 0,

	// Helper
	allSpells: {},
	allGlyphs: {},

	// Glyphs
	glyphs: [],
	glyphMap: {},
	glyphCounts: {},
	chosenGlyphs: {},

	// Export
	glyphHash: '',
	importing: false,
	exporting: false,

	// DOM nodes
	$talentCalc: null,
	$glyphs: null,
	$glyphSelector: null,
	$glyphScroller: null,

	// Constants
	BUILD_SEP: '!',
	TC_ENCODING:'aZbYcXdWeVfUgThSiRjQkPlOmNnMoLpKqJrIsHtGuFvEwDxCyBzA0123456789_=+-.',

	// Initialize this instance of GC
	init: function(classId, data, talentCalculator){

		this.classId = classId;

		// Get glyph data
		this.glyphs = data.glyphs;
		this.talentCalulator = talentCalculator;

		this.initGlyphs();
		this.initHtml();

		if (hash = Core.getHash()) {
			this.importDecode();
		}

	},

	initGlyphs: function() {

		var	major = [],
			minor = [];

		for (var i = 0, glyph; glyph = this.glyphs[i]; i++) {
			if (glyph.type == 0)
				major.push( glyph );

			else if (glyph.type == 1)
				minor.push( glyph );
		}

		var sort = function(a, b) {
			var x = a.prettyName.toLowerCase(),
				y = b.prettyName.toLowerCase();

			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}

		major = major.sort(sort);
		minor = minor.sort(sort);

		this.allGlyphs = [
			major,
			minor
		];

		for (var i = 0; i < 2; i++) {
			if (!this.glyphCounts[i])
				this.glyphCounts[i] = 0;
		}

	},

	initHtml: function () {

		// Talent calc (container)
		this.$talentCalc = $('#talentcalc-' + this.classId);

		// glyph selector
		this.$glyphSelector =  this.$talentCalc.children('div.talentcalc-glyphselector');
		this.$glyphSelector.find('a.close').click($.proxy(this.closeGlyphSelector, this));
		this.$glyphScroller = this.$glyphSelector.children('div.scroller');

		// glyphs
		this.$glyphs =  this.$talentCalc.children('div.talentcalc-glyphs');
		this.$glyphs.find('a.glyph').click($.proxy(this.openGlyphSelector, this));
		this.$glyphs.find('a.close').click($.proxy(this.emptyGlyph, this));
	},

	reset: function() {
		this.resetGlyphs();
		this.exportUrl = '';
		this.exportGlyph = '';
		this.updateLevel();
	},

	exportData: function() {

		if (this.importing || this.exporting)
			return;

		this.exporting = true;

		this.glyphHash = this.exportGlyphs();

		// Get base export URL from TC
		this.talentCalulator.exportBuild(this.glyphHash);

		this.exporting = false;
	},

	exportGlyphs: function() {
		var str = '',
			ids = [],
			exportHash,
			self = this;

		for (var i = 0; i < 3; i++) {
			for (var x = 0; x < 3; x++) {
				if (this.glyphMap[i +'-'+ x]) {
					ids.push(this.glyphMap[i +'-'+ x] );
				}
			}
		}

		if (ids.length) {
			$.each(this.glyphs, function(key, value) {
				for (var g = 0; g < ids.length; g++) {
					if (ids[g] == value.id) {
						str += self.TC_ENCODING.charAt(key);
						return true;
					}
				}
			});

			exportHash = this.BUILD_SEP + str;
		}

		return exportHash;
	},

	importDecode: function() {

		var build = hash.split(this.BUILD_SEP),
			id = this.TC_ENCODING.indexOf(build[0].charAt(0));

		// Glyph data
		if (build[2])
			this.importGlyphs(build[2]);

		this.importing = false;
	},

	importGlyphs: function(build) {
		var major = 0,
			minor = 0,
			index = 0,
			glyph;

		for (var i = 0; i < build.length; i++) {
			glyph = this.glyphs[this.TC_ENCODING.indexOf(build.charAt(i))];

			if (glyph.type == 0) {
				index = major;
				major++;

			} else if (glyph.type == 1) {
				index = minor;
				minor++;

			}

			this.chooseGlyph(glyph.id, glyph.type, index);
			this.replaceGlyph(
				this.$glyphs.find('.glyph-'+ glyph.type +' li:eq('+ (index + 1) +') a.glyph'),
				this.createGlyphNode(glyph)
			);

		}
	},

	openGlyphSelector: function(e) {
		e.stopPropagation();

		var node = $(e.currentTarget),
			index = node.data('index'),
			type = node.data('glyph'),
			GLYPHS = this.allGlyphs[type],
			li,
			arrow = (node.offset().left - node.parentsUntil('.talentcalc-glyphs').parent().offset().left) - -10;

		this.$glyphSelector.find('.arrow-bottom').css('left', arrow);

		if (type == 0) {
			this.$glyphSelector.css('top', '85px');
			this.$glyphScroller.css('height','451px');
		} else {
			this.$glyphSelector.css('top', '288px');
			this.$glyphScroller.css('height','300px');
		}

		// Build list
		var wrapper = this.$glyphSelector.find('ul');
		wrapper.empty();

		for (var i = 0, glyph; glyph = GLYPHS[i]; i++) {
			if (this.chosenGlyphs[glyph.id])
				continue;

			li = $('<li/>');
			li.append( this.createGlyphNode(glyph) );

			wrapper.append(li);
		}

		// Bind list click events
		wrapper.find('a').click($.proxy(function(e) {
			e.stopPropagation();
			e.preventDefault();

			var id = $(e.currentTarget).data('id');

			this.chooseGlyph(id, type, index);
			this.replaceGlyph(node, e.currentTarget);
			this.exportData();

			this.$glyphSelector.hide();

			return false;
		},this));

		this.moveGlyphSelector(type);

		$(document).bind('click.tc', $.proxy(function(e) {
			if(e.which != 1) { // Left mouse button only
				return;
			}
			this.closeGlyphSelector();
			$(document).unbind('click.tc');
		},this));

		return false;
	},

	closeGlyphSelector: function() {
		this.$glyphSelector.hide();
	},

	moveGlyphSelector: function(column) {
		this.$glyphSelector
			.removeClass('column0 column1 column2')
			.addClass('column'+ column)
			.show();
	},

	removeGlyph: function(id, type, index) {
		if (this.chosenGlyphs[id]) {
			if (this.glyphCounts[type])
				this.glyphCounts[type]--;

			delete this.chosenGlyphs[id];
			delete this.glyphMap[type +'-'+ index];
		}
		this.updateLevel();
	},

	chooseGlyph: function(id, type, index) {
		var key = type +'-'+ index;

		if (this.glyphMap[key])
			this.removeGlyph(this.glyphMap[key], type, index);

		if (!this.glyphCounts[type])
			this.glyphCounts[type] = 0;

		this.chosenGlyphs[id] = id;
		this.glyphMap[key] = id;
		this.glyphCounts[type]++;

		this.updateLevel();

		// Enable reset button
		this.talentCalulator.resetButton
			.removeAttr('disabled')
			.removeClass('disabled');
	},

	updateLevel: function() {

		var maxGlyphCounts = (this.glyphCounts['0'] > this.glyphCounts['1']) ? this.glyphCounts['0'] : this.glyphCounts['1'];

		this.currentLevel = maxGlyphCounts*25;

		if(this.talentCalulator.currentLevel < this.currentLevel)
			this.talentCalulator.requiredLevel.text(this.currentLevel);
		else
			this.talentCalulator.update();
	},

	replaceGlyph: function(target, chosen) {
		chosen = $(chosen);

		$(target)
			.html( chosen.html() )
			.attr('href', chosen.attr('href') )
			.removeClass('color-q0')
			.addClass('color-q1')
			.find('.description').remove().end()
			.attr('data-tooltip', chosen.data('tooltip'))
			.data('tooltip', chosen.data('tooltip'))
			.parent().addClass('glyph-chosen');
	},

	createGlyphNode: function(glyph) {
		var desc = glyph.description;

		return $('<a/>', {
			href: 'javascript:;',
			html: Wow.Icon.framedIcon(glyph.icon, 18),
			'data-tooltip': '#glyph-tooltip-' + glyph.id,
			'data-id': glyph.id
		})
		.append('<span class="name">'+ glyph.prettyName +'</span>')
		.append('<span class="description">'+ desc +'</span>');

	},

	resetGlyphs: function() {
		var empty = this.$glyphs.find('.empty-glyph').html();

		this.$glyphs
			.addClass('locked')
			.find('a.glyph').each(function() {
				$(this)
					.html(empty)
					.removeClass('color-q1')
					.addClass('color-q0')
					.attr('href', 'javascript:;')
					.removeAttr('data-tooltip')
					.parent().removeClass('glyph-chosen');
			});

		this.chosenGlyphs = {};
		this.glyphMap = {};
		this.glyphCounts = [0, 0];
	},

	emptyGlyph: function(e) {

		var target = $(e.currentTarget);

		var node = $(target).siblings('a.glyph:first'),
			type = node.data('glyph'),
			index = node.data('index'),
			key = type +'-'+ index;

		node.html(this.$glyphs.find('.empty-glyph').html() )
			.removeClass('color-q1')
			.addClass('color-q0')
			.attr('href', 'javascript:;')
			.removeAttr('data-tooltip')
			.parent().removeClass('glyph-chosen');

		if (this.glyphMap[key])
			this.removeGlyph(this.glyphMap[key], type, index);

		this.exportData();

		this.$glyphSelector.hide();
	}

});