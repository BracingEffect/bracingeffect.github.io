var agent = navigator.userAgent || navigator.vendor || window.opera || '';
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
var isIOS = /iPhone|iPad|iPod/i.test(agent);

if (isIOS) {
    {% include js/iosfix.js %}
}

if (isMobile) {
    var getWindowHeight = function() {
        // Get zoom level of mobile Safari
        // Note, that such zoom detection might not work correctly in other
        // browsers. We use width, instead of height, because there are no
        // vertical toolbars :)
        var zoomLevel = (document.documentElement.clientWidth /
                         window.innerWidth);
        // window.innerHeight returns height of the visible area.
        // We multiply it by zoom and get out real height.
        return window.innerHeight * zoomLevel;
    };
} else {
    var getWindowHeight = function() {
        return $(window).height()
    };
}

jQuery(document).ready(function($) {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            container : 'body'
        })
    })

    var $document = $(document),
        $body = $('body'),
        $htmlbody = $('html,body'),
        $contactLink = $('#internal-contact-link'),
        $internalLink = $('#internal-calendar-link, #internal-clock-link'),
        $slides = $('#slides'),
        $days = $('td.day');

    $contactLink.click(function(event) {
        event.preventDefault();
        $htmlbody.animate({
            scrollTop: $document.height() - getWindowHeight()
        }, 500, 'easeInOutQuint');
    });

    $internalLink.click(function(event) {
        event.preventDefault();
        $htmlbody.animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'easeInOutQuint');
    });

    $days.hover(function(event) {
        try {
            var dayNumber = $(this).data("day");
            $("td.day-" + dayNumber).addClass("active").tooltip("show");
        } catch(ex) {}
    },
    function(event) {
        try {
            var dayNumber = $(this).data("day");
            $("td.day.active").removeClass("active").tooltip("hide");
        } catch(ex) {}
    });

    $slides.owlCarousel({
        singleItem: true,
        autoPlay: true,
        stopOnHover: true,
        startDragging: function(base) {
            $body.addClass('grabbing');
        }
    });
    $slides.css('overflow', 'visible');
    $body.on('mouseup touchend', function() {
        $body.removeClass('grabbing');
    });
});
