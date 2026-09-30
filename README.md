# AgriXGo

> **An Interoperable Digital Public Good (DPG) for Federated Agro-Advisories, Soil Intelligence & Crop Diagnostics**

---

## 📌 Overview

**AgriXGo** bridges the critical gap between complex agricultural datasets and smallholder farmers. Built on top of emerging Digital Public Infrastructure (DPI) principles, AgriXGo synthesizes ground-level soil testing records, Sentinel-2 satellite remote sensing, local meteorological forecasts, and multimodal computer vision into actionable, vernacular guidance for farmers.

Powered end-to-end by **Google Cloud Platform (GCP)** and designed around open-standard API architectures (OpenAPI 3.0 / Beckn Protocol), the platform enables State Agricultural Universities (SAUs) and state departments to federate agronomic rulesets and share intelligence without proprietary vendor lock-in.

---

## 🚨 Problem Statement & The Challenge

* **The Problem:** Small and marginal farmers across India lack access to real-time, data-driven agricultural guidance. Over-reliance on blanket chemical treatments and traditional guesswork leads to soil degradation, increased input costs, and climate vulnerability. Furthermore, agricultural intelligence remains fragmented across proprietary systems, preventing cross-state collaboration.
* **The Challenge:** Construct a scalable, open Digital Public Good that unifies soil diagnostics, satellite canopy analytics (NDVI/NDWI), hyper-local climate forecasts, and plant leaf disease diagnostics into an accessible, low-bandwidth, multilingual interface.

---

## ⚙️ Core Architecture & Google Cloud Topology

```text
                       [ CLIENT TIER (Flutter) ]
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 [Soil Test OCR / Entry]   [Satellite Plot View]    [Leaf Disease Scanner]
        │                          │                          │
        └──────────────────────────┼──────────────────────────┘
                                   │ HTTPS / Cloud Endpoints
                                   ▼
                [ GOOGLE CLOUD PLATFORM (GCP) BACKEND ]
 ┌────────────────────────────────────────────────────────────────────────┐
 │  • Cloud Run / App Engine: Interoperable DPG REST Gateway              │
 │  • Vertex AI / Gemini Vision API: Multimodal Soil Card OCR & Leaf Diag │
 │  • Cloud Firestore: GeoJSON Farm Boundaries & User Profiles            │
 │  • Cloud Storage (GCS): Raw Imagery & Diagnostic History               │
 │  • Cloud Functions (Gen2): Asynchronous Agro-Advisory Event Fusion    │
 └─────────────────────────┬──────────────────────────┬───────────────────┘
                           │                          │
        ┌──────────────────┴──────┐         ┌─────────┴───────────────────┐
        ▼                         ▼         ▼                             ▼
 [External Ingestion]    [Earth Engine API] [Interoperable DPG Layer]    [Vernacular]
  • Open-Meteo Weather    • Sentinel-2 NDVI  • OpenAPI 3.0 / JSON-LD      • Cloud TTS
  • National AgriStack    • NDWI Indices     • Beckn-compliant Schemas    • Tamil/English
```

---

## 🚀 Key Features

### 1. Soil Health Translation Engine (Vertex AI + Gemini)
* Ingests physical Soil Health Cards via mobile camera using **Gemini 1.5 Flash / Vertex AI Vision** for high-accuracy OCR extraction of $\text{pH}$, Electrical Conductivity, $\text{N}$, $\text{P}$, $\text{K}$, and Organic Carbon.
* Translates chemical values into target nutrient split applications (e.g., exact split ratios of Urea, DAP, Potash, and organic bio-compost) tailored to specific target crops.

### 2. Earth Observation via Google Earth Engine
* Computes remote sensing vegetation metrics (Sentinel-2 NDVI for canopy density and NDWI for water stress) directly using Google Earth Engine Python APIs.
* Fuses real-time precipitation windows via meteorological APIs to prevent fertilizer leaching and pesticide spray wash-off.

### 3. Edge / Cloud Crop Disease Diagnostics
* Multimodal leaf pathology analysis powered by **Vertex AI** and on-device **TensorFlow Lite (MobileNetV3)**.
* Identifies blights, leaf spots, and pest damage, delivering organic and regenerative treatments immediately.

### 4. Interoperable DPG / Beckn-Ready Specifications
* Deployed on **Google Cloud Run** exposing standardized semantic endpoints (JSON-LD) allowing State Agricultural Universities to publish localized agronomy models.
* Native alignment with national data initiatives like AgriStack, UFSI, and Krishi-DSS.

