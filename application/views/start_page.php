<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div class="left-content" itemscope="itemscope" itemtype="http://schema.org/WebPageElement">
    <div class= "left-content-inner">
        <div class="featured-news-container">
            <ul class="featured-news">
                <?php
                $blogsArray = json_decode($blogs, true);
                $counter = 0;
                for($i = 0; $i < 3; $i++)
                {
                    if($counter <= count($blogsArray)) {
                        if ($blogsArray[$counter]["isPinned"] == 1) {
                            ?>
                            <li>
                                <div class="article-wrapper" >
                                    <a href="blog/index/<?php echo $blogsArray[$counter]["id"]."/".$blogsArray[$counter]["link_rewrite"]; ?>" class="featured-news-link"
                                       data-category="wow"
                                       data-action="Blog_Click-Throughs"
                                       data-label="home 0 - eu - 19990667 - 19992979"
                                       data-analytics="sticky-blog" data-analytics-panel="page:home - slot:0 - blog:19990667 - image:19992979 || Gli oggetti dell&#39;Edizione digitale deluxe di Warlords of Draenor tornano per un tempo limitato">
                                        <div class="article-image" style="background-image:url(/akamaihd_us/cms/blog_thumbnail/dx/DXGB9F3XA8TN1450200643393.jpg)">
                                            <div class="article-image-frame"></div>
                                        </div>
                                        <div class="article-content">
                                            <span class="article-title" title="<?php echo $blogsArray[$counter]["title"]; ?>"><?php echo $blogsArray[$counter]["title"]; ?></span>
                                            <span class="article-summary"><?php echo $blogsArray[$counter]["summary"]; ?></span>
                                        </div>
                                    </a>
                                    <div class="article-meta">
                                        <a href="blog/index/<?php echo $blogsArray[$counter]["id"]."/".$blogsArray[$counter]["link_rewrite"]; ?>#comments" class="comments-link"
                                           data-analytics="sticky-blog" data-analytics-panel="page:home - slot:0 - blog:19990667 - image:19992979 - comments:1 || <?php echo $blogsArray[$counter]["title"]; ?>">
                                            1</a>
                                        <span class="publish-date" title="<?php echo $blogsArray[$counter]["date"]; ?>"><?php echo str_replace("-", "/", $blogsArray[$counter]["amd"]); ?></span>
                                    </div>
                                </div>
                            </li>
                            <?php
                        }
                        $counter++;
                    }
                    else
                        $i = 3;
                }
                ?>
            </ul>
        </div>
        <span class="clear"><!-- --></span>
        <div id="blog-articles" class="blog-articles" itemscope="itemscope" itemtype="http://schema.org/Blog">
            <?php
            for($i = 0; $i < count($blogsArray); $i++) {
                ?>
                <div class="article-wrapper">
                    <a href="blog/index/<?php echo $blogsArray[$i]["id"]."/".$blogsArray[$i]["link_rewrite"]; ?>" itemprop="url">
                        <div class="article-image"
                             style="background-image:url(/akamaihd_us/cms/blog_thumbnail/fe/FE8PSHFCZJZ01438816169989.jpg)">
                            <div class="article-image-frame"></div>
                        </div>
                        <div class="article-content" itemprop="blogPost" itemscope="itemscope"
                             itemtype="http://schema.org/BlogPosting">
                            <h2 class="header-2">
                            <span class="article-title" itemprop="headline">
                                <?php echo $blogsArray[$i]["title"]; ?>
                            </span>
                            </h2>
                            <span class="clear"><!-- --></span>

                            <div class="article-summary" itemprop="description">
                                <?php echo $blogsArray[$i]["summary"]; ?>
                            </div>
                            <span class="clear"><!-- --></span>
                            <meta itemprop="datePublished" content="<?php echo $blogsArray[$i]["date"]; ?>"/>
                            <meta itemprop="dateModified" content="<?php echo $blogsArray[$i]["last_modify"]; ?>"/>
                            <meta itemprop="inLanguage" content="it-IT"/>
                            <meta itemprop="interactionCount" content="UserComments:1"/>
                            <meta itemprop="thumbnailUrl"
                                  content="//bnetcmsus-a.akamaihd.net/cms/blog_thumbnail/fe/FE8PSHFCZJZ01438816169989.jpg"/>
                        </div>
                    </a>

                    <div class="article-meta">
                        <span class="publish-date" title="<?php echo $blogsArray[$i]["date"]; ?>">
                        <?php
                            $datenow = time();
                            $date = new DateTime($blogsArray[$i]["date"]);
                            $timestampCreation = $date->getTimestamp();
                            $diff = $datenow - $timestampCreation;
                            if($diff/60 > 1 && $diff/3600 < 1 )
                                echo floor(round($diff/60, PHP_ROUND_HALF_UP)) . " minuti fa.";
                            else
                                if($diff/3600 > 1 && $diff/86400 < 1)
                                    echo floor(round($diff/3600, PHP_ROUND_HALF_UP)) . " ore fa.";
                                else
                                    if($diff/86400 > 1 && $diff/604800 < 1)
                                        echo floor(round($diff/86400, PHP_ROUND_HALF_UP)) . " giorni fa.";
                                    else
                                        if($diff/604800 > 1 && $diff/2592000 < 1)
                                            echo floor(round($diff/604800, PHP_ROUND_HALF_UP)) . " settimane fa.";
                                        else
                                            if($diff/2592000 > 1 && $diff/31536000 < 1)
                                                echo floor(round($diff/604800, PHP_ROUND_HALF_UP)) . " mesi fa.";
                                            else
                                                if($diff/31536000 > 1)
                                                    echo floor(round($diff/604800, PHP_ROUND_HALF_UP)) . " anni fa.";
                                                else
                                                    echo "error calculating time diff";
                        ?>
                    </span>
                        <a href="blog/index/<?php echo $blogsArray[$i]["id"]."/".$blogsArray[$i]["link_rewrite"]; ?>#comments"
                           class="comments-link">1</a>
                    </div>
                    <span class="clear"><!-- --></span>
                </div>
                <?php
            }
            ?>
        </div>
        <div class="blog-load-more">
            <a class="load-more" id="load-more" href="javascript:;">Espandi</a>
            <span class="clear"><!-- --></span>
        </div>
    </div>
</div>
<script type="text/javascript">
    //<![CDATA[
    $(function(){

        Blog.init({
            loadMore: true,
            loadMorePath: "/wow/it/blog/infinite",
            loadMoreArticleTarget: "#blog-articles",
            loadMoreArticleType: "blog",
            loadMoreArticleLimit: 11
        });

    });
    //]]>
</script>