<?php

// Load stylesheets
function load_css()
{
    wp_enqueue_style('local-fonts', get_template_directory_uri() . '/assets/fonts/fonts.css', array(), null);
    wp_register_style('style', get_template_directory_uri() . '/assets/dist/css/styles.css', [], '1.0', 'all');
    wp_enqueue_style('style');
}
add_action('wp_enqueue_scripts', 'load_css');

// Load JavaScript
function load_js() {
    wp_register_script(
        'main-bundle',  // Handle
        get_template_directory_uri() . '/assets/dist/js/main.bundle.js',  // Path to the script
        [],  // Dependencies
        filemtime(get_template_directory() . '/assets/dist/js/main.bundle.js'),  // Version for cache busting
        true  // Load in footer
    );

    wp_enqueue_script('main-bundle');

    wp_register_script('marquee-lib.js', 'https://cdn.jsdelivr.net/npm/jquery.marquee/jquery.marquee.min.js', ['jquery'], '1.0', true);
    wp_enqueue_script('marquee-lib.js');

    wp_register_script('marquee.js', get_template_directory_uri() . '/assets/dist/js/marquee.js', ['jquery'], '1.0', true);
    wp_enqueue_script('marquee.js');

    wp_script_add_data('main-bundle', 'defer', true);
}
add_action('wp_enqueue_scripts', 'load_js');

function enqueue_custom_scripts()
{
    wp_enqueue_script('jquery');
}

add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

// Theme Options
add_theme_support('menus');
add_theme_support('post-thumbnails');
add_theme_support('widgets');

// Custom image sizes
add_image_size('extra-large', 1800, 1800, false);
add_image_size('large', 1200, 1200, false);
add_image_size('medium', 800, 800, false);
add_image_size('small', 400, 400, false);
add_image_size('tiny', 20, 20, false);

// Use the custom thumbnail size
if ( has_post_thumbnail() ) {
    the_post_thumbnail('bio-vertical');
}

// Creating a menu
function register_menus()
{
    register_nav_menus(
        array(
            'header-menu' => __( 'Header Menu' ),
            'footer-menu' => __( 'Footer Menu' )
        )
    );
}
add_action('init', 'register_menus');

// Adding svgs
function cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');


function get_permalink_by_title($page_title)
{
    $page = get_posts([
        'post_type'   => 'page',
        'title'       => $page_title,
        'numberposts' => 1,
    ]);

    if ($page) {
        return get_permalink($page[0]->ID);
    }

    return '';
}

function get_permalink_by_slug($page_slug) {
    $page = get_posts([
        'post_type' => 'page',
        'name'      => $page_slug,
        'numberposts' => 1,
    ]);

    if ($page) {
        return get_permalink($page[0]->ID);
    }

    return '';
}

function custom_excerpt_length($length)
{
    return 30;
}
add_filter('excerpt_length', 'custom_excerpt_length');

function set_current_language() {
    if (isset($_GET['lang'])) {
        $lang = $_GET['lang'];

        setcookie('current_lang', $lang, time() + (3600 * 24 * 30), '/');

        header("Location: " . strtok($_SERVER["REQUEST_URI"], '?'));
        exit;
    }
}

add_action('init', 'set_current_language');

function get_current_language() {
    return isset($_COOKIE['current_lang']) ? $_COOKIE['current_lang'] : 'en';
}

function fetch_video_categories() {
    $video_categories = get_terms([
        'taxonomy' => 'video_category',
        'hide_empty' => false, 
    ]);

    if (!empty($video_categories) && !is_wp_error($video_categories)) {
        $categories_with_acf = [];

        foreach ($video_categories as $category) {
            $field_name = '';
            $current_lang = get_current_language();
            if ($current_lang == 'en') {
                $field_name = 'video_category_name';
            } else {
                $field_name = 'video_category_name_ru';
            };
            $video_category_name = get_field($field_name, 'video_category_' . $category->term_id);

            if ($video_category_name) {
                $categories_with_acf[] = [
                    'term_id' => $category->term_id,
                    'name' => $category->name,
                    'acf_name' => $video_category_name,
                ];
            }
        }

        return $categories_with_acf;
    }

    return []; 
}