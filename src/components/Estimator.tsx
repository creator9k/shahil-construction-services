/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Material } from '../types';
import { Calculator, HelpCircle, HardHat, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EstimatorProps {
  materials: Material[];
  preselectedMaterialId: string | null;
  onEnquire: (materialId: string, quantity: number, message: string) => void;
}

export default function Estimator({ materials, preselectedMaterialId, onEnquire }: EstimatorProps) {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState<string>('bricks_wall');
  const [length, setLength] = useState<number>(30); // in feet
  const [width, setWidth] = useState<number>(10); // in feet / height in feet
  const [thickness, setThickness] = useState<number>(4); // concrete thickness in inches, or wall thickness (4.5 or 9 inches)

  
  // Results
  const [estimatedQuantity, setEstimatedQuantity] = useState<number>(0);
  const [estimatedDetails, setEstimatedDetails] = useState<string[]>([]);
  const [calcCost, setCalcCost] = useState<number>(0);

  // Synced selection when user clicks from other cards
  useEffect(() => {
    if (preselectedMaterialId) {
      if (preselectedMaterialId === 'bricks') setActiveType('bricks_wall');
      else if (preselectedMaterialId === 'sand') setActiveType('sand_plaster');
      else if (preselectedMaterialId === 'gravel') setActiveType('concrete_slab');
      else if (preselectedMaterialId === 'fencing_poles') setActiveType('fencing_perimeter');
      else if (preselectedMaterialId === 'boundary_walls') setActiveType('boundary_planks');
    }
  }, [preselectedMaterialId]);

  // Recalculate values whenever dimensions change
  useEffect(() => {
    recalculate();
  }, [activeType, length, width, thickness, materials]);

  const recalculate = () => {
    let quantity = 0;
    let cost = 0;
    const details: string[] = [];

    if (activeType === 'bricks_wall') {
      // Brick wall estimation
      // Standard 9 inch wall takes 10 bricks per Square Foot of face area
      // Standard 4.5 inch wall takes 5 bricks per Square Foot
      const area = length * width; // Length * Height
      const factor = thickness === 9 ? 10 : 5;
      quantity = Math.ceil(area * factor);
      
      const bricksPrice = materials.find((m) => m.id === 'bricks')?.approxPrice || 7;
      cost = quantity * bricksPrice;

      details.push(`Estimated wall face area: ${area.toFixed(0)} Sq.Ft.`);
      details.push(`Wall Thickness factor applied: ${thickness}" (${factor} bricks/Sq.Ft.)`);
      details.push(`Estimated total mortar sand required: ~${Math.ceil(area * 0.15)} Cubic Feet (Balu)`);
      details.push(`Estimated cement bags: ~${Math.ceil(area / 30)} Bags (Grade 43/53)`);
    } 
    else if (activeType === 'sand_plaster') {
      // Plastering calculation (length is wall length, width is height in feet)
      // Standard plaster thickness is 0.5 inches (12mm)
      const area = length * width; // Area in Sq.Ft.
      // Plaster volume = Area * (thickness / 12) cubic feet
      const plasterVolume = area * (0.5 / 12);
      // Wet volume to dry volume factor is 1.33. Ratio 1:6 (Cement:Sand)
      // Sand quantity in CFT = Volume * 1.33 * (6/7)
      const sandNeeded = Math.ceil(plasterVolume * 1.33 * (6 / 7));
      quantity = sandNeeded;

      const sandPrice = (materials.find((m) => m.id === 'sand')?.approxPrice || 2800) / 100; // price per CFT
      cost = quantity * sandPrice;

      details.push(`Total wall surface area: ${area.toFixed(0)} Sq.Ft.`);
      details.push(`Plaster depth applied: 0.5 inches (12mm)`);
      details.push(`Estimated raw Sand requirement: ${sandNeeded} CFT (~${(sandNeeded/100).toFixed(2)} Brass)`);
      details.push(`Estimated mortar Cement bags: ~${Math.ceil((plasterVolume * 1.33 * (1 / 7)) / 1.25)} Bags`);
    } 
    else if (activeType === 'concrete_slab') {
      // RCC Slab layout. (Length * Width * thickness in inches)
      const volumeCFT = length * width * (thickness / 12);
      // Dry mix factor 1.54. M20 mix ratio (1:1.5:3) -> Cement:Sand:Aggregate
      // Aggregate needed = Volume * 1.54 * (3 / 5.5) in CFT
      // Sand needed = Volume * 1.54 * (1.5 / 5.5) in CFT
      const aggregateCFT = volumeCFT * 1.54 * (3 / 5.5);
      const sandNeededCFT = volumeCFT * 1.54 * (1.5 / 5.5);
      
      quantity = Math.ceil(aggregateCFT); // Return aggregate in CFT

      const gravelPrice = (materials.find((m) => m.id === 'gravel')?.approxPrice || 3200) / 100; // price per CFT
      cost = quantity * gravelPrice;

      details.push(`Compacted RCC Concrete Volume: ${volumeCFT.toFixed(2)} Cubic Feet`);
      details.push(`Aggregate layout: M20 High Crushing Strength (Ratio 1:1.5:3)`);
      details.push(`Crushed Gravel Aggregates (Gitti): ${quantity} CFT (~${(quantity / 100).toFixed(2)} Brass)`);
      details.push(`Washed Sand component (Balu): ${Math.ceil(sandNeededCFT)} CFT (~${(sandNeededCFT / 100).toFixed(2)} Brass)`);
      details.push(`Concrete Cement required: ~${Math.ceil((volumeCFT * 1.54 * (1 / 5.5)) / 1.25)} Bags`);
    } 
    else if (activeType === 'fencing_perimeter') {
      // Fencing poles required over linear running footage
      // Pole spacing is recommended every 8 feet
      quantity = Math.ceil(length / 8) + 1; // addition of end pole
      const polePrice = materials.find((m) => m.id === 'fencing_poles')?.approxPrice || 220;
      cost = quantity * polePrice;

      details.push(`Total linear fencing path: ${length} Feet`);
      details.push(`Standard pole spacing benchmark: 8 Feet center-to-center spacing`);
      details.push(`Required corner anchor poles included`);
      details.push(`Barbed wire required (for 4 layered loop): ~${length * 4} running feet`);
    } 
    else if (activeType === 'boundary_planks') {
      // Boundary precast wall (Slabs/Panels). Slabs are calculated based on Square Feet of face area.
      // Standard slabs pricing is based on Total sqft of installation
      const faceArea = length * width; // linear length * height of wall
      quantity = faceArea;

      const slabPrice = materials.find((m) => m.id === 'boundary_walls')?.approxPrice || 95;
      cost = quantity * slabPrice;

      const columnCount = Math.ceil(length / 7) + 1; // pillar every 7 feet
      details.push(`Target Compound wall facade size: ${length}ft Width x ${width}ft Height`);
      details.push(`Total paneling face size: ${faceArea} Sq.Ft.`);
      details.push(`Required RCC support pillar columns: ${columnCount} pillars (buried 2-3 ft)`);
      details.push(`Planks needed (3 plank heights per column segment): ~${columnCount * 3} panels`);
    }

    setEstimatedQuantity(quantity);
    setEstimatedDetails(details);
    setCalcCost(Math.round(cost));
  };

  const currentProduct = () => {
    if (activeType === 'bricks_wall') return materials.find(m => m.id === 'bricks');
    if (activeType === 'sand_plaster') return materials.find(m => m.id === 'sand');
    if (activeType === 'concrete_slab') return materials.find(m => m.id === 'gravel');
    if (activeType === 'fencing_perimeter') return materials.find(m => m.id === 'fencing_poles');
    if (activeType === 'boundary_planks') return materials.find(m => m.id === 'boundary_walls');
    return null;
  };

  const getQueryKeyInfo = () => {
    switch (activeType) {
      case 'bricks_wall':
        return { quantityUnit: 'Bricks', label: 'Wall Length (Ft)', widthLabel: 'Wall Height (Ft)' };
      case 'sand_plaster':
        return { quantityUnit: 'CFT (Cubic Feet)', label: 'Plaster Width (Ft)', widthLabel: 'Plaster Height (Ft)' };
      case 'concrete_slab':
        return { quantityUnit: 'CFT (Aggregate)', label: 'Slab Length (Ft)', widthLabel: 'Slab Width (Ft)' };
      case 'fencing_perimeter':
        return { quantityUnit: 'Poles', label: 'Perimeter Length (Ft)', widthLabel: '' };
      case 'boundary_planks':
        return { quantityUnit: 'SqFt Planks', label: 'Boundary Length (Ft)', widthLabel: 'Boundary Height (Ft)' };
      default:
        return { quantityUnit: 'Units', label: 'Length', widthLabel: 'Width' };
    }
  };

  const handleEnquirySubmit = () => {
    const prod = currentProduct();
    if (!prod) return;

    const messageText = `Site Estimation calculated. Structure Type: ${activeType.replace('_', ' ')}. Dimensions: Length ${length}ft, Width/Height ${width}ft. Estimated requirement: ${estimatedQuantity} ${getQueryKeyInfo().quantityUnit}. Details: ${estimatedDetails.join('; ')}`;
    onEnquire(prod.id, estimatedQuantity, messageText);
  };

  return (
    <section className="bg-neutral-950 py-16 text-white border-t border-neutral-850" id="estimator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12" id="estimator-header">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('est.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter mb-3 text-white">
            {t('est.title')}
          </h2>
          <p className="text-sm text-neutral-400">
            {t('est.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="estimator-main-grid">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-6 bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 p-6 sm:p-8 rounded-lg space-y-6" id="calculator-inputs-panel">
            <h3 className="text-base font-display font-black uppercase tracking-tight text-white flex items-center space-x-2">
              <HardHat className="w-5 h-5 text-amber-500" />
              <span>{t('est.step1')}</span>
            </h3>

            {/* Structure Type Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="calculator-material-types">
              <button
                type="button"
                onClick={() => setActiveType('bricks_wall')}
                className={`p-3 rounded-xl text-xs font-bold text-center border-b-2 transition-all duration-200 cursor-pointer ${
                  activeType === 'bricks_wall'
                    ? 'bg-amber-500 text-neutral-950 border-amber-700 shadow-md'
                    : 'bg-neutral-850 text-neutral-350 hover:bg-neutral-800 border-neutral-750'
                }`}
              >
                🧱 Red Brick Wall
              </button>
              <button
                type="button"
                onClick={() => setActiveType('sand_plaster')}
                className={`p-3 rounded-xl text-xs font-bold text-center border-b-2 transition-all duration-200 cursor-pointer ${
                  activeType === 'sand_plaster'
                    ? 'bg-amber-500 text-neutral-950 border-amber-700 shadow-md'
                    : 'bg-neutral-850 text-neutral-350 hover:bg-neutral-800 border-neutral-750'
                }`}
              >
                🏺 Wall Plaster Sand
              </button>
              <button
                type="button"
                onClick={() => setActiveType('concrete_slab')}
                className={`p-3 rounded-xl text-xs font-bold text-center border-b-2 transition-all duration-200 cursor-pointer ${
                  activeType === 'concrete_slab'
                    ? 'bg-amber-500 text-neutral-950 border-amber-700 shadow-md'
                    : 'bg-neutral-850 text-neutral-350 hover:bg-neutral-800 border-neutral-750'
                }`}
              >
                🔘 Concrete Slab Gitti
              </button>
              <button
                type="button"
                onClick={() => setActiveType('fencing_perimeter')}
                className={`p-3 rounded-xl text-xs font-bold text-center border-b-2 transition-all duration-200 cursor-pointer ${
                  activeType === 'fencing_perimeter'
                    ? 'bg-amber-500 text-neutral-950 border-amber-700 shadow-md'
                    : 'bg-neutral-850 text-neutral-350 hover:bg-neutral-800 border-neutral-750'
                }`}
              >
                🌲 Fencing Poles
              </button>
              <button
                type="button"
                onClick={() => setActiveType('boundary_planks')}
                className={`p-3 rounded-xl text-xs font-bold text-center border-b-2 transition-all duration-200 cursor-pointer ${
                  activeType === 'boundary_planks'
                    ? 'bg-amber-500 text-neutral-950 border-amber-700 shadow-md'
                    : 'bg-neutral-850 text-neutral-350 hover:bg-neutral-800 border-neutral-750'
                }`}
              >
                🛡 Boundary Cement Walls
              </button>
            </div>

            <div className="border-t border-neutral-800 pt-5 space-y-4" id="calculator-numeric-controls">
              <h3 className="text-sm font-bold tracking-wider text-amber-500 uppercase font-mono">
                Step 2: Provide Dimensions (ft/inches)
              </h3>

              {/* Length Entry */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-neutral-300">{getQueryKeyInfo().label}</span>
                  <span className="font-mono text-neutral-400">{length} Ft</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer opacity-90 hover:opacity-100"
                />
              </div>

              {/* Width or Height Entry (If applicable for selected type) */}
              {getQueryKeyInfo().widthLabel && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-neutral-300">{getQueryKeyInfo().widthLabel}</span>
                    <span className="font-mono text-neutral-400">{width} Ft</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer opacity-90 hover:opacity-100"
                  />
                </div>
              )}

              {/* Special toggles (e.g. wall thickness / slab thickness) */}
              {activeType === 'bricks_wall' && (
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <span className="block text-xs font-bold text-neutral-400">Wall Horizontal Thickness:</span>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="wallThickness"
                        checked={thickness === 4.5}
                        onChange={() => setThickness(4.5)}
                        className="accent-amber-500"
                      />
                      <span>Single Brick Partition (4.5 inch)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="radio"
                        name="wallThickness"
                        checked={thickness === 9}
                        onChange={() => setThickness(9)}
                        className="accent-amber-500"
                      />
                      <span>Double Load Bearing Wall (9 inch)</span>
                    </label>
                  </div>
                </div>
              )}

              {activeType === 'concrete_slab' && (
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex justify-between text-xs text-neutral-300">
                    <span className="font-bold">Concrete Slab Depth:</span>
                    <span className="font-mono text-amber-500">{thickness} Inches</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="1"
                    value={thickness}
                    onChange={(e) => setThickness(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="block text-[10px] text-neutral-500 italic">Common foundation depth: 4" (garage/shed), 6"-8" (heavy beams / residential slab)</span>
                </div>
              )}
            </div>
          </div>

          {/* Results Output Canvas */}
          <div className="lg:col-span-6 bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 rounded-lg overflow-hidden shadow-2xl flex flex-col justify-between" id="calculator-results-canvas">
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider text-amber-500">Calculated Quantities</span>
                  <h3 className="text-xl font-bold flex items-center space-x-2">
                    <span>Estimates breakdown</span>
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={recalculate}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-80"
                  title="Recalculate Values"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Main Quantity Banner */}
              <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-805 text-center space-y-1">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-450">Estimated Primary Supply</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-mono tracking-tight">
                  {estimatedQuantity.toLocaleString('en-IN')} <span className="text-lg text-neutral-400 font-sans font-normal">{getQueryKeyInfo().quantityUnit}</span>
                </div>
                <div className="text-xs text-neutral-405 font-light">
                  Approx. material base price: <span className="text-emerald-400 font-mono font-semibold">₹{calcCost.toLocaleString('en-IN')}*</span>
                </div>
              </div>

              {/* Secondary/Details list */}
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400">Civil Structural Details:</span>
                <div className="space-y-2" id="results-details-rows">
                  {estimatedDetails.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs bg-neutral-950/40 p-2.5 rounded-lg border border-neutral-850">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-300 font-light">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical disclaimer */}
              <p className="text-[10px] text-neutral-500 leading-normal italic">
                *Prices indicated are indicative of current Ambikapur base rates. Sourcing royalties, local transport logistics, unloading labor, and matching 53-grade cement bags are cataloged separately depending on site constraints.
              </p>
            </div>

            {/* Actions Bar */}
            <div className="bg-neutral-950 p-5 sm:px-8 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleEnquirySubmit}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 text-center flex items-center justify-center space-x-2 text-sm cursor-pointer"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>Enquire Estimated Quote</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="bg-neutral-900 border border-neutral-805 hover:bg-neutral-850 hover:border-amber-500/30 text-neutral-350 hover:text-white px-5 py-3 rounded-xl text-xs font-mono tracking-tight cursor-pointer"
              >
                🖨 Print Estimate
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
