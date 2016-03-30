/**
 * PvP Ladder class
 * @type {Object}
 * @requires Filter, DataSet
 */
var Ladder = {

	config: {},
	dataSet: null,

	/**
	 * Initialize the dataSet and bind filter controls
	 *
	 * @param config
	 */
	initialize: function(config) {

		// Save config
		this.config = $.extend({
			totalResults: 2000,
			perPage: 50
		});

		// Init url hash class
		Filter.initialize();

		// Build dataset
		Ladder.buildDataSet();

		// Bind filter controls
		Ladder.bindFilters();
	},

	/**
	 * Build DataSet object with ladder data
	 */
	buildDataSet: function(){

		// Populate ladder dataset
		Ladder.dataSet = DataSet.factory('#ladders',{
            elementContainer: '#ladders-table',
            sorting: true,
            column: 0,
            method: "numeric",
            type: "asc",
            altRows: true,
            paging: true,
            page: parseInt(Filter.getParam("page")) || 1,
            cache: true,
            results: Ladder.config.perPage,
            totalResults: Ladder.config.totalResults,
            afterProcess: function(instance, fragment){
            	$("#ladders-loading").hide();
            	$("#ladders").show();
            	return fragment;
            }
        });

        Core.fixTableHeaders('#ladders');
	},

	/**
	 * Bind interaction events for filter controls
	 */
	bindFilters: function(){

		// Submit
		$("#pvp-filters").submit(function(){
			Ladder.applyFilters();
			return false;
		});

		// Reset
		$("#reset-filters").click(function(e){
			window.location = window.location.pathname;
			e.preventDefault();
		});

		// Filter by spec
		$('#pvp-filters input[name="specType"]').click(function() {
			var value = $(this).val();

			if (value == 'all') {
				$('#player-spec').slideUp();
				$('#filter-spec').val('');
				$('#current-filters').slideUp();
				$('#player-spec :checkbox').each(function() {
					this.checked = false;
				});
			} else {
				$('#player-spec').slideDown();
			}
		});

		// Class checkboxes
		$('#player-spec .all-spec input').click(function() {
			var checked = this.checked;

			$(this).parent().parent().find('.spec input').each(function() {
				this.checked = checked;
			});
		});

		// Spec checkboxes
		$('#player-spec .spec input').click(function() {
			var self = $(this),
				parent = self.parent().parent(),
				all = parent.find('.all-spec :checkbox'),
				checkAll = true;

			if (self.is(':checked')) {
				parent.find('.spec :checkbox').each(function() {
					if (!this.checked){
						checkAll = false;
					}
				});

				all[0].checked = checkAll;
			} else {
				all[0].checked = false;
			}
		});

		// Min / Max Rating
		$('#filter-rating-min, #filter-rating-max').keydown(function(e) {
			return KeyCode.isNumeric(e);
		});

	},

	/**
	 * Apply filters to ladder data based on form input
	 */
	applyFilters: function() {

		var filters = [],
			player = $('#filter-player').val(),
			realm = $('#filter-realm').val(),
			faction = $('#filter-faction').val(),
			minRating = $('#filter-rating-min').val(),
			maxRating = $('#filter-rating-max').val(),
			specFilter = $('#filter-spec-edit').is(':checked'),
			characterClasses = [],
			characterSpecs = [];

		// playername
		if(player != ""){
			filters.push(['column',1,player,'matches',true]);
		}

		// realm
		if(realm != ""){
			filters.push(['column',2,realm,'matches',false]);
		}

		// faction
		if(faction != ""){
			filters.push(['column',3,faction,'equals',false]);
		}

		// Rating
		if(minRating != "" && maxRating != ""){
			filters.push(['column',6,[minRating,maxRating],'range',false]);
		}else if(minRating != ""){
			filters.push(['column',6,minRating,'greaterThanEquals',false]);
		}else if(maxRating != ""){
			filters.push(['column',6,maxRating,'lessThanEquals',false]);
		}

		// Filter by talent spec
		if(specFilter){

			$('#player-spec .class-spec').each(function() {
				var self = $(this),
					allSpec = self.find('.all-spec :checkbox');

				// Class Filter
				if (allSpec.is(':checked')) {
					characterClasses.push("class-" + allSpec.val());
				} else {

					// Class + spec index filter
					self.find('.spec :checkbox').each(function() {
						var specCheckbox = $(this);

						if (specCheckbox.is(':checked')){
							characterSpecs.push("spec-" + specCheckbox.val());
						}
					});
				}
			});

			// Filter class level
			if(characterClasses.length > 0){
				filters.push(['column',1,characterClasses,'contains',false]);
			}

			// Filter spec level
			if(characterSpecs.length > 0){
				filters.push(['column',1,characterSpecs,'contains',false]);
			}

		}

		// Filter data
		Ladder.dataSet.batch(filters);

	}

};