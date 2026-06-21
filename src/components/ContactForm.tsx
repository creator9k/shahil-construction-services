/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Material, Enquiry } from '../types';
import { Phone, Check, Smartphone, MessageSquare, MapPin, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  materials: Material[];
  selectedMaterialIdFromEstimator: string | null;
  selectedQuantityFromEstimator: number | null;
  onSuccessEnquiry: (enquiry: Enquiry) => void;
}

export default function ContactForm({
  materials,
  selectedMaterialIdFromEstimator,
  selectedQuantityFromEstimator,
  onSuccessEnquiry
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [materialId, setMaterialId] = useState('sand');
  const [quantity, setQuantity] = useState<number>(5);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [mySentEnquiries, setMySentEnquiries] = useState<Enquiry[]>([]);

  // Capture estimator selection changes
  useEffect(() => {
    if (selectedMaterialIdFromEstimator) {
      setMaterialId(selectedMaterialIdFromEstimator);
    }
    if (selectedQuantityFromEstimator) {
      setQuantity(selectedQuantityFromEstimator);
    }
  }, [selectedMaterialIdFromEstimator, selectedQuantityFromEstimator]);

  // Load user's local requests
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shahil_sent_enquiries');
      if (stored) {
        setMySentEnquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getSelectedProductUnit = () => {
    const item = materials.find((m) => m.id === materialId);
    if (!item) return 'Units';
    return item.unit.split(' ')[0]; // E.g. Brass, Per, Slabs
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !location.trim()) return;

    const selectedProduct = materials.find((m) => m.id === materialId)?.name || 'Materials';
    const finalUnit = getSelectedProductUnit();

    // Create a new lead log
    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      name,
      phone,
      email: email || undefined,
      location,
      materialId,
      quantity,
      quantityUnit: finalUnit,
      message,
      timestamp: new Date().toLocaleString('en-IN'),
      status: 'new'
    };

    // Store in localStorage
    const updated = [newEnquiry, ...mySentEnquiries];
    setMySentEnquiries(updated);
    localStorage.setItem('shahil_sent_enquiries', JSON.stringify(updated));

    // Call parent handler
    onSuccessEnquiry(newEnquiry);

    // Format WhatsApp auto redirect link
    // Message Format: "Hello, I want to enquire about [product] from Shahil Construction Services..."
    const waText = `Hello Shahil Construction Services, I want to enquire about buying materials:
- *Material*: ${selectedProduct}
- *Quantity*: ${quantity} ${finalUnit}
- *My Name*: ${name}
- *Site Location*: ${location}
- *Contact*: ${phone}
${message ? `- *Additional Message*: ${message}` : ''}
Please send me a quote. Thank you!`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://api.whatsapp.com/send?phone=916263063245&text=${encodedText}`;

    setSuccess(true);
    
    // Auto redirect to WhatsApp in a friendly way after slight timeout
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1500);

    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setMessage('');
  };

  return (
    <section className="bg-neutral-900 py-16 text-white border-t border-neutral-805" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-outer-grid">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6" id="contact-info-cards">
            <div>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-amber-500 mb-1.5">Get In Touch</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter text-white mb-3">
                CONTACT THE DEPOT
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Do you have custom volume orders or need specialized concrete dimensions? Speak to our founding supervisor, locate our depot on the Surguja map, or send a quick online query.
              </p>
            </div>

            {/* Quick Contact Widgets */}
            <div className="space-y-4" id="contact-widgets-container">
              
              <a
                href="tel:6263063245"
                className="flex items-center space-x-4 bg-neutral-950 p-4 rounded-xl border border-neutral-850 hover:border-amber-500/20 transition-colors group"
                id="widget-phone-direct"
              >
                <div className="bg-amber-500 text-neutral-950 p-3 rounded-xl">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-400">Call Founding Supervisor</span>
                  <span className="block text-base font-mono font-bold text-white group-hover:text-amber-400 transition-colors">
                    +91 62630 63245
                  </span>
                </div>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=916263063245&text=Hello%20Shahil%20Construction%20Services%2C%20I%20want%20to%20enquire%20about%20construction%20materials%20pricing."
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-4 bg-neutral-950 p-4 rounded-xl border border-neutral-850 hover:border-emerald-500/20 transition-colors group"
                id="widget-whatsapp-direct"
              >
                <div className="bg-emerald-600 text-white p-3 rounded-xl">
                  <MessageSquare className="w-5 h-5 flex-shrink-0" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-neutral-400">WhatsApp Instant Message</span>
                  <span className="block text-base font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Chat on +91 62630 63245
                  </span>
                </div>
              </a>

              {/* Working Hours widget */}
              <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-850 space-y-3" id="working-hours-card">
                <span className="block text-xs uppercase font-mono text-amber-500 tracking-wider font-semibold border-b border-neutral-800 pb-2">
                  🕗 Standard Depot Operating Hours
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs text-neutral-350">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Monday - Saturday:</span>
                  </div>
                  <span className="font-semibold text-white">08:00 AM - 08:00 PM</span>

                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Sunday:</span>
                  </div>
                  <span className="font-semibold text-amber-405">Closed (Deliveries on request)</span>
                </div>
              </div>

              {/* Depot Address */}
              <div className="bg-neutral-9KEY p-5 rounded-xl border border-neutral-850 space-y-2 text-xs" id="depot-address-card">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold text-neutral-200">Shahil Construction Depot Layout:</span>
                    <p className="text-neutral-400 font-light mt-0.5 leading-relaxed">
                      Near Ambikapur Ring Road, Main Material Layout Stockpile, Ambikapur, Chhattisgarh, India, PIN - 497001
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Enquiry Form Column */}
          <div className="lg:col-span-7" id="contact-form-canvas">
            <div className="bg-[#1f2937] border-t-4 border-t-amber-500 border-x border-b border-neutral-800 p-6 sm:p-8 rounded-lg space-y-6 shadow-xl" id="enquiry-card-shell">
              <div className="border-b border-neutral-800 pb-4">
                <span className="block text-[10px] uppercase font-mono text-neutral-400">Self-Service Portal</span>
                <h3 className="text-xl font-bold text-white">Send Bulk Material Enquiry</h3>
              </div>

              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-3 animate-fadeIn" id="success-message-banner">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-emerald-400">Enquiry Added and Forwarding...</h4>
                  <p className="text-sm text-neutral-350 max-w-sm mx-auto leading-relaxed">
                    Thank you! We have logged your request securely. We are now opening WhatsApp to send this quotation directly to Shahil supervisor desk.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-xs text-amber-500 hover:underline"
                  >
                    Submit another Enquiry form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" id="enquiry-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Customer Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-neutral-300">Name <span className="text-amber-550">*</span></label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-neutral-600"
                      />
                    </div>

                    {/* Phone details */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-neutral-300">Phone Number <span className="text-amber-550">*</span></label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-neutral-600 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Site Location */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-neutral-300">Site/Project Delivery Location <span className="text-amber-550">*</span></label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Ring Road, Ambikapur"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-neutral-600"
                      />
                    </div>

                    {/* Email Option */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-neutral-300">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@gmail.com"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Material Dropdown */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-neutral-300">Material Required <span className="text-amber-550">*</span></label>
                      <select
                        value={materialId}
                        onChange={(e) => setMaterialId(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        {materials.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.hindiName})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Numeric Quantity */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-neutral-300">Estimated Quantity Required ({getSelectedProductUnit()})</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-300">Custom Message / Specifications request</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="e.g. Please let me know if immediate supply is possible by tomorrow noon..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-neutral-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 border-b-4 border-amber-700 active:translate-y-0.5 text-neutral-950 font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm uppercase tracking-wide flex justify-center items-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-neutral-950" />
                    <span>Send Order to WhatsApp Desk</span>
                  </button>
                </form>
              )}

              {/* My submitted queries list snippet */}
              {mySentEnquiries.length > 0 && (
                <div className="border-t border-neutral-800 pt-5 mt-4 space-y-3" id="sent-enquiries-subset">
                  <span className="block text-xs uppercase font-mono text-amber-500 tracking-wider">
                    📋 Sourcing History (Sent from this browser)
                  </span>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {mySentEnquiries.map((enq) => {
                      const matName = materials.find((m) => m.id === enq.materialId)?.name || 'Materials';
                      return (
                        <div key={enq.id} className="bg-neutral-900/60 p-3 rounded-lg border border-neutral-850 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-semibold block text-neutral-200">{matName}</span>
                            <span className="text-[10px] text-neutral-500 block">Quantity: {enq.quantity} {enq.quantityUnit} ● {enq.timestamp.split(',')[0]}</span>
                          </div>
                          <span className="bg-amber-500/10 text-amber-500/80 text-[10px] px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                            WhatsApp Sent
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
