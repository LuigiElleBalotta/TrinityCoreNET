var Challenge = {

    realm: null,
    dungeon: null,
    table: null,

    hideRecurring: false,
    classFilters: [],

    initialize: function(realm, dungeon){

        Challenge.realm = realm;
        Challenge.dungeon = dungeon;

        // Bind the time tooltips
        $(".time").bind("mouseover",Challenge.showTimeTooltip);

        // Bind realm select
        $("#realm-select").bind("change",function(evt){
            var selectedRealm = $(this).val();
            var hash = (Core.getHash()) ? "#" + Core.getHash() : "";
            if(selectedRealm && selectedRealm != Challenge.realm){
                location.href = (selectedRealm == "all") ? Core.baseUrl + "/challenge/dungeon/" + Challenge.dungeon + "/" + hash : Core.baseUrl + "/challenge/dungeon/" + Challenge.dungeon + "/realm/" + selectedRealm + "/" + hash;
            }
        }).val(Challenge.realm);

        // Bind dungeon select
        $("#dungeon-select").bind("change",function(evt){
            var selectedDungeon = $(this).val();
            var hash = (Core.getHash()) ? "#" + Core.getHash() : "";
            if(selectedDungeon != Challenge.dungeon){
               location.href = (Challenge.realm == "all") ? Core.baseUrl + "/challenge/dungeon/" + selectedDungeon + "/" + hash : Core.baseUrl + "/challenge/dungeon/" + selectedDungeon + "/realm/" + Challenge.realm + "/" + hash;
            }
        }).val(Challenge.dungeon);

        // Bind the recurring player check
        $("#hide-recurring").bind("change",function(evt){
            Challenge.hideRecurring = ($(this).is(':checked')) ? true : false;
            Challenge.filter();
        });

        // Bind class filters
        $(".class-filter").bind("click",function(){
            var data = $(this).data();

            var filterIndex = $.inArray(data.value, Challenge.classFilters);

            if(filterIndex != -1){
                $(this).removeClass("selected");
                delete Challenge.classFilters[filterIndex];
            }else{
                $(this).addClass("selected");
                Challenge.classFilters.push(data.value);
            }

            Challenge.filter();
        });

        // Build the table
        Challenge.table = DataSet.factory('#leaderboard-table',{
            elementContainer: '#ladder-table',
            sorting: true,
            column: 0,
            method: "numeric",
            type: "asc",
            altRows: false,
            paging: true,
            results: 25,
            totalResults: 100
        });

        // Initialize filters
        Filter.initialize(function(){
            // If hide-recurring
            if(Filter.query['hide-recurring']){
                Challenge.hideRecurring = true;
                $("#hide-recurring").attr('checked',true);
            }
            Challenge.filter();
        });

    },

    /**
     * Run the filters on the table.
     *
     */
    filter: function() {

        var filterString = "";

        // Check class filters
        if(Challenge.classFilters.length > 0){

            for(var i=0; i < Challenge.classFilters.length; i++){
                if(Challenge.classFilters[i]){
                    filterString += Challenge.classFilters[i] + " ";
                }
            }
        }

        // Check recurring player flag
        if(Challenge.hideRecurring){
            filterString += "unique";
            Filter.addParam('hide-recurring', Challenge.hideRecurring);
        }else{
            Filter.deleteParam('hide-recurring');
        }

        // If filters present, batch them
        if(filterString){
            Challenge.table.filter('column',2,filterString,'matches',false);
        }else{
            Challenge.table.reset();
        }

        Filter.applyQuery();
    },

    /**
     * Shows the accurate time tooltip
     */
    showTimeTooltip: function(){

        var time = $(this).data("time");
        var verbose = $(this).data("verbose");

        if(time && verbose){
            var $content = $('<div/>').addClass("time-tooltip");
            $content.append($('<h3 />').text(time));
            $content.append($('<div />').addClass("color-tooltip-yellow").text(verbose));

            Tooltip.show(this,$content,false);
        }
    }

};