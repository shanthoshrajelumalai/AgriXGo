/* AgriXGo Web Application Logic & Interoperability Hub */

// Translations dictionary (English / Tamil)
const i18n = {
  en: {
    heroTitle: "AgriXGo: Interoperable Agro-Advisory Public Good",
    heroSub: "Federated Soil OCR, Sentinel-2 Remote Sensing, Leaf Pathology & Vernacular Voice Guidance powered by GCP Vertex AI.",
    dashTab: "Dashboard",
    soilTab: "Soil OCR & Advisory",
    satTab: "Satellite Remote Sensing",
    diagTab: "Leaf Scanner",
    apiTab: "DPG & Beckn API",
    langName: "தமிழ்",
    weatherTitle: "Coimbatore Agro-Climate",
    weatherSub: "Live Sentinel-2 & Meteorological Stream",
    tempLabel: "28°C",
    soilCardTitle: "Soil Health Translation Engine (Vertex AI)",
    soilCardDesc: "Upload physical Soil Health Card or run sample card to extract NPK metrics via Gemini Vision OCR.",
    runOcrBtn: "Run Vertex AI OCR Scan",
    satTitle: "Sentinel-2 NDVI Canopy Analytics",
    satSub: "Real-time Google Earth Engine Vegetation & Water Index",
    diagTitle: "Multimodal Crop Pathology Classifier",
    diagSub: "Vertex AI + MobileNetV3 Leaf Disease Scanner",
    runDiagBtn: "Analyze Leaf Pathology",
    playAudioBtn: "Listen to Advisory",
    copyApiBtn: "Copy Beckn Payload",
    organicTitle: "🌱 Organic / Regenerative Remedy",
    chemicalTitle: "🧪 Targeted Chemical Treatment"
  },
  ta: {
    heroTitle: "அக்ரிகோ: தமிழ்நாட்டு மாதிரி உழவர் வழிகாட்டி",
    heroSub: "மண் பரிசோதனை, செயற்கைக்கோள் பயிர் கண்காணிப்பு மற்றும் இலை நோய் கண்டறிதல்.",
    dashTab: "முகப்பு",
    soilTab: "மண் பரிசோதனை (OCR)",
    satTab: "செயற்கைக்கோள் வரைபடம்",
    diagTab: "இலை நோய் ஸ்கேனர்",
    apiTab: "DPG & பெக்கன் API",
    langName: "English",
    weatherTitle: "கோவை வானிலை அறிக்கை",
    weatherSub: "நேரடி செயற்கைக்கோள் மற்றும் மழைப்பொழிவு தரவு",
    tempLabel: "28°C",
    soilCardTitle: "ஜெமினி AI மண் அட்டை வாசிப்பான்",
    soilCardDesc: "உங்கள் மண் பரிசோதனை அட்டையை பதிவேற்றம் செய்து உர பரிந்துரையை பெறவும்.",
    runOcrBtn: "AI மூலம் அட்டையை படி",
    satTitle: "சென்டினல்-2 பயிர் அடர்த்தி வரைபடம்",
    satSub: "கூகிள் எர்த் என்ஜின் மூலம் பயிர் வளர்ச்சி மற்றும் நீர் நிலவரம்",
    diagTitle: "பயிர் நோய் கண்டறியும் AI ஸ்கேனர்",
    diagSub: "இலை நோய்களை கண்டறிந்து இயற்கை மற்றும் ரசாயன தீர்வுகள் பெறுங்கள்",
    runDiagBtn: "நோயை ஆராய்",
    playAudioBtn: "அறிவறுத்தலை கேளுங்கள்",
    copyApiBtn: "API வடிவத்தை நகலெடு",
    organicTitle: "🌱 இயற்கை / சூழல் நட்பு தீர்வு",
    chemicalTitle: "🧪 பரிந்துரைக்கப்பட்ட ரசாயன மருத்துவம்"
  }
};

let currentLang = 'en';