### 5. Vernacular & Voice-First Usability
* Dual-language support (English & Tamil) with automated voice playback powered by **Google Cloud Text-to-Speech (TTS)**.

---

## 🛠️ Tech Stack

* **Development Environment:** Google AntiGravity IDE
* **Frontend Application:** Flutter (Android & Web PWA)
* **State Management:** BLoC Architecture
* **Cloud Infrastructure:** Google Cloud Platform (GCP)
  * **Compute:** Cloud Run (FastAPI Backend) & Cloud Functions (Gen 2)
  * **Database:** Cloud Firestore (Native Mode)
  * **Storage:** Google Cloud Storage (GCS)
  * **AI & Machine Learning:** Vertex AI (Gemini Multimodal API) + TensorFlow Lite
  * **Earth Observation:** Google Earth Engine (GEE) API
  * **Voice & Speech:** Google Cloud Text-to-Speech API
* **DPG & Interoperability:** OpenAPI 3.0, JSON-LD, Beckn Protocol schema

---

## 📁 Repository Structure

```bash
AgriXGo/
├── android/                        # Native Android wrapper configuration
├── lib/
│   ├── bloc/                       # State management (Soil, Weather, Vision, Advisory)
│   ├── models/                     # Data models (SoilReport, SentinelPlot, Diagnosis)
│   ├── services/
│   │   ├── gcp_api_service.dart    # Cloud Run gateway client
│   │   ├── weather_service.dart    # Open-Meteo REST calls
│   │   ├── gee_service.dart        # Earth Engine integration
│   │   └── vision_classifier.dart  # TFLite & Vertex AI inference
│   ├── views/
│   │   ├── home_dashboard.dart     # Farmer unified action center
│   │   ├── soil_input_view.dart    # OCR & manual soil entry form
│   │   ├── disease_scanner_view.dart# Camera capture & diagnostic view
│   │   └── plot_analytics_view.dart # Satellite canopy map
│   └── main.dart                   # Application entry point
├── backend/                        # Google Cloud Run microservice (Python FastAPI)
│   ├── app/
│   │   ├── api/                    # Interoperable DPG OpenAPI endpoints
│   │   ├── services/               # Vertex AI, GEE, and agronomic logic
│   │   └── main.py                 # FastAPI server
│   ├── Dockerfile                  # Container definition for Cloud Run
│   └── requirements.txt
├── functions/                      # GCP Cloud Functions (Gen 2 event triggers)
├── openapi_spec.yaml               # Standardized DPG API definition
└── README.md                       # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites
* Flutter SDK (v3.19 or higher)
* Google Cloud SDK (`gcloud` CLI installed and authenticated)
* Active GCP Project with billing enabled
* Google Earth Engine access enabled for your service account

### 1. Clone & Set Up Frontend
```bash
git clone https://github.com/shanthoshrajelumalai/AgriXGo.git
cd AgriXGo
flutter pub get
```

### 2. Configure Google Cloud Services
Enable the required GCP APIs:
```bash
gcloud services enable \
    run.googleapis.com \
    firestore.googleapis.com \
    storage.googleapis.com \
    aiplatform.googleapis.com \
    texttospeech.googleapis.com \
    earthengine.googleapis.com
```

### 3. Deploy Backend to Google Cloud Run
```bash
cd backend
gcloud builds submit --tag gcr.io/[PROJECT-ID]/agrixgo-backend
gcloud run deploy agrixgo-backend \
    --image gcr.io/[PROJECT-ID]/agrixgo-backend \
    --platform managed \
    --region asia-south1 \
    --allow-unauthenticated
```

### 4. Run the Client Application
```bash
flutter run
```

---

## 🌐 Open Interoperability & DPG API Spec

AgriXGo exposes open REST/JSON-LD interfaces for cross-state data federation via Google Cloud Run:

```http
POST https://agrixgo-backend-[hash]-el.a.run.app/api/v1/advisory/generate
Content-Type: application/json

{
  "plot_id": "TN-CBE-2026-0891",
  "coordinates": {"lat": 11.0168, "lon": 76.9558},
  "soil_profile": {
    "ph": 6.8,
    "nitrogen_kg_ha": 185.0,
    "phosphorus_kg_ha": 18.2,
    "potassium_kg_ha": 240.0,
    "organic_carbon_pct": 0.45
  },
  "crop_target": "Paddy_ADT53",
  "growth_stage": "Tillering"
}
```

---

## 📄 License & Public Good Status

This project is licensed under the **Apache License 2.0** to comply with open Digital Public Good standards, encouraging transparent audits, inter-university research sharing, and state-level adoption.