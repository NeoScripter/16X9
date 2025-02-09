<?php get_header(); ?>

<section class="hero">

    <p class="hero__headline">
        <?php
        $current_lang = get_current_language();
        if ($current_lang == 'en') {
            echo get_field('hero_top_text');
        } else {
            echo get_field('hero_top_text_ru');
        }; ?>
    </p>

    <h1 class="hero__title">
        <?php
        if ($current_lang == 'en') {
            echo get_field('hero_middle_text');
        } else {
            echo get_field('hero_middle_text_ru');
        }; ?>
    </h1>

    <p class="hero__underline">
        <?php
        if ($current_lang == 'en') {
            echo get_field('hero_bottom_text');
        } else {
            echo get_field('hero_bottom_text_ru');
        }; ?>
    </p>

    <div class="hero__video">
        <div class="hero__pattern"></div>

        <?php
        $video = get_field('hero_video');
        if ($video): ?>
            <video
                muted
                autoplay
                loop
                poster="<?php echo get_field('hero_preview')['url']; ?>">
                <source src="<?php echo esc_url($video); ?>" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        <?php endif; ?>

    </div>

</section>

<section class="featured">

    <div class="featured__kassette">
        <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/kassette.png'; ?>" alt="pink kassette">
    </div>

    <div class="featured__wrapper popup-videos-parent">
        <?php if (have_rows('featured_video')): while (have_rows('featured_video')): the_row(); ?>
                <div class="featured__video">
                    <div class="featured__video-gradient"></div>
                    <video
                        class="video-preview"
                        muted
                        loop
                        poster="<?php echo get_sub_field('featured_thumbnail')['url']; ?>"
                        data-high-quality="<?php echo get_sub_field('featured_video_file_high_quality')['url']; ?>">
                        <source src="<?php echo get_sub_field('featured_video_file')['url']; ?>" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
        <?php endwhile;
        endif; ?>
    </div>

    <div class="popup__overlay" id="popup__overlay">
        <div class="popup__content">
            <button class="popup__close-btn">&times;</button>
            <video class="popup__video" controls>
                <source type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>

</section>
</div>

<section class="marquee">

    <?php
    $video = '';
    if ($current_lang == 'en') {
        $video = get_field('marquee_video');
    } else {
        $video = get_field('marquee_video_ru');
    }; ?>
    <video
        muted
        autoplay
        loop>
        <source src="<?php echo $video['url']; ?>" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</section>

<div class="wrapper">
    <section class="portfolio">

        <div class="portfolio__categories">
            <?php $video_categories_with_acf = fetch_video_categories(); ?>
            <?php foreach ($video_categories_with_acf as $index => $category): ?>
                <button class="portfolio__category <?php echo $index === 0 ? 'portfolio__category--active' : ''; ?>"
                    data-category-id="<?php echo $category['id']; ?>">
                    <?php echo esc_html($category['acf_name']); ?>
                </button>
            <?php endforeach; ?>
        </div>

        <div class="portfolio__arrow">
            <img src="<?php echo get_template_directory_uri() . '/assets/images/global/arrow-white.png'; ?>" alt="">
        </div>

        <div class="portfolio__viewport popup-videos-parent">
            <div class="portfolio__gallery" id="portfolio-gallery" data-ajax-url="<?php echo esc_url(admin_url('admin-ajax.php')); ?>">
                <?php
                $initial_portfolio_items = fetch_videos_by_category($video_categories_with_acf[0]['id']);
                foreach ($initial_portfolio_items as $videos):
                    $layout_type = $videos[0]['layout_type'];
                ?>
                    <div class="portfolio__item portfolio__item--<?php echo esc_attr($layout_type); ?>">
                        <?php foreach ($videos as $video): ?>
                            <div class="portfolio__video <?php echo $video['is_rounded'] ? 'portfolio__video--rounded' : ''; ?> <?php echo empty($video['video_url']) ? 'portfolio__video--empty' : ''; ?>">
                                <?php if (!empty($video['video_url'])): ?>
                                    <video
                                        class="video-preview"
                                        muted
                                        loop
                                        poster="<?php echo esc_url($video['thumbnail']); ?>"
                                        data-high-quality="<?php echo $video['high_quality']; ?>"
                                        src="<?php echo esc_url($video['video_url']); ?>"></video>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>


        <button class="portfolio__btn">Показать больше проектов</button>

    </section>

    <section class="brands">

        <div class="brands__wrapper">
            <div class="brands__content">
                <?php
                if ($current_lang == 'en') {
                    echo get_field('brands_text');
                } else {
                    echo get_field('brands_text_ru');
                }; ?>
            </div>

            <picture>
                <!-- Image for screens larger than 1024px -->
                <source srcset="<?php echo get_template_directory_uri() . '/assets/images/brands/brands-large.png'; ?>" media="(min-width: 1024px)">

                <!-- Fallback image -->
                <img src="<?php echo get_template_directory_uri() . '/assets/images/brands/brands-small.png'; ?>" alt="brands list">
            </picture>

        </div>

    </section>
</div>

<section class="kassette">
    <?php
    $video = '';
    if ($current_lang == 'en') {
        $video = get_field('kassette');
    } else {
        $video = get_field('kassette_ru');
    }; ?>
    <video
        muted
        autoplay
        loop>
        <source src="<?php echo $video['url']; ?>" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</section>

    <section class="typing">

        <div class="typing__wrapper">
            <div class="typing__text <?php echo $current_lang == 'en' ? 'typing__text--eng' : ''; ?>">
                <?php
                $span_content = '';
                if ($current_lang == 'en') {
                    $span_content = get_field('typing_animation');
                } else {
                    $span_content = get_field('typing_animation_ru');
                }; ?>
                <span class="typing__bg-text"><?php echo $span_content; ?></span>
                <span class="typing__front-text"></span>
            </div>
        </div>

            <div class="typing__video">
                <div class="typing__pattern"></div>

                <button class="typing__play-btn">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/global/play-btn.png'; ?>" alt="play button">
                </button>

                <?php
                $video = get_field('typing_video');
                if ($video): ?>
                    <video
                     
                        loop
                        poster="<?php echo get_field('typing_preview')['url']; ?>">
                        <source src="<?php echo esc_url($video['url']); ?>" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                <?php endif; ?>
            </div>

    </section>

    <div class="wrapper">
    <section class="parallax">

        <div class="parallax__categories">

            <?php foreach ($video_categories_with_acf as $index => $category): ?>
                <div class="parallax__category <?php echo ' parallax__category-' . $index + 1; ?>">
                    <div class="parallax__flex">
                        <img src="<?php echo get_template_directory_uri() . '/assets/images/global/plus.svg'; ?>" alt="Pink plus sign">
                        <?php echo esc_html($category['acf_name']); ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <a href="<?php echo get_field('telegram_link', 'options'); ?>" class="parallax__link">
            <?php include get_template_directory() . '/assets/images/global/parallax_link.svg'; ?>
            <?php
            if ($current_lang == 'en') {
                echo 'reach out';
            } else {
                echo 'обсудить проект';
            }; ?>
        </a>
    </section>

    <?php get_footer(); ?>