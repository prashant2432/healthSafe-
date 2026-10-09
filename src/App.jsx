import React, { useState, useEffect, useMemo } from 'react';
import { AppleHeader } from './components/AppleHeader';
import { GraphicWardMap } from './components/GraphicWardMap';
import { WardRiskMap } from './components/WardRiskMap';
import { WardDetailPanel } from './components/WardDetailPanel';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { MethodologyModal } from './components/MethodologyModal';
import { PUNE_WARDS } from './data/puneWards';
import { 
  calculateRiskScore, 
  getRiskTier, 
  simulateIntervention, 
  normalizeTemperatureToScore, 
  normalizeHumidityToScore 
} from './services/riskEngine';
import { 
  fetchLivePuneWeather, 
  PEAK_HEATWAVE_SCENARIO 
} from './services/weatherService';

export default function App() {
  const [selectedWardId, setSelectedWardId] = useState(null); // null = all wards visible equally
  const [mapViewMode, setMapViewMode] = useState('graphic'); // 'graphic' (default, no API needed) or 'geo'
  const [isLiveWeather, setIsLiveWeather] = useState(true);
  const [weatherData, setWeatherData] = useState(PEAK_HEATWAVE_SCENARIO);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [interventions, setInterventions] = useState({ coolRoofsPct: 0, treeCanopyPct: 0 });
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Load weather on mount & when toggling
  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      setIsLoadingWeather(true);
      if (isLiveWeather) {
        const live = await fetchLivePuneWeather();
        if (isMounted) {
          setWeatherData(live);
          setIsLoadingWeather(false);
        }
      } else {
        setWeatherData(PEAK_HEATWAVE_SCENARIO);
        setIsLoadingWeather(false);
      }
    }

    loadWeather();
    return () => { isMounted = false; };
  }, [isLiveWeather]);

  // Compute live scores for all wards based on atmospheric conditions
  const enrichedWards = useMemo(() => {
    const baseTempScore = normalizeTemperatureToScore(weatherData.temperatureC);
    const baseHumScore = normalizeHumidityToScore(weatherData.relativeHumidityPct, weatherData.temperatureC);

    return PUNE_WARDS.map(ward => {
      // Adjust atmospheric factors slightly based on ward microclimate characteristics
      // (High canopy wards are buffered, dense concrete wards have higher localized micro-temperature)
      const microTempDelta = (ward.imperviousPct - 50) * 0.15 - (ward.treeCanopyPct * 0.2);
      const adjustedTempScore = Math.max(10, Math.min(100, Math.round(baseTempScore + microTempDelta)));

      const factors = {
        temperatureScore: adjustedTempScore,
        humidityScore: baseHumScore,
        surfaceHeatScore: ward.baseline.surfaceHeatScore,
        vulnerabilityScore: ward.baseline.vulnerabilityScore,
        airQualityScore: ward.baseline.airQualityScore
      };

      const score = calculateRiskScore(factors);
      const tier = getRiskTier(score);

      return {
        ...ward,
        currentFactors: factors,
        currentScore: score,
        currentTier: tier
      };
    });
  }, [weatherData]);

  // Selected ward object
  const selectedWard = useMemo(() => {
    return enrichedWards.find(w => w.id === selectedWardId) || enrichedWards[0];
  }, [enrichedWards, selectedWardId]);

  // Run simulation for selected ward
  const simulatedResult = useMemo(() => {
    if (!selectedWard) return null;
    return simulateIntervention(selectedWard.currentFactors, interventions);
  }, [selectedWard, interventions]);

  // Map simulated results across wards (if user adjusted interventions, active for selected ward)
  const simulatedResultsMap = useMemo(() => {
    if (!selectedWard || !simulatedResult) return {};
    return {
      [selectedWard.id]: simulatedResult
    };
  }, [selectedWard, simulatedResult]);

  // Compute Citywide Average Score
  const cityStats = useMemo(() => {
    const total = enrichedWards.reduce((acc, w) => acc + w.currentScore, 0);
    const avg = Math.round(total / enrichedWards.length);
    const tier = getRiskTier(avg);
    return { avg, tier };
  }, [enrichedWards]);

  const handleToggleWeatherMode = (liveMode) => {
    setIsLiveWeather(liveMode);
  };

  const handleUpdateInterventions = (newInterventions) => {
    setInterventions(newInterventions);
  };

  const handleResetInterventions = () => {
    setInterventions({ coolRoofsPct: 0, treeCanopyPct: 0 });
  };

  return (
    <div className="min-h-screen bg-apple-canvas text-apple-text flex flex-col font-sans selection:bg-apple-blue selection:text-white">
      
      {/* Apple Frosted Glass Header */}
      <AppleHeader
        weatherData={weatherData}
        isLiveWeather={isLiveWeather}
        onToggleWeatherMode={handleToggleWeatherMode}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        cityAvgScore={cityStats.avg}
        cityRiskTier={cityStats.tier}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Responsive Grid: Left 58% (Map & Comparative Grid), Right 42% (Simulator & Dossier) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Interactive Map & Ward Overview */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Map Mode Switcher & Viewport Header */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[13px] font-bold text-apple-text tracking-tight">
                Pune Ward Observatory
              </span>
              <div className="bg-[#EBEBEF] p-1 rounded-squircle flex items-center gap-1 border border-black/[0.04]">
                <button
                  type="button"
                  onClick={() => setMapViewMode('graphic')}
                  className={`px-3 py-1 rounded-squircle-sm text-[11px] font-semibold transition-all duration-150 ${
                    mapViewMode === 'graphic'
                      ? 'bg-white text-apple-text shadow-sm'
                      : 'text-apple-secondary hover:text-apple-text'
                  }`}
                >
                  Graphic Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapViewMode('geo')}
                  className={`px-3 py-1 rounded-squircle-sm text-[11px] font-semibold transition-all duration-150 ${
                    mapViewMode === 'geo'
                      ? 'bg-white text-apple-text shadow-sm'
                      : 'text-apple-secondary hover:text-apple-text'
                  }`}
                >
                  Street Tiles
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="h-[520px] sm:h-[580px] lg:h-[640px] w-full">
              {mapViewMode === 'graphic' ? (
                <GraphicWardMap
                  wards={enrichedWards}
                  selectedWardId={selectedWardId}
                  onSelectWard={setSelectedWardId}
                  simulatedResults={simulatedResultsMap}
                />
              ) : (
                <WardRiskMap
                  wards={enrichedWards}
                  selectedWardId={selectedWardId}
                  onSelectWard={setSelectedWardId}
                  simulatedResults={simulatedResultsMap}
                />
              )}
            </div>

            {/* Citywide Ward Summary Bar (Square-round cards) */}
            <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[14px] font-bold text-apple-text tracking-tight">
                  Pune Wards Comparative Heat Vulnerability
                </h3>
                <span className="text-[11px] text-apple-secondary font-medium">
                  Click any ward to inspect & simulate
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {enrichedWards.map(w => {
                  const isSelected = w.id === selectedWardId;
                  const sim = simulatedResultsMap[w.id];
                  const score = sim ? sim.simulatedScore : w.currentScore;
                  const tier = sim ? sim.simulatedTier : w.currentTier;

                  return (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWardId(w.id)}
                      className={`p-3 rounded-squircle-sm border text-left transition-all duration-150 flex flex-col justify-between ${
                        isSelected
                          ? 'border-apple-text bg-apple-canvas shadow-sm ring-2 ring-black/5'
                          : 'border-black/[0.05] bg-white hover:bg-apple-canvas/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="w-2.5 h-2.5 rounded-[4px]" style={{ backgroundColor: tier.color }} />
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-[6px] ${tier.badgeColor}`}>
                          {tier.label.replace(' Risk', '')}
                        </span>
                      </div>
                      <div className="text-[13px] font-bold text-apple-text truncate">
                        {w.name.split(' ')[0]}
                      </div>
                      <div className="text-[11px] text-apple-secondary flex items-baseline justify-between mt-1">
                        <span>Score:</span>
                        <strong className="text-apple-text font-black text-[13px]">{score}</strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Ward Dossier & Simulator */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {!selectedWard ? (
              /* ── No-selection placeholder ─────────────────────────── */
              <div className="bg-white rounded-squircle-lg p-8 border border-black/[0.06] shadow-apple-card flex flex-col items-center justify-center text-center gap-3 min-h-[220px]">
                <div className="w-12 h-12 rounded-squircle bg-apple-canvas border border-black/[0.05] flex items-center justify-center text-2xl">
                  🗺️
                </div>
                <div>
                  <p className="text-[15px] font-bold text-apple-text tracking-tight">Select a Ward</p>
                  <p className="text-[12px] text-apple-secondary mt-1 max-w-[240px]">
                    Click any ward on the map or use the pill selectors above to inspect its heat-health risk profile and run What-If simulations.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Ward Overview & Collapsible Stats */}
                <WardDetailPanel
                  ward={selectedWard}
                  simulatedResult={simulatedResult}
                />

                {/* What-If Simulator */}
                <WhatIfSimulator
                  selectedWard={selectedWard}
                  simulatedResult={simulatedResult}
                  onUpdateInterventions={handleUpdateInterventions}
                  onReset={handleResetInterventions}
                />
              </>
            )}

          </div>

        </div>

      </main>

      {/* Apple-Style Minimalist Footer */}
      <footer className="w-full border-t border-black/[0.06] bg-white/70 py-4 mt-8 text-[12px] text-apple-secondary">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-apple-text">HeatSafe Pune</span>
            <span className="text-apple-tertiary">|</span>
            <span>Prototype for Pune Municipal Corporation Climate Action Plan</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Weather Feed: Open-Meteo API</span>
            <button 
              onClick={() => setIsMethodologyOpen(true)}
              className="text-apple-blue hover:underline font-medium"
            >
              Methodology & Weights
            </button>
          </div>
        </div>
      </footer>

      {/* Methodology & Transparency Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

    </div>
  );
}
