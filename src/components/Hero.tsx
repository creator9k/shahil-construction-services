/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Truck, ShieldCheck, Award, ArrowRight, MessageSquareCode, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onBrowseCatalogue: () => void;
  onGetQuote: () => void;
  onOpenEstimator: () => void;
}

export default function Hero({ onBrowseCatalogue, onGetQuote, onOpenEstimator }: HeroProps) {
  const { t } = useLanguage();

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden py-12 lg:py-24" id="hero-section">
      {/* Dynamic Industrial Pattern Geometric Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" id="hero-pattern-bg">
        <div className="absolute top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.15),transparent)]"></div>
        <div 
          className="w-full h-full" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,158,11,0.15) 1px, transparent 0)`, 
            backgroundSize: '24px 24px' 
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="hero-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-grid">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-text-block">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase font-semibold" id="hero-verified-badge">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('hero.badge_title')}</span>
            </div>

            <p className="text-amber-500 uppercase tracking-[4px] text-[11px] sm:text-xs font-black block pt-1" id="hero-subtitle-hint font-display">
              {t('hero.sub')}
            </p>

            <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-display font-black tracking-tighter uppercase leading-[0.9] text-white" id="hero-heading">
              {t('hero.title_part1')}<br />
              <span className="text-amber-500">{t('hero.title_part2')}</span><br />
              {t('hero.title_part3')}
            </h1>

            <p className="text-neutral-300 text-sm max-w-2xl font-light leading-relaxed font-sans" id="hero-lead-paragraph">
              {t('hero.desc')}
            </p>

            {/* Quick Benefits row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2" id="hero-benefits-grid">
              <div className="flex items-center space-x-2.5 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800" id="benefit-quick-delivery">
                <Truck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-neutral-400">Delivery</span>
                  <span className="block text-xs font-semibold text-white">Same-Day Site Delivery</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800" id="benefit-certified-quality">
                <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-neutral-400">Quality Check</span>
                  <span className="block text-xs font-semibold text-white">Triple-Washed Sand</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 col-span-2 md:col-span-1" id="benefit-bulk-discounts">
                <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-mono uppercase text-neutral-400">Pricing</span>
                  <span className="block text-xs font-semibold text-white">Aggressive Bulk Rates</span>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4" id="hero-actions-container">
              <button
                onClick={onBrowseCatalogue}
                id="hero-view-catalogue-btn"
                className="group flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-7 py-4 rounded-xl shadow-lg hover:shadow-amber-505/20 transition-all text-base border-b-4 border-amber-700 active:translate-y-0.5 pointer-events-auto cursor-pointer"
              >
                <span>{t('hero.btn_catalogue')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onGetQuote}
                id="hero-get-quote-btn"
                className="flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-850 text-white hover:text-amber-500 font-semibold px-7 py-4 rounded-xl transition-all text-base border border-neutral-750 hover:border-amber-500/40 pointer-events-auto cursor-pointer"
              >
                <span>{t('hero.btn_quote')}</span>
              </button>

              <button
                onClick={onOpenEstimator}
                id="hero-run-estimator-btn"
                className="flex items-center justify-center space-x-2 bg-neutral-950 hover:bg-neutral-900 text-amber-500 font-mono text-sm px-5 py-4 rounded-xl transition-all border border-amber-500/20 hover:border-amber-500/50 pointer-events-auto cursor-pointer"
              >
                <span>📐 {t('nav.estimator')}</span>
              </button>
            </div>
          </div>

          {/* Graphical Micro-UI Stats Block */}
          <div className="lg:col-span-4 relative lg:ml-auto" id="hero-graphic-block">
            <div className="relative bg-[#1f2937] p-6 rounded-lg border-t-4 border-t-amber-500 border-x border-b border-neutral-800 shadow-2xl overflow-hidden" id="hero-stats-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full"></div>
              
              {/* Construction Zone Warning Accents */}
              <div className="flex space-x-2 py-1 absolute top-0 left-0 right-0" id="decorative-card-accents">
                <div className="h-1 flex-1 bg-amber-500"></div>
                <div className="h-1 flex-1 bg-neutral-950"></div>
                <div className="h-1 flex-1 bg-amber-500"></div>
                <div className="h-1 flex-1 bg-neutral-950"></div>
                <div className="h-1 flex-1 bg-amber-500"></div>
              </div>

              <div className="flex items-center justify-between mb-4 mt-2" id="hero-card-header">
                <div className="flex space-x-1.5 text-xs text-neutral-400 font-mono uppercase">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ambikapur Depot Live</span>
                </div>
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" title="Ready to supply"></span>
              </div>

              <h3 className="text-xl font-bold mb-3 tracking-tight text-white border-b border-neutral-800 pb-3" id="hero-card-title">
                Surguja Supply Direct-Line
              </h3>

              <div className="space-y-4" id="hero-card-stats-list">
                <div className="flex justify-between items-center bg-neutral-950/50 p-3 rounded-lg border border-neutral-800/40" id="card-stat-balu">
                  <span className="text-sm text-neutral-400">River Sand (Balu)</span>
                  <span className="text-sm font-mono font-semibold text-amber-400">Available ● ₹2,800/Brass</span>
                </div>

                <div className="flex justify-between items-center bg-neutral-950/50 p-3 rounded-lg border border-neutral-800/40" id="card-stat-eeta">
                  <span className="text-sm text-neutral-400">Red Clay Bricks</span>
                  <span className="text-sm font-mono font-semibold text-amber-400">Ready ● ₹7/Piece</span>
                </div>

                <div className="flex justify-between items-center bg-neutral-950/50 p-3 rounded-lg border border-neutral-800/40" id="card-stat-gitti">
                  <span className="text-sm text-neutral-400">Granite Aggregate (Gitti)</span>
                  <span className="text-sm font-mono font-semibold text-amber-400">Ready ● ₹3,200/Brass</span>
                </div>

                <div className="flex justify-between items-center bg-neutral-950/50 p-3 rounded-lg border border-neutral-800/40" id="card-stat-fencing">
                  <span className="text-sm text-neutral-400">Fencing Poles & Boundary Slabs</span>
                  <span className="text-sm font-mono font-semibold text-amber-450">Active Batch Fabrication</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-5 border-t border-neutral-800 text-center" id="hero-card-footer">
                <p className="text-xs text-neutral-400 italic">
                  "Serving individual home builders, government contractors, & civil structural engineers in Ambikapur, Chhattisgarh."
                </p>
                <div className="mt-3.5 flex justify-center space-x-6 text-[11px] text-amber-500/80 font-mono" id="hero-numerical-indicators">
                  <div>
                    <span className="block text-lg font-bold text-white leading-none">12+</span>
                    <span>Years Experience</span>
                  </div>
                  <div className="border-l border-neutral-800"></div>
                  <div>
                    <span className="block text-lg font-bold text-white leading-none">850+</span>
                    <span>Sites Supplied</span>
                  </div>
                  <div className="border-l border-neutral-800"></div>
                  <div>
                    <span className="block text-lg font-bold text-white leading-none">100%</span>
                    <span>Trusted Grade</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

