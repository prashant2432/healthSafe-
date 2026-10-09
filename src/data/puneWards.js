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
    slumClusterCount: 14,
    historicalSummerMaxC: 42.6,
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
    slumClusterCount: 22,
    historicalSummerMaxC: 43.1,
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
    slumClusterCount: 8,
    historicalSummerMaxC: 41.5,
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
    slumClusterCount: 5,
    historicalSummerMaxC: 40.8,
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
    slumClusterCount: 7,
    historicalSummerMaxC: 41.8,
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
    slumClusterCount: 2,
    historicalSummerMaxC: 38.9,
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
