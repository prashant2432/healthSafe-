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
  SlidersHorizontal
} from 'lucide-react';
import { explainRiskDrivers } from '../services/riskEngine';

export function WardDetailPanel({
  ward,
  simulatedResult
}) {
  const [showStats, setShowStats] = useState(false);
  const [showPlaybook, setShowPlaybook] = useState(false);

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

        {/* Square-Round Toggle Buttons for Statistics & Playbook */}
        <div className="flex flex-wrap items-center gap-2.5 pt-3.5 mt-3 border-t border-black/[0.05]">
          
          {/* Button: View Detailed Statistics & Factors (Only visible when pressed) */}
          <button
            type="button"
            onClick={() => setShowStats(!showStats)}
            className={`flex-1 min-w-[160px] py-2 px-3 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 border ${
              showStats
                ? 'bg-apple-text text-white border-apple-text shadow-sm'
                : 'bg-apple-canvas hover:bg-black/[0.06] text-apple-text border-black/[0.06]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{showStats ? 'Hide Ward Statistics' : 'View Ward Statistics'}</span>
            {showStats ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-apple-secondary" />}
          </button>

          {/* Button: View PMC Playbook (Only visible when pressed) */}
          <button
            type="button"
            onClick={() => setShowPlaybook(!showPlaybook)}
            className={`flex-1 min-w-[160px] py-2 px-3 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 border ${
              showPlaybook
                ? 'bg-apple-text text-white border-apple-text shadow-sm'
                : 'bg-apple-canvas hover:bg-black/[0.06] text-apple-text border-black/[0.06]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-apple-mint" />
            <span>{showPlaybook ? 'Hide Action Playbook' : `View Playbook (${ward.playbook.length})`}</span>
            {showPlaybook ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-apple-secondary" />}
          </button>

        </div>

      </div>

      {/* REVEALED ON DEMAND: Detailed Ward Statistics (Only visible when pressing button) */}
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
                  <Trees className="w-3 h-3 text-apple-mint" />
                  Tree Canopy
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {ward.treeCanopyPct}% <span className="text-[10px] font-normal text-apple-secondary">cover</span>
                </div>
              </div>

              <div className="bg-apple-canvas/70 p-2.5 rounded-squircle-sm border border-black/[0.03]">
                <div className="flex items-center gap-1 text-apple-secondary text-[10px] font-medium mb-0.5">
                  <Building2 className="w-3 h-3 text-apple-amber" />
                  Impervious
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {ward.imperviousPct}% <span className="text-[10px] font-normal text-apple-secondary">built</span>
                </div>
              </div>

              <div className="bg-apple-canvas/70 p-2.5 rounded-squircle-sm border border-black/[0.03]">
                <div className="flex items-center gap-1 text-apple-secondary text-[10px] font-medium mb-0.5">
                  <Users className="w-3 h-3 text-apple-blue" />
                  Seniors 60+
                </div>
                <div className="text-xl font-black text-apple-text tracking-tight">
                  {ward.elderlyPct}% <span className="text-[10px] font-normal text-apple-secondary">pop</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Factor Score Composition */}
          <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card">
            <h3 className="text-[13px] font-bold text-apple-text tracking-tight mb-3 flex items-center justify-between">
              <span>Risk Engine Factor Composition</span>
              <span className="text-[11px] font-normal text-apple-tertiary">Weighted Index</span>
            </h3>

            <div className="space-y-2.5">
              {drivers.all.map(factor => (
                <div key={factor.key} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-apple-text">{factor.name}</span>
                      <span className="text-[10px] text-apple-tertiary">({factor.weight})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-apple-secondary">{factor.weightedValue} pts</span>
                      <span className="font-bold text-apple-text">{factor.rawScore}</span>
                    </div>
                  </div>

                  {/* Progress bar with squircle ends */}
                  <div className="w-full h-1.5 rounded-[4px] bg-[#EBEBEF] overflow-hidden">
                    <div 
                      className="h-full rounded-[4px] transition-all duration-300 ease-out"
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

      {/* REVEALED ON DEMAND: PMC Action Playbook (Only visible when pressing button) */}
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
                  <CheckCircle2 className="w-3 h-3 text-apple-mint flex-shrink-0" />
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