// Crop Fertilizer Matrix (Recommender logic per acre)
const cropDatabase = {
  paddy: {
    name: "Paddy (Rice ADT-53)",
    targetNPK: { n: 120, p: 50, k: 50 },
    splits: [
      { stage: "Basal Application (வகை 1)", urea: "30 kg", dap: "55 kg", mop: "20 kg", organic: "Neem Cake 100 kg" },
      { stage: "Active Tillering (வகை 2)", urea: "45 kg", dap: "0 kg", mop: "15 kg", organic: "Azospirillum 2 kg" },
      { stage: "Panicle Initiation (வகை 3)", urea: "30 kg", dap: "0 kg", mop: "15 kg", organic: "Panchagavya Spray" }
    ]
  },
  maize: {
    name: "Maize (Hybrid Co6)",
    targetNPK: { n: 150, p: 75, k: 75 },
    splits: [
      { stage: "Sowing / Basal Stage", urea: "40 kg", dap: "80 kg", mop: "30 kg", organic: "FYM 5 tonnes" },
      { stage: "Knee High Stage", urea: "60 kg", dap: "0 kg", mop: "25 kg", organic: "Bio-fertilizer" },
      { stage: "Tasseling Stage", urea: "40 kg", dap: "0 kg", mop: "20 kg", organic: "Zinc Sulphate 10 kg" }
    ]
  },
  cotton: {
    name: "Cotton (MCU-5)",
    targetNPK: { n: 90, p: 45, k: 45 },
    splits: [
      { stage: "Basal Setup", urea: "20 kg", dap: "50 kg", mop: "15 kg", organic: "Compost 2 tonnes" },
      { stage: "Vegetative Peak", urea: "35 kg", dap: "0 kg", mop: "15 kg", organic: "Vermicompost" },
      { stage: "Boll Formation", urea: "25 kg", dap: "0 kg", mop: "15 kg", organic: "Magnesium Sulphate" }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLanguageToggle();
  initWeather();
  initSoilOCR();
  initSatelliteCanvas();
  initDiseaseScanner();
  initSpeechSynth();
  initApiViewer();
});

// Tab Switcher
function initTabs() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');
      navItems.forEach(nav => nav.classList.remove('active'));
      tabContents.forEach(tab => tab.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(targetTab).classList.add('active');

      if (targetTab === 'sat-tab') {
        renderNDVICanvas();
      }
    });
  });
}

// Language Switcher
function initLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    langBtn.innerHTML = `<i class="fa-solid fa-globe"></i> ${i18n[currentLang].langName}`;
    
    // Update UI elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[currentLang][key]) {
        el.innerText = i18n[currentLang][key];
      }
    });
  });
}

// Live Weather Fetch (Open-Meteo API for Coimbatore)
async function initWeather() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=11.0168&longitude=76.9558&current_weather=true&hourly=relativehumidity_2m');
    const data = await res.json();
    if (data && data.current_weather) {
      document.getElementById('weatherTemp').innerText = `${Math.round(data.current_weather.temperature)}°C`;
      document.getElementById('weatherWind').innerText = `${data.current_weather.windspeed} km/h`;
    }
  } catch (err) {
    console.log("Weather fetch fallback active");
  }
}

