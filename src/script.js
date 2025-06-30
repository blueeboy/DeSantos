

    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Hide mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Sticky header behavior
        const header = document.querySelector('header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
            
            lastScrollTop = scrollTop;
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const bookingForm = document.getElementById('booking-form');
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');
        
        // Set min dates for check-in and check-out
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formatDate = date => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        checkInInput.min = formatDate(today);
        checkOutInput.min = formatDate(tomorrow);
        
        // Update check-out min date when check-in changes
        checkInInput.addEventListener('change', function() {
            if (this.value) {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutInput.min = formatDate(nextDay);
                
                // If check-out date is before new check-in date, update it
                if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
                    checkOutInput.value = formatDate(nextDay);
                }
            }
        });
        
        // Form validation
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formInputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitButton = document.getElementById('booking-submit');
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<i class="ri-loader-4-line ri-spin ri-lg mr-2"></i> Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    alert('Booking request submitted successfully! We will contact you shortly to confirm your reservation.');
                    bookingForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const galleryFilters = document.querySelectorAll('.gallery-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Update active filter
                galleryFilters.forEach(f => {
                    f.classList.remove('active', 'bg-primary', 'text-white');
                    f.classList.add('text-gray-700', 'hover:bg-gray-200');
                });
                this.classList.add('active', 'bg-primary', 'text-white');
                this.classList.remove('text-gray-700', 'hover:bg-gray-200');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (window.innerWidth < 768) {
                    testimonial.style.display = i === index ? 'block' : 'none';
                } else {
                    testimonial.style.display = 'block';
                }
            });
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }
        
        // Only activate carousel on mobile
        function checkWidth() {
            if (window.innerWidth < 768) {
                showTestimonial(currentIndex);
                // Auto-rotate testimonials every 5 seconds on mobile
                setInterval(nextTestimonial, 5000);
            } else {
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
            }
        }
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
    });