/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MessageSquare, Quote, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  projectType: string;
  verified: boolean;
}

export default function CustomerReviews() {
  const reviews: Review[] = [
    {
      id: 'rev-1',
      name: "Rajesh Sahu",
      role: "Residential Homebuilder",
      location: "Kedarpur, Ambikapur",
      rating: 5,
      comment: "Excellent quality child-sieve river sand (Balu). We ordered 4 brass for our main plastering stage, and there was zero silt deposit. Silt-washed materials have saved our exterior plaster from moisture cracks.",
      projectType: "3-Storey Home Project",
      verified: true
    },
    {
      id: 'rev-2',
      name: "Amit Tirkey",
      role: "Civil Contractor",
      location: "Bypass Ring Road, Ambikapur",
      rating: 5,
      comment: "Shahil's chimney-fired red clay bricks (Eeta) are exceptionally dense and dimensionally stable. Tested standard load compressions successfully on sight. Reliable hydraulic dumper dispatch.",
      projectType: "Commercial Office Complex",
      verified: true
    },
    {
      id: 'rev-3',
      name: "Sanjay Deo",
      role: "Property Proprietor",
      location: "Lakhanpur, Chhattisgarh",
      rating: 5,
      comment: "I purchased 180 square feet of precast boundary walls. Shahil's labor crew installed the modular panels and pillars in less than 3 days. Fast delivery, flawless alignment on site without middleman charges.",
      projectType: "Farmland Boundary Safety",
      verified: true
    }
  ];

  return (
    <section className="bg-neutral-950 py-16 text-white border-t border-neutral-900" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4" id="reviews-header">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Surguja Client Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white">
            TRUSTED BY AMBIKAPUR BUILDERS
          </h2>
          
          <p className="text-neutral-400 font-light text-sm">
            Read verified feedback from central contractors, architects, and independent families who build with Shahil materials.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="reviews-grid">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
              id={rev.id}
            >
              <div className="space-y-4">
                {/* Upper Star Rating Row */}
                <div className="flex items-center justify-between">
                  {/* Rating Stars */}
                  <div className="flex space-x-1" aria-label={`Rating: ${rev.rating} stars`}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      VERIFIED ORDER
                    </span>
                  )}
                </div>

                {/* Comment quote text */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 w-8 h-8 text-neutral-800 opacity-20 pointer-events-none" />
                  <p className="text-xs text-neutral-305 font-light leading-relaxed italic relative z-10 pl-2">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Lower Author Info Block */}
              <div className="mt-6 pt-5 border-t border-neutral-800/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block tracking-wide">{rev.name}</span>
                  <span className="text-[10px] text-neutral-450 block">{rev.role}</span>
                  <span className="text-[9px] text-amber-500 font-mono tracking-tight block mt-0.5">📍 {rev.location}</span>
                </div>
                
                {/* Secondary badge detailing project type */}
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Project:</span>
                  <span className="text-[10px] font-bold text-neutral-300 block">{rev.projectType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Performance Metric summary */}
        <div className="bg-[#111827] border border-neutral-850 p-6 rounded-lg text-center max-w-2xl mx-auto" id="reviews-satisfaction-summary">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800 text-xs text-neutral-400 font-mono">
            <div className="pb-3 sm:pb-0">
              <span className="text-3xl font-display font-black text-amber-500 block">4.9 / 5</span>
              <span>AVERAGE RATING</span>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-8">
              <span className="text-3xl font-display font-black text-white block">100%</span>
              <span>ON-TIME SITE DESPATCH</span>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-8">
              <span className="text-3xl font-display font-black text-white block">2,400+</span>
              <span>TRIPS UNLOADED SUCCESSFULLY</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
