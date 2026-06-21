/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, CheckCircle2, DollarSign, Award, Users, HardHat, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export default function AboutUs() {
  const pillars = [
    {
      icon: <Truck className="w-5 h-5 text-neutral-950" />,
      title: 'Punctual Site Logistics',
      desc: 'Equipped with a sturdy local fleet of hydraulic dump trucks and trolleys. We guarantee delivery at your site within negotiated hours directly from our stockpiles.'
    },
    {
      icon: <DollarSign className="w-5 h-5 text-neutral-950" />,
      title: 'Affordable, Transparent Pricing',
      desc: 'No middleman and zero hidden markups. Sourcing directly from river royalty blocks enables us to pass pure savings to our end building partners.'
    },
    {
      icon: <Award className="w-5 h-5 text-neutral-950" />,
      title: 'Sieve Testing & High Grade QC',
      desc: 'Every block of sand is pre-screened to verify zero mud deposit. Red clay bricks are thoroughly baked to survive maximum structural compression tests.'
    }
  ];

  return (
    <section className="bg-neutral-950 py-16 text-white border-t border-neutral-850" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-intro-grid">
          <div className="lg:col-span-7 space-y-6 text-left" id="about-story-col">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Surguja's Sourcing Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase leading-none text-white" id="about-story-title">
              THE SHAHIL JOURNEY
            </h2>

            <p className="text-neutral-300 text-sm leading-relaxed font-light" id="about-story-desc1">
              Established as a flagship supplier in Ambikapur, Chhattisgarh, **Shahil Construction Services** was founded with a singular, clear mission: to make premium-grade construction supplies accessible and affordable for individual home builders, builders, and developers alike.
            </p>

            <p className="text-neutral-300 text-sm leading-relaxed font-light" id="about-story-desc2">
              For over a decade, we have been closely involved in shaping Surguja's architectural landscape. Quality is our default setting; whether it's triple-washed sand to prevent plaster fissures or heavy reinforced concrete precast posts, our materials are vetted by native engineers before deployment.
            </p>

            {/* Quote banner */}
            <div className="border-l-4 border-amber-500 bg-neutral-900/60 p-4 rounded-r-xl" id="about-proprietor-quote">
              <p className="text-xs text-neutral-305 italic">
                "Our business isn't simply selling raw materials; we supply the foundation on which your family's dreams and homes stand securely. Trust is our strongest concrete mix."
              </p>
              <span className="block text-[10px] uppercase font-mono font-bold text-amber-500 tracking-wider mt-2">
                — Shahil, Founder & Proprietor
              </span>
            </div>
          </div>

          {/* Benefits grid right side */}
          <div className="lg:col-span-5 relative" id="about-media-col">
            <div className="bg-[#1f2937] p-6 sm:p-8 rounded-lg border-t-4 border-t-amber-500 border-x border-b border-neutral-800 space-y-6" id="about-pillars-box">
              <h3 className="text-base font-display font-black tracking-tight uppercase flex items-center space-x-2 border-b border-neutral-800 pb-3 text-white">
                <HardHat className="w-5 h-5 text-amber-500" />
                <span>Why Civil Builders Trust Shahil</span>
              </h3>

              <div className="space-y-4" id="about-pillars-list">
                {pillars.map((p, idx) => (
                  <div key={idx} className="flex space-x-3 text-xs" id={`pillar-row-${idx}`}>
                    <div className="h-8 w-8 rounded-lg bg-amber-505 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {p.icon}
                    </div>
                    <div>
                      <span className="font-bold text-neutral-100 block">{p.title}</span>
                      <p className="text-neutral-400 font-light mt-0.5 leading-normal">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location Map Section */}
        <div className="bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 rounded-lg p-6 sm:p-8 space-y-6" id="depot-map-container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="block text-[10px] font-mono uppercase text-amber-500 tracking-widest">Central Depot Operations</span>
              <h3 className="text-xl font-display font-black uppercase flex items-center space-x-2 mt-0.5">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>AMBIKAPUR DEPOT LOCATION</span>
              </h3>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs bg-amber-500 hover:bg-amber-600 text-neutral-950 px-4 py-2 rounded font-bold transition-all cursor-pointer"
            >
              Open Google Maps Route
            </a>
          </div>

          {/* Styled Mock map framework represent */}
          <div className="relative bg-neutral-950 aspect-[16/6] min-h-[220px] rounded-2xl border border-neutral-805 overflow-hidden flex items-center justify-center select-none" id="depot-mockup-map">
            {/* Geometric Lines simulating a map view */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-2/5 left-0 right-0 h-4 bg-neutral-800 transform rotate-12"></div>
              <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-neutral-800 transform -rotate-45"></div>
              <div className="absolute top-0 bottom-0 left-2/3 w-4 bg-neutral-800 transform rotate-45"></div>
              <div className="absolute top-2/3 left-0 right-0 h-5 bg-amber-500"></div> {/* Major Ring Road */}
            </div>

            {/* Live Location Marker Pin UI HUD */}
            <div className="relative z-10 text-center space-y-3" id="map-pin-hud">
              <div className="inline-flex h-12 w-12 bg-amber-500/20 border border-amber-500 rounded-full items-center justify-center animate-bounce text-amber-500 hover:scale-110 transition-transform cursor-help">
                <HardHat className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="block font-bold text-sm text-white">SHAHIL MATERIALS STOCKPILE DEPOT</span>
                <span className="block text-[10px] font-mono text-amber-500/80">Near Ambikapur Ring Road Bypass, Ambikapur, Chhattisgarh</span>
              </div>
              <div className="inline-flex gap-4 text-[10px] text-neutral-450 font-mono">
                <span>📍 Silt Wash Tanks: OK</span>
                <span>🔥 Chimney Kilns: active</span>
                <span>🚛 Parking Ingress: wide-gate</span>
              </div>
            </div>

            {/* Bottom hud legend */}
            <div className="absolute bottom-3 left-3 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg text-[9px] font-mono text-neutral-400">
              Surguja Division Supply Zone
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
