// Pune Ward Boundaries & Baseline Heat-Health Risk Attributes
// Centered around Pune Municipal Corporation (PMC) jurisdiction

export const PUNE_CITY_CENTER = [18.5250, 73.8650];
export const PUNE_DEFAULT_ZOOM = 12;

export const PUNE_WARDS = [
  {
    id: "kasba-peth",
    name: "Kasba Peth & Old Core",
    marathiName: "कसबा पेठ आणि जुने शहर",
    zone: "Central Heritage Core",
    center: [18.5185, 73.8570],
    polygon: [
      // Shared north edge with Shivajinagar
      [18.5265, 73.8420], [18.5280, 73.8480], [18.5275, 73.8540], [18.5270, 73.8600], [18.5260, 73.8640],
      // Shared east edge with Koregaon Park
      [18.5230, 73.8680], [18.5195, 73.8700], [18.5160, 73.8710],
      // Shared south-east edge with Hadapsar
      [18.5120, 73.8690], [18.5080, 73.8650], [18.5060, 73.8600],
      // South-west and west edge
      [18.5050, 73.8540], [18.5060, 73.8480], [18.5080, 73.8430],
      // Shared west edge with Kothrud
      [18.5110, 73.8390], [18.5150, 73.8370], [18.5200, 73.8380],
      // Back north to Shivajinagar triple point
      [18.5235, 73.8395]
    ],
    population: 148500,
    areaKm2: 4.2,
    treeCanopyPct: 6.8,
    imperviousPct: 88.5,
    elderlyPct: 18.4,
    childrenPct: 11.4,
    outdoorLaborPct: 26.0,
    slumClusterCount: 14,
    historicalSummerMaxC: 42.6,
    nearestHospital: "Kamala Nehru Hospital (Mangalwar Peth) & Sassoon General Hospital",
    baseline: {
      temperatureScore: 84,   // T (30%)
      humidityScore: 72,      // H (20%)
      surfaceHeatScore: 92,   // S (20%) - Dense concrete, metal roofs, asphalt canyons
      vulnerabilityScore: 85, // V (20%) - Dense elder population, high outdoor street market density
      airQualityScore: 70     // A (10%) - Congested traffic corridors
    },
    primaryDriver: "High impervious surface density (88.5%) and critically low tree canopy (6.8%) create an intense thermal trap in historic street canyons.",
    coolRoofPotentialAreaM2: 185000,
    treePlantingSpots: 420,
    vulnerableDemographics: {
      seniors: {
        share: "18.4%",
        riskLevel: "Critical",
        riskColor: "#FF3B30",
        physiologicalEffect: "Blunted thirst reflex & compromised cardiovascular reserve; high prevalence of antihypertensive/diuretic medications that inhibit sweating and accelerate acute dehydration.",
        precautions: "Keep in ground-floor ventilated rooms; scheduled hydration check every 60 mins; avoid rooftop/tin rooms between 11 AM - 5 PM."
      },
      children: {
        share: "11.4%",
        riskLevel: "High",
        riskColor: "#FF5A36",
        physiologicalEffect: "Body temperature rises 3-5x faster than adults due to high surface-area-to-mass ratio; underdeveloped sweat glands produce less evaporative cooling.",
        precautions: "Strict playground curfew between 11 AM - 4 PM; hydrate with lemon/electrolyte water; never leave unattended in unventilated rooms."
      },
      outdoorWorkers: {
        share: "26.0%",
        riskLevel: "Critical",
        riskColor: "#FF3B30",
        physiologicalEffect: "Market porters, street hawkers & delivery handlers working under direct solar radiation and radiant tin-roof heat traps without shade buffers.",
        precautions: "Mandatory 15-min rest in shaded PMC chhabils every hour; oral rehydration salts (ORS); avoid solitary heavy lifting during peak noon."
      }
    },
    environmentalHazards: {
      hazardHeadline: "Acute Street-Canyon Thermal Radiance & Heat Trapping",
      heatTrapMechanism: "Narrow historic gaothan alleys lined with tin and asbestos roofs trap radiant energy. Concrete walls store heat through the day and re-radiate it late into the night, depriving residents of nocturnal recovery.",
      airPollutionInteraction: "Congested commercial corridors trap vehicle exhaust (PM2.5, NOx), creating a toxic heat-pollution cocktail that strains cardiovascular and respiratory systems."
    },
    playbook: [
      {
        title: "PMC Emergency Cool Roof Mission",
        desc: "Deploy solar-reflective lime/white coatings on 35,000 m² of tenement and old tin roof clusters in Raviwar & Kasba Peth.",
        impact: "Reduces indoor ambient temps by 3.2°C",
        badge: "Urgent"
      },
      {
        title: "Chhabils & Hydration Points",
        desc: "Set up 12 mobile PMC drinking water kiosks at Mandai, Shaniwar Wada, and dense pedestrian retail crossings.",
        impact: "Critical heat stroke prevention",
        badge: "Immediate"
      },
      {
        title: "Elderly Vulnerability Outreach",
        desc: "Activate PMC ASHA health workers for daily door-to-door welfare checks on seniors aged 65+ during heat advisory peaks.",
        impact: "High-risk hospitalization reduction",
        badge: "Health"
      }
    ]
  },
  {
    id: "hadapsar",
    name: "Hadapsar & Industrial Corridor",
    marathiName: "हडपसर औद्योगिक पट्टा",
    zone: "Eastern Industrial & Transit Hub",
    center: [18.5010, 73.9280],
    polygon: [
      // Shared north-west edge with Kasba Peth (reversed)
      [18.5060, 73.8600], [18.5080, 73.8650], [18.5120, 73.8690],
      // Shared north edge with Koregaon Park (reversed)
      [18.5160, 73.8710], [18.5170, 73.8780], [18.5180, 73.8850],
      [18.5190, 73.8920], [18.5195, 73.8980], [18.5200, 73.9040],
      // Shared north-east edge with Viman Nagar
      [18.5220, 73.9100], [18.5250, 73.9180], [18.5260, 73.9260],
      // South-east sweep (Solapur Road corridor)
      [18.5240, 73.9380], [18.5180, 73.9480], [18.5100, 73.9530],
      [18.5010, 73.9540], [18.4920, 73.9500],
      // Southern industrial belt
      [18.4860, 73.9400], [18.4830, 73.9280], [18.4810, 73.9160],
      // South-west arc back to Kasba Peth
      [18.4820, 73.9040], [18.4850, 73.8920], [18.4900, 73.8810],
      [18.4950, 73.8720], [18.5010, 73.8650]
    ],
    population: 265000,
    areaKm2: 12.8,
    treeCanopyPct: 11.2,
    imperviousPct: 79.0,
    elderlyPct: 11.8,
    childrenPct: 15.2,
    outdoorLaborPct: 34.0,
    slumClusterCount: 22,
    historicalSummerMaxC: 43.1,
    nearestHospital: "Noble Hospital (Hadapsar) & PMC Magarpatta Health Center",
    baseline: {
      temperatureScore: 86,
      humidityScore: 68,
      surfaceHeatScore: 82,
      vulnerabilityScore: 74, // High informal industrial & migrant construction workforce
      airQualityScore: 88     // Heavy particulate pollution & industrial emissions
    },
    primaryDriver: "Industrial thermal retention combined with elevated particulate pollution (PM2.5) compounds heat exhaustion for outdoor factory & logistics workers.",
    coolRoofPotentialAreaM2: 320000,
    treePlantingSpots: 950,
    vulnerableDemographics: {
      seniors: {
        share: "11.8%",
        riskLevel: "High",
        riskColor: "#FF5A36",
        physiologicalEffect: "High background particulate pollution (PM2.5) combined with intense heat triggers acute coronary spasms and severe respiratory distress in elderly residents.",
        precautions: "Keep indoors with air filtration or wet cloth barriers; avoid early afternoon walks; ensure continuous electrolyte intake."
      },
      children: {
        share: "15.2%",
        riskLevel: "Critical",
        riskColor: "#FF3B30",
        physiologicalEffect: "Dense informal settlement clusters with non-insulated tin roofs where indoor temperatures exceed 44°C; children suffer rapid heat syncope and electrolyte imbalance.",
        precautions: "Provide access to shaded community halls during 12 PM - 4 PM; suspend outdoor school sports; monitor for fever, dark urine, and lethargy."
      },
      outdoorWorkers: {
        share: "34.0%",
        riskLevel: "Critical",
        riskColor: "#FF3B30",
        physiologicalEffect: "Industrial dock workers, truck loaders, and masonry crews working alongside hot metal machinery and radiant asphalt; severe heat stroke hazard.",
        precautions: "Enforce mandatory work pause between 12:30 PM - 3:30 PM; supply cold ORS water tankers at work sites; pair workers into buddy safety systems."
      }
    },
    environmentalHazards: {
      hazardHeadline: "Industrial Heat Retention & Toxic PM2.5 Synergies",
      heatTrapMechanism: "Heavy concrete industrial floors, metal warehouses, and wide asphalt roadways store massive thermal mass with only 11.2% tree canopy to provide shade.",
      airPollutionInteraction: "PM2.5 concentrations exceeding 85 µg/m³ along Solapur corridor restrict oxygenation while the heart is already pumping at double capacity to cool the body."
    },
    playbook: [
      {
        title: "Outdoor Industrial Shift Curfew",
        desc: "Enforce mandatory work pause between 12:30 PM - 3:30 PM for outdoor loading docks, fabrication yards, and construction sites.",
        impact: "Prevents occupational heat exhaustion",
        badge: "Mandatory"
      },
      {
        title: "Dust & Smog Mist Cannons",
        desc: "Deploy PMC anti-smog water misting trucks along Solapur Road & industrial corridors to suppress ozone and particulate peaks.",
        impact: "Reduces thermal respiratory stress",
        badge: "Environment"
      },
      {
        title: "Factory Shade Corridors",
        desc: "Mandate temporary green mesh canopies along worker walkways and transit stops.",
        impact: "Cuts radiant exposure by 4°C",
        badge: "Infrastructure"
      }
    ]
  },
  {
    id: "shivajinagar",
    name: "Shivajinagar Civic Center",
    marathiName: "शिवाजीनगर प्रशासकीय केंद्र",
    zone: "Central Administrative & Transit Zone",
    center: [18.5370, 73.8460],
    polygon: [
      // North-west boundary (Senapati Bapat Road)
      [18.5420, 73.8240], [18.5470, 73.8310], [18.5500, 73.8400],
      // North boundary (towards Aundh / river)
      [18.5510, 73.8480], [18.5500, 73.8560], [18.5480, 73.8640],
      // North-east (down towards Koregaon Park junction)
      [18.5440, 73.8700], [18.5400, 73.8730], [18.5360, 73.8740],
      // Shared east edge with Koregaon Park
      [18.5310, 73.8730], [18.5270, 73.8700], [18.5260, 73.8640],
      // Shared south edge with Kasba Peth (reversed)
      [18.5270, 73.8600], [18.5275, 73.8540], [18.5280, 73.8480], [18.5265, 73.8420],
      // Shared south-west with Kothrud junction
      [18.5235, 73.8395], [18.5250, 73.8340], [18.5290, 73.8280],
      // West edge back to north-west
      [18.5340, 73.8250], [18.5380, 73.8240]
    ],
    population: 182000,
    areaKm2: 7.5,
    treeCanopyPct: 22.4,
    imperviousPct: 68.0,
    elderlyPct: 14.2,
    childrenPct: 10.5,
    outdoorLaborPct: 18.0,
    slumClusterCount: 8,
    historicalSummerMaxC: 41.5,
    nearestHospital: "Sassoon General Hospital (Near Pune Station) & COEP Health Clinic",
    baseline: {
      temperatureScore: 72,
      humidityScore: 60,
      surfaceHeatScore: 62,
      vulnerabilityScore: 48,
      airQualityScore: 64
    },
    primaryDriver: "Heavy asphalt heat from central transit terminus and high commuter volumes, partially buffered by institutional greenery at Agricultural College & COEP.",
    coolRoofPotentialAreaM2: 140000,
    treePlantingSpots: 520,
    vulnerableDemographics: {
      seniors: {
        share: "14.2%",
        riskLevel: "Moderate-High",
        riskColor: "#FF9500",
        physiologicalEffect: "Transit commuters and elderly citizens visiting civic offices face heat fatigue and sudden blood pressure drops while waiting at hot bus stops.",
        precautions: "Utilize air-conditioned civic cooling spaces at metro stations and civic auditoriums; avoid travel between 12:30 PM - 3:30 PM."
      },
      children: {
        share: "10.5%",
        riskLevel: "Moderate",
        riskColor: "#FF9500",
        physiologicalEffect: "School commuters exposed to high asphalt surface radiation and engine exhaust during midday transit returns.",
        precautions: "Ensure school transit has shaded windows and water bottles; avoid prolonged walking on sun-baked footpaths."
      },
      outdoorWorkers: {
        share: "18.0%",
        riskLevel: "High",
        riskColor: "#FF5A36",
        physiologicalEffect: "Traffic police personnel, auto-rickshaw drivers, and transit staff subjected to continuous engine heat and sun exposure.",
        precautions: "Provide electrolyte sachets and rotational shift breaks in cooled traffic kiosks every 45 minutes."
      }
    },
    environmentalHazards: {
      hazardHeadline: "Asphalt Corridor Heat Radiance & Transit Congestion",
      heatTrapMechanism: "Vast asphalt corridors across the ST bus stand, railway hub, and metro interchanges absorb intense solar heat, radiating surface temperatures of up to 47°C.",
      airPollutionInteraction: "Vehicular exhaust and engine heat combine with high ambient temperatures to generate ground-level ozone hotspots."
    },
    playbook: [
      {
        title: "PMPML Transit Bus Shelter Cooling",
        desc: "Install evaporative misting nozzles and solar reflective canopies at Shivajinagar ST Bus & Metro interchanges.",
        impact: "Protects 85,000 daily commuters",
        badge: "Transit"
      },
      {
        title: "Public Civic Cooling Pavilions",
        desc: "Open air-conditioned civic auditoriums and libraries during peak 1:00 PM - 4:00 PM heat spikes.",
        impact: "Refuge for unhoused and transit travelers",
        badge: "Civic"
      }
    ]
  },
  {
    id: "kothrud",
    name: "Kothrud Residential Valley",
    marathiName: "कोथरूड निवासी परिसर",
    zone: "Western Residential Hub",
    center: [18.5080, 73.8100],
    polygon: [
      // Shared north-east edge with Shivajinagar (reversed south-west points)
      [18.5290, 73.8280], [18.5250, 73.8340], [18.5235, 73.8395],
      // Shared east edge with Kasba Peth (reversed west points)
      [18.5200, 73.8380], [18.5150, 73.8370], [18.5110, 73.8390],
      [18.5080, 73.8430], [18.5060, 73.8480], [18.5050, 73.8540],
      // South-east turn (towards Sinhagad Road)
      [18.5020, 73.8500], [18.4970, 73.8440], [18.4920, 73.8380],
      // Southern edge (Karve Road / Sinhagad Road)
      [18.4880, 73.8300], [18.4870, 73.8200], [18.4890, 73.8100],
      // Western edge (Paud Road / Western Ghats foothills)
      [18.4920, 73.7980], [18.4970, 73.7900], [18.5040, 73.7860],
      // North-west boundary
      [18.5120, 73.7860], [18.5200, 73.7900], [18.5270, 73.7970],
      // Connecting back to Shivajinagar junction
      [18.5310, 73.8060], [18.5330, 73.8160], [18.5320, 73.8230]
    ],
    population: 245000,
    areaKm2: 9.6,
    treeCanopyPct: 24.8,
    imperviousPct: 62.5,
    elderlyPct: 17.1,
    childrenPct: 8.4,
    outdoorLaborPct: 12.0,
    slumClusterCount: 5,
    historicalSummerMaxC: 40.8,
    nearestHospital: "Sahyadri Hospital (Kothrud) & Joshi Hospital",
    baseline: {
      temperatureScore: 65,
      humidityScore: 58,
      surfaceHeatScore: 54,
      vulnerabilityScore: 46, // Well-established housing stock with higher AC adoption, but high senior density
      airQualityScore: 48
    },
    primaryDriver: "Moderate heat vulnerability characterized by aging residential societies and high senior demographic, moderated by western hill breezes.",
    coolRoofPotentialAreaM2: 210000,
    treePlantingSpots: 640,
    vulnerableDemographics: {
      seniors: {
        share: "17.1%",
        riskLevel: "High",
        riskColor: "#FF5A36",
        physiologicalEffect: "High proportion of seniors living alone in top-floor society flats. Concrete roof slabs conduct heat downward, causing prolonged nocturnal heat stress and insomnia.",
        precautions: "Apply terrace reflective mats or cool roof coatings; organize society buddy check-ins for solo seniors; drink water at scheduled intervals."
      },
      children: {
        share: "8.4%",
        riskLevel: "Moderate",
        riskColor: "#FF9500",
        physiologicalEffect: "Children playing outdoors in residential courtyards during afternoon heat risk heat cramps and dizziness.",
        precautions: "Restrict outdoor cycling and sports to post-5:30 PM; ensure pre-hydration with coconut water or lime water."
      },
      outdoorWorkers: {
        share: "12.0%",
        riskLevel: "Moderate-High",
        riskColor: "#FF9500",
        physiologicalEffect: "Residential security guards in non-insulated tin cabins and maintenance gardeners.",
        precautions: "Societies must provide shaded, fan-ventilated security cabins and cold water jars."
      }
    },
    environmentalHazards: {
      hazardHeadline: "Terrace Slab Downward Thermal Conduction",
      heatTrapMechanism: "Concrete terrace slabs of 1980s–1990s housing societies absorb solar radiation all afternoon and conduct heat directly into top-floor flats through the night.",
      airPollutionInteraction: "Relatively clean air buffered by Vetal Hill reduces respiratory compounding, making indoor trapped heat the primary clinical concern."
    },
    playbook: [
      {
        title: "Housing Society Cool Roof Subsidy",
        desc: "PMC rebate scheme for cooperative housing societies applying high-albedo cool roof coats on aging multi-story terraces.",
        impact: "Reduces society cooling energy demand by 18%",
        badge: "Incentive"
      },
      {
        title: "Senior Citizen Wellness Heat Network",
        desc: "Coordinate with local resident associations to maintain thermal welfare lists for seniors living alone.",
        impact: "Proactive heat exhaustion prevention",
        badge: "Community"
      }
    ]
  },
  {
    id: "viman-nagar",
    name: "Viman Nagar & Kharadi IT Belt",
    marathiName: "विमान नगर आणि खराडी आयटी पट्टा",
    zone: "North-Eastern Commercial & Airport Corridor",
    center: [18.5620, 73.9150],
    polygon: [
      // North-west (Nagar Road from Shivajinagar direction)
      [18.5530, 73.8830], [18.5570, 73.8870], [18.5610, 73.8920],
      // Northern arc (Airport / Yerawada ridge)
      [18.5660, 73.8980], [18.5710, 73.9060], [18.5750, 73.9150],
      [18.5760, 73.9240], [18.5740, 73.9340],
      // Eastern arc (towards Wagholi)
      [18.5690, 73.9420], [18.5620, 73.9470], [18.5540, 73.9480],
      // South-east (Kharadi turn into Hadapsar)
      [18.5460, 73.9460], [18.5380, 73.9410], [18.5310, 73.9340],
      // Shared south edge with Hadapsar (reversed north-east edge)
      [18.5260, 73.9260], [18.5250, 73.9180], [18.5220, 73.9100],
      // Shared south-west edge with Koregaon Park
      [18.5200, 73.9040], [18.5250, 73.8980], [18.5320, 73.8920],
      // West edge connecting back to Shivajinagar zone
      [18.5390, 73.8870], [18.5460, 73.8840]
    ],
    population: 175000,
    areaKm2: 8.9,
    treeCanopyPct: 16.5,
    imperviousPct: 76.2,
    elderlyPct: 8.5,
    childrenPct: 12.8,
    outdoorLaborPct: 16.0,
    slumClusterCount: 7,
    historicalSummerMaxC: 41.8,
    nearestHospital: "Symbiosis University Hospital & Inlaks & Budhrani Hospital",
    baseline: {
      temperatureScore: 70,
      humidityScore: 59,
      surfaceHeatScore: 66,
      vulnerabilityScore: 36, // Younger demographic, high socioeconomic resilience
      airQualityScore: 58
    },
    primaryDriver: "Glass facades and wide concrete parking plazas generate micro-urban heat pockets, counterbalanced by modern building insulation and low baseline social vulnerability.",
    coolRoofPotentialAreaM2: 280000,
    treePlantingSpots: 780,
    vulnerableDemographics: {
      seniors: {
        share: "8.5%",
        riskLevel: "Moderate",
        riskColor: "#FF9500",
        physiologicalEffect: "Lower overall senior percentage, but elderly individuals moving between heavily air-conditioned interiors and 44°C outdoor plazas suffer thermal vascular shock.",
        precautions: "Allow gradual cooling adjustments; avoid sudden transitions between extreme cold and extreme outdoor heat."
      },
      children: {
        share: "12.8%",
        riskLevel: "Moderate-High",
        riskColor: "#FF9500",
        physiologicalEffect: "Synthetic turf play areas and rubberized flooring in private school complexes reach temperatures above 55°C, creating rapid contact burn and dehydration hazards.",
        precautions: "Prohibit synthetic turf play between 10:30 AM - 4:30 PM; maintain clean electrolyte drinking stations in schools."
      },
      outdoorWorkers: {
        share: "16.0%",
        riskLevel: "High",
        riskColor: "#FF5A36",
        physiologicalEffect: "Gig delivery riders spending 6–8 hours daily on reflective tarmac under direct solar radiation; acute risk of heat exhaustion and cramps.",
        precautions: "Platform companies must deploy shaded rest pods; riders must carry water bottles with hydration alarms."
      }
    },
    environmentalHazards: {
      hazardHeadline: "Glass Curtain Reflection & Pavement Plazas",
      heatTrapMechanism: "Curtain glass facades on IT towers reflect solar radiation onto surrounding pedestrian plazas, elevating local radiant temperatures above ambient levels.",
      airPollutionInteraction: "Airport corridor traffic and ongoing construction dust generate moderate particulate haze that traps heat in the lower boundary layer."
    },
    playbook: [
      {
        title: "Commercial Surface Greening Mandate",
        desc: "Encourage IT parks and shopping plazas to convert open concrete parking lots into permeable grass-paver and shaded solar-canopy zones.",
        impact: "Lowers surface temperature by 6°C",
        badge: "Green Zone"
      },
      {
        title: "Gig Worker Cooling Stations",
        desc: "Partner with delivery platforms to install shaded rest hubs with cold water dispensers for two-wheeler delivery riders.",
        impact: "Protects mobile outdoor gig workforce",
        badge: "Gig Health"
      }
    ]
  },
  {
    id: "koregaon-park",
    name: "Koregaon Park Green Corridor",
    marathiName: "कोरेगाव पार्क हरित पट्टा",
    zone: "East-Central Riverbank Green Haven",
    center: [18.5360, 73.8920],
    polygon: [
      // Shared north-west edge with Shivajinagar (reversed)
      [18.5360, 73.8740], [18.5400, 73.8730], [18.5440, 73.8700],
      // North edge (Bund Garden, river bank)
      [18.5470, 73.8750], [18.5500, 73.8800], [18.5530, 73.8830],
      // Shared north-east with Viman Nagar (reversed south-west)
      [18.5460, 73.8840], [18.5390, 73.8870], [18.5320, 73.8920],
      [18.5250, 73.8980], [18.5200, 73.9040],
      // Shared south edge with Hadapsar (reversed north edge)
      [18.5195, 73.8980], [18.5190, 73.8920], [18.5180, 73.8850],
      [18.5170, 73.8780], [18.5160, 73.8710],
      // Shared west edge with Kasba Peth (reversed east points)
      [18.5195, 73.8700], [18.5230, 73.8680], [18.5260, 73.8640],
      // Back to Shivajinagar junction
      [18.5270, 73.8700], [18.5310, 73.8730]
    ],
    population: 98000,
    areaKm2: 4.8,
    treeCanopyPct: 38.6,
    imperviousPct: 42.0,
    elderlyPct: 15.2,
    childrenPct: 9.2,
    outdoorLaborPct: 8.0,
    slumClusterCount: 2,
    historicalSummerMaxC: 38.9,
    nearestHospital: "Inlaks and Budhrani Hospital & Jehangir Hospital (Near Pune Station)",
    baseline: {
      temperatureScore: 52,
      humidityScore: 55,
      surfaceHeatScore: 28, // Vast canopy coverage creates 3-4°C cooling microclimate
      vulnerabilityScore: 22, // High socioeconomic buffer, private green spaces
      airQualityScore: 38
    },
    primaryDriver: "Extensive mature banyan and rain tree canopy (38.6%) combined with Mula-Mutha river buffer creates Pune's most resilient microclimate buffer against heatwaves.",
    coolRoofPotentialAreaM2: 95000,
    treePlantingSpots: 180,
    vulnerableDemographics: {
      seniors: {
        share: "15.2%",
        riskLevel: "Low-Moderate",
        riskColor: "#34C759",
        physiologicalEffect: "High tree canopy buffering keeps ambient air 2.5°C cooler, providing protective natural shade for elderly residents during morning and evening walks.",
        precautions: "Maintain regular hydration; complete outdoor walks before 9:30 AM; monitor on days with high riverbank humidity."
      },
      children: {
        share: "9.2%",
        riskLevel: "Low-Moderate",
        riskColor: "#34C759",
        physiologicalEffect: "Natural tree canopies block direct UV and excessive solar radiation, reducing acute thermal strain on young children.",
        precautions: "Encourage outdoor activities in shaded park zones; keep well hydrated with natural fluids."
      },
      outdoorWorkers: {
        share: "8.0%",
        riskLevel: "Moderate",
        riskColor: "#FF9500",
        physiologicalEffect: "Gardeners, sanitary sweepers, and private security staff benefit from continuous shade but require hydration support during peak humidity.",
        precautions: "Provide insulated cold water bottles; schedule heavier outdoor tasks for early morning hours."
      }
    },
    environmentalHazards: {
      hazardHeadline: "Elevated Relative Humidity & Wet-Bulb Load Near Riverbank",
      heatTrapMechanism: "While tree shade blocks radiant heat, proximity to the Mula-Mutha river elevates localized humidity, slightly dampening sweat evaporation during calm wind hours.",
      airPollutionInteraction: "Foliage filters over 45% of airborne particulates, making this Pune's cleanest and most thermally resilient urban zone."
    },
    playbook: [
      {
        title: "Tree Canopy Preservation Ordinance",
        desc: "Enforce strict heritage tree protection protocols and subsurface root aeration along North & South Main Roads.",
        impact: "Sustains natural microclimate buffer",
        badge: "Conservation"
      },
      {
        title: "Community Cool Island Blueprint",
        desc: "Model Koregaon Park's urban canopy metrics as the benchmark standard for tree corridor retrofitting across dense central wards.",
        impact: "Citywide municipal scaling",
        badge: "Benchmark"
      }
    ]
  }
];
