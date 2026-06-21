/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Truck, CreditCard, ShieldCheck, Scale, HardHat } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
  category: 'delivery' | 'pricing' | 'quality' | 'general';
}

export default function FAQs() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { t, language } = useLanguage();

  const faqs: FAQItem[] = language === 'hi' ? [
    {
      category: 'delivery',
      question: "अंबिकापुर के आसपास साइटों पर डिलीवरी में कितना समय लगता है?",
      answer: "हम आमतौर पर पुष्टि के 12 से 24 घंटों के भीतर सामग्री भेजते हैं। थोक शहरी आदेशों के लिए (अंबिकापुर बाईपास, रिंग रोड, केदारपुर और गांधीनगर के भीतर), हम उसी दिन त्वरित अनलोडिंग की पेशकश करते हैं।"
    },
    {
      category: 'pricing',
      question: "आपकी न्यूनतम आदेश आवश्यकता (MOQ) क्या है?",
      answer: "ईंधन शुल्क को प्रभावी ढंग से प्रबंधित करने के लिए: नदी रेत (बालू) की न्यूनतम मात्रा 1 ब्रास (100 CFT) है; लाल ईंटों के लिए प्रति ट्रैक्टर ट्रिप न्यूनतम 1,000 पीस की आवश्यकता होती है; गिट्टी 1 ब्रास से शुरू होती है; सीमेंट पोल के लिए कम से कम 15 पोल आवश्यक हैं।"
    },
    {
      category: 'pricing',
      question: "शाहिल कंस्ट्रक्शन सर्विसेज कौन से भुगतान स्वीकार करती है?",
      answer: "हम बिना किसी छुपे शुल्क के पूरी तरह से पारदर्शी बिलिंग प्रदान करते हैं। हम कैश ऑन डिलीवरी (COD), डायरेक्ट बैंक ट्रांसफर (RTGS/NEFT), और तत्काल UPI स्वीकार करते हैं। कृपया ध्यान दें कि हम उधारी (क्रेडिट) पर सामग्री नहीं देते हैं।"
    },
    {
      category: 'quality',
      question: "क्या नदी की रेत पर छलनी-परीक्षण किया जाता है?",
      answer: "हाँ, बिल्कुल। हमारी रेत (बालू) पूरी तरह से प्रामाणिक नदी रॉयल्टी ब्लॉकों से प्राप्त की जाती है। यह सुनिश्चित करने के लिए कि कोई मिट्टी या कचरा न हो, इसकी गहरी सिल्ट-वाशिंग और मल्टी-स्टेज स्क्रीनिंग की जाती है।"
    },
    {
      category: 'quality',
      question: "क्या बाउंड्री वाल की कीमत में स्थापना श्रम खर्च शामिल है?",
      answer: "हाँ, हमारी बाउंड्री वाल की दर ₹95 प्रति वर्ग फुट है, जिसमें स्तंभ खंभे लगाने, साइट संरेखण और अंतिम स्थापित करने का श्रम पूरी तरह से शामिल है।"
    },
    {
      category: 'general',
      question: "क्या हम ऑर्डर देने से पहले सामग्री की जांच कर सकते हैं?",
      answer: "बिल्कुल। गृहस्वामियों और इंजीनियरों का अंबिकापुर रिंग रोड बाईपास के पास हमारे सेंट्रल स्टॉकपाइल डिपो में दौरा करने के लिए हमेशा स्वागत है।"
    }
  ] : [
    {
      category: 'delivery',
      question: "What are the typical delivery timelines for sites around Ambikapur?",
      answer: "We usually dispatch materials within 12 to 24 hours of confirmation. For bulk city orders (within Ambikapur Bypass, Ring Road, Kedarpur, and Gandhinagar), we offer same-day prompt unloading. Rural dispatches to Lakhanpur, Udaipur, Rajpur, or Ramanujganj depend on local hydraulic trolley queues."
    },
    {
      category: 'pricing',
      question: "What is your minimum order requirement (MOQ)?",
      answer: "To manage fuel and toll surcharges efficiently: Balu (River Sand) has an MOQ of 1 Brass (100 CFT); Red Clay Bricks requires a minimum of 1,000 pieces per tractor trip; Gitti (Aggregate) begins at 1 Brass; concrete fencing poles require at least 15 poles."
    },
    {
      category: 'pricing',
      question: "What payment terms do Shahil Construction Services accept?",
      answer: "We offer completely transparent billing with zero hidden markups. We accept Cash on Delivery (COD), direct bank RTGS / NEFT, and secure instant UPI payments. Please note we do not provide credit (Udhari) terms. Large wholesale projects require 50% advance for raw stockpile allocation."
    },
    {
      category: 'quality',
      question: "Is sieve-testing performed on the River Sand?",
      answer: "Yes, indeed. Our Sand (Balu) is entirely sourced from authentic river royalty blocks. It undergoes deep silt-washing and multiple stage screening to ensure zero mud clusters, safeguarding your plastering from cracks."
    },
    {
      category: 'quality',
      question: "Does the modular Boundary Wall price include installation labor?",
      answer: "Yes, our quoted modular precast slab price of ₹95 per square foot is fully inclusive of material production, column pillar casting, site alignment, and final labor installation on plain soil."
    },
    {
      category: 'general',
      question: "Can we inspect the stock before placing a dispatch order?",
      answer: "Absolutely. Homebuilders and architects are always welcome to visit our Central Stockpile Depot near the Ambikapur Ring Road Bypass. There, you can physically witness brick load-bearing compressions and filter test sand samples."
    },
    {
      category: 'delivery',
      question: "Do you supply material to far-off villages in the Surguja Division?",
      answer: "Yes, we support the wider Surguja Division. We routinely deploy specialized 4x4 tractors and double-axle dumpers to ensure high-grade materials reach interior areas even during wet weather conditions."
    }
  ];


  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'delivery': return { bg: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/25', icon: <Truck className="w-4 h-4 text-emerald-500" /> };
      case 'pricing': return { bg: 'bg-amber-500/10 text-amber-500 border-amber-500/25', icon: <CreditCard className="w-4 h-4 text-amber-500" /> };
      case 'quality': return { bg: 'bg-blue-500/10 text-blue-450 border-blue-500/25', icon: <ShieldCheck className="w-4 h-4 text-blue-550" /> };
      default: return { bg: 'bg-neutral-800 text-neutral-400 border-neutral-700', icon: <Scale className="w-4 h-4 text-white" /> };
    }
  };

  return (
    <section className="bg-neutral-950 py-16 text-white min-h-[75vh]" id="faqs-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper title */}
        <div className="text-center space-y-4" id="faqs-header">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded text-amber-500 text-[10px] font-mono tracking-widest uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>{t('faq.tag')}</span>
          </div>
 
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white">
            {t('faq.title')}
          </h2>
          
          <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto">
            {t('faq.desc')}
          </p>
        </div>
 
        {/* Filter Badges tab-bar */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-neutral-900 pb-6" id="faq-category-filters">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी प्रश्न' : 'All Queries' },
            { id: 'delivery', label: language === 'hi' ? 'वितरण और वाहन' : 'Delivery & Fleet' },
            { id: 'pricing', label: language === 'hi' ? 'न्यूनतम मात्रा और दरें' : 'MOQs & Pricing' },
            { id: 'quality', label: language === 'hi' ? 'सामग्री और गुणवत्ता' : 'Materials & QC' },
            { id: 'general', label: language === 'hi' ? 'सामान्य / निरीक्षण' : 'General / Inspection' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setActiveId(null); }}
              className={`px-4 py-2 text-xs font-mono border rounded transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold' 
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-70 tracking-wider'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Accordion list */}
        <div className="space-y-4" id="faqs-accordion-list">
          {filteredFaqs.map((faq, idx) => {
            const meta = getCategoryTheme(faq.category);
            const isExpanded = activeId === idx;
            return (
              <div 
                key={idx}
                className="bg-[#1f2937] border-l-4 border-l-amber-500 border-r border-y border-neutral-800 rounded-r-lg transition-all"
                id={`faq-accordion-item-${idx}`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded border ${meta.bg} hidden sm:block flex-shrink-0`}>
                      {meta.icon}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white tracking-wide">{faq.question}</span>
                      <span className="text-[9px] uppercase font-mono text-amber-500/80 tracking-widest mt-0.5 block">Category: {faq.category}</span>
                    </div>
                  </div>
                  <div className="text-neutral-400 p-1 bg-neutral-900/60 rounded">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated expand body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-300 leading-relaxed font-light border-t border-neutral-800/40">
                    <p className="max-w-3xl">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA help card */}
        <div className="bg-neutral-900 border border-neutral-850 p-6 sm:p-8 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-6" id="faq-help-card">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-black text-white text-lg tracking-wide">STILL HAVE UNRESOLVED QUESTIONS?</h3>
            <p className="text-xs text-neutral-405 font-light">Get custom site guidelines, physical sieve metrics, or coordinate delivery trips directly.</p>
          </div>
          <div className="flex gap-3">
            <a 
              href="tel:6263063245"
              className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-4 py-2.5 rounded text-xs transition-all tracking-wide"
            >
              📞 Call Supervisor
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=916263063245&text=Hello%20Shahil%2C%20I%20have%20some%20queries%20about%20Ambikapur%20materials."
              target="_blank"
              rel="noreferrer"
              className="bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-amber-500 px-4 py-2.5 rounded text-xs transition-all font-mono"
            >
              💬 WhatsApp Line
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
