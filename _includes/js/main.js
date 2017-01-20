
jQuery(document).ready(function($) {

    var $window = $(window),
        $body = $('body'),
        $navbar = $('#top-navbar'),
        $navbarContent = $('#top-navbar-content'),
        $navbarToggle = $('#top-navbar-toggle'),
        $titleImage = $('#be-title');

    $body.localScroll({
        filter:'.smoothScroll',
        duration: 300,
        hash: true,
        onBefore: function() {
            if ($navbarToggle.is(':visible')) {
                $navbarContent.collapse('hide');
            }
        }
    });

    $navbarContent.on('hide.bs.collapse', function () {
        $navbar.removeClass('expanded');
    });

    $navbarContent.on('show.bs.collapse', function () {
        $navbar.addClass('expanded');
    });

    var imageTop = $titleImage.offset().top;
    var imageCenter = imageTop + ($titleImage.outerHeight() / 2);
    var navbarHeight = $navbar.outerHeight()
    var transparencyOffset = imageCenter - navbarHeight;

    var updateNavbarTransparency = function() {
        if ($window.scrollTop() >= transparencyOffset) {
            $navbar.addClass('opaque');
        } else {
            $navbar.removeClass('opaque');
        }
    };
    updateNavbarTransparency();
    $window.scroll(updateNavbarTransparency);
});
