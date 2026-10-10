import React, { useState } from 'react';
import { 
  Trees, 
  Building2, 
  Users, 
  ThermometerSun, 
  ChevronDown, 
  ChevronUp, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp,
  SlidersHorizontal,
  HeartPulse,
  Baby,
  HardHat,
  AlertTriangle,
  Building,
  PhoneCall,
  Activity
} from 'lucide-react';
import { explainRiskDrivers } from '../services/riskEngine';

export function WardDetailPanel({
  ward,
  simulatedResult,
  onOpenEmergencyModal
}) {
  const [showStats, setShowStats] = useState(false);
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [showHealth, setShowHealth] = useState(false);

  if (!ward) return null;

  const currentScore = simulatedResult ? simulatedResult.simulatedScore : ward.currentScore;
  const currentTier = simulatedResult ? simulatedResult.simulatedTier : ward.currentTier;
  const isSimulated = Boolean(simulatedResult && simulatedResult.deltaScore > 0);

  const activeFactors = simulatedResult 
    ? simulatedResult.simulatedFactors 
    : ward.currentFactors;

  const drivers = explainRiskDrivers(activeFactors);

  return (
    <div className="flex flex-col gap-4">
      
      {/* Compact Clean Ward Identity Card (Un-congested) */}
      <div className="bg-white rounded-squircle-lg p-4 sm:p-5 border border-black/[0.06] shadow-apple-card">
        
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-apple-secondary uppercase tracking-wider">
                {ward.zone}
              </span>
              <span className="text-apple-tertiary">•</span>
              <span className="text-[12px] font-medium text-apple-secondary">
                {ward.marathiName}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-apple-text tracking-tight">
              {ward.name}
            </h2>
          </div>

          {/* Large Square-Round Risk Badge */}
          <div className="flex flex-col items-end flex-shrink-0">
            <div className={`px-3 py-1.5 rounded-squircle-sm ${currentTier.badgeColor} flex items-center gap-2 border border-black/[0.04]`}>
              <span className="w-2.5 h-2.5 rounded-[4px]" style={{ backgroundColor: currentTier.color }} />
              <span className="text-[13px] font-bold tracking-tight">
                {currentScore} • {currentTier.label.replace(' Risk', '')}
              </span>
            </div>
            {isSimulated && (
              <span className="text-[11px] font-semibold text-[#248A3D] mt-1 flex items-center gap-1">
                ↓ {simulatedResult.deltaScore} pts prevented
              </span>
            )}
          </div>
        </div>

        {/* Minimal 1-line Driver Summary */}
        <p className="text-[12px] text-apple-secondary leading-relaxed mt-1">
          {ward.primaryDriver.split('.')[0]}.
        </p>

        {/* Square-Round Toggle Buttons: Statistics, Health Vulnerability, and Playbook */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3.5 mt-3 border-t border-black/[0.05]">
          
          {/* Button 1: View Detailed Statistics & Factors */}
          <button
            type="button"
            onClick={() => {
              setShowStats(!showStats);
              if (!showStats) {
                setShowHealth(false);
                setShowPlaybook(false);
              }
            }}
            className={`py-2 px-2.5 rounded-squircle-sm text-[11.5px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 border ${
              showStats
                ? 'bg-apple-text text-white border-apple-text shadow-sm'
                : 'bg-apple-canvas hover:bg-black/[0.06] text-apple-text border-black/[0.06]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{showStats ? 'Hide Stats' : 'Ward Stats'}</span>
            {showStats ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-apple-secondary flex-shrink-0" />}
          </button>

          {/* Button 2: View Health & Population Impact */}
          <button
            type="button"
            onClick={() => {
              setShowHealth(!showHealth);
              if (!showHealth) {
                setShowStats(false);
                setShowPlaybook(false);
              }
            }}
            className={`py-2 px-2.5 rounded-squircle-sm text-[11.5px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 border ${
              showHealth
                ? 'bg-apple-crimson text-white border-apple-crimson shadow-sm'
                : 'bg-apple-crimsonLight/50 hover:bg-apple-crimsonLight text-apple-crimson border-apple-crimson/20'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{showHealth ? 'Hide Health' : 'Health & Risks'}</span>
            {showHealth ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />}
          </button>

          {/* Button 3: View PMC Playbook */}
          <button
            type="button"
            onClick={() => {
              setShowPlaybook(!showPlaybook);
              if (!showPlaybook) {
                setShowStats(false);
                setShowHealth(false);
              }
            }}
            className={`py-2 px-2.5 rounded-squircle-sm text-[11.5px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 border ${
              showPlaybook
                ? 'bg-apple-text text-white border-apple-text shadow-sm'
                : 'bg-apple-canvas hover:bg-black/[0.06] text-apple-text border-black/[0.06]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-apple-mint flex-shrink-0" />
            <span className="truncate">{showPlaybook ? 'Hide Playbook' : `Playbook (${ward.playbook.length})`}</span>
            {showPlaybook ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-apple-secondary flex-shrink-0" />}
          </button>

        </div>

      </div>

      {/* REVEALED ON DEMAND: Health & Population Risk Section */}
      {showHealth && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Section: Age-Specific & Demographic Vulnerability Cards */}
          <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-apple-text tracking-tight flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-apple-crimson" />
                Vulnerable Populations Heat Impact
              </h3>
              <span className="text-[11px] font-semibold text-apple-secondary">
                Ward Demographics
              </span>
            </div>

            <div className="space-y-2.5">
              
              {/* Senior Citizens (Above 60) */}
              {ward.vulnerableDemographics?.seniors && (
                <div className="p-3 rounded-squircle-sm bg-apple-canvas/80 border border-black/[0.04]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👵</span>
                      <div>
                        <h4 className="text-[12.5px] font-bold text-apple-text">
                          Senior Citizens (60+ Years)
                        </h4>
                        <span className="text-[10.5px] text-apple-secondary font-medium">
                          {ward.vulnerableDemographics.seniors.share} of ward population ({Math.round(ward.population * (ward.elderlyPct / 100)).toLocaleString()} residents)
                        </span>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: ward.vulnerableDemographics.seniors.riskColor }}
                    >
                      {ward.vulnerableDemographics.seniors.riskLevel}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-apple-secondary leading-relaxed mb-1.5">
                    <strong className="text-apple-text">Biological Impact:</strong> {ward.vulnerableDemographics.seniors.physiologicalEffect}
                  </p>
                  <div className="p-2 rounded-[7px] bg-white border border-black/[0.04] text-[11px] text-apple-text font-medium flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-apple-mint flex-shrink-0 mt-0.5" />
                    <span><strong>Precaution:</strong> {ward.vulnerableDemographics.seniors.precautions}</span>
                  </div>
                </div>
              )}

              {/* Children & Infants (Under 10) */}
              {ward.vulnerableDemographics?.children && (
                <div className="p-3 rounded-squircle-sm bg-apple-canvas/80 border border-black/[0.04]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👶</span>
                      <div>
                        <h4 className="text-[12.5px] font-bold text-apple-text">
                          Children & Infants (Under 10 Years)
                        </h4>
                        <span className="text-[10.5px] text-apple-secondary font-medium">
                          {ward.vulnerableDemographics.children.share} of ward population ({Math.round(ward.population * (ward.childrenPct / 100)).toLocaleString()} children)
                        </span>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: ward.vulnerableDemographics.children.riskColor }}
                    >
                      {ward.vulnerableDemographics.children.riskLevel}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-apple-secondary leading-relaxed mb-1.5">
                    <strong className="text-apple-text">Biological Impact:</strong> {ward.vulnerableDemographics.children.physiologicalEffect}
                  </p>
                  <div className="p-2 rounded-[7px] bg-white border border-black/[0.04] text-[11px] text-apple-text font-medium flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-apple-mint flex-shrink-0 mt-0.5" />
                    <span><strong>Precaution:</strong> {ward.vulnerableDemographics.children.precautions}</span>
                  </div>
                </div>
              )}

              {/* Outdoor & Informal Workers */}
              {ward.vulnerableDemographics?.outdoorWorkers && (
                <div className="p-3 rounded-squircle-sm bg-apple-canvas/80 border border-black/[0.04]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👷</span>
                      <div>
                        <h4 className="text-[12.5px] font-bold text-apple-text">
                          Outdoor, Informal & Gig Workers
                        </h4>
                        <span className="text-[10.5px] text-apple-secondary font-medium">
                          {ward.vulnerableDemographics.outdoorWorkers.share} estimated workforce exposure
                        </span>
                      </div>
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: ward.vulnerableDemographics.outdoorWorkers.riskColor }}
                    >
                      {ward.vulnerableDemographics.outdoorWorkers.riskLevel}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-apple-secondary leading-relaxed mb-1.5">
                    <strong className="text-apple-text">Biological Impact:</strong> {ward.vulnerableDemographics.outdoorWorkers.physiologicalEffect}
                  </p>
                  <div className="p-2 rounded-[7px] bg-white border border-black/[0.04] text-[11px] text-apple-text font-medium flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-apple-mint flex-shrink-0 mt-0.5" />
                    <span><strong>Precaution:</strong> {ward.vulnerableDemographics.outdoorWorkers.precautions}</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Section: Why This Environment Is Hazardous */}
          {ward.environmentalHazards && (
            <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card space-y-2.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-apple-coral flex-shrink-0" />
                <h3 className="text-[13px] font-bold text-apple-text tracking-tight">
                  Why This Microclimate Is Hazardous to Health
                </h3>
              </div>

              <div className="p-3 rounded-squircle-sm bg-apple-coralLight/40 border border-apple-coral/15">
                <h4 className="text-[12px] font-bold text-[#C83818] mb-1">
                  {ward.environmentalHazards.hazardHeadline}
                </h4>
                <p className="text-[11.5px] text-[#8C2711] leading-relaxed">
                  {ward.environmentalHazards.heatTrapMechanism}
                </p>
              </div>

              <div className="p-3 rounded-squircle-sm bg-apple-canvas border border-black/[0.04] text-[11.5px] text-apple-secondary leading-relaxed">
                <strong className="text-apple-text">Pollution & Thermal Synergies:</strong> {ward.environmentalHazards.airPollutionInteraction}
              </div>
            </div>
          )}

          {/* Section: Emergency First-Aid Trigger & Hospital */}
          <div className="bg-gradient-to-br from-apple-crimsonLight/90 to-apple-coralLight/70 rounded-squircle-lg p-4 sm:p-5 border border-apple-crimson/20 shadow-apple-card flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded-[6px] text-[9.5px] font-bold uppercase tracking-wider bg-apple-crimson text-white">
                  Immediate Bystander Protocol
                </span>
                <h4 className="text-[14px] font-bold text-apple-text mt-1">
                  What To Do If Someone Suffers Heat Distress
                </h4>
                <p className="text-[11.5px] text-apple-secondary mt-0.5">
                  Actionable step-by-step triage for heat exhaustion and heat stroke emergencies.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenEmergencyModal}
                className="px-3.5 py-2 rounded-squircle-sm bg-apple-crimson text-white text-[11.5px] font-bold hover:bg-black transition-all shadow-apple-subtle flex-shrink-0 flex items-center gap-1.5"
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Open Protocol</span>
              </button>
            </div>

            <div className="pt-2 border-t border-apple-crimson/15 flex flex-wrap items-center justify-between gap-2 text-[11.5px]">
              <div className="flex items-center gap-1.5 text-apple-text font-medium">
                <Building className="w-3.5 h-3.5 text-apple-crimson flex-shrink-0" />
                <span>Nearest Center: <strong>{ward.nearestHospital}</strong></span>
              </div>
              <span className="text-[11px] font-bold text-apple-crimson">
                Dial 108 for Emergency Dispatch
              </span>
            </div>
          </div>

        </div>
      )}

      {/* REVEALED ON DEMAND: Detailed Ward Statistics */}
      {showStats && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Telemetry Metric Grid */}
          <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-apple-text tracking-tight flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-apple-blue" />
                Urban & Demographic Baseline
              </h3>
              <span className="text-[11px] text-apple-tertiary">PMC Field Data</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-apple-canvas/70 p-2.5 rounded-squircle-sm border border-black/[0.03]">
                <div className="flex items-center gap-1 text-apple-secondary text-[10px] font-medium mb-0.5">
                  <ThermometerSun className="w-3 h-3 text-apple-coral" />
                  Risk Index
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {currentScore} <span className="text-[10px] font-normal text-apple-secondary">/ 100</span>
                </div>
              </div>

              <div className="bg-apple-canvas/70 p-2.5 rounded-squircle-sm border border-black/[0.03]">
                <div className="flex items-center gap-1 text-apple-secondary text-[10px] font-medium mb-0.5">
                  <Users className="w-3 h-3 text-apple-blue" />
                  Population
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {(ward.population / 1000).toFixed(0)}k
                </div>
              </div>

              <div className="bg-apple-canvas/70 p-2.5 rounded-squircle-sm border border-black/[0.03]">
                <div className="flex items-center gap-1 text-apple-secondary text-[10px] font-medium mb-0.5">
                  <Trees className="w-3 h-3 text-apple-mint" />
                  Tree Canopy
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {ward.treeCanopyPct}%
                </div>
              </div>

              <div className="bg-apple-canvas/70 p-2.5 rounded-squircle-sm border border-black/[0.03]">
                <div className="flex items-center gap-1 text-apple-secondary text-[10px] font-medium mb-0.5">
                  <Building2 className="w-3 h-3 text-apple-amber" />
                  Built Cover
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {ward.imperviousPct}%
                </div>
              </div>
            </div>
          </div>

          {/* 5-Factor Weighted Progress Bars */}
          <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-apple-text tracking-tight flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-apple-secondary" />
                5-Factor Heat-Health Formula Drivers
              </h3>
              <span className="text-[10px] text-apple-tertiary">Normalized 0–100</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Ambient Temperature (T)', weight: '30%', rawScore: activeFactors.temperatureScore },
                { label: 'Relative Humidity (H)', weight: '20%', rawScore: activeFactors.humidityScore },
                { label: 'Built Surface Heat (S)', weight: '20%', rawScore: activeFactors.surfaceHeatScore },
                { label: 'Social Vulnerability (V)', weight: '20%', rawScore: activeFactors.vulnerabilityScore },
                { label: 'Air Quality Stress (A)', weight: '10%', rawScore: activeFactors.airQualityScore }
              ].map((factor, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline text-[11px]">
                    <span className="font-semibold text-apple-text">
                      {factor.label} <span className="text-apple-tertiary font-normal">({factor.weight})</span>
                    </span>
                    <span className="font-bold text-apple-text">
                      {factor.rawScore} / 100
                    </span>
                  </div>
                  
                  {/* Apple Thin Metric Bar */}
                  <div className="h-1.5 w-full bg-[#E5E5EA] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${factor.rawScore}%`,
                        backgroundColor: factor.rawScore >= 75 ? '#FF3B30' : factor.rawScore >= 50 ? '#FF5A36' : factor.rawScore >= 25 ? '#FF9500' : '#34C759'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Driver Analysis Card */}
          <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-squircle-sm bg-apple-blueLight flex items-center justify-center text-apple-blue">
                <TrendingUp className="w-3 h-3 stroke-[2.4]" />
              </div>
              <h3 className="text-[13px] font-bold text-apple-text tracking-tight">
                Contributing Factor Analysis
              </h3>
            </div>
            
            <p className="text-[12px] text-apple-secondary leading-relaxed mb-2.5">
              {ward.primaryDriver}
            </p>

            <div className="bg-apple-canvas/80 p-2.5 rounded-squircle-sm border border-black/[0.04] text-[11px] flex items-center justify-between text-apple-secondary">
              <span>Top pressure factor: <strong className="text-apple-text">{drivers.primary.name}</strong> ({drivers.primary.weight})</span>
              <span className="font-semibold text-apple-text">{drivers.primary.rawScore} / 100</span>
            </div>
          </div>

        </div>
      )}

      {/* REVEALED ON DEMAND: PMC Action Playbook */}
      {showPlaybook && (
        <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-apple-mint" />
              <h3 className="text-[13px] font-bold text-apple-text tracking-tight">
                Ward Action Playbook (PMC)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-apple-secondary">
              {ward.playbook.length} Actions
            </span>
          </div>

          <div className="space-y-2">
            {ward.playbook.map((action, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-squircle-sm bg-apple-canvas/60 hover:bg-apple-canvas border border-black/[0.04] transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-[12px] font-bold text-apple-text">
                    {action.title}
                  </h4>
                  <span className="px-2 py-0.5 rounded-[6px] text-[9px] font-bold uppercase tracking-wider bg-black/[0.06] text-apple-text">
                    {action.badge}
                  </span>
                </div>
                <p className="text-[11px] text-apple-secondary leading-snug mb-1.5">
                  {action.desc}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#248A3D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-apple-mint flex-shrink-0" />
                  <span>{action.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
