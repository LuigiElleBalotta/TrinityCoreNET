<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div class="left-content">
    <div id="blog" class="article-wrapper" itemscope="itemscope" itemtype="http://schema.org/BlogPosting">
        <h2 class="header-2" > <span itemprop="headline"><?php echo $title; ?></span></h2>
        <div class="article-meta">
            <a class="article-author" href="../../searchdd2f?a=<?php echo $this->utilitymanager->GetAccountUsernameByBNetID($authorID); ?>&amp;f=article">
                <span class="author-icon"></span>
                <span itemprop="author"><?php echo $this->utilitymanager->GetAccountUsernameByBNetID($authorID); ?></span>
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
        <div class="hide" id="divBlogID"><?php echo $id; ?></div>
        <h2 class="subheader-2" id="comments_number">Carico i commenti…</h2>
        <h2 class="hide" id="noCommentBlog">Si è verificato un errore nel caricare i commenti.</h2>
        <div class="comments-loading"></div>
        <div id="comments-pages-wrapper">
            <div class="comments-pages">
                <div id="comments-list-wrapper">
                    <ul id="comments_list" class="comments-list">

                    </ul>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            $("document").ready(function()
            {
                var blogid = $("#divBlogID").html();
                $.ajax({
                    url: "<?php echo base_url(); ?>" + 'Blog/loadComments',
                    type: "POST",
                    data: "blogid="+blogid,
                    success: function (result) {
                        var obj = JSON.parse(result);
                        if (obj.length > 0) {
                            $(".comments-loading").hide();
                            $("#comments_number").html("Commenti (<span id='comments-total'>"+obj.length+"</span>)");
                            for(var i = 0; i < obj.length; i++)
                            {
                                $("#comments_list").append("<li id='post-" + obj[i].ID + "' class=''>" +
                                    "<div class='comment-tile'>" +
                                    "<div class='bnet-avatar'>" +
                                    "<div class='avatar-outer'>" +
                                    "<a href='#'>" +
                                    "<img src='http://render-api-eu.worldofwarcraft.com/static-render/eu/emeriss/106/75983722-avatar.jpg?alt=wow/static/images/2d/avatar/8-0.jpg' height='64' width='64'>" +
                                    "<span class='avatar-inner'></span>" +
                                    "</a></div></div>" +
                                    "<div class='comment-head'>" +
                                    "<div class='bnet-username' itemtype='http://schema.org/Person' itemprop='author' itemscope='itemscope'>" +
                                    "<div id='context-" + i + "' class='ui-context' style='display: none'>" +
                                    "<div class='context'>" +
                                    "<a class='close' onclick='return CharSelect.close(this);' href='javscript:;'></a>" +
                                    "<div class='context-user'>" +
                                    "<strong>" + obj[i].author + "</strong>" +
                                    "</div>" +
                                    "<div class='context-links'>" +
                                    "<a class='icon-profile link-first' rel='np' title='profilo' href='#'><span class='context-icon'>Profilo</span>Profilo </a>" +
                                    "<a class='icon-posts' rel='np' title='Visualizza post' href='#'><span class='context-icon'></span></a>" +
                                    "<a class='icon-ignore link-last' onclick='ReportPost.ignoreUser(this, " + obj[i].authorID + ", false); return false;' rel='np' title='ignora' href='javacript:;'><span class='context-icon'></span></a>" +
                                    "</div></div></div>" +
                                    "<a class='context-link wow-class-6' itemprop='url' href='#'>" +
                                    "<span class='poster-name'>" + obj[i].author + "</span></a>" +
                                    "<span class='timestamp'>" + obj[i].date + "</span>" +
                                    "</div></div>" +
                                    "<div class='comment-body'>" + obj[i].comment + "</div>" +
                                    "<div class='comment-foot'>" +
                                    "<span class='clear'></span></div><span class='clear'></span></div></li>");
                            }
                        }
                        else
                            $("#noCommentBlog").removeClass("hide");
                    },
                    error: function (xhr, resp, text) {
                        alert(text);
                    }
                });
            });
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