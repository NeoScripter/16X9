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

    <style>

    </style>
</section>

<?php get_footer(); ?>