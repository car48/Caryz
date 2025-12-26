// Background color changer
const colors = [
    { bg: '#f0f2f5', bubble: '#e3e6f3' },
    { bg: '#f8f9fa', bubble: '#eef2ff' },
    { bg: '#f5f7ff', bubble: '#e8f4ff' },
    { bg: '#f9f7ff', bubble: '#f0e8ff' }
];

let currentColorIndex = 0;

function changeBackgroundColor() {
    const body = document.body;
    const bubbles = document.querySelector('.bubbles');
    
    // Increment color index
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    
    // Apply new colors with smooth transition
    body.style.backgroundColor = colors[currentColorIndex].bg;
    
    // Change bubble color
    if (bubbles) {
        bubbles.style.backgroundColor = colors[currentColorIndex].bubble;
    }
    
    // Schedule next color change
    setTimeout(changeBackgroundColor, 8000);
}

// Initialize skill bars animation
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const percent = level.getAttribute('data-level');
        level.style.width = '0%';
        
        // Animate after a short delay
        setTimeout(() => {
            level.style.width = percent + '%';
        }, 300);
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
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
}

// Form submission handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            alert(`Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan membalas ke ${email} segera.`);
            
            // Reset form
            this.reset();
        });
    }
}

// Create floating bubbles effect
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    
    // Create multiple bubble elements
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble-element');
        
        // Random size and position
        const size = Math.random() * 60 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        // Apply styles
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        // Random color
        const colors = ['rgba(108, 99, 255, 0.1)', 'rgba(255, 101, 132, 0.1)', 'rgba(74, 68, 198, 0.1)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.backgroundColor = color;
        
        bubblesContainer.appendChild(bubble);
    }
}

