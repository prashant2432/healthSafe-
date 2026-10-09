import React, { useState } from 'react';
import { 
  Layers, 
  Trees, 
  Flame, 
  Building2, 
  MapPin, 
  Compass
} from 'lucide-react';

export function GraphicWardMap({
  wards,
  selectedWardId,
  onSelectWard,
  simulatedResults
}) {
  const [activeLayer, setActiveLayer] = useState('risk');
  const [hoveredWardId, setHoveredWardId] = useState(null);

  // ─────────────────────────────────────────────────────────────────────────
  // INTERLOCKING WARD BOUNDARIES (1000 × 700 canvas)
  // All six wards share exact edge points so they tile gap-free
  // Key shared anchor points (referenced across multiple wards):
  //   A = 210,300   (Kothrud / Shivajinagar / Kasba-Peth triple point)
  //   B = 490,260   (Shivajinagar / Koregaon-Park boundary)
  //   C = 430,390   (Kasba-Peth / Koregaon-Park junction)
  //   D = 490,450   (Kasba-Peth / Hadapsar / Koregaon-Park lower)
  //   E = 640,320   (Koregaon-Park / Viman-Nagar / Hadapsar triple)
  //   F = 660,200   (Viman-Nagar lower-left / Koregaon-Park upper)
  // ─────────────────────────────────────────────────────────────────────────
  const wardShapes = {
    'kothrud': {
      // Paud Road → Vetal Hill → Sinhagad Road → Karve Road → back north
      path: `
        M 70,580
        C 55,510 45,430 60,355
        C 75,295 110,250 165,230
        C 195,220 210,225 210,300
        C 210,360 195,390 175,430
        C 155,475 130,520 120,560
        C 105,595 88,600 70,580
        Z
      `,
      cx: 138,
      cy: 400,
      icon: '⛰️',
      landmark: 'Vetal Hill · Paud Rd',
    },
    'shivajinagar': {
      // Sangam (river confluence) → FC Road arc → Deccan → back to triple-point A
      path: `
        M 165,230
        C 200,170 265,125 345,110
        C 415,100 475,120 530,155
        C 575,185 590,225 565,265
        C 545,295 510,305 490,260
        C 460,240 400,255 355,275
        C 305,300 255,315 210,300
        C 210,225 195,220 165,230
        Z
      `,
      cx: 360,
      cy: 200,
      icon: '🏛️',
      landmark: 'FC Road · Sangam',
    },
    'kasba-peth': {
      // Bounded by: Shivajinagar (north), Koregaon-Park (east), Hadapsar (south-east), Kothrud (west)
      path: `
        M 210,300
        C 255,315 305,300 355,275
        C 400,255 460,240 490,260
        C 510,305 510,355 495,395
        C 490,405 490,420 490,450
        C 470,465 435,470 405,460
        C 365,445 330,415 295,395
        C 260,375 235,350 210,300
        Z
      `,
      cx: 360,
      cy: 370,
      icon: '🏮',
      landmark: 'Shaniwar Wada · Peths',
    },
    'koregaon-park': {
      // North Main Rd → river → Camp → Nagar Rd to Viman junction
      path: `
        M 490,260
        C 530,240 580,230 640,235
        C 690,240 730,255 755,285
        C 760,300 750,325 720,340
        C 695,355 665,345 640,320
        C 620,305 595,310 570,330
        C 545,350 520,380 510,390
        C 505,395 500,400 495,395
        C 510,355 510,305 490,260
        Z
      `,
      cx: 620,
      cy: 300,
      icon: '🌳',
      landmark: 'Koregaon Pk · Camp',
    },
    'viman-nagar': {
      // Airport belt → Kharadi → Nagar Rd → upper boundary
      path: `
        M 530,155
        C 590,120 680,90 780,80
        C 870,72 950,100 985,155
        C 990,200 970,250 930,280
        C 890,305 845,315 800,310
        C 760,305 730,285 755,285
        C 730,255 690,240 640,235
        C 580,230 530,240 490,260
        C 475,120 530,155 530,155
        Z
      `,
      cx: 755,
      cy: 195,
      icon: '✈️',
      landmark: 'Airport · IT Belt',
    },
    'hadapsar': {
      // Industrial / Magarpatta / Solapur Road — southern sweep
      path: `
        M 490,450
        C 490,420 490,405 495,395
        C 500,400 505,395 510,390
        C 520,380 545,350 570,330
        C 595,310 620,305 640,320
        C 665,345 695,355 720,340
        C 755,355 800,380 830,425
        C 860,470 855,540 810,590
        C 760,640 670,660 580,650
        C 510,640 460,610 450,565
        C 440,530 455,485 490,450
        Z
      `,
      cx: 645,
      cy: 500,
      icon: '🏭',
      landmark: 'Magarpatta · Solapur Rd',
    },
  };

  // ─── colour helpers ───────────────────────────────────────────────────────
  const getTierColors = (tier) => {
    const map = {
      'very-high': { fill: '#FF3B30', gStart: '#FF6459', gEnd: '#CC2A22', badge: '#FFF0EF', text: '#D70015' },
      'high':      { fill: '#FF5A36', gStart: '#FF7D5E', gEnd: '#D94020', badge: '#FFF2ED', text: '#C83818' },
      'moderate':  { fill: '#FF9500', gStart: '#FFB13B', gEnd: '#D47D00', badge: '#FFF6E8', text: '#B26A00' },
      'low':       { fill: '#34C759', gStart: '#54DD77', gEnd: '#25A845', badge: '#EDFAEF', text: '#248A3D' },
    };
    return map[tier.key] ?? map['low'];
  };

  const getLayerColors = (ward, tier) => {
    if (activeLayer === 'canopy') {
      const pct = ward.treeCanopyPct;
      if (pct >= 30) return { fill: '#34C759', gStart: '#50DA72', gEnd: '#25A845', badge: '#EDFAEF', text: '#248A3D' };
      if (pct >= 15) return { fill: '#62D481', gStart: '#7CE097', gEnd: '#48BE69', badge: '#EDFAEF', text: '#248A3D' };
      return           { fill: '#B0DEC0', gStart: '#C8EDD5', gEnd: '#90C8A0', badge: '#EDFAEF', text: '#5A9A6E' };
    }
    if (activeLayer === 'surface') {
      const pct = ward.imperviousPct;
      if (pct >= 80) return { fill: '#E02B20', gStart: '#FF5247', gEnd: '#B91C1C', badge: '#FEE2E2', text: '#B91C1C' };
      if (pct >= 65) return { fill: '#F97316', gStart: '#FB923C', gEnd: '#EA580C', badge: '#FFF0E8', text: '#C2440C' };
      return            { fill: '#38BDF8', gStart: '#60A5FA', gEnd: '#2563EB', badge: '#EFF8FF', text: '#1D4ED8' };
    }
    return getTierColors(tier);
  };

  const anySelected = Boolean(selectedWardId);

  return (
    <div className="relative w-full h-full min-h-[540px] lg:min-h-[640px] rounded-squircle-lg overflow-hidden border border-black/[0.08] shadow-apple-card bg-[#F4F5F7] flex flex-col">

      {/* ── Top Control Bar ─────────────────────────────────────────────── */}
      <div className="p-3.5 border-b border-black/[0.06] bg-white/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-10">

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-squircle-sm bg-apple-canvas flex items-center justify-center border border-black/[0.06] shadow-apple-subtle">
            <Compass className="w-4 h-4 text-apple-coral" />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-apple-text tracking-tight flex items-center gap-1.5">
              Pune Municipal Corporation
              <span className="text-[11px] font-semibold text-apple-secondary px-1.5 py-0.5 rounded-[6px] bg-black/[0.04]">
                6 Wards
              </span>
            </h3>
            <p className="text-[11px] text-apple-tertiary">
              Hyperlocal ward boundaries · Mula-Mutha Basin
            </p>
          </div>
        </div>

        {/* Layer toggle */}
        <div className="bg-[#EBEBEF] p-1 rounded-squircle flex items-center gap-1 border border-black/[0.04]">
          {[
            { key: 'risk',    label: 'Heat Risk',   icon: <Flame     className="w-3 h-3 text-apple-coral" /> },
            { key: 'canopy',  label: 'Tree Canopy', icon: <Trees     className="w-3 h-3 text-apple-mint"  /> },
            { key: 'surface', label: 'Built Heat',  icon: <Building2 className="w-3 h-3 text-apple-amber" /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveLayer(key)}
              className={`px-3 py-1 rounded-squircle-sm text-[11px] font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                activeLayer === key
                  ? 'bg-white text-apple-text shadow-sm'
                  : 'text-apple-secondary hover:text-apple-text'
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── SVG Canvas ─────────────────────────────────────────────────── */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2 sm:p-4 select-none overflow-hidden">

        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full max-h-[580px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* subtle dot-grid */}
            <pattern id="dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.8" fill="rgba(0,0,0,0.055)" />
            </pattern>

            {/* River gradient */}
            <linearGradient id="river-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#C3E4FD" />
              <stop offset="50%"  stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>

            {/* Ward fill gradients (generated per ward per layer) */}
            {wards.map(ward => {
              const sim  = simulatedResults?.[ward.id];
              const tier = sim ? sim.simulatedTier : ward.currentTier;
              const c    = getLayerColors(ward, tier);
              return (
                <linearGradient key={`g-${ward.id}`} id={`g-${ward.id}`} x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%"   stopColor={c.gStart} />
                  <stop offset="100%" stopColor={c.gEnd}   />
                </linearGradient>
              );
            })}

            {/* Blur filter for background / unfocused wards */}
            <filter id="ward-blur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>

            {/* Subtle drop shadow for active ward */}
            <filter id="ward-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.16" />
            </filter>
          </defs>

          {/* Background dot grid */}
          <rect width="1000" height="700" fill="url(#dot-grid)" />

          {/* Western Ghats foothills hint */}
          <path
            d="M 10,180 Q 55,370 30,600 L 10,700 L 10,180 Z"
            fill="rgba(0,0,0,0.03)"
          />
          <text
            x="22" y="490" fill="#A0A0A8" fontSize="9" fontWeight="700" letterSpacing="2.5"
            transform="rotate(-90,22,490)" opacity="0.65"
          >WESTERN GHATS</text>

          {/* Outer PMC boundary dashed ring */}
          <path
            d="M 145,110 C 355,48 690,38 895,100 C 980,225 970,490 855,630
               C 620,685 335,670 110,590 C 42,455 45,220 145,110 Z"
            fill="none"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="2"
            strokeDasharray="9,7"
          />

          {/* Mula-Mutha River ribbon */}
          <g>
            {/* glow halo */}
            <path
              d="M 75,560 C 165,490 230,395 315,320 C 375,265 420,240 490,228
                 C 565,215 640,228 720,220 C 820,210 910,238 995,252"
              fill="none" stroke="#DBEAFE" strokeWidth="32" strokeLinecap="round"
            />
            {/* main water body */}
            <path
              d="M 75,560 C 165,490 230,395 315,320 C 375,265 420,240 490,228
                 C 565,215 640,228 720,220 C 820,210 910,238 995,252"
              fill="none" stroke="url(#river-grad)" strokeWidth="20" strokeLinecap="round"
            />
            {/* ripple dashes */}
            <path
              d="M 75,560 C 165,490 230,395 315,320 C 375,265 420,240 490,228
                 C 565,215 640,228 720,220 C 820,210 910,238 995,252"
              fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5"
              strokeDasharray="15,15" strokeLinecap="round"
            />
            <text x="650" y="208" fill="#5A92D6" fontSize="10.5" fontWeight="700" letterSpacing="1.8" opacity="0.92">
              MULA-MUTHA RIVER
            </text>
          </g>

          {/* ── Ward Polygons: Unfocused (back layer, blurred & greyed when another is selected) */}
          {anySelected && wards.map(ward => {
            const shape = wardShapes[ward.id];
            if (!shape || ward.id === selectedWardId) return null;
            return (
              <path
                key={`bg-${ward.id}`}
                d={shape.path}
                fill="#D1D5DB"
                fillOpacity="0.55"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinejoin="round"
                filter="url(#ward-blur)"
                className="pointer-events-none"
              />
            );
          })}

          {/* ── Ward Polygons: Interactive foreground layer ───────────── */}
          {wards.map(ward => {
            const shape = wardShapes[ward.id];
            if (!shape) return null;

            const isSelected = ward.id === selectedWardId;
            const isHovered  = ward.id === hoveredWardId;
            const isFaded    = anySelected && !isSelected;

            const sim  = simulatedResults?.[ward.id];
            const score = sim ? sim.simulatedScore : ward.currentScore;
            const tier  = sim ? sim.simulatedTier  : ward.currentTier;
            const c     = getLayerColors(ward, tier);

            return (
              <g
                key={ward.id}
                onClick={() => onSelectWard(ward.id)}
                onMouseEnter={() => setHoveredWardId(ward.id)}
                onMouseLeave={() => setHoveredWardId(null)}
                className="cursor-pointer"
                style={{ transition: 'opacity 0.25s ease' }}
              >
                {/* Ward shape — hidden when faded (back-layer handles the grey) */}
                <path
                  d={shape.path}
                  fill={`url(#g-${ward.id})`}
                  fillOpacity={isFaded ? 0 : isSelected ? 0.92 : isHovered ? 0.82 : 0.72}
                  stroke={isSelected ? '#1D1D1F' : isHovered ? c.fill : '#FFFFFF'}
                  strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter={isSelected ? "url(#ward-shadow)" : undefined}
                  style={{ transition: 'fill-opacity 0.25s ease, stroke-width 0.2s ease' }}
                />

                {/* Badge: hide for faded wards */}
                {!isFaded && (
                  <g transform={`translate(${shape.cx}, ${shape.cy})`} className="pointer-events-none">
                    {/* Glass card */}
                    <rect
                      x="-80" y="-36" width="160" height="72"
                      rx="14"
                      fill="rgba(255,255,255,0.96)"
                      stroke={isSelected ? '#1D1D1F' : 'rgba(0,0,0,0.09)'}
                      strokeWidth={isSelected ? 2.2 : 1}
                      filter="url(#ward-shadow)"
                    />

                    {/* Icon + Ward name */}
                    <text
                      x="0" y="-15"
                      textAnchor="middle"
                      fill="#1D1D1F"
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="inherit"
                    >
                      {shape.icon} {ward.name.split(' ')[0]}
                    </text>

                    {/* Landmark micro-label */}
                    <text
                      x="0" y="-2"
                      textAnchor="middle"
                      fill="#86868B"
                      fontSize="9.5"
                      fontWeight="600"
                      fontFamily="inherit"
                    >
                      {shape.landmark}
                    </text>

                    {/* Score pill */}
                    <rect
                      x="-62" y="8" width="124" height="20"
                      rx="7"
                      fill={c.badge}
                      stroke="rgba(0,0,0,0.04)"
                    />
                    <circle cx="-46" cy="18" r="3.5" fill={tier.color} />
                    <text x="-36" y="22" fill="#1D1D1F" fontSize="11" fontWeight="900" fontFamily="inherit">
                      {score}
                    </text>
                    <text x="-14" y="22" fill={c.text} fontSize="9.5" fontWeight="700" fontFamily="inherit">
                      · {tier.label.replace(' Risk', '')}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

        </svg>

        {/* ── Floating Legend (bottom-left) ─────────────────────────── */}
        <div className="absolute bottom-3 left-3 bg-white/93 backdrop-blur-xl p-3 rounded-squircle border border-black/[0.06] shadow-apple-card max-w-[270px]">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-apple-text uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3 text-apple-secondary" />
              {activeLayer === 'risk' ? 'Heat-Health Risk' : activeLayer === 'canopy' ? 'Tree Canopy' : 'Impervious Surface'}
            </span>
            {selectedWardId && (
              <button
                onClick={() => onSelectWard(null)}
                className="text-[10px] font-semibold text-apple-blue hover:underline"
              >
                Show All
              </button>
            )}
          </div>

          {activeLayer === 'risk' && (
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {[
                { label: 'Low (0–24)',     bg: 'bg-apple-mintLight',   txt: 'text-[#248A3D]', dot: '#34C759' },
                { label: 'Mod (25–49)',    bg: 'bg-apple-amberLight',  txt: 'text-[#B26A00]', dot: '#FF9500' },
                { label: 'High (50–74)',   bg: 'bg-apple-coralLight',  txt: 'text-[#C83818]', dot: '#FF5A36' },
                { label: 'V.High (75+)',   bg: 'bg-apple-crimsonLight',txt: 'text-[#D70015]', dot: '#FF3B30' },
              ].map(({ label, bg, txt, dot }) => (
                <div key={label} className={`flex items-center gap-1.5 px-2 py-1 rounded-[8px] ${bg} ${txt} font-medium`}>
                  <span className="w-2.5 h-2.5 rounded-[4px] flex-shrink-0" style={{ backgroundColor: dot }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}

          {activeLayer === 'canopy' && (
            <div className="space-y-1 text-[11px] text-apple-secondary">
              {[
                ['Sparse (<10%)',     '#B0DEC0'],
                ['Moderate (15–25%)', '#62D481'],
                ['Lush (>30%)',       '#34C759'],
              ].map(([l, c]) => (
                <div key={l} className="flex items-center justify-between">
                  <span>{l}</span>
                  <span className="w-5 h-2.5 rounded" style={{ background: c }} />
                </div>
              ))}
            </div>
          )}

          {activeLayer === 'surface' && (
            <div className="space-y-1 text-[11px] text-apple-secondary">
              {[
                ['Permeable (<50%)',     '#38BDF8'],
                ['Dense Built (65–80%)', '#F97316'],
                ['Concrete (>85%)',      '#E02B20'],
              ].map(([l, c]) => (
                <div key={l} className="flex items-center justify-between">
                  <span>{l}</span>
                  <span className="w-5 h-2.5 rounded" style={{ background: c }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Quick Ward Selection Pills (top) ─────────────────────── */}
        <div className="absolute top-3 left-3 right-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xl p-1.5 rounded-squircle border border-black/[0.06] shadow-apple-subtle w-max">
            <span className="text-[11px] font-semibold text-apple-secondary px-2 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Inspect:
            </span>
            {wards.map(ward => {
              const isSelected = ward.id === selectedWardId;
              const sim  = simulatedResults?.[ward.id];
              const score = sim ? sim.simulatedScore : ward.currentScore;
              const tier  = sim ? sim.simulatedTier  : ward.currentTier;
              return (
                <button
                  key={ward.id}
                  onClick={() => onSelectWard(isSelected ? null : ward.id)}
                  className={`px-2.5 py-1 rounded-squircle-sm text-[12px] font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-apple-text text-white shadow-sm font-semibold'
                      : 'bg-white/60 hover:bg-white text-apple-text border border-black/[0.04]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-[3px]" style={{ backgroundColor: tier.color }} />
                  {ward.name.split(' ')[0]}
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-apple-secondary'}`}>
                    {score}
                  </span>
                </button>
              );
            })}
            {selectedWardId && (
              <button
                onClick={() => onSelectWard(null)}
                className="px-2 py-1 rounded-squircle-sm text-[11px] text-apple-secondary hover:text-apple-text bg-white/40 border border-black/[0.04] font-medium"
              >
                × Clear
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
