<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div class="left-content">
    <div id="blog" class="article-wrapper" itemscope="itemscope" itemtype="http://schema.org/BlogPosting">
        <h2 class="header-2" > <span itemprop="headline"><?php echo $title; ?></span></h2>
        <div class="article-meta">
            <a class="article-author" href="../../searchdd2f?a=Kaivax&amp;f=article">
                <span class="author-icon"></span>
                <span itemprop="author">Kaivax</span>
            </a>
            <span class="publish-date" title="<?php echo $date; ?>">
                <?php echo str_replace("-", "/", $amd); ?>
            </span>
            <a href="#comments" class="comments-link">1</a>
        </div>
        <meta itemprop="datePublished" content="<?php echo $date; ?>" />
        <meta itemprop="dateModified" content="<?php echo $last_modify; ?>" />
        <meta itemprop="inLanguage" content="it-IT" />
        <meta itemprop="interactionCount" content="UserComments:1" />
        <meta itemprop="thumbnailUrl" content="//bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/fe/FE8PSHFCZJZ01438816169989.jpg" />
        <div class="article-content">
            <div class="header-image"><img itemprop="image" alt="<?php echo $title; ?>" src="/akamaihd_us/cms/blog_header/ag/AGYKIJG3BL4Y1438816190832.jpg" /></div>
            <div class="detail" itemprop="articleBody">
                <?php
                echo $content;
                ?>
            </div>
        </div>
        <div class="community-share">
            <div class="share-wrapper">
                <div class="share-links">
                    <a class="facebook"
                       href="https://www.facebook.com/sharer.php?u=<?php echo base_url()."blog/index/".$id."/".$link_rewrite; ?>"
                       onclick="Core.trackEvent('wow- SNS', 'Sharing - Facebook', 'blog 19843702 - it-it'); window.open(this.href,'','height=450,width=550').focus(); return false;"
                       title="Facebook"></a>
                    <a class="twitter"
                       href="http://twitter.com/share?<?php echo base_url()."blog/index/".$id."/".$link_rewrite; ?>"
                       onclick="Core.trackEvent('wow- SNS', 'Sharing - Twitter', 'blog 19843702 - it-it'); window.open(this.href,'','height=450,width=550').focus(); return false;"
                       title="Twitter"></a>
                    <a class="reddit"
                       href="http://www.reddit.com/submit?url=<?php echo base_url()."blog/index/".$id."/".$link_rewrite; ?>"
                       onclick="Core.trackEvent('wow- SNS', 'Sharing - Reddit', 'blog 19843702 - it-it'); window.open(this.href,'','height=auto,width=auto').focus(); return false;"
                       title="Reddit"></a>
                    <span class="clear"><!-- --></span>
                </div>
                <span class="share-title">Condividi:</span>
            </div>
            <div class="like-wrapper">
                <a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo base_url()."blog/index/".$id."/".$link_rewrite; ?>" data-lang="it" data-text="<?php echo $title; ?>" data-hashtags="wow">Tweet</a>
                <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="../../../../../platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
            </div>
            <script type="text/javascript">
                //<![CDATA[
                Core.appendFrame("https://www.facebook.com/plugins/like.php?href=<?php echo base_url()."blog/index/".$id."/".$link_rewrite; ?>&amp;layout=button_count&amp;show_faces=false&amp;width=200&amp;height=20&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;locale=it_IT", 200, 20, $('.like-wrapper'), "facebook-like");
                //]]>
            </script>
            <span class="clear"><!-- --></span>
        </div>
        <div class="keyword-list">
        </div>
    </div>
    <!-- comments -->
    <div id="comments" class="bnet-comments ">
        <h2 class="subheader-2" >Carico i commenti…</h2>
        <h2 class="hide" >Si è verificato un errore nel caricare i commenti.</h2>
        <div class="comments-loading"></div>
        <script type="text/javascript">
            //<![CDATA[
            $(function() {
                Comments.initialize('eu.it_it.blog.<?php echo $id; ?>', '7476590b05777e6983daad8f78e90674', '0');
            });
            //]]>
        </script>
    </div>
</div>
<span class="clear"><!-- --></span>
<script type="text/javascript">
    //<![CDATA[
    $(function() {
        Blog.init();
    });
    //]]>
</script>