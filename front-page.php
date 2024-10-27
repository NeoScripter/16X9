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

                loop
                poster="<?php echo get_template_directory_uri() . '/assets/images/global/hero-preview.webp'; ?>">
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

    <div class="featured__wrapper">
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

<section class="marquee">
    <div class="marquee__wrapper">
        <?php for ($j = 0; $j < 16; $j++): ?>
            <div class="marquee__slide">
                <h2 class="marquee__title">
                    <?php
                    if ($current_lang == 'en') {
                        echo get_field('marquee_text');
                    } else {
                        echo get_field('marquee_text_ru');
                    }; ?>
                </h2>
                <h2 class="marquee__title">
                    <?php
                    if ($current_lang == 'en') {
                        echo get_field('marquee_text');
                    } else {
                        echo get_field('marquee_text_ru');
                    }; ?>
                </h2>
            </div>
        <?php endfor; ?>
    </div>

</section>

<section class="portfolio">

    <div class="portfolio__categories">
        <?php $video_categories_with_acf = fetch_video_categories() ;?>

        <?php foreach ($video_categories_with_acf as $category):?>

            <button class="portfolio__category <?php echo $category['term_id'] === 2 ? 'portfolio__category--active' : '' ;?>">
                <?php echo $category['acf_name'] ;?>
            </button>
        <?php endforeach ;?>
    </div>

    <div class="portfolio__viewport">

        <div class="portfolio__gallery">

            <div class="portfolio__item portfolio__item--square-horizontal">
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
                <div class="portfolio__video portfolio__video--rounded">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
            </div>

            <div class="portfolio__item portfolio__item--square-vertical">
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-2.png'; ?>" alt="">
                </div>
                <div class="portfolio__video portfolio__video--rounded">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-2.png'; ?>" alt="">
                </div>
            </div>

            <div class="portfolio__item portfolio__item--square-horizontal">
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
            </div>

            <div class="portfolio__item portfolio__item--rectangle-horizontal">
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
                <div class="portfolio__video">
                    <img src="<?php echo get_template_directory_uri() . '/assets/images/featured/featured-1.png'; ?>" alt="">
                </div>
            </div>

        </div>

    </div>

    <button class="portfolio__btn">Показать больше проектов</button>

</section>

<?php get_footer(); ?>