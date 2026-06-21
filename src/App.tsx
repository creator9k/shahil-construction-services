/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Material, Enquiry } from './types';
import { INITIAL_MATERIALS } from './data/materials';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue';
import Estimator from './components/Estimator';
import AIConsultant from './components/AIConsultant';
import ContactForm from './components/ContactForm';
import AboutUs from './components/AboutUs';
import FAQs from './components/FAQs';
import Gallery from './components/Gallery';
import DeliveryTracker from './components/DeliveryTracker';
import CustomerReviews from './components/CustomerReviews';
import AdminPanel from './components/AdminPanel';
import FloatingActions from './components/FloatingActions';
import { HardHat, MapPin, Phone, MessageSquare, ClipboardList, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  
  // Crossed states for estimator
  const [selectedEstimatorMaterialId, setSelectedEstimatorMaterialId] = useState<string | null>(null);
  const [selectedEstimatorQuantity, setSelectedEstimatorQuantity] = useState<number | null>(null);

  // Initialize and load custom materials and logged enquiries from browser cache
  useEffect(() => {
    try {
      const storedMaterials = localStorage.getItem('shahil_materials_catalog');
      if (storedMaterials) {
        setMaterials(JSON.parse(storedMaterials));
      } else {
        localStorage.setItem('shahil_materials_catalog', JSON.stringify(INITIAL_MATERIALS));
      }

      const storedEnquiries = localStorage.getItem('shahil_customer_leads');
      if (storedEnquiries) {
        setEnquiries(JSON.parse(storedEnquiries));
      }
    } catch (e) {
      console.error('Failed to load local store values:', e);
    }
  }, []);

  // Update prices handler
  const handleUpdateMaterialPrice = (id: string, newPrice: number) => {
    const updated = materials.map((m) => {
      if (m.id === id) {
        return { ...m, approxPrice: newPrice };
      }
      return m;
    });
    setMaterials(updated);
    localStorage.setItem('shahil_materials_catalog', JSON.stringify(updated));
  };

  // Create custom material handler
  const handleAddCustomMaterial = (newItem: Material) => {
    const updated = [...materials, newItem];
    setMaterials(updated);
    localStorage.setItem('shahil_materials_catalog', JSON.stringify(updated));
  };

  // Change lead resolution status handler
  const handleChangeEnquiryStatus = (id: string, status: 'new' | 'contacted' | 'resolved') => {
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        return { ...enq, status };
      }
      return enq;
    });
    setEnquiries(updated);
    localStorage.setItem('shahil_customer_leads', JSON.stringify(updated));
  };

  // Handle successful customer submissions from form or estimator
  const handleSuccessEnquiry = (newEnq: Enquiry) => {
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    localStorage.setItem('shahil_customer_leads', JSON.stringify(updated));
  };

  // Dynamic deep-linking action coordinators
  const handleOpenEstimatorFromCard = (materialId: string) => {
    setSelectedEstimatorMaterialId(materialId);
    setSelectedEstimatorQuantity(null); // Reset
    setActiveTab('estimator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireFromCard = (materialId: string, qty?: number, customMsg?: string) => {
    setSelectedEstimatorMaterialId(materialId);
    if (qty) {
      setSelectedEstimatorQuantity(qty);
    }
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 selection:bg-amber-500 selection:text-neutral-950 flex flex-col justify-between" id="applet-main-body">
      
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Content Body router */}
      <main className="flex-grow">
        
        {/* Render Home Page (Merged multi-section layout for rich interactive experience) */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Immersive Hero Header */}
            <Hero
              onBrowseCatalogue={() => setActiveTab('catalogue')}
              onGetQuote={() => setActiveTab('contact')}
              onOpenEstimator={() => setActiveTab('estimator')}
            />

            {/* Quick materials preview highlight banner */}
            <div className="bg-neutral-900 border-t border-b border-neutral-805 py-8" id="quick-materials-preview">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 font-semibold block">Serving Ambikapur & Surrounding Villages</span>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-neutral-350">
                  <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-amber-500 mr-2" /> Sand (बालू)</span>
                  <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-amber-500 mr-2" /> Bricks (ईटा)</span>
                  <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-amber-500 mr-2" /> Gravel (गिट्टी)</span>
                  <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-amber-500 mr-2" /> Cement Poling</span>
                  <span className="flex items-center space-x-1"><CheckCircle className="w-4 h-4 text-amber-500 mr-2" /> Precast Boundary</span>
                </div>
              </div>
            </div>

            {/* Embed the Catalogue previews */}
            <Catalogue
              materials={materials.slice(0, 3)}
              onEnquire={handleEnquireFromCard}
              onOpenEstimator={handleOpenEstimatorFromCard}
            />

            {/* Verified Customer Testimonials */}
            <CustomerReviews />

            {/* Call to action trust section */}
            <div className="bg-neutral-950 py-16 px-4 text-center border-t border-neutral-850" id="trust-calltoaction">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-amber-500 text-neutral-950 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                  <HardHat className="w-8 h-8" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tighter">
                  NEED A CUSTOMIZED INVOICE WITH HEAVY VOLUME DISCOUNT?
                </h2>
                <p className="text-neutral-400 font-light text-sm max-w-2xl mx-auto leading-relaxed">
                  Our founder Shahil is available for site consultation around Surguja Division. We arrange personal visits for commercial, housing complexes, and boundary wall setup planning.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <a
                    href="tel:6263063245"
                    className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-6 py-3 rounded-xl shadow-lg border-b-2 border-amber-700 text-sm font-mono tracking-wide"
                  >
                    📞 Call +91 62630 63245
                  </a>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="bg-neutral-900 border border-neutral-750 hover:bg-neutral-850 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  >
                    Get On-site Estimation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Catalogue Tab View */}
        {activeTab === 'catalogue' && (
          <div className="animate-fadeIn">
            <Catalogue
              materials={materials}
              onEnquire={handleEnquireFromCard}
              onOpenEstimator={handleOpenEstimatorFromCard}
            />
          </div>
        )}

        {/* Interactive Math Estimators Tab View */}
        {activeTab === 'estimator' && (
          <div className="animate-fadeIn">
            <Estimator
              materials={materials}
              preselectedMaterialId={selectedEstimatorMaterialId}
              onEnquire={handleEnquireFromCard}
            />
          </div>
        )}

        {/* AI Materials Assistant Tab View */}
        {activeTab === 'assistant' && (
          <div className="animate-fadeIn">
            <AIConsultant />
          </div>
        )}

        {/* Narrative Biography Tab View */}
        {activeTab === 'about' && (
          <div className="animate-fadeIn">
            <AboutUs />
          </div>
        )}

        {/* FAQs Hub View */}
        {activeTab === 'faqs' && (
          <div className="animate-fadeIn">
            <FAQs />
          </div>
        )}

        {/* Gallery Hub View */}
        {activeTab === 'gallery' && (
          <div className="animate-fadeIn">
            <Gallery />
          </div>
        )}

        {/* Dispatch & Delivery Tracker View */}
        {activeTab === 'tracker' && (
          <div className="animate-fadeIn">
            <DeliveryTracker />
          </div>
        )}

        {/* Enquiry Form and Contacts Tab View */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <ContactForm
              materials={materials}
              selectedMaterialIdFromEstimator={selectedEstimatorMaterialId}
              selectedQuantityFromEstimator={selectedEstimatorQuantity}
              onSuccessEnquiry={handleSuccessEnquiry}
            />
          </div>
        )}

      </main>

      {/* Floating Action CTA Dock */}
      <FloatingActions
        onOpenEstimator={() => {
          setSelectedEstimatorMaterialId(null);
          setSelectedEstimatorQuantity(null);
          setActiveTab('estimator');
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
        onOpenQuotationAction={() => {
          setActiveTab('contact');
          window.scrollTo({ top: 200, behavior: 'smooth' });
        }}
      />

      {/* Corporate Admin panel overlay modal */}
      {isAdminOpen && (
        <AdminPanel
          materials={materials}
          enquiries={enquiries}
          onUpdateMaterialPrice={handleUpdateMaterialPrice}
          onAddCustomMaterial={handleAddCustomMaterial}
          onChangeEnquiryStatus={handleChangeEnquiryStatus}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Corporate Footer lock */}
      <footer className="bg-neutral-950 border-t border-neutral-850 text-white py-12" id="website-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-neutral-900" id="footer-inner-grid">
            
            {/* Legal corporate copy */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="bg-amber-500 text-neutral-950 p-2 rounded">
                  <HardHat className="w-5 h-5 flex-shrink-0" />
                </div>
                <span className="font-display font-black text-base tracking-wider text-white">SHAHIL CONSTRUCTION</span>
              </div>
              <p className="text-xs text-neutral-450 leading-relaxed font-light">
                Ambikapur's digital materials gateway supply. Sourcing pure river sand, red bricks, stone gitti aggregate, precast fencing poles, and premium compounds directly to worksites under Surguja Division Chhattisgarh.
              </p>
            </div>

            {/* Quick Sitemaps links */}
            <div className="space-y-3">
              <span className="block text-xs uppercase font-display font-black tracking-widest text-amber-500">USEFUL LINKS</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
                <button onClick={() => setActiveTab('home')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">🏠 Home Desk</button>
                <button onClick={() => setActiveTab('catalogue')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">🧱 Material Price</button>
                <button onClick={() => setActiveTab('estimator')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">📐 Math Estimator</button>
                <button onClick={() => setActiveTab('assistant')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">💬 AI Sahayak</button>
                <button onClick={() => setActiveTab('tracker')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">🚚 Dispatch Tracker</button>
                <button onClick={() => setActiveTab('about')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">🌳 Our Depot</button>
                <button onClick={() => setActiveTab('faqs')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">❓ FAQs Hub</button>
                <button onClick={() => setActiveTab('gallery')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">🖼️ Works Gallery</button>
                <button onClick={() => setActiveTab('contact')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer block w-full text-left">📩 Enquiry Desk</button>
              </div>
            </div>

            {/* Regional Support and Copyright */}
            <div className="space-y-2 text-xs text-neutral-450 leading-loose">
              <span className="block text-xs uppercase font-display font-black tracking-widest text-amber-500 mb-1">CORPORATE DETAILS</span>
              <div className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5 text-amber-500 mr-2 flex-shrink-0" /> <span>Ambikapur Bypass, Surguja C.G., 497001</span></div>
              <div className="flex items-center space-x-2"><Phone className="w-3.5 h-3.5 text-amber-500 mr-2 flex-shrink-0" /> <span>Call Helpline: +91 62630 63245</span></div>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-neutral-550 flex flex-col sm:flex-row justify-between items-center gap-4" id="footer-bottom-copy">
            <p>© {new Date().getFullYear()} Shahil Construction Services. All rights reserved. Sourced & manufactured locally in Chhattisgarh.</p>
            <div className="flex space-x-4 font-mono text-[10px]">
              <span className="text-neutral-500">Owner: Shahil</span>
              <span className="text-amber-550">●</span>
              <span className="text-neutral-500">Ambikapur Regional Authority License Approved</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
