# HeatSafe🌡️

> **Hyperlocal Heat-Health Risk Intelligence Platform**  
> Designed for the Pune Municipal Corporation (PMC), disaster management planners, and public health authorities.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement

Traditional citywide weather forecasts give a single temperature for Pune (e.g. from the central Shivajinagar weather station), but heat-health vulnerability varies sharply across neighbourhoods:

- **Asphalt & Concrete Density**: High impervious surface density and metal roofs trap radiant heat, causing intense localized **Urban Heat Island (UHI)** hotspots.
- **Tree Canopy Disparity**: Mature banyan tree corridors in Koregaon Park buffer temperatures by up to ~3°C, whereas historic street canyons in Kasba Peth suffer from under 7% canopy cover.
- **Socio-Economic Exposure**: Slum clusters, dense elderly populations, and outdoor informal labor forces face severe heat exhaustion without targeted municipal support.
- **Air Pollution Interactions**: Industrial particulate matter (PM2.5) along transit corridors (e.g., Hadapsar / Solapur Road) compounds thermal cardio-respiratory distress.

**HeatSafe Pune** moves beyond generic alerts to provide ward-level, explainable, and actionable risk intelligence to prioritize preventive civic action.

---

## ✨ Key Features

### 1. 🗺️ Dual-Mode Interactive Cartography
- **Native Vector Graphic Map**: 100% self-contained vector mosaic featuring natural, organic ward boundaries, the curving **Mula-Mutha River** ribbon, and regional geographic landmarks (Western Ghats foothills, Shaniwar Wada core, IT corridors). Zero external API dependencies.
- **Street Tiles GIS Map**: Leaflet OpenStreetMap view strictly locked to Pune municipal bounds (`minZoom: 12`, `maxBounds` enabled) to prevent accidental world map zoom-out.
- **Dynamic Focus & Dimming Effect**: Selecting a ward highlights it with full vibrant risk opacity and smooth zoom, while all surrounding wards **automatically dim and hide their badges** to remove visual clutter.

### 2. 📍 Dynamic Synchronized Telemetry Header
- The top Apple-style navigation capsule dynamically reflects the **active ward's microclimate**:
  - **Localized Temperature**: Real-time UHI temperature offset calculated from impervious built mass vs. vegetative tree canopy.
  - **Localized Humidity & Heat Index**: Apparent temperature and wet-bulb physiological risk.
  - **Ward Risk Score & Tier Badge**: Instantly updates when switching between wards.
- **Built-in Scope Switcher**: A square-round toggle pill (`[ 📍 Ward Name | 🌐 City Avg ]`) allows one-click switching between ward microclimates and Pune's citywide baseline average.

### 3. 🧪 Interactive What-If Intervention Simulator
Test targeted cooling policies before deploying municipal capital:
- **🏢 Cool Roofs**: Adjust solar-reflective high-albedo roof coating adoption (0% to 100%).
- **🌳 Urban Tree Canopy**: Adjust shade expansion and roadside greening (0% to 100%).
- **⚡ Combined Strategy**: Simultaneous deployment modeling synergistic cooling.
- **Live Outcome Metrics**: Real-time risk score reduction (e.g. `84 → 69 (-15 pts)`), risk tier shifts (`Very High → High`), and estimated physical cooling (`-2.9°C Surface Heat Drop`).

### 4. 🧮 Explainable Hyperlocal Risk Engine
- Implements the weighted multi-factor formula:
  $$\text{Risk Score } (R) = 0.30T + 0.20H + 0.20S + 0.20V + 0.10A$$
  - **$T$ (30%)**: Ambient Temperature-related heat score (normalized 28°C to 45°C).
  - **$H$ (20%)**: Humidity-related heat stress / evaporative cooling inhibition.
  - **$S$ (20%)**: Surface built heat (impervious concrete/asphalt density).
  - **$V$ (20%)**: Demographic & socio-economic vulnerability (seniors 60+, informal housing).
  - **$A$ (10%)**: Air quality burden (particulate pollution & ozone).
- **Risk Tiers**:
  - 🟢 **Low Risk (0–24.9)**: Routine monitoring & natural buffer preservation.
  - 🟡 **Moderate Risk (25–49.9)**: Precautionary advisory & public hydration.
  - 🟠 **High Risk (50–74.9)**: Targeted civic intervention & outdoor shift curfews.
  - 🔴 **Very High Risk (75–100)**: Immediate emergency action & cooling stations.

