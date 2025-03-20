document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Prevent zooming on the webpage
    window.addEventListener("wheel", (e) => {
        const isPinching = e.ctrlKey;
        if(isPinching) e.preventDefault();
    }, { passive: false });

    // Get DOM elements
    const tocButton = document.getElementById('tableOfContents');
    const tocModal = document.getElementById('tocModal');
    const closeToc = document.getElementById('closeToc');
    const tocLinks = document.querySelectorAll('.toc-link');
    const startInvestingButton = document.getElementById('startInvesting');

    // Toggle Table of Contents modal
    tocButton.addEventListener('click', function() {
        tocModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close Table of Contents modal
    closeToc.addEventListener('click', function() {
        tocModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside the content
    tocModal.addEventListener('click', function(e) {
        if (e.target === tocModal) {
            tocModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Table of Contents links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            tocModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target with offset for header
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Start Investing button
    startInvestingButton.addEventListener('click', function() {
        const message = '投资之旅从学习和理解开始。记住这几条原则：\n\n' + 
                       '1. 不投资自己不理解的产品\n' +
                       '2. 分散投资，降低风险\n' +
                       '3. 保持长期投资的心态\n' +
                       '4. 定期投资，利用复利的力量\n\n' +
                       '祝你投资顺利！';
        alert(message);
    });

    // Add scroll animation
    const revealOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('opacity-100');
                section.classList.add('translate-y-0');
                section.classList.remove('opacity-0');
                section.classList.remove('translate-y-4');
            }
        });
    };

    // Initialize sections with opacity and transform
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('transition-all');
        section.classList.add('duration-700');
        
        // Skip the first (intro) section
        if (section.id !== 'intro') {
            section.classList.add('opacity-0');
            section.classList.add('translate-y-4');
        }
    });

    // Call once on load and then on scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});
