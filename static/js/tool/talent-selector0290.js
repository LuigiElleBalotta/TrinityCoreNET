$(function() {
    TalentSelector.initialize();
});

var TalentSelector = {
    calc: null,
    tabs: null,
    cache: {},
    instances: {},
    CLASS_MAP:{
        1: 'warrior',
        2: 'paladin',
        3: 'hunter',
        4: 'rogue',
        5: 'priest',
        6: 'death-knight',
        7: 'shaman',
        8: 'mage',
        9: 'warlock',
        10: 'monk',
        11: 'druid'
    },

    initialize: function() {
        TalentSelector.tabs = $('#calculator-selector a');
        TalentSelector.tabs.click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            TalentSelector.view( $(e.currentTarget).data('id'), true );
        });

        window.onhashchange = function(e) {
            TalentSelector.openClass();
        }

        TalentSelector.calc = $('#calculators');
        TalentSelector.openClass();
    },

    openClass: function(){

        var hash = Core.getHash();

        if (hash && hash != '.') {

            var classIndex = 0;

            for(var index in TalentSelector.CLASS_MAP){
                if(hash == TalentSelector.CLASS_MAP[index]){
                    classIndex = index;
                    break;
                }
            }

            if(classIndex > 0){
                location.replace('#' + Hash.encode([classIndex, -1, -1]) + Hash.delimiter);
            }else{
                var id = Hash.decode(hash.substr(0, 1));

                if (id[0] && id[0] > 0 && id[0] < 12){
                    TalentSelector.view(id[0], false);
                }
            }

        }
    },

    view: function(id, reset) {
        if (!id) {
            return false;
        }

        $('#calculator-selector').addClass('picked');

        TalentSelector.tabs.removeClass('tab-active');
        $('#class-' + id).addClass('tab-active');

        if (TalentSelector.cache[id]) {
            TalentSelector.calc.find('.talent-calculator').hide();
            TalentSelector.cache[id].show();
            TalentSelector.instances[id].exportBuild();

            return false;
        }

        TalentSelector.load(id, reset);

        return false;
    },

    load: function(id, reset) {
        if (reset)
            location.replace('#.');

        $('#calculator').removeClass('initial');

        $.ajax({
            url: Core.baseUrl + '/tool/talent-calculator/' + id,
            type: 'GET',
            dataType: 'html',
            success: function(response) {
                $('#select-class').hide();

                TalentSelector.calc.find('.talent-calculator').hide();
                TalentSelector.cache[id] = $(response).appendTo(TalentSelector.calc);
                TalentSelector.instances[id].exportBuild();
            }
        });
    }
};