import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  ArrowDownRight, 
  ShieldCheck, 
  Building, 
  Trees, 
  Layers,
  ThermometerSnowflake
} from 'lucide-react';

export function WhatIfSimulator({
  selectedWard,
  simulatedResult,
  onUpdateInterventions,
  onReset
}) {
  const [activeTab, setActiveTab] = useState('combined'); // 'cool-roofs', 'canopy', 'combined'
  const [coolRoofsPct, setCoolRoofsPct] = useState(0);
  const [treeCanopyPct, setTreeCanopyPct] = useState(0);

  const handleCoolRoofsChange = (val) => {
    const num = Number(val);
    setCoolRoofsPct(num);
    onUpdateInterventions({
      coolRoofsPct: num,
      treeCanopyPct: activeTab === 'cool-roofs' ? 0 : treeCanopyPct
    });
  };

  const handleCanopyChange = (val) => {
    const num = Number(val);
    setTreeCanopyPct(num);
    onUpdateInterventions({
      coolRoofsPct: activeTab === 'canopy' ? 0 : coolRoofsPct,
      treeCanopyPct: num
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'cool-roofs') {
      onUpdateInterventions({ coolRoofsPct, treeCanopyPct: 0 });
    } else if (tab === 'canopy') {
      onUpdateInterventions({ coolRoofsPct: 0, treeCanopyPct });
    } else {
      onUpdateInterventions({ coolRoofsPct, treeCanopyPct });
    }
  };

  const handleApplyPreset = (pct) => {
    if (activeTab === 'cool-roofs') {
      setCoolRoofsPct(pct);
      onUpdateInterventions({ coolRoofsPct: pct, treeCanopyPct: 0 });
    } else if (activeTab === 'canopy') {
      setTreeCanopyPct(pct);
      onUpdateInterventions({ coolRoofsPct: 0, treeCanopyPct: pct });
    } else {
      setCoolRoofsPct(pct);
      setTreeCanopyPct(pct);
      onUpdateInterventions({ coolRoofsPct: pct, treeCanopyPct: pct });
    }
  };

  const handleResetInternal = () => {
    setCoolRoofsPct(0);
    setTreeCanopyPct(0);
    onReset();
  };

  if (!simulatedResult) return null;

  const {
    baselineScore,
    simulatedScore,
    deltaScore,
    baselineTier,
    simulatedTier,
    tierChanged,
    surfaceTempDropC,
    ambientTempDropC
  } = simulatedResult;

  const hasIntervention = deltaScore > 0;

  return (
    <div className="bg-white rounded-squircle-lg p-5 border border-black/[0.06] shadow-apple-card space-y-4">
      
      {/* Simulator Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-squircle-sm bg-apple-mintLight flex items-center justify-center text-[#248A3D]">
            <Sliders className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-apple-text tracking-tight">
              What-If Intervention Simulator
            </h3>
            <p className="text-[11px] text-apple-secondary">
              Test targeted cooling policies on {selectedWard ? selectedWard.name : 'selected ward'}
            </p>
          </div>
        </div>

        {hasIntervention && (
          <button
            onClick={handleResetInternal}
            className="px-2.5 py-1 rounded-squircle-sm text-[11px] font-semibold text-apple-secondary hover:text-apple-text bg-apple-canvas hover:bg-black/[0.06] border border-black/[0.04] flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Square-Round Segmented Mode Switcher */}
      <div className="bg-[#EBEBEF] p-1 rounded-squircle flex items-center gap-1 border border-black/[0.04]">
        <button
          type="button"
          onClick={() => handleTabChange('cool-roofs')}
          className={`flex-1 py-1.5 px-2 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'cool-roofs'
              ? 'bg-white text-apple-text shadow-sm'
              : 'text-apple-secondary hover:text-apple-text'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-apple-amber" />
          <span>Cool Roofs</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('canopy')}
          className={`flex-1 py-1.5 px-2 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'canopy'
              ? 'bg-white text-apple-text shadow-sm'
              : 'text-apple-secondary hover:text-apple-text'
          }`}
        >
          <Trees className="w-3.5 h-3.5 text-apple-mint" />
          <span>Tree Canopy</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('combined')}
          className={`flex-1 py-1.5 px-2 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'combined'
              ? 'bg-white text-apple-text shadow-sm'
              : 'text-apple-secondary hover:text-apple-text'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-apple-blue" />
          <span>Combined</span>
        </button>
      </div>

      {/* Sliders Container */}
      <div className="space-y-4 pt-1">
        
        {/* Cool Roofs Slider */}
        {(activeTab === 'cool-roofs' || activeTab === 'combined') && (
          <div className="space-y-1.5 bg-apple-canvas/60 p-3 rounded-squircle-sm border border-black/[0.04]">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-apple-text flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-apple-amber" />
                Cool Roof Painting Adoption
              </span>
              <span className="font-bold text-apple-text bg-white px-2 py-0.5 rounded-[6px] shadow-apple-subtle border border-black/[0.04]">
                {coolRoofsPct}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={coolRoofsPct}
              onChange={(e) => handleCoolRoofsChange(e.target.value)}
              className="w-full"
            />
            <div className="flex items-center justify-between text-[10px] text-apple-tertiary">
              <span>0% (Status Quo)</span>
              <span>50% Target</span>
              <span>100% Saturation</span>
            </div>
          </div>
        )}

        {/* Tree Canopy Slider */}
        {(activeTab === 'canopy' || activeTab === 'combined') && (
          <div className="space-y-1.5 bg-apple-canvas/60 p-3 rounded-squircle-sm border border-black/[0.04]">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-apple-text flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5 text-apple-mint" />
                Urban Tree Canopy & Shade Expansion
              </span>
              <span className="font-bold text-apple-text bg-white px-2 py-0.5 rounded-[6px] shadow-apple-subtle border border-black/[0.04]">
                +{treeCanopyPct}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={treeCanopyPct}
              onChange={(e) => handleCanopyChange(e.target.value)}
              className="w-full"
            />
            <div className="flex items-center justify-between text-[10px] text-apple-tertiary">
              <span>0% Baseline</span>
              <span>+25% Green Cover</span>
              <span>+50% Forest Corridor</span>
            </div>
          </div>
        )}

        {/* Quick Square-Round Preset Chips */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-apple-secondary mr-1">Quick Scenarios:</span>
          {[25, 50, 75].map(pct => (
            <button
              key={pct}
              type="button"
              onClick={() => handleApplyPreset(pct)}
              className="px-2 py-0.5 rounded-squircle-sm text-[11px] font-semibold bg-apple-canvas hover:bg-black/[0.06] text-apple-secondary hover:text-apple-text border border-black/[0.04] transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>

      </div>

      {/* Live Impact & Result Card */}
      <div className={`p-4 rounded-squircle-sm border transition-all ${
        hasIntervention 
          ? 'bg-apple-mintLight/50 border-apple-mint/30 shadow-apple-subtle' 
          : 'bg-apple-canvas/80 border-black/[0.04]'
      }`}>
        
        <div className="flex items-center justify-between gap-3 mb-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-apple-secondary">
              Simulated Risk Outcome
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-apple-text tracking-tight">
                {simulatedScore}
              </span>
              {hasIntervention && (
                <span className="text-[13px] text-apple-secondary line-through">
                  {baselineScore}
                </span>
              )}
              {hasIntervention && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-bold bg-[#34C759] text-white">
                  ↓ {deltaScore} pts
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-[12px] font-bold ${simulatedTier.badgeColor}`}>
              {simulatedTier.label}
            </span>
            {tierChanged && (
              <div className="text-[10px] font-bold text-[#248A3D] mt-1 flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3" />
                Shifted from {baselineTier.label.replace(' Risk', '')}
              </div>
            )}
          </div>
        </div>

        {/* Temperature Relief Telemetry */}
        {hasIntervention && (
          <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-black/[0.05] text-[11px]">
            <div className="flex items-center gap-1.5 text-apple-secondary">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-apple-blue" />
              <span>Surface Heat Drop:</span>
              <strong className="text-apple-text font-bold">-{surfaceTempDropC}°C</strong>
            </div>
            <div className="flex items-center gap-1.5 text-apple-secondary">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-apple-mint" />
              <span>Ambient Temp Drop:</span>
              <strong className="text-apple-text font-bold">-{ambientTempDropC}°C</strong>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
