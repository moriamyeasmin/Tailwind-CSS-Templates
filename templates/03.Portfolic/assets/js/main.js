
$(document).ready(function(){
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Mobile Menu Toggle
    $('#mobile-menu-button').click(function(){
        $('#mobile-menu').slideToggle(300);
    });
    
    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 80
        }, 800, 'swing');
        
        // Close mobile menu if open
        $('#mobile-menu').slideUp(300);
    });
    
    // Stats Counter Animation
    $('.counter').each(function() {
        var $this = $(this);
        var countTo = $this.attr('data-count');
        
        $({ countNum: 0 }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });
    
    // Skills Progress Bar Animation
    $('.skill-progress').each(function() {
        var $this = $(this);
        var width = $this.attr('data-width');
        
        // Animate skill progress bars when they come into view
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    $this.animate({
                        width: width + '%'
                    }, 1500);
                    
                    // Animate percentage numbers
                    var $percentElement = $this.closest('.mb-8').find('.skill-percent');
                    var percent = $percentElement.attr('data-percent');
                    
                    $({ percentNum: 0 }).animate({
                        percentNum: percent
                    }, {
                        duration: 1500,
                        step: function() {
                            $percentElement.text(Math.floor(this.percentNum) + '%');
                        },
                        complete: function() {
                            $percentElement.text(this.percentNum + '%');
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe($this[0]);
    });
    
    // Initialize MixItUp Portfolio Filter
    var mixer = mixitup('#portfolio-grid', {
        animation: {
            duration: 300,
            effects: 'fade translateZ(-100px)'
        }
    });
    
    // Portfolio Filter Button Active State
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active-filter bg-primary-orange text-white');
        $('.filter-btn').addClass('bg-white text-primary-gray');
        $(this).addClass('active-filter bg-primary-orange text-white');
        $(this).removeClass('bg-white text-primary-gray');
    });
    
    // Contact Form Submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        // Simple form validation
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
        
        if(name && email && message) {
            // In a real application, you would send the form data to a server here
            alert('ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে। আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            $('#contact-form')[0].reset();
        } else {
            alert('দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।');
        }
    });
    
    // Back to Top Button
    $('#back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    
    // Show/Hide Back to Top Button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    
    // Hover effect for portfolio items
    $('.portfolio-item').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );
    
    // Service cards animation on hover
    $('.service-card').hover(
        function() {
            $(this).css('transform', 'translateY(-10px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
});