### 5. ⛅ Live Weather & Peak Heatwave Toggle
- **Live Open-Meteo Integration**: Fetches live temperature, relative humidity, apparent temperature, and wind speed for Pune coordinates (`18.5204° N, 73.8567° E`).
- **Simulated Peak Heatwave Scenario**: One-click toggle to stress-test the city under a simulated **Peak May Severe Heatwave (IMD Red Alert at 43.6°C)**.

### 6. 📋 Uncluttered On-Demand Statistics & PMC Playbooks
- By default, the interface remains clean, airy, and focused on the map and simulator.
- **`[ 📊 View Ward Statistics ]`**: On-demand expansion for the 4-box demographic baseline grid, 5-factor weighted progress bars, and primary driver explanations.
- **`[ 📋 View Playbook ]`**: Ward-specific civic directives (cool roof subsidies, drinking water chhabils, misting transit nozzles, elderly outreach).

---

## 🏙️ Representative Pune Wards

| Ward | Urban Character | Canopy | Impervious | Baseline Risk |
| :--- | :--- | :---: | :---: | :---: |
| **Kasba Peth & Old Core** | Historic high-density street canyons, tin roofs, dense elders | 6.8% | 88.5% | **77.9 (Very High)** |
| **Hadapsar Industrial Belt** | Industrial corridors, heavy truck freight, concrete factories | 11.2% | 79.0% | **74.9 (High)** |
| **Shivajinagar Civic Center** | Transit & administrative hub, college green buffers | 22.4% | 68.0% | **62.1 (High)** |
| **Kothrud Residential Valley** | Established housing societies, western hill breezes | 24.8% | 62.5% | **58.2 (High)** |
| **Viman Nagar & Kharadi** | Modern IT glass towers, wide concrete plazas | 16.5% | 76.2% | **60.8 (High)** |
| **Koregaon Park Green Haven** | Heritage banyan canopy, Mula-Mutha river buffer | 38.6% | 42.0% | **45.4 (Moderate)** |

---

## 🎨 Apple-Grade Civic UI Design

- **Canvas & Atmosphere**: Light neutral backdrop (`#F5F5F7`), translucent frosted glass cards (`backdrop-blur-xl bg-white/85 border border-black/[0.06]`), and soft diffused ambient shadows.
- **Squircle Geometry**: All toggles, segmented tab pickers, buttons, and badges use square-round (squircle) border radii (`rounded-squircle`).
- **Zero AI Clutter**: No chatbot avatars, purple gradients, or robotic cliches — built as an authoritative municipal executive analytics console.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom squircle & Apple palette design tokens
- **Cartography**: Native SVG Vector Graphic Cartography + [Leaflet 1.9](https://leafletjs.com/) & OpenStreetMap
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [Open-Meteo Forecast API](https://open-meteo.com/) for real-time atmospheric data

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher, LTS recommended)
- `npm` (v9.0.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prashant2432/heatSafe-
   cd heatsafe-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000/`.

### Production Build

To produce an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```
heatsafe-/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── AppleHeader.jsx         # Sticky frosted glass header with dynamic telemetry
│   │   ├── GraphicWardMap.jsx      # Native vector graphic map with Mula-Mutha river
│   │   ├── WardRiskMap.jsx         # Leaflet OpenStreetMap view with focus/dim effect
│   │   ├── WardDetailPanel.jsx     # Ward dossier with collapsible statistics & playbook
│   │   ├── WhatIfSimulator.jsx     # Cool roofs & canopy sliders with live delta
│   │   └── MethodologyModal.jsx    # Model transparency and formula modal
│   ├── data/
│   │   └── puneWards.js            # Ward boundary coordinates, demographics, and playbooks
│   ├── services/
│   │   ├── riskEngine.js           # Multi-factor formula, tier classifier, and simulator
│   │   └── weatherService.js       # Open-Meteo client & simulated heatwave scenario
│   ├── App.jsx                     # Root application state & telemetry coordinator
│   ├── index.css                   # Custom squircle sliders and Leaflet overrides
│   └── main.jsx                    # Application entrypoint
├── index.html                      # HTML template with font & Leaflet preloads
├── package.json                    # Project metadata & scripts
├── tailwind.config.js              # Apple design system & squircle token configuration
└── vite.config.js                  # Vite server & bundler configuration
```

---

## 🧪 Verification & Testing

Unit tests validating the risk engine formula, tier boundaries, and intervention physics:
```bash
node scratch/test_risk_engine.js
```

---

## 📜 Scientific Disclaimer

*HeatSafe is a prototype decision-support tool created for demonstration and planning purposes. The scoring formula weights and ward-level attributes reflect calibrated baseline assumptions rather than validated epidemiological thresholds. Real-time atmospheric observations are powered by Open-Meteo.*

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
