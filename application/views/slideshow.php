<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div id="slideshow" class="ui-slideshow">
    <div class="slideshow">
        <div class="slide" id="slide-0" style="background-image: url('/akamaihd_us/cms/carousel_header/KH9U552SXR721450710314836.jpg'); "></div>
        <div class="slide" id="slide-1"style="background-image: url('/akamaihd_us/cms/carousel_header/GGOM7G7BN9A41446847480654.jpg'); display: none;"></div>
    </div>
    <div class="paging">
        <a href="javascript:;" class="prev" onclick="Slideshow.prev();"></a>
        <a href="javascript:;" class="next" onclick="Slideshow.next();"></a>
    </div>
    <div class="caption">
        <h3>
            <a href="javascript:;" class="link" data-analytics="carousel" data-analytics-panel="slot:0 - id:19995929 || Il regalo giusto!">
                Il regalo giusto!
            </a>
        </h3>
    </div>
    <div class="preview"></div>
    <div class="mask"></div>
</div>
<script type="text/javascript">
    //<![CDATA[
    $(function() {
        Slideshow.initialize('#slideshow', [
            {
                image: "//bnetcmsus-a.akamaihd.net/cms/carousel_header/KH9U552SXR721450710314836.jpg",
                desc: "",
                title: "Il regalo giusto!",
                url: "http://eu.battle.net/wow/it/blog/13814764",
                id: "19995929",
                duration: 7,
                page: "homepage"
            },
            {
                image: "//bnetcmsus-a.akamaihd.net/cms/carousel_header/GGOM7G7BN9A41446847480654.jpg",
                desc: "",
                title: "",
                url: "http://blizz.ly/1WBlvSe",
                id: "19956711",
                duration: 7,
                page: "homepage"
            }
        ]);

    });
    //]]>
</script>