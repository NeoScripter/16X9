<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php
$languages = [
    'en' => 'EN',
    'ru' => 'RU'
];

$current_lang = get_current_language();
?>

    <div class="wrapper">
        <header class="header">

            <div class="header__logo">
                <img src="<?php echo get_template_directory_uri() . '/assets/images/global/logo.png'; ?>" alt="16X9 video production">
            </div>

            <a href="<?php echo get_field('telegram_link', 'options'); ?>" class="header__link">
                <?php
                if ($current_lang == 'en') {
                    echo 'Get in Touch';
                } else  {
                    echo 'Заказать проект';
                }
                ;?>
            </a>

            <div class="header__lang-switch">
                <?php
                foreach ($languages as $lang_code => $lang_name) {
                    $opposite_lang = $lang_code === 'en' ? 'ru' : 'en';
                    echo '<a href="?lang=' . $opposite_lang . '" class="header__btn ' . ($current_lang !== $lang_code ? 'header__btn--active' : '') . '">' . $lang_name . '</a> ';
                }
                ;?>
            </div>

            <?php
                $opposite_lang = $current_lang === 'en' ? 'ru' : 'en';
                echo '<a href="?lang=' . $opposite_lang . '" class="header__btn header__btn--mobile">' . $languages[$current_lang] . '</a> ';
                ;?>
        </header>
        