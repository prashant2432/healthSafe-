// Heat-Health Risk Engine for Pune Municipal Corporation (PMC)
// Formula: R = 0.30*T + 0.20*H + 0.20*S + 0.20*V + 0.10*A

export const RISK_WEIGHTS = {
  temperature: 0.30,
  humidity: 0.20,
  surfaceHeat: 0.20,
  vulnerability: 0.20,
  airQuality: 0.10,
};

export const RISK_TIERS = {
  LOW: {
    key: "low",
    label: "Low Risk",
    range: [0, 24.9],
    color: "#34C759", // Apple Mint Green
    bgColor: "rgba(52, 199, 89, 0.12)",
    borderColor: "rgba(52, 199, 89, 0.3)",
    badgeColor: "bg-apple-mintLight text-[#248A3D]",
    actionLevel: "Routine Monitoring & Green Maintenance",
    description: "Conditions remain within tolerable biological limits. Natural canopy buffers microclimate."
  },
  MODERATE: {
    key: "moderate",
    label: "Moderate Risk",
    range: [25, 49.9],
    color: "#FF9500", // Apple Warm Amber
    bgColor: "rgba(255, 149, 0, 0.12)",
    borderColor: "rgba(255, 149, 0, 0.35)",
    badgeColor: "bg-apple-amberLight text-[#B26A00]",
    actionLevel: "Precautionary Advisory & Public Water Access",
    description: "Elevated thermal stress during afternoon hours; vulnerable demographics require shaded transit."
  },
  HIGH: {
    key: "high",
    label: "High Risk",
    range: [50, 74.9],
    color: "#FF5A36", // Apple Coral Orange
    bgColor: "rgba(255, 90, 54, 0.14)",
    borderColor: "rgba(255, 90, 54, 0.4)",
    badgeColor: "bg-apple-coralLight text-[#C83818]",
    actionLevel: "Targeted Civic Intervention & Shift Adjustments",
    description: "Significant physiological strain. Elevated risk of heat cramps and exhaustion for outdoor workers."
  },
  VERY_HIGH: {
    key: "very-high",
    label: "Very High Risk",
    range: [75, 100],
    color: "#FF3B30", // Apple Crimson Red
    bgColor: "rgba(255, 59, 48, 0.16)",
    borderColor: "rgba(255, 59, 48, 0.45)",
    badgeColor: "bg-apple-crimsonLight text-[#D70015]",
    actionLevel: "Immediate Emergency Action & Cooling Stations",
    description: "Dangerous heat-health hazard. Extreme probability of heat stroke without active municipal intervention."
  }
};

/**
 * Returns the tier metadata for a given score
 */
export function getRiskTier(score) {
  const clamped = Math.max(0, Math.min(100, Math.round(score * 10) / 10));
  if (clamped < 25) return RISK_TIERS.LOW;
  if (clamped < 50) return RISK_TIERS.MODERATE;
  if (clamped < 75) return RISK_TIERS.HIGH;
  return RISK_TIERS.VERY_HIGH;
}

/**
 * Calculates raw score using the weighted formula:
 * R = 0.30T + 0.20H + 0.20S + 0.20V + 0.10A
 */
export function calculateRiskScore(factors) {
  const {
    temperatureScore = 50,
    humidityScore = 50,
    surfaceHeatScore = 50,
    vulnerabilityScore = 50,
    airQualityScore = 50
  } = factors;

  const score =
    RISK_WEIGHTS.temperature * temperatureScore +
    RISK_WEIGHTS.humidity * humidityScore +
    RISK_WEIGHTS.surfaceHeat * surfaceHeatScore +
    RISK_WEIGHTS.vulnerability * vulnerabilityScore +
    RISK_WEIGHTS.airQuality * airQualityScore;

  return Math.max(0, Math.min(100, Math.round(score * 10) / 10));
}

/**
 * Normalizes live ambient temperature into a 0-100 score.
 * 28°C or lower -> 10 pts; 45°C or higher -> 100 pts.
 */
export function normalizeTemperatureToScore(tempC) {
  if (tempC <= 28) return 15;
  if (tempC >= 45) return 100;
  // Linear scale 28 to 45
  const normalized = 15 + ((tempC - 28) / (45 - 28)) * 85;
  return Math.min(100, Math.max(0, Math.round(normalized)));
}

/**
 * Normalizes relative humidity / heat stress proxy to 0-100 score.
 */
export function normalizeHumidityToScore(rhPct, tempC = 36) {
  // At high temps, even moderate RH (40-60%) severely compromises evaporative cooling
  const thermalLoad = (tempC * 0.7) + (rhPct * 0.5);
  const normalized = Math.min(100, Math.max(10, (thermalLoad - 30) * 1.8));
  return Math.round(normalized);
}

/**
 * Calculates simulated score based on user-adjusted intervention sliders
 * @param {object} baselineFactors
 * @param {object} interventions { coolRoofsPct: 0-100, treeCanopyPct: 0-100 }
 */
