/**
 * Toggles the visibility of the navigation menu when the toggle button is clicked.
 */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// if navToggle exists, add 'show-menu' class to navMenu
if(navToggle){
    navToggle.addEventListener('click', ()=> {
        console.log('clicked showmenu');
        navMenu.classList.add('show-menu');
    });
}

// if navClose exists, remove 'show-menu' class from navMenu
if(navClose){
    navClose.addEventListener('click', ()=>{
        console.log('clicked hidemenu');
        navMenu.classList.remove('show-menu');
    });
}


/**
 *  Removes the 'show-menu' class from the navigation menu when any navigation link is clicked.
 * This function is intended for mobile views where the menu should hide after a selection is made.
 */
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(item => item.addEventListener('click', linkAction));


/**
 * Changes the background of the header based on the scroll position of the window.
 * Adds 'shadow-header' class to header if window is scrolled more than 50 viewport height.
 */
const shadowHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('shadow-header'):header.classList.remove('shadow-header');
}
window.addEventListener('scroll', shadowHeader);


/**
 * Represents the contact form and the element for displaying messages.
 * @type {HTMLElement}
 */
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message');

/**
 * Initializes EmailJS with the public key.
 * This function should be called as soon as possible during the page load.
 */
// 即時実行関数 ((function() {})()): EmailJSの初期化
(function() {
    // Initialize EmailJS with the account's public key from the EmailJS dashboard
    emailjs.init({
        publicKey: "c8VxDT34Qj4HpO4VF",
    });
})();

/**
 * Sets up the event listener for the contact form submission.
 * Prevents the default form submission and sends the form data using EmailJS.
 */
//window.onload ページが完全にロードされた後に実行
window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Send the form data using EmailJS service ID and template ID
        emailjs.sendForm('service_m4hbv2e', 'template_ys9k3tr', this)
            .then(() => {
                // Log and display a success message
                console.log('SUCCESS!');
                contactMessage.textContent = 'Message sent successfully';
                setTimeout(() => {
                    contactMessage.textContent = '';
                }, 5000);
            }, (error) => {
                // Log and display an error message if the request fails
                console.log('FAILED...', error);
                contactMessage.textContent = 'Message not sent (service error)';
            });
    });
}


/**
 * Toggles the 'show-scroll' class on an element based on the scroll position of the window.
 * The 'show-scroll' class is added if the vertical scroll position is at least 350 vewport height,
 * and removed otherwise. This function is typically used to control the visibility of a
 * scroll-to-top button.
 */
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll'):scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);


/**
 * Activates a navigation link corresponding to the currently visible section on the page.
 * This function is intended to be used with a scroll event listener. It checks each section's
 * position relative to the scroll position and applies an 'active-link' class to the navigation
 * link corresponding to the section that is currently in the viewport, making it visually distinct.
 */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58, // Adjusted by 58 pixels to trigger before reaching the exact top.
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link');
        } else {
            sectionsClass.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/**
 * Manages the theme toggling between dark and light modes on the website.
 * The theme state is saved to localStorage so the user's preference is preserved across sessions.
 * 
 * @fileoverview This script toggles a dark and light theme on the website by adding or removing
 * specific CSS classes to the body element and changing an icon on a toggle button.
 * It uses localStorage to remember the user's last selected theme and icon state.
 */

// Elements and settings
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line'; //<i class="ri-sun-line"></i>

// Retrieve the user's stored theme preferences if available
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

/**
 * Determines the current theme applied to the document.
 * @returns {string} Returns 'dark' if the dark theme is active, otherwise 'light'.
 */
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

/**
 * Determines the current icon based on the theme toggle button.
 * @returns {string} Returns 'bx bx-moon' if the moon icon <i class="ri-moon-line"></i> is active (dark theme), otherwise <i class="ri-msun-line"></i>.
 */
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Apply the cached theme and icon state on page load
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme); 
}

// Event listener for theme button click
themeButton.addEventListener('click', ()=> {
    // Toggle theme and icon
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Save the new state to localStorage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/**
 *  Image
 */

document.addEventListener("DOMContentLoaded", function() {
      /**
     * Select an image with the class "home__img lazy" and convert the NodeList to an array.
     * @type {Array.<HTMLElement>}
     */
    let lazyImages = [].slice.call(document.querySelectorAll(".home__img.lazy"));
    if ("IntersectionObserver" in window) {
           /**
         * Observer to handle lazy loading of images.
         * @type {IntersectionObserver}
         */
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                      /**
                     * Image that is currently intersecting with the viewport.
                     * @type {HTMLElement}
                     */
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImage.classList.add("lazyloaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        let lazyLoadThrottleTimeout;
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            lazyLoadThrottleTimeout = setTimeout(function() {
                let scrollTop = window.pageYOffset;
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                        img.classList.add("lazyloaded");
                    }
                });
                if (lazyImages.length === 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationChange", lazyLoad);
                }
            }, 20);
        }
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationChange", lazyLoad);
    }
});
