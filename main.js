document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /*                               LIGHTBOX LOGIC                               */
    /* -------------------------------------------------------------------------- */

    // 1. Create the Modal Overlay if it doesn't exist
    // Requirements: position: fixed, z-index: 10000, background: rgba(0,0,0,0.9), backdrop-filter: blur(8px)
    let lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox-modal';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Inner HTML for Image and Close Button
        lightbox.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <span id="glb-close" style="position: absolute; top: 30px; right: 30px; color: #fff; font-size: 40px; cursor: pointer; user-select: none; z-index: 10001;">&times;</span>
                <img id="glb-img" src="" style="max-width: 90%; max-height: 90%; object-fit: contain; cursor: zoom-out; border-radius: 4px; box-shadow: 0 0 30px rgba(0,0,0,0.5);">
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('glb-img');
    const closeBtn = document.getElementById('glb-close');

    // 2. Global Event Listener for Image Clicks
    document.addEventListener('click', (e) => {
        // Check if the clicked element is an IMG tag
        if (e.target.tagName === 'IMG' && e.target.id !== 'glb-img') {
            e.preventDefault();
            e.stopPropagation();

            // Set source and show modal
            lightboxImg.src = e.target.src;
            lightboxImg.alt = e.target.alt || 'Enlarged Image';

            lightbox.style.display = 'flex';
            // Slight delay to allow display:flex to apply before opacity transition
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        // Close event logic (if clicking overlay or close button)
        if (e.target.id === 'lightbox-modal' || e.target.id === 'glb-close' || e.target.id === 'glb-img') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Keyboard Close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    /* -------------------------------------------------------------------------- */
    /*                             OTHER UI LOGIC                                 */
    /* -------------------------------------------------------------------------- */

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.querySelector('.back-to-top');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200;
        let current = '';

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.clientHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }

        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);

    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});