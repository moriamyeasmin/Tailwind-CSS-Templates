$(document).ready(function() {
    
    // 1. Header Scroll Effect
    $(window).scroll(function() {
        const scroll = $(window).scrollTop();
        const $header = $('.sticky-header');
        
        if (scroll > 100) {
            $header.addClass('scrolled');
            $header.removeClass('glass-effect');
            $header.css({
                'background-color': 'rgba(17, 24, 39, 0.95)',
                'backdrop-filter': 'blur(10px)',
                'box-shadow': '0 10px 30px rgba(0, 0, 0, 0.3)'
            });
        } else {
            $header.removeClass('scrolled');
            $header.addClass('glass-effect');
            $header.css({
                'background-color': '',
                'box-shadow': ''
            });
        }
        
        // Back to top button visibility
        if (scroll > 500) {
            $('#back-to-top').css('opacity', '1');
        } else {
            $('#back-to-top').css('opacity', '0');
        }
    });
    
    // 2. Mobile Menu Toggle
    $('#mobile-menu-toggle').click(function() {
        $('#mobile-menu').slideToggle(300);
        $(this).find('i').toggleClass('fa-bars fa-times');
    });
    
    // 3. Smooth Scrolling for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const headerHeight = $('.sticky-header').outerHeight();
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - headerHeight + 10
            }, 800);
            
            // Close mobile menu if open
            if ($('#mobile-menu').is(':visible')) {
                $('#mobile-menu').slideUp(300);
                $('#mobile-menu-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
            }
        }
    });
    
    // 4. Initialize Slick Slider for Testimonials
    $('.testimonials-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    // 5. Initialize LightGallery for Image Gallery
    $('#lightgallery').lightGallery({
        selector: '.gallery-item',
        thumbnail: true,
        animateThumb: true,
        showThumbByDefault: false,
        autoplayFirstVideo: false
    });
    
    // 6. Menu Filtering
    $('#menu-filter button').click(function() {
        // Update active button
        $('#menu-filter button').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.menu-item').fadeIn(400);
        } else {
            $('.menu-item').hide();
            $(`.menu-item[data-category="${filter}"]`).fadeIn(400);
        }
    });
    
    // 7. Shopping Cart Functionality
    let cartItems = [];
    let cartTotal = 0;
    
    $('.add-to-cart').click(function() {
        const itemName = $(this).data('item');
        const itemPrice = parseFloat($(this).data('price'));
        
        // Add to cart array
        cartItems.push({
            name: itemName,
            price: itemPrice
        });
        
        // Update cart UI
        updateCartUI();
        
        // Show cart
        $('#order-cart').addClass('translate-x-0').removeClass('translate-x-full');
        
        // Show success notification
        showNotification(`${itemName} added to cart!`, 'success');
    });
    
    function updateCartUI() {
        // Update cart count
        $('#cart-count').text(cartItems.length);
        
        // Update cart items list
        const $cartItems = $('#cart-items');
        $cartItems.empty();
        
        if (cartItems.length === 0) {
            $cartItems.html(`
                <div class="text-center text-gray-400 py-12">
                    <i class="fas fa-shopping-cart text-4xl mb-4 opacity-50"></i>
                    <p>Your cart is empty</p>
                </div>
            `);
            $('#checkout-btn').prop('disabled', true);
        } else {
            cartItems.forEach((item, index) => {
                $cartItems.append(`
                    <div class="flex items-center justify-between py-4 border-b border-gray-700/50">
                        <div>
                            <h5 class="text-gray-50 font-medium">${item.name}</h5>
                            <p class="text-brand-orange font-bold">$${item.price.toFixed(2)}</p>
                        </div>
                        <button class="remove-from-cart text-gray-400 hover:text-red-500" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `);
            });
            $('#checkout-btn').prop('disabled', false);
        }
        
        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        
        $('#cart-subtotal').text(`$${subtotal.toFixed(2)}`);
        $('#cart-tax').text(`$${tax.toFixed(2)}`);
        $('#cart-total').text(`$${total.toFixed(2)}`);
        
        cartTotal = total;
    }
    
    // Remove item from cart
    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        const removedItem = cartItems[index].name;
        
        cartItems.splice(index, 1);
        updateCartUI();
        
        showNotification(`${removedItem} removed from cart`, 'info');
    });
    
    // Cart toggle
    $('#cart-toggle').click(function() {
        $('#order-cart').toggleClass('translate-x-0 translate-x-full');
    });
    
    $('#close-cart').click(function() {
        $('#order-cart').addClass('translate-x-full').removeClass('translate-x-0');
    });
    
    // Checkout
    $('#checkout-btn').click(function() {
        if (cartItems.length === 0) return;
        
        $('#order-cart').addClass('translate-x-full').removeClass('translate-x-0');
        
        // In a real app, this would process the payment
        showNotification(`Order placed successfully! Total: $${cartTotal.toFixed(2)}`, 'success');
        
        // Reset cart
        cartItems = [];
        updateCartUI();
    });
    
    // 8. Video Modal
    $('#play-video-btn').click(function() {
        $('#video-modal').fadeIn();
        $('#restaurant-video').attr('src', $('#restaurant-video').attr('src').replace('autoplay=0', 'autoplay=1'));
    });
    
    $('#close-video').click(function() {
        $('#video-modal').fadeOut();
        $('#restaurant-video').attr('src', $('#restaurant-video').attr('src').replace('autoplay=1', 'autoplay=0'));
    });
    
    // 9. Back to Top Button
    $('#back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    
    // 10. Form Submissions
    $('#reservation-form').submit(function(e) {
        e.preventDefault();
        
        // In a real app, this would send data to a server
        showNotification('Reservation request submitted! We will contact you shortly.', 'success');
        $(this)[0].reset();
        
        // Scroll to thank you message
        $('html, body').animate({
            scrollTop: $(this).offset().top - 100
        }, 500);
    });
    
    $('#newsletter-form').submit(function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        showNotification(`Thank you for subscribing with ${email}!`, 'success');
        $(this)[0].reset();
    });
    
    // 11. View Full Menu Button
    $('#view-full-menu').click(function() {
        $('#menu-filter button[data-filter="all"]').click();
        $('html, body').animate({
            scrollTop: $('#menu').offset().top - 100
        }, 800);
    });
    
    // 12. Notification System
    function showNotification(message, type = 'info') {
        const $notification = $(`
            <div class="fixed top-6 right-6 bg-dark-card text-gray-50 px-6 py-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-300">
                <div class="flex items-center">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} text-${type === 'success' ? 'green' : 'brand-orange'}-400 mr-3"></i>
                    <span>${message}</span>
                </div>
            </div>
        `);
        
        $('body').append($notification);
        
        setTimeout(() => {
            $notification.removeClass('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            $notification.addClass('translate-x-full');
            setTimeout(() => $notification.remove(), 300);
        }, 3000);
    }
    
    // 13. Counter Animation for Stats
    function animateCounter($element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $element.text(Math.floor(current) + '+');
        }, 30);
    }
    
    // Animate stats when in viewport
    function checkStatsInView() {
        const $stats = $('.grid-cols-2.md\\:grid-cols-4 .text-center h3');
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        $stats.each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).height();
            
            if (elementBottom >= scrollTop && elementTop <= scrollTop + windowHeight) {
                if (!$(this).hasClass('animated')) {
                    const target = parseInt($(this).text());
                    animateCounter($(this), target);
                    $(this).addClass('animated');
                }
            }
        });
    }
    
    $(window).scroll(checkStatsInView);
    
    // 14. Initialize animations on page load
    setTimeout(() => {
        $('body').addClass('loaded');
    }, 500);
    
    // 15. Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-bg').css('transform', `translateY(${scrolled * 0.5}px)`);
    });
});