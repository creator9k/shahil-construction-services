/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Material } from '../types';
import { Layers, Grid, Shield, Hammer, HardHat, Compass, Sparkles, MessageSquare, Tag, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CatalogueProps {
  materials: Material[];
  onEnquire: (materialId: string, quantity?: number, userMsg?: string) => void;
  onOpenEstimator: (materialId: string) => void;
}

export default function Catalogue({ materials, onEnquire, onOpenEstimator }: CatalogueProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'aggregate' | 'concrete' | 'masonry' | 'structural'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const { language, t } = useLanguage();

  // Quick Local Calculator States
  const [calcQuantity, setCalcQuantity] = useState<number>(10);
  const [calcActiveId, setCalcActiveId] = useState<string | null>(null);

  const filters = [
    { value: 'all', label: t('cat.all') },
    { value: 'aggregate', label: t('cat.aggregate') },
    { value: 'masonry', label: t('cat.masonry') },
    { value: 'concrete', label: t('cat.concrete') }
  ];

  const filteredMaterials = materials.filter(
    (m) => activeFilter === 'all' || m.category === activeFilter
  );

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Grid':
        return <Grid className="w-5 h-5" />;
      case 'Navigation':
        return <Compass className="w-5 h-5" />;
      case 'ShieldAlert':
        return <Shield className="w-5 h-5" />;
      default:
        return <Hammer className="w-5 h-5" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'aggregate':
        return language === 'hi' ? 'एग्रीगेट्स' : 'Aggregates';
      case 'concrete':
        return language === 'hi' ? 'प्रीकास्ट कंक्रीट' : 'Precast Concrete';
      case 'masonry':
        return language === 'hi' ? 'चिनाई' : 'Masonry Block';
      default:
        return language === 'hi' ? 'संरचनात्मक' : 'Structural';
    }
  };

  return (
    <section className="bg-neutral-900 border-t border-neutral-800 py-16 text-white" id="catalogue-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12" id="catalogue-header">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase mb-4">
            <HardHat className="w-3.5 h-3.5" />
            <span>{t('cat.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter mb-4 text-white">
            {t('cat.title')}
          </h2>
          <p className="text-neutral-400">
            {t('cat.desc')}
          </p>
        </div>

        {/* Dynamic Category Filter Buttons Selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10" id="catalogue-filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === filter.value
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/10'
                  : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-750'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid-based Product Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="catalogue-products-grid">
          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-neutral-955 border-t-4 border-t-amber-500 border-x border-b border-neutral-800 rounded-lg flex flex-col justify-between overflow-hidden hover:border-amber-500/40 transition-all duration-300 group shadow-lg hover:-translate-y-1"
              id={`product-card-${material.id}`}
            >
              {/* Product Card Media Header */}
              <div 
                className={`h-48 relative flex flex-col justify-between overflow-hidden ${
                  material.imageUrl ? 'bg-neutral-900' : `bg-gradient-to-br ${material.imageHue} p-6`
                }`} 
                id={`product-media-${material.id}`}
              >
                {material.imageUrl ? (
                  <>
                    <img
                      src={material.imageUrl}
                      alt={material.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-neutral-950/15"></div>
                    <div className="flex justify-between items-start z-10 p-6 pb-0 w-full">
                      <span className="bg-neutral-900/95 text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-1 rounded text-amber-500 border border-amber-500/25">
                        {getCategoryLabel(material.category)}
                      </span>
                      <div className="bg-neutral-900/90 text-white p-2 rounded">
                        {renderIcon(material.iconName)}
                      </div>
                    </div>
                    <div className="z-10 mt-auto p-6 pt-0 w-full">
                      <h3 className="text-2xl font-display font-black tracking-tight leading-none text-white drop-shadow-md uppercase">
                        {material.name}
                      </h3>
                      <p className="text-xs uppercase font-mono tracking-widest text-amber-500 font-semibold -mt-0.5">
                        {material.hindiName}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05),transparent)]"></div>
                    <div className="flex justify-between items-start z-10 w-full">
                      <span className="bg-neutral-900/95 text-[10px] uppercase font-mono tracking-wider font-bold px-2.5 py-1 rounded text-amber-500 border border-amber-500/10">
                        {getCategoryLabel(material.category)}
                      </span>
                      <div className="bg-neutral-900/90 text-white p-2 rounded">
                        {renderIcon(material.iconName)}
                      </div>
                    </div>
                    <div className="z-10 mt-auto w-full">
                      <h3 className="text-2xl font-display font-black tracking-tight leading-none drop-shadow-md uppercase">
                        {material.name}
                      </h3>
                      <p className="text-xs uppercase font-mono tracking-widest opacity-85 font-semibold -mt-0.5">
                        {material.hindiName}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Card Body content */}
              <div className="p-6 flex-1 flex flex-col justify-between" id={`product-body-${material.id}`}>
                <div>
                  <p className="text-sm text-neutral-300 mb-4 font-light leading-relaxed">
                    {material.description}
                  </p>

                  {/* Highlights section */}
                  <div className="space-y-2 mb-5">
                    {material.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center text-xs text-neutral-400">
                        <span className="text-amber-500 mr-2">✔</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Calculators bar */}
                <div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-805 mb-4 flex justify-between items-center" id={`product-pricing-${material.id}`}>
                    <div>
                      <span className="block text-[10px] uppercase font-mono text-neutral-400">Approx Rate ({material.unit.split(' ')[0]})</span>
                      <span className="text-lg font-mono font-bold text-amber-400">
                        {material.showPrice ? `₹${material.approxPrice.toLocaleString('en-IN')}` : 'Ask Price'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMaterial(material);
                        setCalcActiveId(calcActiveId === material.id ? null : material.id);
                      }}
                      className="text-xs text-amber-500 hover:text-amber-400 px-3 py-1.5 border border-amber-500/20 hover:border-amber-500/40 rounded-lg cursor-pointer"
                    >
                      Estimate Cost
                    </button>
                  </div>

                  {/* Inline cost calculator snippet */}
                  {calcActiveId === material.id && (
                    <div className="bg-neutral-900 border border-amber-500/20 p-3.5 rounded-xl mb-4 space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-neutral-300">Enter Required Quantity:</label>
                        <span className="text-xs font-mono text-neutral-400">{material.unit.split(' ')[0]}</span>
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={calcQuantity}
                          onChange={(e) => setCalcQuantity(Math.max(1, Number(e.target.value)))}
                          className="bg-neutral-950 border border-neutral-750 px-3 py-1 text-sm rounded-lg text-white font-mono w-24 focus:outline-none focus:border-amber-500"
                        />
                        <div className="flex-1 text-right">
                          <span className="block text-[10px] uppercase font-mono text-neutral-500">Estimated Surcharge Cost</span>
                          <span className="text-base font-bold text-emerald-400 font-mono">
                            ₹{(calcQuantity * material.approxPrice).toLocaleString('en-IN')}*
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEnquire(material.id, calcQuantity, `Hello, I want to buy approximately ${calcQuantity} units of ${material.name}.`)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 rounded-lg transition-transform active:scale-95 cursor-pointer"
                        >
                          Enquire Order Directly
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-3" id={`product-actions-${material.id}`}>
                    <button
                      onClick={() => onOpenEstimator(material.id)}
                      className="bg-neutral-900 hover:bg-neutral-800 text-amber-550 border border-amber-500/20 hover:border-amber-500/40 text-xs font-bold py-3 rounded-lg text-center transition-all cursor-pointer"
                    >
                      📐 Site Estimator
                    </button>
                    <button
                      onClick={() => onEnquire(material.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs py-3 rounded-lg transition-transform active:scale-95 text-center cursor-pointer"
                    >
                      Enquire Price
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Spec Modal Toggle */}
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-scaleUp">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                ✕
              </button>

              <div className="flex space-x-3 items-center">
                <div className="bg-amber-500 text-neutral-950 p-2.5 rounded-lg">
                  {renderIcon(selectedMaterial.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedMaterial.name} Specifications</h3>
                  <span className="text-xs uppercase font-mono text-neutral-400">{selectedMaterial.hindiName}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {selectedMaterial.extendedDescription}
              </p>

              <div>
                <h4 className="text-xs uppercase font-mono text-amber-500 tracking-wider mb-2.5">Lab Sieve & Compressive Specs</h4>
                <div className="bg-neutral-950 rounded-xl border border-neutral-800 divide-y divide-neutral-850">
                  {Object.entries(selectedMaterial.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 text-xs">
                      <span className="text-neutral-400">{key}</span>
                      <span className="font-semibold text-neutral-200 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    onEnquire(selectedMaterial.id);
                    setSelectedMaterial(null);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-655 text-neutral-950 font-bold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Send Verification Enquiry
                </button>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="px-5 py-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-350 rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
