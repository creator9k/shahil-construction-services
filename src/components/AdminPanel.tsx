/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Material, Enquiry } from '../types';
import { HardHat, Save, Plus, Trash2, CheckCircle2, ListFilter, Download, ChevronRight, X } from 'lucide-react';

interface AdminPanelProps {
  materials: Material[];
  enquiries: Enquiry[];
  onUpdateMaterialPrice: (id: string, newPrice: number) => void;
  onAddCustomMaterial: (material: Material) => void;
  onChangeEnquiryStatus: (id: string, state: 'new' | 'contacted' | 'resolved') => void;
  onClose: () => void;
}

export default function AdminPanel({
  materials,
  enquiries,
  onUpdateMaterialPrice,
  onAddCustomMaterial,
  onChangeEnquiryStatus,
  onClose
}: AdminPanelProps) {
  // New Material Form State
  const [newMatName, setNewMatName] = useState('');
  const [newMatHindiName, setNewMatHindiName] = useState('');
  const [newMatCategory, setNewMatCategory] = useState<'aggregate' | 'concrete' | 'masonry' | 'structural'>('aggregate');
  const [newMatDesc, setNewMatDesc] = useState('');
  const [newMatPrice, setNewMatPrice] = useState<number>(100);
  const [newMatUnit, setNewMatUnit] = useState('Per Piece');

  // Active pricing values inputs mapping
  const [pricesInput, setPricesInput] = useState<Record<string, number>>(
    materials.reduce((acc, m) => ({ ...acc, [m.id]: m.approxPrice }), {})
  );

  const handlePriceChange = (id: string, val: string) => {
    const num = Number(val);
    setPricesInput((prev) => ({ ...prev, [id]: num }));
  };

  const handlePriceSave = (id: string) => {
    const amt = pricesInput[id];
    if (isNaN(amt) || amt <= 0) return;
    onUpdateMaterialPrice(id, amt);
    alert(`Price updated successfully for ${materials.find((m) => m.id === id)?.name}!`);
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName.trim() || !newMatDesc.trim() || newMatPrice <= 0) return;

    const newMat: Material = {
      id: `custom-${Date.now()}`,
      name: newMatName,
      hindiName: newMatHindiName || newMatName,
      category: newMatCategory,
      description: newMatDesc,
      extendedDescription: `${newMatDesc} Locally fabricated and processed custom items matching state engineering criteria.`,
      approxPrice: newMatPrice,
      showPrice: true,
      unit: newMatUnit,
      features: ['Factory processed', 'Heavy load resistance', 'Direct depot delivery'],
      specifications: {
        'Origin': 'Surguja Depot Batch',
        'State Quality Standard': 'Approved'
      },
      imageHue: 'from-neutral-100 to-neutral-200 text-neutral-800 border-neutral-350',
      iconName: 'Hammer'
    };

    onAddCustomMaterial(newMat);
    
    // Reset pricing inputs mapping state
    setPricesInput((prev) => ({ ...prev, [newMat.id]: newMat.approxPrice }));

    // Reset fields
    setNewMatName('');
    setNewMatHindiName('');
    setNewMatDesc('');
    setNewMatPrice(100);
    setNewMatUnit('Per Piece');

    alert(`New material catalog item "${newMat.name}" successfully registered!`);
  };

  const downloadLeadsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(enquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `shahil_enquiries_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden my-8" id="admin-panel-shell">
        
        {/* Top Header bar */}
        <div className="bg-neutral-950 px-6 py-4.5 border-b border-neutral-800 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-white">
            <div className="bg-amber-500 text-neutral-950 p-2.5 rounded-xl">
              <HardHat className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Shahil Proprietor Control Portal</h2>
              <p className="text-[10px] font-mono uppercase text-amber-500 tracking-wider">Superuser Secure Workspace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-850 text-neutral-450 hover:text-white transition-colors cursor-pointer"
            title="Exit Workspace"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800 text-white max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Manage catalogue prices + add and create materials */}
          <div className="lg:col-span-6 p-6 space-y-8 overflow-y-auto max-h-[80vh]">
            
            {/* Realtime Pricing Editor */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500 font-mono flex items-center">
                <ChevronRight className="w-4 h-4 mr-1 text-amber-500" />
                <span>Active Price Manager (INR)</span>
              </h3>
              
              <div className="space-y-3">
                {materials.map((m) => (
                  <div key={m.id} className="bg-neutral-950 p-3 rounded-xl border border-neutral-850 flex items-center justify-between text-xs gap-3">
                    <div className="flex-1">
                      <span className="font-semibold block text-neutral-200">{m.name}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{m.unit}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
                        <input
                          type="number"
                          value={pricesInput[m.id] !== undefined ? pricesInput[m.id] : m.approxPrice}
                          onChange={(e) => handlePriceChange(m.id, e.target.value)}
                          className="w-24 bg-neutral-900 border border-neutral-850 pl-6 pr-2 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-amber-505"
                        />
                      </div>
                      <button
                        onClick={() => handlePriceSave(m.id)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-amber-550 p-2 rounded-lg cursor-pointer"
                        title="Save Price"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Create New Material Form */}
            <div className="bg-neutral-950/50 p-5 rounded-2xl border border-neutral-805 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500 font-mono flex items-center">
                <Plus className="w-4.5 h-4.5 mr-1" />
                <span>Register Surcharges / Custom Product</span>
              </h3>

              <form onSubmit={handleCreateMaterial} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 mb-1">Product Name (English)</label>
                    <input
                      type="text"
                      required
                      value={newMatName}
                      onChange={(e) => setNewMatName(e.target.value)}
                      placeholder="e.g. Fine Silt Plaster"
                      className="w-full bg-neutral-90 px-3 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 mb-1">Product Name (Hindi)</label>
                    <input
                      type="text"
                      value={newMatHindiName}
                      onChange={(e) => setNewMatHindiName(e.target.value)}
                      placeholder="e.g. प्लास्टर रेत"
                      className="w-full bg-neutral-90 px-3 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 mb-1">Base Price (INR)</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newMatPrice}
                      onChange={(e) => setNewMatPrice(Number(e.target.value))}
                      className="w-full bg-neutral-90 px-3 py-2 rounded-lg border border-neutral-800 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 mb-1">Selling Unit (e.g. Ton, CFT)</label>
                    <input
                      type="text"
                      required
                      value={newMatUnit}
                      onChange={(e) => setNewMatUnit(e.target.value)}
                      placeholder="e.g. Per Cubic Foot"
                      className="w-full bg-neutral-90 px-3 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 mb-1">Description</label>
                    <textarea
                      required
                      value={newMatDesc}
                      onChange={(e) => setNewMatDesc(e.target.value)}
                      rows={2}
                      placeholder="Short industrial highlights..."
                      className="w-full bg-neutral-90 px-3 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-2.5 rounded-lg active:scale-98 transition-all cursor-pointer text-center"
                >
                  Confirm Material Addition
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Customer Enquiries Log */}
          <div className="lg:col-span-6 p-6 space-y-6 overflow-y-auto max-h-[80vh]">
            
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500 font-mono">
                  Submitted Customer Leads ({enquiries.length})
                </h3>
                <span className="text-[10px] text-neutral-400">Vetted and saved in browser cache</span>
              </div>
              <button
                onClick={downloadLeadsJSON}
                disabled={enquiries.length === 0}
                className="bg-neutral-800 hover:bg-neutral-750 disabled:bg-neutral-850 disabled:text-neutral-600 text-xs px-3 py-2 border border-neutral-750 hover:border-amber-500/30 rounded-lg flex items-center space-x-1.5 transition-all text-neutral-300 font-mono cursor-pointer"
                title="Export list to JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads</span>
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-neutral-950 p-8 rounded-2xl text-center border border-neutral-850 text-neutral-500 text-xs space-y-1">
                <ListFilter className="w-8 h-8 text-neutral-650 mx-auto mb-2" />
                <p>No active enquiries logged in cache yet.</p>
                <p>Submit items on the "Contact Us" or calculator page to register records!</p>
              </div>
            ) : (
              <div className="space-y-4" id="admin-enquiries-list">
                {enquiries.map((enq) => {
                  const correlatedMat = materials.find((m) => m.id === enq.materialId)?.name || 'Custom item';
                  return (
                    <div
                      key={enq.id}
                      className={`bg-neutral-950 p-4.5 rounded-2xl border transition-all ${
                        enq.status === 'new' ? 'border-amber-500/25 bg-amber-500/[0.01]' : 'border-neutral-850'
                      }`}
                      id={`admin-enquiry-row-${enq.id}`}
                    >
                      <div className="flex justify-between items-start mb-2.5">
                        <div>
                          <span className="text-sm font-bold block text-white">{enq.name}</span>
                          <span className="text-[10px] text-neutral-400 font-mono flex items-center tracking-tight mt-0.5">
                            📞 {enq.phone} {enq.email ? `● ✉ ${enq.email}` : ''}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono block">
                          {enq.timestamp.split(',')[0]}
                        </span>
                      </div>

                      <div className="bg-neutral-900 border border-neutral-850 p-3 rounded-lg text-xs space-y-1.5 mb-3.5 text-neutral-300 font-light">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Material Selection:</span>
                          <span className="font-semibold text-neutral-200">{correlatedMat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Target Amount:</span>
                          <span className="font-mono text-amber-400 font-bold">{enq.quantity} {enq.quantityUnit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Site Location:</span>
                          <span className="font-semibold text-neutral-205">{enq.location}</span>
                        </div>
                        {enq.message && (
                          <div className="mt-1 pb-0.5 border-t border-neutral-800/40 text-neutral-400 pt-1 text-[11px] italic">
                            Message: "{enq.message}"
                          </div>
                        )}
                      </div>

                      {/* Status toggle action */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-neutral-450 uppercase">
                          Lead Tracking Status:
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => onChangeEnquiryStatus(enq.id, 'new')}
                            className={`text-[10px] px-2.2 py-1 rounded cursor-pointer transition-all ${
                              enq.status === 'new'
                                ? 'bg-amber-500 text-neutral-950 font-semibold'
                                : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                            }`}
                          >
                            New
                          </button>
                          <button
                            onClick={() => onChangeEnquiryStatus(enq.id, 'contacted')}
                            className={`text-[10px] px-2.2 py-1 rounded cursor-pointer transition-all ${
                              enq.status === 'contacted'
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                            }`}
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => onChangeEnquiryStatus(enq.id, 'resolved')}
                            className={`text-[10px] px-2.2 py-1 rounded cursor-pointer transition-all ${
                              enq.status === 'resolved'
                                ? 'bg-emerald-600 text-white font-semibold'
                                : 'bg-neutral-900 text-neutral-400 border border-neutral-805'
                            }`}
                          >
                            Resolved
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
