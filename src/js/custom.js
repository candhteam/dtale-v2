jQuery.validator.methods.matches = function (value, element, params) {
    var re = new RegExp(params);
    return this.optional(element) || re.test(value);
}

$(document).ready(function () {
    $(".menu .ham-btn").click(function (e) {
        e.preventDefault();
        $(this).toggleClass('btn-active');
        $(this).parent().toggleClass('menu-active');
    });

    $(".has-submenu .chair_li").mouseover(function () {
        $(".chair_item").addClass("active_item");
        $(".tables_item").removeClass("active_item");
        $(".consoles_item").removeClass("active_item");

        $(".submenu__menu__ul__li").removeClass("active_li");
        $(this).addClass("active_li");

    });
    $(".has-submenu .tables_li").mouseover(function () {
        $(".tables_item").addClass("active_item");
        $(".chair_item").removeClass("active_item");
        $(".consoles_item").removeClass("active_item");

        $(".submenu__menu__ul__li").removeClass("active_li");
        $(this).addClass("active_li");
    });
    $(".has-submenu .consoles_li").mouseover(function () {
        $(".consoles_item").addClass("active_item");
        $(".chair_item").removeClass("active_item");
        $(".tables_item").removeClass("active_item");

        $(".submenu__menu__ul__li").removeClass("active_li");
        $(this).addClass("active_li");
    });

    $('.banner-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true
    });
    $('.product-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        // fade: true,
        cssEase: 'linear',
        // autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 545,
                settings: "unslick"
            }
        ]

    });

    $('.product_slider-for').slick({
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.product_slider-nav',
        swipe: false
    });
    $('.product_slider-nav').slick({
        dots: false,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.product_slider-for',
        // centerMode: true,
        focusOnSelect: true,

    });

    $('.home-image-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 545,
                settings: "unslick"
            }
        ]
    });

    // ================booking_model starts here============================
    $(".booking_form").click(function (e) {
        e.preventDefault();
        $(".booking_model").addClass("booking_model_open");
    });

    $(".form_modal .form_modal_container .close").click(function (e) {
        e.preventDefault();
        $(".booking_model").removeClass("booking_model_open");
    });
    // ================booking_model ends here==============================
    const slider = document.querySelector('.items');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }




    $("#appointment-form").validate({
        rules: {
            fname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phoneNumber: {
                required: true,
                matches: "^(\\d|\\s)+$",
                minlength: 10,
                maxlength: 20
            },
            date: {
                required: true
            }
        },
        messages: {
            phoneNumber: {
                matches: "Please enter valid phone number"
            }
        },
        submitHandler: function (form) {



            $.ajax({
                url: './mailer.php',
                data: $(form).serialize(),
                // processData: false,
                // contentType: false,
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    //load json data from server and output message
                    if (response.type == 'error') { //load json data from server and output message
                        // output = '<div class="error">' + response.text + '</div>';
                    } else {
                        output = '<div class="success">' + response.text + '</div>';
                        $("#response").css({ 'display': 'flex' }).html(output).slideDown();
                        setTimeout(function () {
                            $("#response").slideUp().css({ 'display': 'none' });
                            $(form)[0].reset()
                        }, 4000);
                    }


                }
            });
        }
    })


});