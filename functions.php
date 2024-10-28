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
function load_js()
{
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
if (has_post_thumbnail()) {
    the_post_thumbnail('bio-vertical');
}

// Creating a menu
function register_menus()
{
    register_nav_menus(
        array(
            'header-menu' => __('Header Menu'),
            'footer-menu' => __('Footer Menu')
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

function get_permalink_by_slug($page_slug)
{
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

function set_current_language()
{
    if (isset($_GET['lang'])) {
        $lang = $_GET['lang'];

        setcookie('current_lang', $lang, time() + (3600 * 24 * 30), '/');

        header("Location: " . strtok($_SERVER["REQUEST_URI"], '?'));
        exit;
    }
}

add_action('init', 'set_current_language');

function get_current_language()
{
    return isset($_COOKIE['current_lang']) ? $_COOKIE['current_lang'] : 'en';
}

function fetch_video_categories2()
{
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


// Function to fetch video categories from 'video_group' post type
function fetch_video_categories()
{
    $video_categories = [];
    $args = [
        'post_type' => 'video_group',
        'posts_per_page' => -1,
    ];
    $video_groups = new WP_Query($args);

    if ($video_groups->have_posts()) {
        while ($video_groups->have_posts()) {
            $video_groups->the_post();

            $current_lang = get_current_language();
            $field_name = '';
            if ($current_lang == 'en') {
                $field_name = 'category_name';
            } else {
                $field_name = 'category_name_ru';
            };

            $category_name = get_field($field_name);
            if ($category_name) {
                $video_categories[] = [
                    'id' => get_the_ID(),
                    'acf_name' => $category_name,
                ];
            }
        }
        wp_reset_postdata();
    }
    return $video_categories;
}

function fetch_videos_by_category($category_id)
{
    $portfolio_items = [];
    $flexible_field = get_field('videos_portfolio', $category_id);

    if ($flexible_field && is_array($flexible_field)) {
        foreach ($flexible_field as $layout) {
            // Check if 'acf_fc_layout' is set
            $layout_type = isset($layout['acf_fc_layout']) ? $layout['acf_fc_layout'] : '';

            // Determine the number of videos needed based on the layout type
            $max_videos = ($layout_type === 'rectangle_horizontal') ? 3 : 2;

            // Ensure 'portfolio_piece' exists and is an array
            if (isset($layout['portfolio_piece']) && is_array($layout['portfolio_piece'])) {
                $videos = [];

                // Loop through each video piece within the layout
                foreach ($layout['portfolio_piece'] as $video_piece) {
                    // Check if $video_piece is an array and contains 'portfolio_preview'
                    if (is_array($video_piece) && isset($video_piece['portfolio_preview'])) {
                        $portfolio_preview = $video_piece['portfolio_preview'];

                        // Check if 'portfolio_preview' is an array and has 'url'
                        $video_url = is_array($portfolio_preview) && isset($portfolio_preview['url'])
                            ? $portfolio_preview['url']
                            : '';

                        $high_quality = $video_piece['high_quality_video'];

                        // Check if 'portfolio_preview' is an array and has 'url'
                        $high_quality_url = is_array($high_quality) && isset($high_quality['url'])
                            ? $high_quality['url']
                            : '';

                        $thumbnail = isset($video_piece['portfolio_image']['url']) ? $video_piece['portfolio_image']['url'] : '';
                        $is_rounded = !empty($video_piece['is_rounded']);


                        // Add the video to the current portfolio item
                        $videos[] = [
                            'video_url' => $video_url,
                            'layout_type' => $layout_type,
                            'thumbnail' => $thumbnail,
                            'high_quality' => $high_quality_url,
                            'is_rounded' => $is_rounded,
                        ];
                    }

                    // Break if we have enough videos for the current item
                    if (count($videos) >= $max_videos) {
                        break;
                    }
                }

                // Add empty slots if there are fewer videos than required
                while (count($videos) < $max_videos) {
                    $videos[] = [
                        'video_url' => '',
                        'layout_type' => $layout_type,
                        'thumbnail' => '',
                        'high_quality' => '',
                        'is_rounded' => false,
                    ];
                }

                // Add the portfolio item to the result
                $portfolio_items[] = $videos;
            }
        }
    }

    return $portfolio_items;
}


function fetch_videos_ajax_handler()
{
    // Ensure the category ID is provided
    if (!isset($_POST['category_id']) || !is_numeric($_POST['category_id'])) {
        wp_send_json_error('Invalid category ID');
    }

    $category_id = intval($_POST['category_id']);
    $videos = fetch_videos_by_category($category_id);

    if (!empty($videos)) {
        wp_send_json_success($videos);
    } else {
        wp_send_json_error('No videos found');
    }
}
add_action('wp_ajax_fetch_videos', 'fetch_videos_ajax_handler');
add_action('wp_ajax_nopriv_fetch_videos', 'fetch_videos_ajax_handler');
