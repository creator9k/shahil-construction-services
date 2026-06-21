/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Image as ImageIcon, Eye, MapPin, Tag, Calendar, X, HardHat, ZoomIn, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GalleryItem {
  id: string;
  title: string;
  category: 'materials' | 'boundary-walls' | 'sites';
  location: string;
  date: string;
  description: string;
  imageUrl: string;
  specs: string[];
}

export default function Gallery() {
  const { t, language } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');


  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Silt-Washed River Sand Stockpile",
      category: "materials",
      location: "Central Depot Bypass, Ambikapur",
      date: "June 2026",
      description: "A fresh batch of premium double-screened river sand (Balu) arriving at our main Ambikapur stockyard. Filtered meticulously to maintain silt under 3% for optimal cement-to-sand bonding.",
      imageUrl: "/images/products/sand.png",
      specs: ["Purity: 97.4%", "Moisture: < 4%", "Silt Content: 2.1% max", "Application: Main structural plaster"]
    },
    {
      id: "gal-2",
      title: "Precast Concrete Boundary Wall Setup",
      category: "boundary-walls",
      location: "Kedarpur Residential Colony, Ambikapur",
      date: "May 2026",
      description: "Quick-assembly modular boundary wall installed on a 150-meter perimeter. Using high-strength concrete pillars and interlocking slabs for robust local property protection.",
      imageUrl: "/images/products/precast_boundarywall.png",
      specs: ["Wall Height: 6 Feet", "Pillar depth: 3.5 Feet", "Concrete Grade: M25", "Labour Duration: 2.5 Days"]
    },
    {
      id: "gal-3",
      title: "Dense Chimney-Fired Red Bricks Loading",
      category: "materials",
      location: "Ramanujganj Depot Hub, C.G.",
      date: "June 2026",
      description: "Hydraulic trolley dumper dispatching 5,000 premium red clay bricks (Eeta). Manufactured with localized Surguja high-density clay, baked under controlled thermal draughts.",
      imageUrl: "/images/products/bricks.png",
      specs: ["Crushing Strength: 105 kg/cm²", "Size: 9x4x3 inches", "Water Absorption: < 15%", "Trips: Double axle hydro dumper"]
    },
    {
      id: "gal-4",
      title: "Granite Gravel Crushed Gitti Pile",
      category: "materials",
      location: "Central Depot, Ambikapur",
      date: "April 2026",
      description: "High-density black granite gitti gravel (20mm aggregate) stored in organized stock bunkers. Ideal for extreme concrete load applications like casting columns, slabs, and beam footings.",
      imageUrl: "/images/products/gravel.png",
      specs: ["Size fraction: 10mm to 20mm", "Shape factor: Angular", "Flakiness index: < 12%", "Crush value: 16%"]
    },
    {
      id: "gal-5",
      title: "Commercial Foundation Casting Site",
      category: "sites",
      location: "Ring Road Sector-2, Ambikapur",
      date: "May 2026",
      description: "Successful delivery and layout of 15 brass aggregate and dual-purified sand for a large-scale commercial foundation. Supervised on-site by the Shahil logistics managers.",
      imageUrl: "/images/gallery/commercial-foundation-casting-site.png",
      specs: ["Delivery Schedule: Staggered", "Fleet: 3 Dumpers", "Tonnage: 45 Tons", "Material Match: Sand + 20mm Gitti"]
    },
    {
      id: "gal-6",
      title: "Agricultural Fence Pole Boundary Wall",
      category: "boundary-walls",
      location: "Lakhanpur Farmland Borders, Surguja",
      date: "March 2026",
      description: "Reinforced cement concrete fencing poles embedded with dual high-tensile wire slots. Designed to withstand livestock stampedes and wet monsoon land erosion.",
      imageUrl: "/images/products/fencing_pole.png",
      specs: ["Pole height: 7 feet", "Reinforcement: 4 steel rebars", "Embedding depth: 2 feet", "Spacing: 8 feet intervals"]
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="bg-neutral-950 py-16 text-white min-h-screen" id="gallery-hub">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4" id="gallery-header">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{t('gal.tag')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white">
            {t('gal.title')}
          </h2>
          
          <p className="text-neutral-400 font-light text-sm">
            {t('gal.desc')}
          </p>
        </div>

        {/* Filter Categories tab bar */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-neutral-900 pb-6" id="gallery-category-bar">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी मीडिया' : 'All Media' },
            { id: 'materials', label: language === 'hi' ? 'कच्चा माल भंडार' : 'Raw Stockpiles' },
            { id: 'boundary-walls', label: language === 'hi' ? 'कंक्रीट बाउंड्री' : 'Concrete Boundaries' },
            { id: 'sites', label: language === 'hi' ? 'सक्रिय वितरण स्थल' : 'Active Unloading Sites' }
          ].map(category => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 text-xs font-mono border rounded transition-all cursor-pointer ${
                activeFilter === category.id
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 tracking-wider'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-photo-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 rounded-lg overflow-hidden group shadow-xl flex flex-col justify-between"
              id={`gallery-card-${item.id}`}
            >
              {/* Photo Area */}
              <div className="relative aspect-video overflow-hidden bg-neutral-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-3 bg-amber-500 text-neutral-950 rounded-full cursor-pointer hover:bg-amber-400 font-bold shadow-lg"
                    title="View technical details"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                {/* Overlaid location strip */}
                <div className="absolute bottom-2 left-2 bg-neutral-900/90 text-[10px] text-neutral-300 px-2 py-0.5 rounded font-mono border border-neutral-800/80 flex items-center">
                  <MapPin className="w-3 h-3 text-amber-500 mr-1" />
                  {item.location.split(',')[0]}
                </div>
              </div>

              {/* Text Description Box */}
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
                  <span className="text-amber-500 uppercase">{item.category.replace('-', ' ')}</span>
                  <span className="text-neutral-450">{item.date}</span>
                </div>

                <h3 className="font-display font-black text-white text-base tracking-wide uppercase leading-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-400 font-light line-clamp-2">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-neutral-800/60 flex justify-between items-center mt-3">
                  <span className="text-[10px] text-neutral-450 font-mono">Stock code: {item.id}</span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-amber-500 hover:text-white transition-colors text-xs font-bold inline-flex items-center cursor-pointer font-mono"
                  >
                    Inspect Specs
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Detail Lightbox Modal */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm transition-all"
            id="gallery-technical-modal"
          >
            <div className="bg-[#1f2937] border-t-8 border-t-amber-500 border-x border-b border-neutral-800 max-w-3xl w-full rounded-lg overflow-hidden relative shadow-2xl animate-scaleIn">
              
              {/* Close Button top right */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-neutral-900 hover:bg-neutral-800 hover:text-amber-500 p-2 rounded text-neutral-400 border border-neutral-800 cursor-pointer z-10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Media left side */}
                <div className="bg-neutral-900 relative aspect-square md:aspect-auto md:h-full">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-neutral-950 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                    {selectedItem.category.toUpperCase().replace('-', ' ')}
                  </div>
                </div>

                {/* Specs right side */}
                <div className="p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4 text-left">
                    <span className="text-[10px] font-mono uppercase text-amber-500 tracking-widest">{selectedItem.id} Portfolio Spec</span>
                    
                    <h3 className="font-display font-black text-white text-xl sm:text-2xl uppercase leading-tight tracking-tight">
                      {selectedItem.title}
                    </h3>

                    <p className="text-xs text-neutral-350 leading-relaxed font-light">
                      {selectedItem.description}
                    </p>

                    {/* Specifications List */}
                    <div className="space-y-2 border-t border-b border-neutral-800 py-4 mt-2">
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400">LABORATORY SPECIFICATION METRICS:</span>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        {selectedItem.specs.map((spec, i) => (
                          <div key={i} className="flex items-center space-x-2 text-neutral-300">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            <span className="font-mono">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal bottom row info and buttons */}
                  <div className="space-y-3 pt-4 text-xs">
                    <div className="flex items-center space-x-1.5 text-neutral-400 font-mono text-[10px]">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>{selectedItem.location}</span>
                    </div>

                    <a
                      href={`https://api.whatsapp.com/send?phone=916263063245&text=Hello%20Shahil%2C%20I%20saw%20${encodeURIComponent(selectedItem.title)}%20(Code%3A%20${selectedItem.id})%20in%20your%20site%20gallery.%20Please%20quote%20delivery%20pricing%20for%20this%20specification.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-2.5 rounded text-center block transition-all tracking-wide font-mono text-xs cursor-pointer"
                    >
                      Inquire on WhatsApp about: {selectedItem.id}
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
