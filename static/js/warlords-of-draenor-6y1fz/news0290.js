/*
  WoW 6.0 - News section
  =============================================================================

  The news section uses the searchPane API to query news posts and
  return blog articles that match a set of provided settings
  (e.g., type - article, community - WoW, number of results - 4, etc)

  The format for the query is:
    query or q:   Search query
    keyword or k: Specific keyword(s) on which to filter results
                  *MUST BE used in conjunction with type: article AND
                  query MUST BE omitted
    author or a:  Specific author on which to filter results
    community:    (d3, wow, sc2, blizzcon, bnet, support)
    type or f:    (article, static, support, post, url, wowitem)
    results or r: Limits the number of results returned (default: 10)
*/

$(function() {
  var $win, LANG, URL, localeDateFormat, news;
  LANG = Core.getLanguage();
  URL = jsonSearchHandlerUrl;
  $win = $(window);
  localeDateFormat = {
    "de-de": "dd.MM.yyyy",
    "en-us": "MM/dd/yyyy",
    "en-gb": "dd/MM/yyyy",
    "es-es": "dd/MM/yyyy",
    "es-mx": "dd/MM/yyyy",
    "fr-fr": "dd/MM/yyyy",
    "it-it": "dd/MM/yyyy",
    "ko-kr": "yyyy.MM.dd",
    "pl-pl": "dd.MM.yyyy",
    "pt-br": "dd/MM/yyyy",
    "pt-pt": "dd/MM/yyyy",
    "ru-ru": "dd/MM/yyyy",
    "zh-cn": "yyyy年MM月dd日",
    "zh-tw": "yyyy-MM-dd"
  };
  news = {
    search: {
      keyword: Core.searchTerm,
      type: "article",
      community: "wow",
      results: 3,
      url: "" + URL + "/" + LANG + "/search/json"
    },
    section: $("#news"),
    title: $("#news-title"),
    data: {},
    analytics: {
      category: 'wow',
      action: 'News_Click-Throughs',
      label: 'wow6.0',
      index: 0
    }
  };
  news.hideSection = function() {};
  news.getData = function(name, opts, obj) {
    $.ajax({
      type: "GET",
      url: news.search.url,
      dataType: "jsonp",
      async: true,
      cache: true,
      data: {
        q: opts.query,
        k: opts.keyword,
        a: opts.author,
        f: opts.type,
        r: opts.results,
        community: opts.community,
        sort: opts.sortBy,
        dir: opts.sortOrder
      },
      success: function(data) {
        obj[name] = data.results[opts.type];
        return $win.trigger("newsData.ready");
      },
      error: function(xhr) {
        return news.hideSection();
      }
    });
    return obj;
  };
  news.parseData = function(event) {
    var data, escapedData, jsonData, newsData, _i, _len;
    jsonData = event.data.news;
    newsData = [];
    escapedData = {};
    if (!jsonData) {
      news.hideSection();
      return false;
    }
    if (jsonData.length < 3) {
      news.section.addClass("less-than-3");
    }
    for (_i = 0, _len = jsonData.length; _i < _len; _i++) {
      data = jsonData[_i];
      escapedData.title = $("<div>").html(data.title).text();
      escapedData.summary = $("<div>").html(data.summary).text();
      newsData.push({
        id: data.id,
        index: data.index,
        date: data.date,
        author: data.author,
        comments: data.comments,
        connectIcon: data.connectIcon || data.icon,
        title: escapedData.title,
        summary: escapedData.summary,
        url: data.url
      });
      news.analytics.index++;
    }
    news.data = newsData;
    return $win.trigger("newsContent.load");
  };
  $win.bind("newsData.ready", news.data, news.parseData);
  $win.bind("newsContent.load", function() {
    var template;
    template = Handlebars.templates["news"];
    news.markup = template({
      news: news.data
    });
    $(news.markup).insertAfter(news.title);
    $win.trigger("newsContent.ready");
    $('.news-container a').bind('click', function(event) {
      return Core.trackEvent("WoWX", "Blog_Click-Throughs", $(this).data('label'));
    });
    return $('ul.social-media a').bind('click', function(event) {
      return Core.trackEvent("WoWX - SNS", "Stay Connected – " + ($(this).parent().attr('class')), Core.locale);
    });
  });
  Handlebars.registerHelper('newsImage', function() {
    return new Handlebars.SafeString("<img src='" + this.connectIcon + "'></img><div class='hover'/><div class='sides'/><div class='bottom'/><div class='top'/>");
  });
  Handlebars.registerHelper('newsLink', function(context) {
    var comments, imgId, linkClass;
    linkClass = context.hash["class"] ? context.hash["class"] : "";
    comments = context.hash.comments ? "#comments" : "";
    imgId = this.connectIcon ? this.connectIcon.substring(this.connectIcon.lastIndexOf('/') + 1) : "";
    return new Handlebars.SafeString("<a href='" + this.url + comments + "' class='news-link " + linkClass + "' target='_blank' data-category='" + news.analytics.category + "' data-action='" + news.analytics.action + "' data-label='" + news.analytics.index + " - " + Core.region + " - " + this.id + " - " + imgId + "'>" + (context.fn(this)) + "</a>");
  });
  Handlebars.registerHelper('newsDate', function() {
    return Core.formatDatetime(localeDateFormat[Core.locale], this.date);
  });
  return news.getData("news", news.search, news.data);
});

/*
//@ sourceMappingURL=news.js.map
*/