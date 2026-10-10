# 🔥 HeatSafe India
### Hyperlocal Heat-Health Risk Intelligence Platform

**Turning citywide heat warnings into neighbourhood-level insights.**

HeatWatch India is a web-based prototype designed to identify neighbourhoods that may face elevated heat-health risks by combining weather conditions, environmental indicators, and population vulnerability.

The platform aims to help communities and urban authorities understand where heat risks may be higher, why certain areas may be more vulnerable, and where preventive interventions should be prioritised.

> **Project status:** Hackathon prototype. Some demonstration data may be simulated. Risk scores are illustrative and are not validated medical predictions.

---

## 🌍 The Problem

Extreme heat is a growing public-health challenge in India. However, temperature alone does not fully describe the risk faced by people in different neighbourhoods.

Factors such as humidity, land-surface heating, green cover, air quality, population vulnerability, and exposure duration can influence heat-health risk.

Citywide heat warnings may not reveal which local areas need the most attention.

**The challenge:** How can we move from broad heat alerts to more localised, explainable, and data-informed heat-risk assessment?

## 💡 Our Solution

HeatWatch India combines available environmental and demographic indicators into an interactive dashboard that estimates relative heat-health risk at the neighbourhood level.

The platform is designed to:

- 🌡️ Display weather conditions and heat-related indicators.
- 🗺️ Visualise estimated risk using an interactive, colour-coded map.
- 📊 Calculate transparent, explainable risk scores.
- 🔍 Show factors contributing to an area's estimated risk.
- 🎚️ Provide a what-if simulator to explore hypothetical scenarios.
- 🛡️ Suggest preventive actions for areas that may need additional attention.

## ✨ Key Features

### 1. Interactive Heat-Risk Map
Explore locations and view their estimated risk categories using a geographic map.

### 2. Explainable Risk Scoring
Combine normalised environmental and vulnerability indicators into a single score, with the contribution of each factor visible.

### 3. Weather Integration
Use weather API data to display temperature, humidity, and other available heat-related indicators.

### 4. What-If Simulator
Change hypothetical input values and observe how the model's estimated risk score responds.

### 5. Preventive Recommendations
Generate rule-based suggestions such as prioritising shaded public spaces, drinking-water access, cooling facilities, and outreach to vulnerable populations.

### 6. Data-Informed Decision Support
Provide a foundation for future integration of satellite observations, air-quality measurements, official population statistics, and verified local geographic data.

## ⚙️ How It Works

1. **Collect data:** Retrieve weather information and load available environmental, geographic, and demographic datasets.
2. **Prepare inputs:** Convert supported indicators to documented, comparable scales.
3. **Estimate risk:** Apply a transparent, weighted scoring model.
4. **Visualise results:** Display scores and risk categories on the interactive map and dashboard.
5. **Recommend action:** Apply rules to suggest preventive measures based on the estimated risk and its contributing factors.

### Prototype Risk Model

An initial illustrative scoring formula is:

\[
R = 0.30T + 0.20H + 0.20S + 0.20V + 0.10A
\]

Where:

| Variable | Description | Weight |
|---|---|---:|
| T | Temperature-related heat score | 30% |
| H | Humidity / heat-stress score | 20% |
| S | Land-surface heating score | 20% |
| V | Population vulnerability and exposure score | 20% |
| A | Air-quality risk score | 10% |

Each input is intended to be normalised to a scale from 0 to 100.

**Important:** The formula and weights are preliminary design assumptions, not validated scientific thresholds. Input normalisation, data quality, potential overlap between factors, and model performance require further evaluation.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| JavaScript | Application logic and risk calculations |
| Vite | Development server and build tooling |
| Leaflet | Interactive maps |
| OpenStreetMap | Base-map tiles |
| Open-Meteo API | Weather data integration |
| Recharts (optional) | Charts and data visualisation |

The initial prototype can use in-app sample data. A dedicated backend or database may be added as the project evolves.

## 📡 Potential Data Sources

The following sources can support future development, subject to data availability, coverage, access conditions, and licensing.

| Data | Potential source |
|---|---|
| Temperature and humidity | [Open-Meteo](https://open-meteo.com/en/docs) |
| Indian weather observations | [India Meteorological Department](https://mausam.imd.gov.in/) |
| Land cover and vegetation | [ISRO Bhuvan](https://bhuvan.nrsc.gov.in/) |
| Satellite land-surface temperature | [NASA Earthdata](https://earthdata.nasa.gov/) |
| Population statistics | [Census of India](https://censusindia.gov.in/) |
| Air quality | [CPCB](https://cpcb.nic.in/) |
| Geographic base maps | [OpenStreetMap](https://www.openstreetmap.org/) |

Data sources may differ in spatial resolution, update frequency, and geographic coverage. Weather estimates for a city must not be presented as direct measurements for every neighbourhood.

## 🚀 Getting Started

### Prerequisites

Install:

- [Node.js](https://nodejs.org/) — preferably an active LTS version.
- npm, which is included with Node.js.
- [Git](https://git-scm.com/) for version control.

### Installation

Clone your repository:

```bash
git clone https://github.com/YOUR-USERNAME/heatwatch-india.git
cd heatwatch-india
```

Install dependencies:

```bash
npm install
```

If you are creating the React project from scratch instead:

```bash
npm create vite@latest heatwatch-india -- --template react
cd heatwatch-india
npm install
npm install leaflet react-leaflet recharts
npm run dev
```

If your existing project already has its dependencies installed, do not recreate it. Follow its existing `package.json` and setup instructions.

### Run Locally

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically:

```text
http://localhost:5173/
```

### Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Suggested Project Structure

```text
heatwatch-india/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── RiskMap.jsx
│   │   ├── RiskCard.jsx
│   │   └── Simulator.jsx
│   ├── data/
│   │   └── neighbourhoods.js
│   ├── utils/
│   │   └── riskCalculator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

This is a suggested structure; the actual files may differ depending on the implementation.

## 🧪 Current Scope and Limitations

- The initial release is a prototype intended for demonstration and experimentation.
- Some neighbourhood-level attributes and statistics may be simulated.
- Weather API values may represent model-grid estimates rather than local sensor readings.
- Official neighbourhood boundaries and reliable local datasets may not be available for every variable.
- The initial scoring formula has not been clinically or epidemiologically validated.
- Recommendations are general preventive suggestions, not medical advice.

HeatWatch India should not be used as the sole basis for emergency response, clinical decisions, or official public-health alerts.

## 🔮 Future Improvements

- Integrate verified, regularly updated Indian weather and air-quality datasets.
- Incorporate satellite-derived land-surface temperature and vegetation indicators.
- Add official ward boundaries and appropriately resolved population data.
- Develop and validate a predictive model using suitable historical data and health outcomes.
- Add time-series heat-risk forecasts and alerts.
- Evaluate model performance, uncertainty, fairness, and geographic coverage.
- Improve accessibility and support additional Indian cities and languages.

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request describing your contribution.

## 📄 Data, Attribution and Licensing

Review the licensing and attribution requirements of each dataset, API, and map provider before redistribution or deployment. Follow OpenStreetMap's attribution requirements when displaying its map data.

Add a project-specific `LICENSE` file once you decide how the source code may be reused.

## 👥 Acknowledgements

Built as a hackathon prototype exploring how environmental data and transparent analytics could support more localised heat-health risk awareness in India.

---

**HeatWatch India — Towards cooler, safer, and more resilient communities.**
