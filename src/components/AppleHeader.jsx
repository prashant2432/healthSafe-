import React from 'react';
import { Flame, CloudSun, Radio, Info, ShieldAlert, Droplets, Wind } from 'lucide-react';

export function AppleHeader({
  weatherData,
  isLiveWeather,
  onToggleWeatherMode,
  onOpenMethodology,
  cityAvgScore,
  cityRiskTier
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-black/[0.06] transition-all">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        
        {/* Left: Brand & City Title */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-squircle bg-gradient-to-br from-[#FF5A36] to-[#FF3B30] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Flame className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-bold text-apple-text tracking-tight flex items-center gap-1.5">
                HeatSafe <span className="font-semibold text-apple-secondary">Pune</span>
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-[8px] text-[11px] font-semibold bg-black/[0.05] text-apple-secondary tracking-wide uppercase">
                PMC Intelligence
              </span>
            </div>
            <p className="text-[12px] text-apple-secondary truncate font-normal">
              Hyperlocal Heat-Health Risk Observatory & Intervention Simulator
            </p>
          </div>
        </div>

        {/* Center: Citywide Telemetry Capsule */}
        <div className="hidden lg:flex items-center gap-3 bg-apple-canvas/90 px-3 py-1.5 rounded-squircle border border-black/[0.04]">
          <div className="flex items-center gap-1.5 px-2 py-1 text-[13px] font-medium text-apple-text">
            <CloudSun className="w-4 h-4 text-apple-amber" />
            <span className="font-semibold">{weatherData.temperatureC}°C</span>
            <span className="text-apple-tertiary text-[11px]">Ambient</span>
          </div>

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          <div className="flex items-center gap-1.5 px-2 py-1 text-[13px] font-medium text-apple-text">
            <Droplets className="w-4 h-4 text-apple-blue" />
            <span className="font-semibold">{weatherData.relativeHumidityPct}%</span>
            <span className="text-apple-tertiary text-[11px]">Humidity</span>
          </div>

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          <div className="flex items-center gap-1.5 px-2 py-1 text-[13px] font-medium text-apple-text">
            <ShieldAlert className="w-4 h-4 text-apple-coral" />
            <span className="font-semibold">{weatherData.apparentTemperatureC}°C</span>
            <span className="text-apple-tertiary text-[11px]">Heat Index</span>
          </div>

          <div className="h-3.5 w-[1px] bg-black/[0.1]" />

          <div className="flex items-center gap-1.5 pl-2 pr-1">
            <span className="text-[11px] text-apple-secondary font-medium">City Risk:</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-[8px] text-[12px] font-bold ${cityRiskTier.badgeColor}`}>
              {cityAvgScore} • {cityRiskTier.label.replace(' Risk', '')}
            </span>
          </div>
        </div>

        {/* Right: Square-Round Weather Mode Segmented Toggle & Methodology */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* Square-round segmented control */}
          <div className="bg-[#EBEBEF] p-1 rounded-squircle flex items-center gap-1 border border-black/[0.04]">
            <button
              type="button"
              onClick={() => onToggleWeatherMode(true)}
              className={`px-3 py-1.5 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isLiveWeather
                  ? 'bg-white text-apple-text shadow-sm'
                  : 'text-apple-secondary hover:text-apple-text'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveWeather ? 'text-apple-mint animate-pulse' : 'text-apple-secondary'}`} />
              <span>Live Weather</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleWeatherMode(false)}
              className={`px-3 py-1.5 rounded-squircle-sm text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                !isLiveWeather
                  ? 'bg-white text-apple-crimson shadow-sm'
                  : 'text-apple-secondary hover:text-apple-text'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${!isLiveWeather ? 'text-apple-crimson' : 'text-apple-secondary'}`} />
              <span>Peak Heatwave</span>
            </button>
          </div>

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