export function simulateIntervention(baselineFactors, interventions = {}) {
  const { coolRoofsPct = 0, treeCanopyPct = 0 } = interventions;

  // Cool roofs primarily reduce Surface Heat (S) and moderately ambient T
  // At 100% adoption: up to 42% reduction in Surface Heat, and 12% reduction in T score
  const coolRoofSReduction = (coolRoofsPct / 100) * 0.42 * baselineFactors.surfaceHeatScore;
  const coolRoofTReduction = (coolRoofsPct / 100) * 0.12 * baselineFactors.temperatureScore;

  // Tree canopy provides shading, lowers surface heat, lowers ambient T, and filters air quality
  // At 100% expansion: up to 38% reduction in Surface Heat, 16% reduction in T, and 18% improvement in AQI
  const canopySReduction = (treeCanopyPct / 100) * 0.38 * baselineFactors.surfaceHeatScore;
  const canopyTReduction = (treeCanopyPct / 100) * 0.16 * baselineFactors.temperatureScore;
  const canopyAReduction = (treeCanopyPct / 100) * 0.18 * baselineFactors.airQualityScore;

  // Diminishing returns if both combined (capped at max 70% reduction in surface heat)
  const totalSReduction = Math.min(baselineFactors.surfaceHeatScore * 0.70, coolRoofSReduction + canopySReduction);
  const totalTReduction = Math.min(baselineFactors.temperatureScore * 0.30, coolRoofTReduction + canopyTReduction);
  const totalAReduction = canopyAReduction;

  const simulatedFactors = {
    temperatureScore: Math.max(10, Math.round(baselineFactors.temperatureScore - totalTReduction)),
    humidityScore: baselineFactors.humidityScore,
    surfaceHeatScore: Math.max(10, Math.round(baselineFactors.surfaceHeatScore - totalSReduction)),
    vulnerabilityScore: baselineFactors.vulnerabilityScore,
    airQualityScore: Math.max(10, Math.round(baselineFactors.airQualityScore - totalAReduction))
  };

  const baselineScore = calculateRiskScore(baselineFactors);
  const simulatedScore = calculateRiskScore(simulatedFactors);
  const deltaScore = Math.round((baselineScore - simulatedScore) * 10) / 10;

  // Estimated physical temperature drop in °C (empirical microclimate model)
  const surfaceTempDropC = Math.round(((totalSReduction / 100) * 8.5) * 10) / 10;
  const ambientTempDropC = Math.round(((totalTReduction / 100) * 4.2) * 10) / 10;

  const baselineTier = getRiskTier(baselineScore);
  const simulatedTier = getRiskTier(simulatedScore);
  const tierChanged = baselineTier.key !== simulatedTier.key;

  return {
    baselineScore,
    simulatedScore,
    deltaScore,
    baselineTier,
    simulatedTier,
    tierChanged,
    surfaceTempDropC,
    ambientTempDropC,
    simulatedFactors,
    interventionsSummary: {
      coolRoofsPct,
      treeCanopyPct
    }
  };
}

/**
 * Returns explainability breakdown ranking which factors contribute the most to the score
 */
export function explainRiskDrivers(factors) {
  const contributions = [
    {
      name: "Ambient Temperature",
      key: "temperature",
      weight: "30%",
      rawScore: factors.temperatureScore,
      weightedValue: Math.round(factors.temperatureScore * RISK_WEIGHTS.temperature * 10) / 10,
      description: "Direct atmospheric thermal exposure during peak solar hours."
    },
    {
      name: "Surface & Built Heat",
      key: "surfaceHeat",
      weight: "20%",
      rawScore: factors.surfaceHeatScore,
      weightedValue: Math.round(factors.surfaceHeatScore * RISK_WEIGHTS.surfaceHeat * 10) / 10,
      description: "Asphalt, concrete terraces, and metallic roofing trapping radiant heat."
    },
    {
      name: "Demographic Vulnerability",
      key: "vulnerability",
      weight: "20%",
      rawScore: factors.vulnerabilityScore,
      weightedValue: Math.round(factors.vulnerabilityScore * RISK_WEIGHTS.vulnerability * 10) / 10,
      description: "Density of seniors (60+), outdoor informal labor, and substandard housing."
    },
    {
      name: "Humidity Heat Stress",
      key: "humidity",
      weight: "20%",
      rawScore: factors.humidityScore,
      weightedValue: Math.round(factors.humidityScore * RISK_WEIGHTS.humidity * 10) / 10,
      description: "Moisture inhibiting the human body's natural evaporative perspiration cooling."
    },
    {
      name: "Air Pollution Burden",
      key: "airQuality",
      weight: "10%",
      rawScore: factors.airQualityScore,
      weightedValue: Math.round(factors.airQualityScore * RISK_WEIGHTS.airQuality * 10) / 10,
      description: "Vehicular exhaust and PM2.5 exacerbating cardiovascular and respiratory strain."
    }
  ];

  // Sort descending by weighted contribution
  contributions.sort((a, b) => b.weightedValue - a.weightedValue);

  return {
    primary: contributions[0],
    secondary: contributions[1],
    all: contributions
  };
}
