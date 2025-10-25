// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

//Program Section
function openProgramDetail(id) {
  document.getElementById(`program-${id}`).classList.remove('hidden');
}

function closeProgramDetail(id) {
  document.getElementById(`program-${id}`).classList.add('hidden');
}


// Try Out Quiz functionality
const quizData = {
    'SD-Matematika': {
        title: 'Try Out SD - Matematika',
        questions: [
            {
                question: 'Berapa hasil dari 25 + 17?',
                options: ['40', '42', '43', '45'],
                correct: 1
            },
            {
                question: 'Berapa hasil dari 8 × 7?',
                options: ['54', '56', '58', '60'],
                correct: 1
            },
            {
                question: 'Berapa hasil dari 100 - 45?',
                options: ['55', '54', '56', '65'],
                correct: 0
            },
            {
                question: 'Berapa hasil dari 72 ÷ 8?',
                options: ['8', '9', '10', '11'],
                correct: 1
            },
            {
                question: 'Berapa hasil dari 15 + 28?',
                options: ['41', '42', '43', '44'],
                correct: 2
            }
        ]
    },
    'SD-IPA': {
        title: 'Try Out SD - IPA',
        questions: [
            {
                question: 'Hewan yang bernafas dengan insang adalah...',
                options: ['Burung', 'Ikan', 'Kucing', 'Kelinci'],
                correct: 1
            },
            {
                question: 'Tumbuhan memerlukan sinar matahari untuk...',
                options: ['Bernafas', 'Fotosintesis', 'Tumbuh tinggi', 'Berbunga'],
                correct: 1
            },
            {
                question: 'Air mendidih pada suhu...',
                options: ['50°C', '75°C', '100°C', '150°C'],
                correct: 2
            },
            {
                question: 'Organ tubuh yang berfungsi memompa darah adalah...',
                options: ['Paru-paru', 'Jantung', 'Ginjal', 'Hati'],
                correct: 1
            },
            {
                question: 'Planet terdekat dengan matahari adalah...',
                options: ['Venus', 'Merkurius', 'Mars', 'Bumi'],
                correct: 1
            }
        ]
    },
    'SMP-Matematika': {
        title: 'Try Out SMP - Matematika',
        questions: [
            {
                question: 'Berapa hasil dari (-5) + 8?',
                options: ['-3', '3', '-13', '13'],
                correct: 1
            },
            {
                question: 'Berapa hasil dari 2x + 5 = 15, maka x = ...',
                options: ['5', '10', '4', '6'],
                correct: 0
            },
            {
                question: 'Berapa luas persegi dengan sisi 12 cm?',
                options: ['120 cm²', '144 cm²', '124 cm²', '140 cm²'],
                correct: 1
            },
            {
                question: 'Berapa hasil dari 3² + 4²?',
                options: ['25', '24', '26', '23'],
                correct: 0
            },
            {
                question: 'Berapa hasil dari √64?',
                options: ['6', '7', '8', '9'],
                correct: 2
            }
        ]
    },
    'SMP-Bahasa Inggris': {
        title: 'Try Out SMP - Bahasa Inggris',
        questions: [
            {
                question: 'What is the correct past tense of "go"?',
                options: ['goed', 'went', 'gone', 'going'],
                correct: 1
            },
            {
                question: 'Choose the correct sentence:',
                options: ['She are a student', 'She is a student', 'She am a student', 'She be a student'],
                correct: 1
            },
            {
                question: 'What does "beautiful" mean?',
                options: ['Cantik', 'Jelek', 'Besar', 'Kecil'],
                correct: 0
            },
            {
                question: 'Complete: "I ___ reading a book right now."',
                options: ['am', 'is', 'are', 'be'],
                correct: 0
            },
            {
                question: 'What is the plural of "child"?',
                options: ['childs', 'childrens', 'children', 'child'],
                correct: 2
            }
        ]
    }
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

function initTryOut() {
    const tryoutBtns = document.querySelectorAll('.tryout-btn');
    const quizContainer = document.getElementById('tryout-quiz');
    const resultContainer = document.getElementById('quiz-result');
    const submitBtn = document.getElementById('submit-answer');
    const restartBtn = document.getElementById('restart-quiz');
    
    tryoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;
            const subject = btn.dataset.subject;
            const quizKey = `${level}-${subject}`;
            
            if (quizData[quizKey]) {
                startQuiz(quizKey);
            }
        });
    });
    
    submitBtn.addEventListener('click', submitAnswer);
    restartBtn.addEventListener('click', restartQuiz);
}

function startQuiz(quizKey) {
    currentQuiz = quizData[quizKey];
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    document.getElementById('tryout-quiz').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    document.getElementById('quiz-title').textContent = currentQuiz.title;
    document.getElementById('total-questions').textContent = currentQuiz.questions.length;
    
    showQuestion();
}

function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    
    document.getElementById('question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });
    
    document.getElementById('submit-answer').disabled = true;
}

function selectAnswer(answerIndex, optionElement) {
    // Remove previous selections
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select current answer
    optionElement.classList.add('selected');
    userAnswers[currentQuestionIndex] = answerIndex;
    
    document.getElementById('submit-answer').disabled = false;
}

function submitAnswer() {
    const question = currentQuiz.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    if (userAnswer === question.correct) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('tryout-quiz').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('final-score').textContent = score;
    
    let message = '';
    if (percentage >= 80) {
        message = 'Excellent! Kamu sudah sangat menguasai materi ini.';
    } else if (percentage >= 60) {
        message = 'Good! Kamu cukup menguasai materi, terus belajar ya!';
    } else {
        message = 'Keep trying! Jangan menyerah, terus berlatih untuk hasil yang lebih baik.';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    document.getElementById('tryout-quiz').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
}

function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.nav-arrow.left');
  const nextBtn = document.querySelector('.nav-arrow.right');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', initTestimonialsSlider);


// Gallery lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxIcon = document.querySelector('.lightbox-icon');
    const lightboxTitle = document.querySelector('.lightbox-title');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageType = item.dataset.image;
            const overlay = item.querySelector('.gallery-overlay span');
            const icon = item.querySelector('.gallery-image i');
            
            lightboxIcon.className = icon.className;
            lightboxTitle.textContent = overlay.textContent;
            lightbox.style.display = 'flex';
        });
    });
    
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// FAQ accordion
// FAQ accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Tutup semua
      faqItems.forEach(faqItem => faqItem.classList.remove('active'));

      // Buka yang diklik
      if (!isActive) item.classList.add('active');
    });
  });
}

// Jalankan setelah halaman selesai dimuat
document.addEventListener('DOMContentLoaded', initFAQ);


// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would normally send the data to a server
        // For now, we'll just show an alert
        alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.');
        
        // Reset form
        contactForm.reset();
    });
}

// Formspree contact form handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return; // kalau tidak ada form, hentikan

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // supaya tidak reload halaman

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert("Pesan kamu berhasil dikirim! 🎉");
        form.reset();
      } else {
        alert("Ups, terjadi kesalahan saat mengirim. Coba lagi ya.");
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan. Pastikan koneksi internetmu stabil.");
    }
  });
});


// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initTryOut();
    initTestimonialsSlider();
    initGalleryLightbox();
    initFAQ();
    initContactForm();
    initNavbarScroll();
    
    // Add some delay to trigger initial animations
    setTimeout(() => {
        const firstFadeElements = document.querySelectorAll('.hero .fade-in');
        firstFadeElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 300);
});