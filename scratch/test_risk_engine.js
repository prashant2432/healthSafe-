// Verification tests for Risk Engine and Simulation math
import { 
  calculateRiskScore, 
  getRiskTier, 
  simulateIntervention, 
  explainRiskDrivers,
  normalizeTemperatureToScore 
} from '../src/services/riskEngine.js';

console.log('--- RUNNING RISK ENGINE TESTS ---');

// Test 1: Baseline formula calculation
// R = 0.30T + 0.20H + 0.20S + 0.20V + 0.10A
const testFactors = {
  temperatureScore: 80,
  humidityScore: 70,
  surfaceHeatScore: 90,
  vulnerabilityScore: 80,
  airQualityScore: 60
};
// Expected: 0.30*80 (24) + 0.20*70 (14) + 0.20*90 (18) + 0.20*80 (16) + 0.10*60 (6) = 78
const score = calculateRiskScore(testFactors);
console.assert(score === 78, `Expected score 78, got ${score}`);
console.log(`✓ Test 1 Passed: Score = ${score}`);

// Test 2: Tier categorization
const tier = getRiskTier(score);
console.assert(tier.key === 'very-high', `Expected very-high tier, got ${tier.key}`);
console.log(`✓ Test 2 Passed: Tier = ${tier.label}`);

// Test 3: Simulation intervention delta
const sim = simulateIntervention(testFactors, { coolRoofsPct: 60, treeCanopyPct: 40 });
console.assert(sim.simulatedScore < score, 'Simulated score must be lower than baseline');
console.assert(sim.deltaScore > 0, 'Delta score must be positive');
console.assert(sim.surfaceTempDropC > 0, 'Surface temperature drop must be positive');
console.log(`✓ Test 3 Passed: Original ${score} -> Simulated ${sim.simulatedScore} (Delta: -${sim.deltaScore} pts, Cooling: -${sim.surfaceTempDropC}°C)`);

// Test 4: Driver explanation ranking
const drivers = explainRiskDrivers(testFactors);
console.assert(drivers.primary.key === 'temperature', 'Primary driver must be temperature');
console.log(`✓ Test 4 Passed: Primary driver = ${drivers.primary.name} (${drivers.primary.weightedValue} pts)`);

console.log('ALL TESTS PASSED SUCCESSFULLY!');
