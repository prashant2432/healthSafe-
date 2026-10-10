🔥 HeatSafe

Hyperlocal heat-health risk awareness, from citywide warnings to neighbourhood-level insight.

🚧 Hackathon prototype built at SKN COE (09/10/2026). Risk scores are illustrative, some data is simulated, and nothing here is medical advice or a validated prediction.

<!-- Add a screenshot or GIF of the app here, for example: --> <!-- ![HeatSafe dashboard](docs/screenshot.png) -->

Live demo: add your Vercel/Netlify link here

📌 The Problem

Extreme heat is a growing public-health risk in India, but a citywide temperature warning doesn't tell people which neighbourhoods are more at risk, or why. Humidity, surface heating, green cover, air quality and who lives in an area (elderly people, outdoor workers) all change how dangerous a hot day is.

Challenge: how can we move from broad heat alerts to localised, explainable, data-informed heat-risk assessment?

💡 Our Solution

HeatSafe is a web dashboard that combines weather data with environmental and vulnerability indicators to estimate relative heat-health risk for neighbourhoods, and explains what is driving each score.

✨ Features
🗺️ Interactive risk map with colour-coded neighbourhoods (Leaflet + OpenStreetMap)
🌡️ Live weather (temperature, humidity) from the Open-Meteo API
📊 Explainable scoring: see how each factor contributes to a score
🎚️ What-if simulator: change inputs and watch the risk respond
🛡️ Preventive suggestions: simple rule-based tips (shade, drinking water, cooling spaces, outreach to vulnerable groups)

Some neighbourhood-level values (surface heating, vulnerability, air quality) are sample data for demonstration.

⚙️ How It Works
Fetch current weather for the area.
Load neighbourhood indicators (sample data in this prototype).
Scale each indicator to 0 to 100.
Combine them with a weighted formula to get a risk score and category.
Show results on the map and dashboard, with rule-based recommendations.
Prototype risk formula
Risk = 0.30·T + 0.20·H + 0.20·S + 0.20·V + 0.10·A
Symbol	Factor	Weight
T	Temperature heat score	30%
H	Humidity / heat-stress score	20%
S	Land-surface heating score	20%
V	Population vulnerability and exposure	20%
A	Air-quality risk	10%

These weights are design assumptions, not scientifically validated thresholds. There is no trained machine-learning model in this project; it is a transparent rule-based score so that every number can be explained.

🛠️ Tech Stack
Tool	Purpose
React 18	User interface
Vite	Dev server and build tool
Tailwind CSS	Styling
Leaflet + OpenStreetMap	Map and base tiles
Open-Meteo API	Weather data
Recharts	Charts
lucide-react	Icons
🚀 Getting Started

Requirements: Node.js (LTS recommended) and Git.

bash
git clone https://github.com/prashant2432/healthSafe-.git
cd healthSafe-
npm install
npm run dev

Then open the local address shown in your terminal (usually http://localhost:5173).

npm install is only needed once per copy of the project, or again after package.json changes. After that, just run npm run dev.

Other commands
Command	What it does
npm run dev	Start the development server
npm run build	Create a production build in dist/
npm run preview	Preview the production build locally
Troubleshooting
Cannot find module ... vite: dependencies aren't installed. Run npm install in the folder that contains package.json.
Opened from a downloaded zip? A zip won't include node_modules. Use git clone instead, or run npm install after extracting.
📡 Data Sources
Data	Source	Status
Temperature, humidity	Open-Meteo	Used
Neighbourhood indicators	Sample data in the app	Simulated
Land-surface temperature	NASA Earthdata	Future
Air quality	CPCB	Future
Population	Census of India	Future
Heat-health reference	CDC/ATSDR Heat & Health Index	Reference idea

Weather from a grid or city point is not a direct measurement for every neighbourhood.

⚠️ Limitations
Prototype for demonstration only; scores are relative and illustrative.
Neighbourhood data is partly simulated and boundaries are approximate.
The formula has not been clinically or epidemiologically validated.
Recommendations are general tips, not medical advice.
Do not use this for emergency response, clinical decisions, or official public-health alerts.
🔮 Future Work
Replace sample data with verified datasets (satellite land-surface temperature, official ward boundaries, air-quality feeds).
Validate the scoring against historical heat-illness data.
Add forecasts and alerts.
Support more cities and languages.
👥 Team

Team healthX4 (Hackathon problem statement HC-04: Hyperlocal heat health risk prediction)

Venkatesh Jadhav (Team Leader)
Prashantjit Dandge
Gauri Ugalmugale
Amruta Chavan
📄 License and Attribution

Map data © OpenStreetMap contributors. Weather data from Open-Meteo. Check each data provider's terms before redistributing or deploying.

Add a LICENSE file (for example MIT) to state how the code can be reused.

Content
