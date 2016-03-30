<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div class="right-sidebar">
    <div id="sidebar-marketing" class="sidebar-module">
        <div class="bnet-offer">
            <div class="bnet-offer-bg">
                <a href="http://warcraft.com/?utm_source=internal&amp;utm_medium=conditional&amp;utm_content=side_ad&amp;utm_campaign=wowtrial_2014" target="_blank" id="ad13150049" class="bnet-offer-image" data-analytics="ad-service-click"
                   data-analytics-panel="campaign:13150049 - image:13150030 || Trial-EU2014"
                   onclick="Marketing.trackAd('campaignId:13150049 - imgId:13150030', 'Trial-EU2014', 'wow', true);">
                    <img src="/akamaihd_us/cms/ad_300x250/2WF02VZOL6191393861563753.jpg" width="300" height="250" alt=""/>
                </a>
            </div>
            <script type="text/javascript">
                //<![CDATA[
                window.dataLayer.push({"analytics.eventPanel": "campaign:13150049 - image:13150030 || Trial-EU2014", "event": "adServiceImpression"});
                Marketing.trackAd('campaignId:13150049 - imgId:13150030', 'Trial-EU2014', 'wow');
                //]]>
            </script>
        </div>
    </div>
    <div class="sidebar" id="sidebar">
        <div class="sidebar-top">
            <div class="sidebar-bot">
                <div class="sidebar-loading" id="sidebar-loading">
                    Caricamento dei contenuti…
                </div>
                <script type="text/javascript">
                    //<![CDATA[
                    Core.loadDeferredScript('https://bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID=417046&rnd=' + (Math.random() * 1000000));
                    //]]>
                </script>
                <div class="sidebar-module " id="sidebar-social-media">
                    <div class="sidebar-title">
                        <h3 class="header-3 title-social-media" >
                            Resta sintonizzato
                        </h3>
                    </div>
                    <div class="sidebar-content">
                        <ul class="social-media">
                            <li class="atom-feed">
                                <a href="feed/news" target="_blank"></a>
                            </li>
                            <li class="facebook">
                                <a href="https://www.facebook.com/WorldofWarcraft.it" title="World of Warcraft su Facebook"></a>
                            </li>
                            <li class="twitter">
                                <a href="http://twitter.com/warcraft" title="World of Warcraft su Twitter"></a>
                            </li>
                            <li class="youtube">
                                <a href="https://www.youtube.com/WorldofWarcraftIT" title="World of Warcraft su Youtube"></a>
                            </li>
                            <li class="reddit">
                                <a href="http://www.reddit.com/r/wow" title="World of Warcraft on reddit"></a>
                            </li>
                            <span class="clear"><!-- --></span>
                        </ul>
                    </div>
                </div>
                <div id="fb-root"></div>
                <div id="dynamic-sidebar-target"></div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        //<![CDATA[
        $(function() {
            Sidebar.sidebar([
                { "type": "expansion", "query": "" },
                { "type": "under-dev", "query": "" },
                { "type": "gear-store", "query": "" },
                { "type": "sotd", "query": "" },
                { "type": "blizzard-posts", "query": "" }
            ]);
        });
        //]]>
    </script>
</div>