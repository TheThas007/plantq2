/* ============================================================
   PlantIQ — Interactive JavaScript
   Handles theme toggle, navigation, scroll reveals,
   FAQ accordion, scanner interactions, camera, i18n, and animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Theme Toggle (Dark / Light Mode) ---- */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.documentElement;
  const savedTheme = localStorage.getItem('plantiq-theme') || 'light';

  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('plantiq-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  /* ---- 2. Mobile Navigation ---- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('mobileOverlay');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ---- 3. Navbar Scroll Effect ---- */
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  /* ---- 4. Active Nav Link Highlighting ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  /* ---- 5. Scroll Reveal Animations ---- */
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Trigger on load

  /* ---- 6. FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- 7. Plant Scanner — Image Upload & Preview ---- */
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');
  const scanBtn = document.getElementById('scanBtn');
  const scanResults = document.getElementById('scanResults');
  const uploadContent = document.getElementById('uploadContent');

  // Click to upload
  if (uploadArea) {
    uploadArea.addEventListener('click', (e) => {
      if (e.target.closest('.btn-upload') || e.target.closest('.upload-icon') || e.target.closest('.upload-title')) {
        fileInput.click();
      }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleFile(file);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });
  }

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => showPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function showPreview(src) {
    previewImg.src = src;
    imagePreview.classList.add('active');
    uploadContent.style.display = 'none';
  }

  /* ---- Disease Database for Simulated AI Analysis ---- */
  const diseaseDatabase = [
    {
      name: "Tomato Leaf Spot",
      species: "Solanum lycopersicum",
      severity: "Moderate",
      badgeClass: "badge-warning",
      badgeText: "⚠️ Moderate Severity",
      healthScore: 72,
      confidence: 94,
      diagnosis: "Septoria Leaf Spot detected — a common fungal disease caused by <em>Septoria lycopersici</em>. Early intervention can prevent spread to other plants.",
      treatments: [
        "Remove affected leaves immediately and dispose properly",
        "Apply copper-based fungicide spray every 7–10 days",
        "Ensure proper air circulation around the plant",
        "Water at the base to avoid wetting leaves"
      ],
      prevention: [
        { icon: "🌱", text: "Rotate crops annually to prevent fungal buildup" },
        { icon: "💧", text: "Use drip irrigation instead of overhead watering" },
        { icon: "🌿", text: "Use disease-resistant tomato varieties when possible" }
      ]
    },
    {
      name: "Powdery Mildew",
      species: "Various host plants",
      severity: "Mild",
      badgeClass: "badge-success",
      badgeText: "🟢 Mild Severity",
      healthScore: 82,
      confidence: 91,
      diagnosis: "Powdery Mildew detected — a fungal infection causing white powdery spots on leaves. Common in warm, humid conditions with poor air flow.",
      treatments: [
        "Remove and destroy severely affected leaves",
        "Apply neem oil spray to affected areas",
        "Increase spacing between plants for air circulation",
        "Apply sulfur-based fungicide as preventive measure"
      ],
      prevention: [
        { icon: "☀️", text: "Ensure adequate sunlight exposure for the plant" },
        { icon: "💨", text: "Improve air circulation around plantings" },
        { icon: "🧪", text: "Apply preventive fungicide during humid seasons" }
      ]
    },
    {
      name: "Bacterial Leaf Blight",
      species: "Oryza sativa (Rice)",
      severity: "Severe",
      badgeClass: "badge-danger",
      badgeText: "🔴 Severe",
      healthScore: 38,
      confidence: 97,
      diagnosis: "Bacterial Leaf Blight detected — caused by <em>Xanthomonas oryzae</em>. This is a serious rice disease that can cause significant yield loss if untreated.",
      treatments: [
        "Remove and burn infected plant material immediately",
        "Apply streptomycin-based bactericide",
        "Drain standing water from fields",
        "Avoid excess nitrogen fertilization"
      ],
      prevention: [
        { icon: "🌾", text: "Use certified disease-free seeds" },
        { icon: "🛡️", text: "Plant resistant rice varieties" },
        { icon: "💧", text: "Maintain proper water management in paddies" }
      ]
    },
    {
      name: "Anthracnose",
      species: "Capsicum annuum (Chili)",
      severity: "Moderate",
      badgeClass: "badge-warning",
      badgeText: "⚠️ Moderate Severity",
      healthScore: 58,
      confidence: 89,
      diagnosis: "Anthracnose detected — a fungal disease caused by <em>Colletotrichum</em> species. Creates dark, sunken lesions on fruits and leaves.",
      treatments: [
        "Remove and dispose of all infected fruits and leaves",
        "Apply mancozeb or chlorothalonil fungicide",
        "Avoid overhead irrigation",
        "Harvest fruits promptly when ripe"
      ],
      prevention: [
        { icon: "🌱", text: "Use disease-free seeds and transplants" },
        { icon: "🔄", text: "Practice crop rotation with non-host crops" },
        { icon: "🧹", text: "Maintain field hygiene and remove crop debris" }
      ]
    },
    {
      name: "Healthy Plant",
      species: "No disease detected",
      severity: "None",
      badgeClass: "badge-success",
      badgeText: "✅ Healthy",
      healthScore: 96,
      confidence: 98,
      diagnosis: "No disease detected! Your plant appears to be in excellent health. Continue with your current care routine to maintain optimal growth.",
      treatments: [
        "Continue regular watering schedule",
        "Maintain current fertilization routine",
        "Monitor for any changes in leaf color or texture",
        "Ensure adequate sunlight exposure"
      ],
      prevention: [
        { icon: "💧", text: "Keep consistent watering routine" },
        { icon: "🌿", text: "Regularly inspect leaves for early signs of disease" },
        { icon: "☀️", text: "Maintain proper sunlight and ventilation" }
      ]
    },
    {
      name: "Leaf Curl Virus",
      species: "Various crops",
      severity: "Severe",
      badgeClass: "badge-danger",
      badgeText: "🔴 Severe",
      healthScore: 42,
      confidence: 92,
      diagnosis: "Leaf Curl Virus detected — a viral disease transmitted by whiteflies. Causes upward curling and yellowing of leaves with stunted growth.",
      treatments: [
        "Remove and destroy infected plants immediately",
        "Control whitefly populations with insecticidal soap",
        "Apply neem-based pest control spray",
        "Use yellow sticky traps to monitor whitefly activity"
      ],
      prevention: [
        { icon: "🛡️", text: "Use virus-resistant crop varieties" },
        { icon: "🪤", text: "Install insect-proof netting in nurseries" },
        { icon: "🌱", text: "Remove alternate host weeds around the field" }
      ]
    }
  ];

  function populateScanResults(disease) {
    document.getElementById('resultDiseaseName').textContent = disease.name;
    document.getElementById('resultPlantSpecies').textContent = disease.species;
    const severityBadge = document.getElementById('resultSeverityBadge');
    severityBadge.textContent = disease.badgeText;
    severityBadge.className = 'result-badge ' + disease.badgeClass;

    document.getElementById('resultHealthScore').textContent = disease.healthScore + '%';
    document.getElementById('resultConfidence').textContent = disease.confidence + '%';
    document.getElementById('resultSeverity').textContent = disease.severity;
    document.getElementById('resultHealthPercent').textContent = disease.healthScore + '%';

    const healthBar = document.getElementById('resultHealthBar');
    healthBar.setAttribute('data-width', disease.healthScore + '%');
    healthBar.style.width = '0';

    document.getElementById('resultDiagnosisText').innerHTML = disease.diagnosis;

    // Treatment list
    const treatmentList = document.getElementById('resultTreatmentList');
    treatmentList.innerHTML = disease.treatments.map(t =>
      `<div class="treatment-item"><span class="icon">✅</span><span>${t}</span></div>`
    ).join('');

    // Prevention list
    const preventionList = document.getElementById('resultPreventionList');
    preventionList.innerHTML = disease.prevention.map(p =>
      `<div class="treatment-item"><span class="icon">${p.icon}</span><span>${p.text}</span></div>`
    ).join('');

    // Animate health bar
    requestAnimationFrame(() => {
      setTimeout(() => {
        healthBar.style.width = disease.healthScore + '%';
      }, 100);
    });
  }

  // Scan button
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      const i18n = typeof PlantIQi18n !== 'undefined' ? PlantIQi18n : null;
      scanBtn.innerHTML = '<span class="scan-loader"></span> ' + (i18n ? i18n.t('scanner.btn.analyzing') : 'Analyzing with AI...');
      scanBtn.disabled = true;

      setTimeout(() => {
        // Pick a random disease
        const disease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
        populateScanResults(disease);

        // Use captured image as result image if available
        const resultImg = document.getElementById('resultPlantImg');
        if (previewImg.src && previewImg.src !== window.location.href) {
          resultImg.src = previewImg.src;
        }

        scanBtn.innerHTML = i18n ? i18n.t('scanner.btn.complete') : '🔬 Scan Complete!';
        scanResults.style.display = 'flex';
        scanResults.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
          scanBtn.innerHTML = i18n ? i18n.t('scanner.btn.again') : '🔬 Scan Again';
          scanBtn.disabled = false;
        }, 2000);
      }, 2500);
    });
  }

  /* ---- 8. Camera Module ---- */
  const cameraModal = document.getElementById('cameraModal');
  const cameraVideo = document.getElementById('cameraVideo');
  const cameraCanvas = document.getElementById('cameraCanvas');
  const cameraView = document.getElementById('cameraView');
  const cameraError = document.getElementById('cameraError');
  const cameraControls = document.getElementById('cameraControls');
  const cameraScanOverlay = document.getElementById('cameraScanOverlay');
  const openCameraBtn = document.getElementById('openCameraBtn');
  const cameraCaptureBtn = document.getElementById('cameraCaptureBtn');
  const cameraSwitchBtn = document.getElementById('cameraSwitchBtn');
  const cameraCloseBtn = document.getElementById('cameraCloseBtn');
  const cameraCloseBtnBottom = document.getElementById('cameraCloseBtnBottom');
  const cameraFallbackBtn = document.getElementById('cameraFallbackBtn');

  let currentStream = null;
  let facingMode = 'environment'; // 'environment' = rear, 'user' = front

  // Open camera modal
  if (openCameraBtn) {
    openCameraBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCamera();
    });
  }

  // Capture button
  if (cameraCaptureBtn) {
    cameraCaptureBtn.addEventListener('click', captureImage);
  }

  // Switch camera
  if (cameraSwitchBtn) {
    cameraSwitchBtn.addEventListener('click', () => {
      facingMode = facingMode === 'environment' ? 'user' : 'environment';
      stopCamera();
      startCamera();
    });
  }

  // Close buttons
  if (cameraCloseBtn) {
    cameraCloseBtn.addEventListener('click', closeCamera);
  }
  if (cameraCloseBtnBottom) {
    cameraCloseBtnBottom.addEventListener('click', closeCamera);
  }

  // Fallback to file upload
  if (cameraFallbackBtn) {
    cameraFallbackBtn.addEventListener('click', () => {
      closeCamera();
      fileInput.click();
    });
  }

  // Close camera on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cameraModal.classList.contains('active')) {
      closeCamera();
    }
  });

  function openCamera() {
    cameraModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    cameraError.style.display = 'none';
    cameraView.style.display = 'block';
    cameraControls.style.display = 'flex';
    cameraScanOverlay.style.display = 'none';
    startCamera();
  }

  async function startCamera() {
    // Check if camera API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showCameraError();
      return;
    }

    const constraints = {
      video: {
        facingMode: facingMode,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      currentStream = stream;
      cameraVideo.srcObject = stream;
      cameraVideo.play();
      cameraError.style.display = 'none';
      cameraView.style.display = 'block';
      cameraControls.style.display = 'flex';
    } catch (err) {
      console.error('Camera access error:', err);
      showCameraError();
    }
  }

  function showCameraError() {
    cameraView.style.display = 'none';
    cameraControls.style.display = 'none';
    cameraError.style.display = 'flex';
  }

  function stopCamera() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      currentStream = null;
    }
    cameraVideo.srcObject = null;
  }

  function closeCamera() {
    stopCamera();
    cameraModal.classList.remove('active');
    document.body.style.overflow = '';
    cameraScanOverlay.style.display = 'none';
  }

  function captureImage() {
    if (!currentStream) return;

    // Set canvas to video dimensions
    const videoWidth = cameraVideo.videoWidth;
    const videoHeight = cameraVideo.videoHeight;
    cameraCanvas.width = videoWidth;
    cameraCanvas.height = videoHeight;

    // Draw video frame to canvas
    const ctx = cameraCanvas.getContext('2d');
    ctx.drawImage(cameraVideo, 0, 0, videoWidth, videoHeight);

    // Get data URL
    const imageDataUrl = cameraCanvas.toDataURL('image/jpeg', 0.9);

    // Show scanning animation
    cameraScanOverlay.style.display = 'flex';
    cameraControls.style.display = 'none';

    // Simulate AI analysis
    setTimeout(() => {
      // Close camera and show result
      closeCamera();

      // Show preview
      showPreview(imageDataUrl);

      // Auto-trigger scan
      if (scanBtn && !scanBtn.disabled) {
        scanBtn.click();
      }
    }, 2000);
  }

  /* ---- 9. Language Switcher ---- */
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  const langCurrentLabel = document.getElementById('langCurrentLabel');
  const langOptions = document.querySelectorAll('.lang-option');

  const langLabels = { en: 'EN', ta: 'TA', si: 'SI' };

  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-switcher')) {
        langDropdown.classList.remove('active');
      }
    });
  }

  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      if (typeof PlantIQi18n !== 'undefined') {
        PlantIQi18n.setLanguage(lang);
      }
      langCurrentLabel.textContent = langLabels[lang] || 'EN';
      langDropdown.classList.remove('active');

      // Update active state
      langOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });

  /* ---- 10. Initialize i18n ---- */
  if (typeof PlantIQi18n !== 'undefined') {
    PlantIQi18n.init();
    const currentLang = PlantIQi18n.getCurrentLang();
    langCurrentLabel.textContent = langLabels[currentLang] || 'EN';

    // Set active lang option
    langOptions.forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === currentLang);
    });
  }

  /* ---- 11. Search Suggestions ---- */
  const searchInput = document.getElementById('plantSearch');
  const suggestions = document.getElementById('searchSuggestions');

  if (searchInput && suggestions) {
    const plantData = [
      { name: 'Monstera Deliciosa', sci: 'Araceae', icon: '🌿' },
      { name: 'Snake Plant', sci: 'Dracaena trifasciata', icon: '🌱' },
      { name: 'Peace Lily', sci: 'Spathiphyllum', icon: '🌸' },
      { name: 'Fiddle Leaf Fig', sci: 'Ficus lyrata', icon: '🍃' },
      { name: 'Aloe Vera', sci: 'Asphodelaceae', icon: '🌵' },
      { name: 'Pothos', sci: 'Epipremnum aureum', icon: '🌿' },
    ];

    searchInput.addEventListener('focus', () => {
      suggestions.classList.add('active');
      renderSuggestions(plantData);
    });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = plantData.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.sci.toLowerCase().includes(query)
      );
      renderSuggestions(filtered);
      suggestions.classList.toggle('active', filtered.length > 0);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        suggestions.classList.remove('active');
      }
    });

    function renderSuggestions(data) {
      suggestions.innerHTML = data.map(p => `
        <div class="suggestion-item" onclick="document.getElementById('plantSearch').value='${p.name}'; document.getElementById('searchSuggestions').classList.remove('active');">
          <div class="suggestion-icon">${p.icon}</div>
          <div class="suggestion-text">
            ${p.name}
            <span>${p.sci}</span>
          </div>
        </div>
      `).join('');
    }
  }

  /* ---- 12. Market Tabs ---- */
  const marketTabs = document.querySelectorAll('.market-tab');

  marketTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      marketTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ---- 13. Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---- 14. Chart Bar Animation ---- */
  function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    const chartContainer = document.querySelector('.chart-placeholder');
    if (!chartContainer) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chartBars.forEach(bar => {
            const height = bar.getAttribute('data-height');
            bar.style.height = height;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(chartContainer);
  }

  animateChartBars();

  /* ---- 15. Counter Animation ---- */
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-value[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }
      }, 20);
    });
  }

  // Trigger counter animation when hero section is visible
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          heroObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    heroObserver.observe(heroSection);
  }

  /* ---- 16. Market Search Filter ---- */
  const marketSearch = document.getElementById('marketSearch');
  if (marketSearch) {
    marketSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('.market-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });

      const priceCards = document.querySelectorAll('.price-card');
      priceCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  /* ---- 17. Upload button specific ---- */
  const uploadBtn = document.querySelector('.btn-upload');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

});
