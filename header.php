<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <div class="wrapper">
        <header class="header">

            <div class="header__logo">
                <img src="<?php echo get_template_directory_uri() . '/assets/images/global/logo.png'; ?>" alt="16X9 video production">
            </div>

            <a href="" class="header__link">
                Заказать проект
            </a>

            <div class="header__lang-switch">
                <button class="header__btn">
                    RU
                </button>
                <button class="header__btn">
                    EN
                </button>
            </div>

            <button class="header__btn header__btn--mobile">
                EN
            </button>
        </header>