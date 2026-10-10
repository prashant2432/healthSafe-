import React from 'react';
import { 
  X, 
  HeartPulse, 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  XCircle, 
  Building, 
  MapPin, 
  Sparkles,
  Droplets,
  Wind
} from 'lucide-react';

export function EmergencyProtocolModal({
  isOpen,
  onClose,
  activeWard
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-squircle-lg border border-black/[0.08] shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto my-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-squircle bg-apple-crimsonLight text-apple-crimson flex items-center justify-center border border-apple-crimson/20 shadow-apple-subtle flex-shrink-0 animate-pulse">
              <HeartPulse className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold uppercase tracking-wider bg-apple-crimson text-white">
                  Emergency Action Protocol
                </span>
                {activeWard && (
                  <span className="text-[12px] font-semibold text-apple-secondary flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-apple-coral" />
                    {activeWard.name}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-apple-text tracking-tight mt-0.5">
                Heat Distress & Heat Stroke First-Aid
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-squircle-sm bg-apple-canvas hover:bg-black/[0.06] flex items-center justify-center text-apple-secondary hover:text-apple-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Triage Alert: Heat Exhaustion vs Heat Stroke */}
        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Heat Exhaustion Card (Early Stage) */}
          <div className="p-3.5 rounded-squircle bg-apple-amberLight/70 border border-apple-amber/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#B26A00] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-apple-amber" />
                  Heat Exhaustion (Early Warning)
                </span>
              </div>
              <ul className="text-[11.5px] text-[#7A4900] space-y-1 leading-snug">
                <li>• Heavy sweating & cold, pale, clammy skin</li>
                <li>• Fast, weak pulse & muscle cramps</li>
                <li>• Dizziness, nausea, headache, faintness</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-apple-amber/20 text-[11px] font-bold text-[#B26A00]">
              Action: Cool down immediately, hydrate in shade.
            </div>
          </div>

          {/* Heat Stroke Card (Medical Emergency) */}
          <div className="p-3.5 rounded-squircle bg-apple-crimsonLight/80 border border-apple-crimson/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-apple-crimson flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-apple-crimson" />
                  Heat Stroke (LIFE THREATENING)
                </span>
              </div>
              <ul className="text-[11.5px] text-[#9E1B1B] space-y-1 leading-snug">
                <li>• Body temp &gt; 103°F (39.5°C)</li>
                <li>• Hot, red, dry OR damp skin (sweat failed)</li>
                <li>• Confusion, slurred speech, seizures, collapse</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-apple-crimson/20 text-[11px] font-bold text-apple-crimson">
              Action: CALL 108 IMMEDIATELY. Aggressive cooling.
            </div>
          </div>

        </div>

        {/* 4-Step Immediate Bystander Action Protocol */}
        <div className="space-y-3 mb-5">
          <h3 className="text-[13px] font-bold text-apple-text uppercase tracking-wider">
            4-Step Rapid Bystander Action Guide
          </h3>

          {/* Step 1 */}
          <div className="p-3 rounded-squircle-sm bg-apple-canvas border border-black/[0.05] flex items-start gap-3">
            <span className="w-6 h-6 rounded-[7px] bg-apple-text text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
              1
            </span>
            <div>
              <h4 className="text-[13px] font-bold text-apple-text">
                Move to Deep Shade & Position Correctly
              </h4>
              <p className="text-[12px] text-apple-secondary mt-0.5 leading-relaxed">
                Immediately move the person out of direct sunlight into an air-conditioned room or deep shade. Lay them flat on their back and <strong>elevate their legs 12 inches (30 cm)</strong> to maintain blood flow to vital organs. Loosen or remove tight outer clothing.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-squircle-sm bg-apple-canvas border border-black/[0.05] flex items-start gap-3">
            <span className="w-6 h-6 rounded-[7px] bg-apple-blue text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
              2
            </span>
            <div>
              <h4 className="text-[13px] font-bold text-apple-text">
                Aggressive Evaporative Cooling
              </h4>
              <p className="text-[12px] text-apple-secondary mt-0.5 leading-relaxed">
                Spray or sponge their entire body with cool (not ice-cold) water and fan vigorously to accelerate evaporation. Apply ice packs or cool wet towels specifically to the <strong>neck, armpits, and groin</strong> where major blood vessels run closest to the skin.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-squircle-sm bg-apple-canvas border border-black/[0.05] flex items-start gap-3">
            <span className="w-6 h-6 rounded-[7px] bg-apple-mint text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
              3
            </span>
            <div>
              <h4 className="text-[13px] font-bold text-apple-text">
                Hydration Safety (Critical Do's & Don'ts)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-[11.5px]">
                <div className="p-2 rounded-[8px] bg-apple-mintLight text-[#248A3D] font-medium flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>Give small sips of cool water or ORS <strong>ONLY</strong> if conscious and able to swallow.</span>
                </div>
                <div className="p-2 rounded-[8px] bg-apple-crimsonLight text-apple-crimson font-medium flex items-start gap-1.5">
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span><strong>NEVER force fluids</strong> if drowsy, vomiting, or confused (prevents choking/aspiration).</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-squircle-sm bg-apple-canvas border border-black/[0.05] flex items-start gap-3">
            <span className="w-6 h-6 rounded-[7px] bg-apple-crimson text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
              4
            </span>
            <div>
              <h4 className="text-[13px] font-bold text-apple-text">
                Immediate Emergency Dispatch (Dial 108)
              </h4>
              <p className="text-[12px] text-apple-secondary mt-0.5 leading-relaxed">
                If the person exhibits confusion, rapid heart rate, vomiting, or does not improve within 15 minutes, arrange immediate medical transport to the nearest hospital. Keep cooling them until the ambulance arrives.
              </p>
            </div>
          </div>

        </div>

        {/* Emergency Contacts & Hospital Bar */}
        <div className="p-4 rounded-squircle bg-apple-canvas border border-black/[0.06] space-y-3">
          <div className="text-[11px] font-bold text-apple-secondary uppercase tracking-wider flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-apple-crimson" />
            Pune Emergency Helplines & Health Facilities
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a 
              href="tel:108"
              className="p-2.5 rounded-squircle-sm bg-white border border-black/[0.05] shadow-apple-subtle hover:border-apple-crimson transition-colors flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-[8px] bg-apple-crimsonLight text-apple-crimson flex items-center justify-center font-black text-sm flex-shrink-0">
                108
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-apple-text truncate">Ambulance Service</div>
                <div className="text-[10px] text-apple-secondary">24/7 Toll-Free Dispatch</div>
              </div>
            </a>

            <a 
              href="tel:02025501269"
              className="p-2.5 rounded-squircle-sm bg-white border border-black/[0.05] shadow-apple-subtle hover:border-apple-coral transition-colors flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-[8px] bg-apple-coralLight text-apple-coral flex items-center justify-center font-bold text-xs flex-shrink-0">
                PMC
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-apple-text truncate">Disaster Cell</div>
                <div className="text-[10px] text-apple-secondary">020-25501269</div>
              </div>
            </a>

            <a 
              href="tel:104"
              className="p-2.5 rounded-squircle-sm bg-white border border-black/[0.05] shadow-apple-subtle hover:border-apple-blue transition-colors flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-[8px] bg-apple-mintLight text-apple-mint flex items-center justify-center font-black text-sm flex-shrink-0">
                104
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-apple-text truncate">Health Helpline</div>
                <div className="text-[10px] text-apple-secondary">Maharashtra Medical Advice</div>
              </div>
            </a>
          </div>

          {activeWard?.nearestHospital && (
            <div className="pt-2 border-t border-black/[0.05] flex items-center gap-2 text-[12px]">
              <Building className="w-3.5 h-3.5 text-apple-secondary flex-shrink-0" />
              <span className="text-apple-secondary font-medium">Nearest Hospital ({activeWard.name.split(' ')[0]}):</span>
              <span className="font-bold text-apple-text truncate">{activeWard.nearestHospital}</span>
            </div>
          )}
        </div>

        {/* Bottom Close Action */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-squircle-sm bg-apple-text text-white text-[12px] font-semibold hover:bg-black transition-colors shadow-sm"
          >
            Close Emergency Protocol
          </button>
        </div>

      </div>
    </div>
  );
}
