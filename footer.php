</div>
<footer class="footer">
    <div class="footer__flex">
        <a href="<?php echo get_field('rutube_link', 'options'); ?>" class="footer__link">RUTUBE</a>
        <a href="mailto:<?php echo get_field('email_link', 'options'); ?>" class="footer__link">EMAIL</a>
        <div class="footer__qr">
            <div class="footer__image">
                <img src="<?php echo get_field('qr_image')['url'] ;?>" alt="">
            </div>
            <a href="<?php echo get_field('telegram_link', 'options'); ?>" class="footer__link">TELEGRAM</a>
        </div>
    </div>

    <h2 class="footer__title">VIDEO PRODUCTION</h2>
</footer>
<?php wp_footer(); ?>
</body>

</html>