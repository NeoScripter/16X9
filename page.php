<?php get_header(); ?>

<?php if(have_posts()): while(have_posts()): the_post();?>

<div class="wrapper">
    <section class="single-page">
    <h1><?php the_title();?></h1>
    <?php the_content();?>
    </section>
</div>

<?php endwhile; else: endif;?>

<?php get_footer(); ?>