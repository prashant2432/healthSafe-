import React from 'react';
import { Flame, CloudSun, Radio, Info, ShieldAlert, Droplets, MapPin, Globe, HeartPulse } from 'lucide-react';

export function AppleHeader({
  telemetry,
  telemetryScope,
  onToggleTelemetryScope,
  hasSelectedWard,
  isLiveWeather,
  onToggleWeatherMode,
  onOpenMethodology,
  onOpenEmergencyModal
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-black/[0.06] transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 sm:gap-4 py-3">
        
        {/* Left: Brand & City Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-squircle bg-gradient-to-br from-[#FF5A36] to-[#FF3B30] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Flame className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-bold text-apple-text tracking-tight flex items-center gap-1.5">
                HeatSafe <span className="font-semibold text-apple-secondary">Pune</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-[8px] text-[11px] font-semibold bg-black/[0.05] text-apple-secondary tracking-wide uppercase">
                PMC Intelligence
              </span>
            </div>
            <p className="text-[12px] text-apple-secondary truncate font-normal">
              Hyperlocal Heat-Health Risk Observatory & Intervention Simulator
            </p>
          </div>
        </div>

        {/* Center: Dynamic Telemetry Capsule (Synchronized with Selected Ward & Simulation) */}
        <div className="hidden lg:flex items-center gap-2.5 bg-apple-canvas/90 px-3 py-1.5 rounded-squircle border border-black/[0.04] transition-all">
          
          {/* Square-round scope toggle (Ward vs Citywide) */}
          {hasSelectedWard ? (
            <div className="bg-[#E5E5EA] p-0.5 rounded-squircle-sm flex items-center gap-0.5 border border-black/[0.04]">
              <button
                type="button"
                onClick={() => onToggleTelemetryScope('ward')}
                title={`Inspect ${telemetry.wardName} Microclimate`}
                className={`px-2 py-0.5 rounded-[7px] text-[11px] font-bold transition-all flex items-center gap-1 ${
                  telemetryScope === 'ward'
                    ? 'bg-white text-apple-text shadow-sm'
                    : 'text-apple-secondary hover:text-apple-text'
                }`}
              >
                <MapPin className="w-3 h-3 text-apple-coral" />
                <span>{telemetry.wardName}</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleTelemetryScope('city')}
                title="View Pune Citywide Baseline Average"
                className={`px-2 py-0.5 rounded-[7px] text-[11px] font-semibold transition-all flex items-center gap-1 ${
                  telemetryScope === 'city'
                    ? 'bg-white text-apple-text shadow-sm'
                    : 'text-apple-secondary hover:text-apple-text'
                }`}
              >
                <Globe className="w-3 h-3 text-apple-secondary" />
                <span>City Avg</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[7px] bg-white border border-black/[0.05] shadow-apple-subtle">
              <Globe className="w-3 h-3 text-apple-blue" />
              <span className="text-[11px] font-bold text-apple-text">Pune City</span>
            </div>
          )}

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          {/* Localized / Base Temperature */}
          <div className="flex items-center gap-1.5 px-1.5 py-1 text-[13px] font-medium text-apple-text transition-all">
            <CloudSun className="w-4 h-4 text-apple-amber flex-shrink-0" />
            <span className="font-bold tracking-tight text-[14px]">{telemetry.temperatureC}°C</span>
            <span className="text-apple-tertiary text-[11px]">
              {telemetry.isWardSpecific ? 'Micro-Temp' : 'Ambient'}
            </span>
          </div>

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          {/* Localized / Base Humidity */}
          <div className="flex items-center gap-1.5 px-1.5 py-1 text-[13px] font-medium text-apple-text transition-all">
            <Droplets className="w-4 h-4 text-apple-blue flex-shrink-0" />
            <span className="font-bold tracking-tight text-[14px]">{telemetry.relativeHumidityPct}%</span>
            <span className="text-apple-tertiary text-[11px]">Humidity</span>
          </div>

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          {/* Localized Heat Index */}
          <div className="flex items-center gap-1.5 px-1.5 py-1 text-[13px] font-medium text-apple-text transition-all">
            <ShieldAlert className="w-4 h-4 text-apple-coral flex-shrink-0" />
            <span className="font-bold tracking-tight text-[14px]">{telemetry.apparentTemperatureC}°C</span>
            <span className="text-apple-tertiary text-[11px]">Heat Index</span>
          </div>

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          {/* Dynamic Risk Score Badge */}
          <div className="flex items-center gap-1.5 pl-1.5 pr-1">
            <span className="text-[11px] text-apple-secondary font-medium whitespace-nowrap">
              {telemetry.isWardSpecific ? `${telemetry.wardName} Risk:` : 'City Risk:'}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-bold ${telemetry.tier.badgeColor} transition-all shadow-apple-subtle`}>
              {telemetry.score} • {telemetry.tier.label.replace(' Risk', '')}
            </span>
            {telemetry.isSimulated && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[6px] text-[10px] font-bold bg-[#34C759] text-white">
                ↓ {telemetry.deltaScore}
              </span>
            )}
          </div>

        </div>

        {/* Right: Square-Round Weather Mode Segmented Toggle & Methodology */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          
          {/* Square-round segmented control */}
          <div className="bg-[#EBEBEF] p-1 rounded-squircle flex items-center gap-1 border border-black/[0.04]">
            <button
              type="button"
              onClick={() => onToggleWeatherMode(true)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isLiveWeather
                  ? 'bg-white text-apple-text shadow-sm'
                  : 'text-apple-secondary hover:text-apple-text'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveWeather ? 'text-apple-mint animate-pulse' : 'text-apple-secondary'}`} />
              <span className="hidden sm:inline">Live Weather</span>
              <span className="sm:hidden">Live</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleWeatherMode(false)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                !isLiveWeather
                  ? 'bg-white text-apple-crimson shadow-sm'
                  : 'text-apple-secondary hover:text-apple-text'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${!isLiveWeather ? 'text-apple-crimson' : 'text-apple-secondary'}`} />
              <span className="hidden sm:inline">Peak Heatwave</span>
              <span className="sm:hidden">Peak</span>
            </button>
          </div>

          {/* Emergency First-Aid Quick Action Button (Square-round) */}
          <button
            type="button"
            onClick={onOpenEmergencyModal}
            title="Heat Distress & Heat Stroke Emergency Action Protocol"
            className="px-2.5 sm:px-3 py-1.5 rounded-squircle-sm bg-apple-crimsonLight text-apple-crimson border border-apple-crimson/25 hover:bg-apple-crimson hover:text-white transition-all text-[12px] font-bold flex items-center gap-1.5 shadow-apple-subtle"
          >
            <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Heat First Aid</span>
            <span className="sm:hidden">108</span>
          </button>

          {/* Methodology Info button (square-round) */}
          <button
            type="button"
            onClick={onOpenMethodology}
            title="Model Methodology & Data Disclosures"
            className="w-9 h-9 rounded-squircle-sm bg-apple-canvas hover:bg-black/[0.06] border border-black/[0.06] flex items-center justify-center text-apple-secondary hover:text-apple-text transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