// Add CSS for bubble elements
function addBubbleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .bubble-element {
            position: absolute;
            border-radius: 50%;
            opacity: 0.7;
            animation: floatBubble linear infinite;
            z-index: -1;
        }
        
        @keyframes floatBubble {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            25% {
                transform: translateY(-20px) translateX(10px) rotate(90deg);
            }
            50% {
                transform: translateY(-40px) translateX(0) rotate(180deg);
            }
            75% {
                transform: translateY(-20px) translateX(-10px) rotate(270deg);
            }
            100% {
                transform: translateY(0) translateX(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start background color transitions
    setTimeout(changeBackgroundColor, 3000);
    
    // Animate skill bars when skills section is in view
    const observerOptions = {
        threshold: 0.3
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Setup other functionalities
    setupMobileMenu();
    setupSmoothScrolling();
    setupContactForm();
    addBubbleStyles();
    createBubbles();
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
// Konfigurasi
const config = {
    targetUrl: "https://www.example.com",
    loadingDuration: 2000, // 2 detik loading
    showBubbleDuration: 3500 // 3.5 detik bubble table
};

// Elemen DOM
const bubbleBtn = document.getElementById('bubbleBtn');
const bubbleLoader = document.getElementById('bubbleLoader');
const miniTable = document.getElementById('miniTable');
const progressBar = document.getElementById('progressBar');
const statusText = document.getElementById('statusText');
const timeText = document.getElementById('timeText');
const closeTable = document.getElementById('closeTable');
const linkTarget = document.getElementById('linkTarget');

// Variabel state
let isLoading = false;
let loadTimer = null;
let progressTimer = null;
let elapsedSeconds = 0;

// Format waktu
function formatTime(seconds) {
    return `${seconds}s`;
}

// Update progress bar
function updateProgress(percent) {
    progressBar.style.width = `${percent}%`;
    
    // Update warna berdasarkan progress
    if (percent < 30) {
        progressBar.style.background = "linear-gradient(90deg, #ff7e5f, #feb47b)";
    } else if (percent < 70) {
        progressBar.style.background = "linear-gradient(90deg, #4facfe, #00f2fe)";
    } else {
        progressBar.style.background = "linear-gradient(90deg, #42e695, #3bb2b8)";
    }
}

// Mulai animasi loading
function startLoading() {
    if (isLoading) return;
    
    isLoading = true;
    elapsedSeconds = 0;
    
    // Tampilkan animasi loading
    bubbleLoader.style.opacity = "1";
    bubbleLoader.style.transform = "translateY(0)";
    
    // Tampilkan bubble table
    miniTable.classList.add('active');
    
    // Update status
    statusText.textContent = "Memulai...";
    timeText.textContent = formatTime(0);
    updateProgress(0);
    
    // Animasi progress
    let progress = 0;
    const progressInterval = 50; // ms
    const totalSteps = config.loadingDuration / progressInterval;
    const progressStep = 100 / totalSteps;
    
    progressTimer = setInterval(() => {
        progress += progressStep;
        elapsedSeconds += progressInterval / 1000;
        
        updateProgress(Math.min(progress, 100));
        timeText.textContent = formatTime(elapsedSeconds.toFixed(1));
        
        // Update status berdasarkan progress
        if (progress < 30) {
            statusText.textContent = "Menyiapkan...";
        } else if (progress < 60) {
            statusText.textContent = "Memuat data...";
        } else if (progress < 90) {
            statusText.textContent = "Hampir selesai...";
        } else {
            statusText.textContent = "Mengarahkan...";
        }
        
        if (progress >= 100) {
            clearInterval(progressTimer);
        }
    }, progressInterval);
    
    // Selesaikan loading setelah durasi
    loadTimer = setTimeout(() => {
        completeLoading();
    }, config.loadingDuration);
}

// Selesaikan loading
function completeLoading() {
    // Update status final
    statusText.textContent = "Selesai!";
    updateProgress(100);
    
    // Sembunyikan animasi loading
    bubbleLoader.style.opacity = "0";
    bubbleLoader.style.transform = "translateY(10px)";
    
    // Tampilkan link target
    linkTarget.innerHTML = `
        <i class="fas fa-check-circle"></i> Mengarahkan ke: 
        <a href="${config.targetUrl}" target="_blank">${config.targetUrl}</a>
        <div style="margin-top: 8px; font-size: 12px;">
            <i class="fas fa-external-link-alt"></i> Link akan terbuka di tab baru
        </div>
    `;
    
    // Buka link setelah delay kecil
    setTimeout(() => {
        window.open(config.targetUrl, '_blank');
    }, 500);
    
    // Reset state
    setTimeout(() => {
        isLoading = false;
        clearInterval(progressTimer);
        clearTimeout(loadTimer);
    }, 1000);
    
    // Auto-sembunyikan bubble table setelah beberapa detik
    setTimeout(() => {
        miniTable.classList.remove('active');
    }, config.showBubbleDuration);
}

// Reset tombol
function resetButton() {
    isLoading = false;
    bubbleLoader.style.opacity = "0";
    bubbleLoader.style.transform = "translateY(10px)";
    miniTable.classList.remove('active');
    linkTarget.innerHTML = "";
    clearInterval(progressTimer);
    clearTimeout(loadTimer);
}

// Event Listeners
bubbleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (!isLoading) {
        startLoading();
    }
});

closeTable.addEventListener('click', function(e) {
    e.stopPropagation();
    miniTable.classList.remove('active');
});

// Tutup bubble table jika klik di luar
document.addEventListener('click', function(e) {
    if (!miniTable.contains(e.target) && 
        !bubbleBtn.contains(e.target) && 
        !closeTable.contains(e.target)) {
        miniTable.classList.remove('active');
    }
});

// Tambahkan efek ripple pada tombol
bubbleBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = bubbleBtn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    bubbleBtn.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Tambahkan style untuk ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inisialisasi
console.log("Tombol bubble mobile siap digunakan!");
console.log("Link target:", config.targetUrl);
console.log("Untuk mengubah link, edit variabel 'targetUrl' di file JavaScript");


// Konfigurasi
const CONFIG = {
    targetUrl: "https://www.example.com",
    loadingDuration: 5000, // 5 detik
    phases: [
        { text: "Initializing...", color: "#ff0080" },
        { text: "Energy Charging...", color: "#ff6600" },
        { text: "Dimension Warping...", color: "#00ffcc" },
        { text: "Portal Opening...", color: "#9966ff" },
        { text: "Ready to Launch!", color: "#ffff00" }
    ]
};

// Elemen DOM
const animeBtn = document.getElementById('animeBtn');
const btnText = document.getElementById('btnText');
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');
const countdownTimer = document.getElementById('countdownTimer');
const timerSec = document.getElementById('timerSec');
const progressInfo = document.getElementById('progressInfo');
const phaseText = document.getElementById('phaseText');
const targetLink = document.getElementById('targetLink');
const successNotification = document.getElementById('successNotification');
const sparklesContainer = document.getElementById('sparklesContainer');
const particleExplosion = document.getElementById('particleExplosion');

// Phase dots
const phaseDots = [
    document.getElementById('phase1'),
    document.getElementById('phase2'),
    document.getElementById('phase3'),
    document.getElementById('phase4'),
    document.getElementById('phase5')
];

// State variables
let isAnimating = false;
let animationStartTime = null;
let animationFrame = null;
let currentPhase = 0;

// Update target link
targetLink.href = CONFIG.targetUrl;
targetLink.textContent = CONFIG.targetUrl;

// Fungsi untuk membuat sparkle efek
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Random color
    const colors = ['#ff0080', '#00ffcc', '#ffff00', '#9966ff'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    sparklesContainer.appendChild(sparkle);
    
    // Hapus setelah animasi selesai
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Fungsi untuk membuat particle explosion
function createParticleExplosion() {
    particleExplosion.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        // Random direction dan distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const ex = Math.cos(angle) * distance;
        const ey = Math.sin(angle) * distance;
        
        particle.style.setProperty('--ex', `${ex}px`);
        particle.style.setProperty('--ey', `${ey}px`);
        
        // Random color
        const colors = ['#ff0080', '#00ffcc', '#ffff00', '#9966ff', '#ff6600'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = 3 + Math.random() * 6;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particleExplosion.appendChild(particle);
    }
    
    // Hapus particles setelah animasi
    setTimeout(() => {
        particleExplosion.innerHTML = '';
    }, 800);
}

// Fungsi untuk update loading animation
function updateLoadingAnimation(timestamp) {
    if (!isAnimating) return;
    
    if (!animationStartTime) {
        animationStartTime = timestamp;
    }
    
    const elapsed = timestamp - animationStartTime;
    const progress = Math.min(elapsed / CONFIG.loadingDuration, 1);
    
    // Update loading bar
    const percent = Math.floor(progress * 100);
    loadingBar.style.width = `${percent}%`;
    loadingText.textContent = `${percent}%`;
    
    // Update countdown timer
    const remainingSeconds = Math.ceil((CONFIG.loadingDuration - elapsed) / 1000);
    timerSec.textContent = Math.max(remainingSeconds, 0);
    
    // Update phases
    const phaseIndex = Math.floor(progress * CONFIG.phases.length);
    if (phaseIndex !== currentPhase && phaseIndex < CONFIG.phases.length) {
        currentPhase = phaseIndex;
        updatePhase(phaseIndex);
    }
    
    // Buat sparkles secara random
    if (Math.random() > 0.7) {
        const x = 20 + Math.random() * 140;
        const y = 20 + Math.random() * 40;
        createSparkle(x, y);
    }
    
    // Lanjutkan animasi jika belum selesai
    if (progress < 1) {
        animationFrame = requestAnimationFrame(updateLoadingAnimation);
    } else {
        completeAnimation();
    }
}

// Fungsi untuk update phase
function updatePhase(index) {
    if (index >= CONFIG.phases.length) return;
    
    const phase = CONFIG.phases[index];
    
    // Update text
    phaseText.textContent = phase.text;
    
    // Update phase dots
    phaseDots.forEach((dot, i) => {
        dot.classList.toggle('active', i <= index);
    });
    
    // Update button color based on phase
    animeBtn.style.background = `linear-gradient(90deg, ${phase.color}, ${CONFIG.phases[(index + 1) % CONFIG.phases.length].color})`;
}

// Fungsi untuk memulai animasi
function startAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    animationStartTime = null;
    currentPhase = 0;
    
    // Add loading class
    animeBtn.classList.add('loading');
    
    // Update button text
    btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>LOADING...</span>';
    
    // Show progress info
    progressInfo.classList.add('active');
    
    // Reset phase dots
    phaseDots.forEach(dot => dot.classList.remove('active'));
    phaseDots[0].classList.add('active');
    
    // Play click sound
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Audio error:", e));
    }
    
    // Start animation loop
    animationFrame = requestAnimationFrame(updateLoadingAnimation);
    
    // Create initial sparkles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = 20 + Math.random() * 140;
            const y = 20 + Math.random() * 40;
            createSparkle(x, y);
        }, i * 100);
    }
}