// Soil Health OCR Module
function initSoilOCR() {
  const ocrBtn = document.getElementById('runOcrBtn');
  const cropSelect = document.getElementById('cropSelect');

  ocrBtn.addEventListener('click', () => {
    const box = document.getElementById('soilOcrBox');
    box.classList.add('scanning');
    ocrBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Gemini OCR...`;

    setTimeout(() => {
      box.classList.remove('scanning');
      ocrBtn.innerHTML = `<i class="fa-solid fa-check"></i> OCR Scan Complete!`;
      
      // Update OCR result values
      document.getElementById('phVal').innerText = "6.8 (Optimal)";
      document.getElementById('nVal').innerText = "180.0 kg/ha";
      document.getElementById('pVal').innerText = "22.5 kg/ha";
      document.getElementById('kVal').innerText = "210.0 kg/ha";
      document.getElementById('ocVal').innerText = "0.45% (Low)";

      updateFertilizerSchedule(cropSelect.value);
    }, 1800);
  });

  cropSelect.addEventListener('change', (e) => {
    updateFertilizerSchedule(e.target.value);
  });
}

function updateFertilizerSchedule(cropKey) {
  const crop = cropDatabase[cropKey] || cropDatabase.paddy;
  const tbody = document.getElementById('scheduleTableBody');
  tbody.innerHTML = '';

  crop.splits.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${s.stage}</strong></td>
      <td><span class="status-normal">${s.urea}</span></td>
      <td>${s.dap}</td>
      <td>${s.mop}</td>
      <td><span class="status-warning">${s.organic}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Satellite Remote Sensing Canvas
function initSatelliteCanvas() {
  const canvas = document.getElementById('ndviCanvas');
  if (!canvas) return;
  renderNDVICanvas();
}

function renderNDVICanvas() {
  const canvas = document.getElementById('ndviCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = 380;

  // Background gradient map
  const img = new Image();
  img.src = 'assets/satellite.jpg';
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Draw polygon for farm plot boundary
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(canvas.width * 0.25, canvas.height * 0.2, canvas.width * 0.5, canvas.height * 0.6);
    ctx.setLineDash([]);
    
    // Draw NDVI Heatmap markers
    ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.fillRect(canvas.width * 0.26, canvas.height * 0.21, canvas.width * 0.24, canvas.height * 0.58);
    
    ctx.fillStyle = 'rgba(245, 158, 11, 0.45)'; // Stress zone
    ctx.fillRect(canvas.width * 0.50, canvas.height * 0.21, canvas.width * 0.24, canvas.height * 0.58);

    // Label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Outfit';
    ctx.fillText('Plot ID: TN-CBE-2026-0891 (NDVI Avg: 0.74)', canvas.width * 0.27, canvas.height * 0.28);
    ctx.fillStyle = '#F59E0B';
    ctx.fillText('⚠️ Nitrogen Deficit Sub-Plot', canvas.width * 0.52, canvas.height * 0.28);
  };
}

// Disease Classifier Module
function initDiseaseScanner() {
  const runBtn = document.getElementById('runDiagBtn');
  const box = document.getElementById('diagScannerBox');

  runBtn.addEventListener('click', () => {
    box.classList.add('scanning');
    runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Vertex AI Inferring...`;

    setTimeout(() => {
      box.classList.remove('scanning');
      runBtn.innerHTML = `<i class="fa-solid fa-check"></i> Diagnosis Complete`;

      document.getElementById('diagResultBox').style.display = 'block';
      document.getElementById('diagResultBox').scrollIntoView({ behavior: 'smooth' });
    }, 1600);
  });
}

// Text to Speech Audio Player
function initSpeechSynth() {
  const playBtn = document.getElementById('playAudioBtn');
  let isSpeaking = false;

  playBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span data-i18n="playAudioBtn">Listen to Advisory</span>`;
        return;
      }

      const text = currentLang === 'ta' 
        ? "வணக்கம் உழவரே. உங்கள் மண் pH 6.8 சிறப்பாக உள்ளது. நைட்ரஜன் குறைபாடு உள்ளதால் 45 கிலோ யூரியா மற்றும் இயற்கை பாசி உரத்தை இடுமாறு பரிந்துரைக்கப்படுகிறது."
        : "Hello Farmer. Your soil pH is 6.8 optimal. Moderate nitrogen deficit detected. Apply 45 kilograms of Urea at active tillering stage along with Neem cake.";

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'ta' ? 'ta-IN' : 'en-US';
      utterance.rate = 0.9;

      utterance.onend = () => {
        isSpeaking = false;
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span data-i18n="playAudioBtn">Listen to Advisory</span>`;
      };

      window.speechSynthesis.speak(utterance);
      isSpeaking = true;
      playBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause Voice`;
    } else {
      alert("Text to Speech is not supported in this browser.");
    }
  });
}

// Beckn DPG API Explorer
function initApiViewer() {
  const copyBtn = document.getElementById('copyApiBtn');
  copyBtn.addEventListener('click', () => {
    const code = document.getElementById('jsonCodeBlock').innerText;
    navigator.clipboard.writeText(code);
    copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
    setTimeout(() => {
      copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Beckn Payload`;
    }, 2000);
  });
}
