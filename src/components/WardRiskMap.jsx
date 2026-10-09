import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Layers, Crosshair, MapPin } from 'lucide-react';
import { PUNE_CITY_CENTER, PUNE_DEFAULT_ZOOM } from '../data/puneWards';

export function WardRiskMap({
  wards,
  selectedWardId,
  onSelectWard,
  simulatedResults
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const polygonLayersRef = useRef({});
  const markerLayersRef = useRef({});

  // Initialize Map Once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const puneBounds = L.latLngBounds(
      [18.4500, 73.7500],
      [18.6200, 73.9800]
    );

    const map = L.map(mapContainerRef.current, {
      center: PUNE_CITY_CENTER,
      zoom: PUNE_DEFAULT_ZOOM,
      minZoom: 12,
      maxZoom: 17,
      maxBounds: puneBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false
    });

    // Clean OpenStreetMap standard tiles (No API key required)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('© OpenStreetMap')
      .addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Polygons & Markers when wards, simulation, or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing layers
    Object.values(polygonLayersRef.current).forEach(layer => map.removeLayer(layer));
    Object.values(markerLayersRef.current).forEach(layer => map.removeLayer(layer));
    polygonLayersRef.current = {};
    markerLayersRef.current = {};

    const anySelected = Boolean(selectedWardId);

    wards.forEach(ward => {
      const isSelected = ward.id === selectedWardId;
      const isFaded = anySelected && !isSelected;
      const sim = simulatedResults?.[ward.id];
      const activeScore = sim ? sim.simulatedScore : ward.currentScore;
      const activeTier = sim ? sim.simulatedTier : ward.currentTier;

      // Create Ward Boundary Polygon
      const polygon = L.polygon(ward.polygon, {
        color: isFaded ? '#9CA3AF' : activeTier.color,
        weight: isSelected ? 4 : isFaded ? 1.5 : 2.5,
        fillColor: isFaded ? '#D1D5DB' : activeTier.color,
        fillOpacity: isSelected ? 0.50 : isFaded ? 0.15 : 0.30,
        dashArray: isFaded ? '3, 5' : isSelected ? null : '5, 5',
        smoothFactor: 1.5,
        className: isFaded ? 'ward-faded' : ''
      }).addTo(map);

      polygon.on('click', () => {
        onSelectWard(isSelected ? null : ward.id);
      });

      if (!isFaded) {
        polygon.on('mouseover', () => {
          if (!isSelected) {
            polygon.setStyle({
              fillOpacity: 0.48,
              weight: 3.5
            });
          }
        });

        polygon.on('mouseout', () => {
          if (!isSelected) {
            polygon.setStyle({
              fillOpacity: 0.30,
              weight: 2.5
            });
          }
        });
      }

      polygonLayersRef.current[ward.id] = polygon;

      // Custom Square-Round Centroid Badge — hide for faded wards
      if (!isFaded) {
        const markerHtml = `
          <div class="cursor-pointer transition-transform duration-200 hover:scale-105 select-none" style="transform: translate(-50%, -50%);">
            <div class="px-2.5 py-1.5 rounded-[10px] bg-white/95 backdrop-blur-md border flex items-center gap-1.5 whitespace-nowrap ${
              isSelected
                ? 'border-[#1D1D1F] ring-2 ring-black/10 shadow-lg'
                : 'border-black/10 shadow-md'
            }">
              <span class="w-2.5 h-2.5 rounded-[4px]" style="background-color: ${activeTier.color};"></span>
              <span class="text-[12px] font-bold" style="color: #1D1D1F;">${activeScore}</span>
              <span class="text-[11px] font-semibold" style="color: #6E6E73;">${ward.name.split(' ')[0]}</span>
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: 'custom-square-round-marker',
          iconSize: [0, 0]
        });

        const marker = L.marker(ward.center, { icon: customIcon }).addTo(map);
        marker.on('click', () => onSelectWard(isSelected ? null : ward.id));
        markerLayersRef.current[ward.id] = marker;
      }
    });

  }, [wards, selectedWardId, simulatedResults, onSelectWard]);

  // Pan to ward when selected
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedWardId) {
      const ward = wards.find(w => w.id === selectedWardId);
      if (ward) {
        map.flyTo(ward.center, 13.8, { duration: 0.8, easeLinearity: 0.25 });
      }
    } else {
      // Reset to city overview when deselected
      map.flyTo(PUNE_CITY_CENTER, PUNE_DEFAULT_ZOOM, { duration: 0.6 });
    }
  }, [selectedWardId, wards]);

  const handleResetView = () => {
    onSelectWard(null);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[620px] rounded-squircle-lg overflow-hidden border border-black/[0.08] shadow-apple-card bg-apple-canvas">
      
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Quick Ward Selector */}
      <div className="absolute top-3 left-3 right-3 z-10 overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-xl p-1.5 rounded-squircle border border-black/[0.06] shadow-apple-subtle w-max">
          <span className="text-[11px] font-semibold text-apple-secondary px-2 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-apple-secondary" />
            Inspect:
          </span>
          {wards.map(ward => {
            const isSelected = ward.id === selectedWardId;
            const sim = simulatedResults?.[ward.id];
            const score = sim ? sim.simulatedScore : ward.currentScore;
            const tier = sim ? sim.simulatedTier : ward.currentTier;

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
                <span>{ward.name.split(' ')[0]}</span>
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

      {/* Floating Bottom Left: Risk Legend */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto">
        <div className="bg-white/92 backdrop-blur-xl p-3 rounded-squircle border border-black/[0.06] shadow-apple-card max-w-[240px]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-apple-text uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3 text-apple-secondary" />
              Risk Tiers
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
          
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] bg-apple-mintLight text-[#248A3D] font-medium">
              <span className="w-2.5 h-2.5 rounded-[4px] bg-[#34C759]" />
              <span>Low (0–24)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] bg-apple-amberLight text-[#B26A00] font-medium">
              <span className="w-2.5 h-2.5 rounded-[4px] bg-[#FF9500]" />
              <span>Mod (25–49)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] bg-apple-coralLight text-[#C83818] font-medium">
              <span className="w-2.5 h-2.5 rounded-[4px] bg-[#FF5A36]" />
              <span>High (50–74)</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-[8px] bg-apple-crimsonLight text-[#D70015] font-medium">
              <span className="w-2.5 h-2.5 rounded-[4px] bg-[#FF3B30]" />
              <span>V. High (75+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recenter / Clear Selection Button */}
      <button
        onClick={handleResetView}
        title="Reset Pune Map View & Clear Selection"
        className="absolute bottom-4 right-14 z-10 w-9 h-9 rounded-squircle-sm bg-white/90 hover:bg-white backdrop-blur-xl border border-black/[0.08] shadow-apple-card flex items-center justify-center text-apple-secondary hover:text-apple-text transition-all"
      >
        <Crosshair className="w-4 h-4" />
      </button>

    </div>
  );
}