// Fungsi untuk menyelesaikan animasi
function completeAnimation() {
    // Buat particle explosion
    createParticleExplosion();
    
    // Update button
    btnText.innerHTML = '<i class="fas fa-check"></i><span>COMPLETE!</span>';
    
    // Hide progress info
    setTimeout(() => {
        progressInfo.classList.remove('active');
    }, 500);
    
    // Show success notification
    setTimeout(() => {
        successNotification.classList.add('active');
    }, 700);
    
    // Play complete sound
    const completeSound = document.getElementById('completeSound');
    if (completeSound) {
        completeSound.currentTime = 0;
        completeSound.play().catch(e => console.log("Audio error:", e));
    }
    
    // Buka link setelah delay kecil
    setTimeout(() => {
        window.open(CONFIG.targetUrl, '_blank');
    }, 1000);
    
    // Reset setelah beberapa detik
    setTimeout(() => {
        resetButton();
    }, 3000);
}

// Fungsi untuk reset tombol
function resetButton() {
    isAnimating = false;
    animeBtn.classList.remove('loading');
    btnText.innerHTML = '<i class="fas fa-play"></i><span>START JOURNEY</span>';
    loadingBar.style.width = '0%';
    loadingText.textContent = '0%';
    progressInfo.classList.remove('active');
    successNotification.classList.remove('active');
    
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}

// Event Listeners
animeBtn.addEventListener('click', function(e) {
    if (isAnimating) return;
    startAnimation();
});

// Hover effects
animeBtn.addEventListener('mouseenter', function() {
    if (isAnimating) return;
    
    // Buat sparkles saat hover
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = 20 + Math.random() * 140;
            const y = 20 + Math.random() * 40;
            createSparkle(x, y);
        }, i * 100);
    }
});

// Tutup info panel jika klik di luar
document.addEventListener('click', function(e) {
    if (!progressInfo.contains(e.target) && 
        !animeBtn.contains(e.target) &&
        !successNotification.contains(e.target)) {
        progressInfo.classList.remove('active');
        successNotification.classList.remove('active');
    }
});

// Inisialisasi
console.log("Tombol anime style siap digunakan!");
console.log("Link target:", CONFIG.targetUrl);
console.log("Durasi loading:", CONFIG.loadingDuration / 1000, "detik");

