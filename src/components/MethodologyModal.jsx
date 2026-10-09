import React from 'react';
import { X, BookOpen, Shield, Cpu, Activity, Database, Check } from 'lucide-react';
import { RISK_WEIGHTS } from '../services/riskEngine';

export function MethodologyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      
      <div 
        className="w-full max-w-2xl bg-white rounded-squircle-xl p-6 sm:p-7 border border-black/[0.08] shadow-apple-float max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-squircle bg-apple-canvas flex items-center justify-center text-apple-text border border-black/[0.06]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-apple-text tracking-tight">
                Model Methodology & Disclosures
              </h2>
              <p className="text-[12px] text-apple-secondary">
                Pune Heat-Health Risk Intelligence Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-squircle-sm bg-apple-canvas hover:bg-black/[0.06] text-apple-secondary hover:text-apple-text flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 text-[13px] text-apple-secondary leading-relaxed">
          
          {/* Formula Card */}
          <div className="p-4 rounded-squircle-sm bg-apple-canvas/80 border border-black/[0.04]">
            <h3 className="text-[13px] font-bold text-apple-text mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-apple-blue" />
              Weighted Linear Risk Formula
            </h3>
            <div className="p-3 rounded-[8px] bg-white border border-black/[0.06] font-mono text-[13px] font-semibold text-apple-text mb-2">
              R = 0.30·T + 0.20·H + 0.20·S + 0.20·V + 0.10·A
            </div>
            <p className="text-[12px] text-apple-tertiary">
              All five component factors are normalized to a uniform 0–100 index before applying prototype weights.
            </p>
          </div>

          {/* Factor Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-squircle-sm border border-black/[0.04] bg-white">
              <div className="font-bold text-apple-text text-[12px] flex items-center justify-between mb-1">
                <span>Temperature-Related Heat (T)</span>
                <span className="text-apple-blue font-bold">30%</span>
              </div>
              <p className="text-[11px] text-apple-secondary">
                Ambient dry-bulb temperature normalized from 28°C baseline up to 45°C extreme heatwave peaks.
              </p>
            </div>

            <div className="p-3 rounded-squircle-sm border border-black/[0.04] bg-white">
              <div className="font-bold text-apple-text text-[12px] flex items-center justify-between mb-1">
                <span>Humidity-Related Stress (H)</span>
                <span className="text-apple-blue font-bold">20%</span>
              </div>
              <p className="text-[11px] text-apple-secondary">
                Relative humidity interaction limiting human evaporative sweating and biological heat dissipation.
              </p>
            </div>

            <div className="p-3 rounded-squircle-sm border border-black/[0.04] bg-white">
              <div className="font-bold text-apple-text text-[12px] flex items-center justify-between mb-1">
                <span>Surface & Built Heat (S)</span>
                <span className="text-apple-blue font-bold">20%</span>
              </div>
              <p className="text-[11px] text-apple-secondary">
                Urban heat island (UHI) amplification from asphalt density, concrete mass, and absence of vegetative shade.
              </p>
            </div>

            <div className="p-3 rounded-squircle-sm border border-black/[0.04] bg-white">
              <div className="font-bold text-apple-text text-[12px] flex items-center justify-between mb-1">
                <span>Population Vulnerability (V)</span>
                <span className="text-apple-blue font-bold">20%</span>
              </div>
              <p className="text-[11px] text-apple-secondary">
                Socio-demographic exposure: senior citizens (60+), informal slum settlements, and outdoor physical workers.
              </p>
            </div>

            <div className="p-3 rounded-squircle-sm border border-black/[0.04] bg-white sm:col-span-2">
              <div className="font-bold text-apple-text text-[12px] flex items-center justify-between mb-1">
                <span>Air Pollution Burden (A)</span>
                <span className="text-apple-blue font-bold">10%</span>
              </div>
              <p className="text-[11px] text-apple-secondary">
                Particulate matter (PM2.5) and surface ozone exacerbating cardio-respiratory vulnerability under heat stress.
              </p>
            </div>
          </div>

          {/* Scientific Limitations & Prototype Disclosures */}
          <div className="p-4 rounded-squircle-sm bg-apple-amberLight/60 border border-apple-amber/30 text-[12px]">
            <h4 className="font-bold text-[#B26A00] mb-1 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              Scientific Transparency & Prototype Notice
            </h4>
            <p className="text-[#875000] leading-relaxed">
              This system is an early-stage demonstration prototype designed for the Pune Municipal Corporation (PMC). 
              The scoring weights are indicative planning heuristics rather than medically certified clinical thresholds. 
              Live atmospheric readings are integrated via Open-Meteo, while neighbourhood surface and demographic parameters 
              reflect calibrated baseline estimates to demonstrate hyperlocal prioritization.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-squircle-sm text-[13px] font-bold bg-apple-text hover:bg-black text-white transition-all shadow-sm"
          >
            Dismiss
          </button>
        </div>

      </div>

    </div>
  );
}
