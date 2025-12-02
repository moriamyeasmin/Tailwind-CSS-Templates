
$(document).ready(function(){
    // ১. মোবাইল মেনু টগল
    $("#mobile-menu-button").click(function(){
        $("#mobile-menu").toggleClass("open");
        $(this).find('i').toggleClass('fa-bars fa-times');
    });
    
    // ২. স্টিকি হেডার
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $(".sticky-header").addClass("scrolled");
        } else {
            $(".sticky-header").removeClass("scrolled");
        }
        
        // Back to Top Button Visibility
        if ($(window).scrollTop() > 300) {
            $("#back-to-top").css("opacity", "1");
        } else {
            $("#back-to-top").css("opacity", "0");
        }
    });
    
    // ৩. ডেস্টিনেশন স্লাইডার
    $("#destinations-carousel").slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }
        ]
    });
    
    // ৪. ডেস্টিনেশন মডাল
    $(".explore-btn").click(function(){
        const title = $(this).data("title");
        const desc = $(this).data("desc");
        const imageSrc = $(this).closest('.relative').find('img').attr('src');
        
        $("#modal-title").text(title);
        $("#modal-desc").text(desc);
        $("#modal-image").attr("src", imageSrc);
        $("#destination-modal").removeClass("hidden").addClass("flex");
    });
    
    $("#close-modal, #destination-modal").click(function(e){
        if(e.target.id === "destination-modal" || e.target.id === "close-modal") {
            $("#destination-modal").addClass("hidden").removeClass("flex");
        }
    });
    
    $("#book-tour").click(function(){
        alert("Thank you for your interest! Our travel experts will contact you shortly to arrange your tour.");
        $("#destination-modal").addClass("hidden").removeClass("flex");
    });
    
    // ৫. ইমেজ লাইটবক্স
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });
    
    // ৬. ফর্ম সাবমিশন
    $("#subscribe-form").submit(function(e){
        e.preventDefault();
        const email = $("#email-input").val();
        
        // এখানে AJAX কল করা যেতে পারে
        // উদাহরণস্বরূপ:
        // $.post("/api/subscribe", { email: email }, function(response){
        //     // সাফল্যের পরে
        // });
        
        // সিমুলেটেড সাফল্য
        $("#success-message").removeClass("hidden").addClass("animate__animated animate__fadeIn");
        $("#email-input").val('');
        
        // সাফল্যের মেসেজ ৫ সেকেন্ড পরে লুকান
        setTimeout(function(){
            $("#success-message").addClass("hidden");
        }, 5000);
    });
    
    // ৭. ব্যাক টু টপ বাটন
    $("#back-to-top").click(function(){
        $("html, body").animate({ scrollTop: 0 }, 800);
        return false;
    });
    
    // ৮. নেভিগেশন লিংকগুলির জন্য স্ক্রোলিং
    $('a[href^="#"]').not('.slick-arrow').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
            
            // মোবাইলে মেনু বন্ধ করুন
            $("#mobile-menu").removeClass("open");
            $("#mobile-menu-button").find('i').removeClass('fa-times').addClass('fa-bars');
        }
    });
    
    // ৯. কার্ড এনিমেশন on scroll
    function animateOnScroll() {
        $('.card-hover').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    }
    
    // প্রথম লোডে এবং স্ক্রোল এ এনিমেশন চালু করুন
    animateOnScroll();
    $(window).scroll(animateOnScroll);
    
    // ১০. কার্ড হোভার এফেক্ট
    $('.card-hover').hover(
        function() {
            $(this).addClass('shadow-xl');
        },
        function() {
            $(this).removeClass('shadow-xl');
        }
    );
});
