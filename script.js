document.addEventListener('DOMContentLoaded', () => {
    // --- Background Particle Animation ---
    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 100;
        const maxDistance = 120; // Max distance for lines to form

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = 'rgba(0, 255, 255, 0.7)'; // Electric Cyan
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap particles around the screen
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.strokeStyle = `rgba(0, 191, 255, ${1 - (distance / maxDistance)})`; // Neon Blue
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        setCanvasSize();
        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            setCanvasSize();
            initParticles(); // Re-initialize particles on resize
        });
    }


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Hero Visual Animation (subtle dynamic nodes) ---
    const neuralNetworkSvg = document.getElementById('neural-network-visual');
    if (neuralNetworkSvg) {
        const nodes = neuralNetworkSvg.querySelectorAll('.node');
        nodes.forEach(node => {
            // Give each node a random initial position offset for subtle movement
            const startX = parseFloat(node.getAttribute('cx'));
            const startY = parseFloat(node.getAttribute('cy'));
            const duration = Math.random() * 3 + 2; // 2-5 seconds
            const delay = Math.random() * 0.5;

            node.style.setProperty('--start-x', `${startX}px`);
            node.style.setProperty('--start-y', `${startY}px`);
            node.style.animation = `nodeFloat ${duration}s infinite alternate ease-in-out ${delay}s`;
        });

        // Add a basic keyframe for nodeFloat if not in CSS (or add to CSS)
        // For simplicity, we assume CSS handles @keyframes nodeFloat for now,
        // but if dynamic node positions were needed, JS would animate cx/cy directly.
    }
});
