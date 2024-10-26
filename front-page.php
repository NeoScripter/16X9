<?php get_header(); ?>

<section class="hero">

    <p class="hero__headline"><?php echo get_field('hero_top_text'); ?></p>

    <h1 class="hero__title"><?php echo get_field('hero_middle_text'); ?>
    </h1>

    <p class="hero__underline"><?php echo get_field('hero_bottom_text'); ?></p>

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

    <!-- Popup Structure -->
    <div class="video-popup" id="video-popup">
        <div class="video-popup__overlay"></div>
        <div class="video-popup__content">
            <button class="video-popup__close">&times;</button>
            <video class="video-main" controls>
                <source type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>

</section>

<?php get_footer(); ?>