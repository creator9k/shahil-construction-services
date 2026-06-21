/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.catalogue': 'Catalogue',
    'nav.estimator': 'Material Estimator',
    'nav.assistant': 'AI Materials Assistant',
    'nav.about': 'About Us',
    'nav.faqs': 'FAQs',
    'nav.gallery': 'Gallery',
    'nav.tracker': 'Dispatch Tracker',
    'nav.contact': 'Contact Us',
    'nav.admin': 'Admin',
    'nav.call': '+91 62630 63245',

    // Hero
    'hero.sub': 'Reliable Materials. Quality Foundations.',
    'hero.title_part1': 'BUILDING',
    'hero.title_part2': 'STRONGER',
    'hero.title_part3': 'TOGETHER',
    'hero.desc': 'Shahil Construction Services delivers top-grade processed River Sand (Balu), dense Red Bricks (Eeta), Crushed Granite Gravel (Gitti), Reinforced Cement poles, and Modular Precast Slabs directly to your site across Surguja region. Quality guaranteed, pricing honest, delivery prompt.',
    'hero.btn_catalogue': 'VIEW CATALOGUE',
    'hero.btn_quote': 'GET A QUOTE',
    'hero.badge_title': "AMBIKAPUR'S TRUSTED SUPPLIER",
    'hero.badge_desc': 'Serving Chhattisgarh with high-quality sand, bricks, and precast solutions for over a decade. Quality delivery, every single time.',
    'hero.badge_feat1': '✓ Fast Delivery',
    'hero.badge_feat2': '✓ Bulk Support',

    // Quick Stats Banner
    'stats.serving': 'Serving Ambikapur & Surrounding Villages',
    'stats.sand': 'Sand (बालू)',
    'stats.bricks': 'Bricks (ईंट)',
    'stats.gravel': 'Gravel (गिट्टी)',
    'stats.cement': 'Cement Poling',
    'stats.precast': 'Precast Boundary',

    // Trust Call To Action
    'trust.invoice': 'Need a customized invoice with heavy volume discount?',
    'trust.desc': 'Our founder Shahil is available for site consultation around Surguja Division. We arrange personal visits for commercial, housing complexes, and boundary wall setup planning.',
    'trust.call': '📞 Call +91 62630 63245',
    'trust.estimate': 'Get On-site Estimation',

    // Catalogue
    'cat.tag': 'Industrial Grade Inventory',
    'cat.title': 'MATERIALS CATALOGUE',
    'cat.desc': 'View our range of processed river sand, quality high-load red bricks, black granite gitti, precast poles, and compound boundary walls. Real-time pricing is optimized for Surguja delivery.',
    'cat.all': 'All Materials',
    'cat.aggregate': 'Aggregates (बालू / गिट्टी)',
    'cat.masonry': 'Masonry (ईंटें / सैंड)',
    'cat.concrete': 'Precast Concrete',
    'cat.structural': 'Structural Fittings',

    // Estimator
    'est.tag': 'Digital Civil Calculators',
    'est.title': 'SITE MATERIAL ESTIMATOR',
    'est.desc': 'Determine exact raw materials based on civil engineering ratios. Enter your project dimensions below and instantly calculate quantities, approximate costs, and delivery weight parameters.',
    'est.step1': 'Step 1: Choose Structure & Material',
    'est.step2': 'Step 2: Enter Dimensions',

    // AI Assistant
    'ai.tag': 'Interactive Consultant Chatbot',
    'ai.title': 'AI SHAHIL SAHAYAK',
    'ai.desc': 'Ask construction material questions in Hinglish, English, or Hindi. Speak to our custom-trained algorithm about aggregate volumes, pole calculations, and pricing.',

    // About Us
    'about.tag': "Surguja's Sourcing Heritage",
    'about.title': 'THE SHAHIL JOURNEY',

    // FAQs
    'faq.tag': 'Developer Support Centre',
    'faq.title': 'FREQUENTLY ASKED QUESTIONS',
    'faq.desc': 'Comprehensive logistics, billing, quality standards, and procurement support for builders in Ambikapur and Surguja district.',

    // Gallery
    'gal.tag': 'Project Proof & Stock Yard Portfolios',
    'gal.title': 'FIELD DISPATCH GALLERY',
    'gal.desc': 'View actual photographs of our processed materials, modular walls, and active loading dumpers across Ambikapur, Lakhanpur, and local Surguja civil construction sites.',

    // Contact Us / Enquiry Form
    'contact.tag': 'Get In Touch',
    'contact.title': 'CONTACT THE DEPOT',

    // Tracker Component
    'tracker.tag': 'Real-Time Dispatch Updates',
    'tracker.title': 'ORDER DELIVERY TRACKER',
    'tracker.desc': 'Track the dispatch timeline, loading status, and hydraulic truck queues for your sand, brick, or aggregate order around Surguja division.',
    'tracker.placeholder': 'Enter Order ID (e.g., SH-1024, SH-2055, SH-8819)',
    'tracker.btn': 'Track Materials',
    'tracker.not_found': 'Order reference not found in active dispatch queue. Please enter another ID or contact supervisor.',
    'tracker.site': 'Destination Site',
    'tracker.items': 'Materials Ordered',
    'tracker.quantity': 'Volume/Quantity',
    'tracker.driver': 'Supervisor/Driver',
    'tracker.vehicle': 'Vehicle Registration',
    'tracker.status_pending': 'Pending Allocation',
    'tracker.status_pending_desc': 'Materials are being screened and gathered at Central Stockyard. Hydraulic dumper queue is being assigned.',
    'tracker.status_transit': 'In Transit',
    'tracker.status_transit_desc': 'Tractor/Dumper has departed the Ring Road Bypass depot and is traveling towards your destination site.',
    'tracker.status_delivered': 'Delivered & Unloaded',
    'tracker.status_delivered_desc': 'Vehicle completed site drop-off, hydraulic tipping is confirmed, and customer sieve matches checked.',
  },
  hi: {
    // Navbar
    'nav.home': 'मुख्य पृष्ठ',
    'nav.catalogue': 'सामग्री सूची',
    'nav.estimator': 'सामग्री कैलकुलेटर',
    'nav.assistant': 'एआई सहायक',
    'nav.about': 'हमारे बारे में',
    'nav.faqs': 'अक्सर पूछे जाने वाले सवाल',
    'nav.gallery': 'गैलरी',
    'nav.tracker': 'डिलीवरी ट्रैकर',
    'nav.contact': 'संपर्क करें',
    'nav.admin': 'प्रशासक',
    'nav.call': '+91 62630 63245',

    // Hero
    'hero.sub': 'विश्वसनीय सामग्री। मजबूत नींव।',
    'hero.title_part1': 'मजबूत',
    'hero.title_part2': 'निर्माण',
    'hero.title_part3': 'एक साथ',
    'hero.desc': 'शाहिल कंस्ट्रक्शन सर्विसेज पूरे सरगुजा क्षेत्र में सीधे आपके कार्यस्थल पर उत्तम श्रेणी के धुले हुए नदी की रेत (बालू), मजबूत लाल मिट्टी की ईंटें (ईटा), कुचली हुई ग्रेनाइट गिट्टी, मजबूत सीमेंट पोल और मॉड्यूल प्रीकास्ट दीवार स्लैब डिलीवर करता है। सर्वोत्तम गुणवत्ता, ईमानदार दर और समय पर डिलीवरी।',
    'hero.btn_catalogue': 'सूची देखें',
    'hero.btn_quote': 'कोटेशन प्राप्त करें',
    'hero.badge_title': 'अंबिकापुर का भरोसेमंद आपूर्तिकर्ता',
    'hero.badge_desc': 'सरगुजा और पूरे छत्तीसगढ़ में एक दशक से अधिक समय से उच्च गुणवत्ता वाले रेत, ईंटों और प्रीकास्ट समाधानों के साथ सेवा प्रदान कर रहे हैं। हर बार समय पर डिलीवरी।',
    'hero.badge_feat1': '✓ त्वरित डिलीवरी',
    'hero.badge_feat2': '✓ थोक डिस्काउंट',

    // Quick Stats Banner
    'stats.serving': 'अंबिकापुर और आसपास के सभी गांवों में सेवा उपलब्ध है',
    'stats.sand': 'रेत / बालू',
    'stats.bricks': 'ईंट / ईटा',
    'stats.gravel': 'गिट्टी / स्टोन',
    'stats.cement': 'सीमेंट फैंसिंग पोल',
    'stats.precast': 'प्रीकास्ट बाउंड्री वॉल',

    // Trust Call To Action
    'trust.invoice': 'भारी मात्रा में छूट के साथ अनुकूलित चालान की आवश्यकता है?',
    'trust.desc': 'हमारे संस्थापक शाहिल सरगुजा संभाग में साइट परामर्श के लिए उपलब्ध हैं। हम वाणिज्यिक, आवास परिसरों और बाउंड्री वाल सेटअप योजना के लिए व्यक्तिगत दौरों की व्यवस्था करते हैं।',
    'trust.call': '📞 कॉल करें +91 62630 63245',
    'trust.estimate': 'साइट पर मुफ़्त अनुमान प्राप्त करें',

    // Catalogue
    'cat.tag': 'औद्योगिक ग्रेड सामग्री इन्वेंटरी',
    'cat.title': 'सामग्री कैटलॉग',
    'cat.desc': 'हमारे संसाधित नदी रेत, गुणवत्तापूर्ण उच्च-भार वाली लाल ईंटों, काले ग्रेनाइट गिट्टी, प्रीकास्ट पोल और बाउंड्री वॉल की सीमा देखें। वास्तविक समय की कीमतें सरगुजा डिलीवरी के लिए अनुकूलित हैं।',
    'cat.all': 'सभी सामग्रियां',
    'cat.aggregate': 'एग्रीगेट्स (बालू / गिट्टी)',
    'cat.masonry': 'चिनाई (ईंटें / बालू)',
    'cat.concrete': 'प्रीकास्ट कंक्रीट',
    'cat.structural': 'संरचनात्मक फिटिंग',

    // Estimator
    'est.tag': 'डिजिटल सिविल कैलकुलेटर',
    'est.title': 'साइट सामग्री अनुमानक',
    'est.desc': 'सिविल इंजीनियरिंग अनुपात के आधार पर सटीक कच्चे माल का निर्धारण करें। नीचे अपनी परियोजना के आयाम दर्ज करें और तुरंत मात्रा, अनुमानित लागत और वितरण मापदंडों की गणना करें।',
    'est.step1': 'चरण 1: संरचना और सामग्री का चयन करें',
    'est.step2': 'चरण 2: आयाम दर्ज करें',

    // AI Assistant
    'ai.tag': 'इंटरएक्टिव एआई सलाहकार चैटबॉट',
    'ai.title': 'शाहिल एआई सहायक',
    'ai.desc': 'हिंग्लिश, अंग्रेजी या हिंदी में निर्माण सामग्री से जुड़े सवाल पूछें। गिट्टी की मात्रा, पोल की गणना और कीमतों के बारे में हमारे प्रशिक्षित एल्गोरिथम से बात करें।',

    // About Us
    'about.tag': 'सरगुजा की गौरवशाली निर्माण विरासत',
    'about.title': 'शाहिल कंस्ट्रक्शन की कहानी',

    // FAQs
    'faq.tag': 'ग्राहक सहायता केंद्र',
    'faq.title': 'अक्सर पूछे जाने वाले सवाल',
    'faq.desc': 'अंबिकापुर और सरगुजा जिले के बिल्डरों के लिए व्यापक रसद, बिलिंग, गुणवत्ता मानकों और खरीद सहायता।',

    // Gallery
    'gal.tag': 'प्रोजेक्ट प्रमाण और स्टॉक यार्ड पोर्टफोलियो',
    'gal.title': 'फ़ील्ड डिस्पैच गैलरी',
    'gal.desc': 'अंबिकापुर, लखनपुर और स्थानीय सरगुजा सिविल निर्माण स्थलों पर हमारी संसाधित सामग्री, बाउंड्री दीवारों और डंपरों की वास्तविक तस्वीरें देखें।',

    // Contact Us / Enquiry Form
    'contact.tag': 'संपर्क विवरण',
    'contact.title': 'डिपो से संपर्क करें',

    // Tracker Component
    'tracker.tag': 'रियल-टाइम डिलीवरी अपडेट',
    'tracker.title': 'ऑर्डर डिलीवरी ट्रैकर',
    'tracker.desc': 'सरगुजा संभाग में अपने रेत, ईंट या गिट्टी के ऑर्डर की डिस्पैच समयसीमा, लोडिंग स्थिति और हाइड्रोलिक ट्रक कतारों को ट्रैक करें।',
    'tracker.placeholder': 'ऑर्डर आईडी दर्ज करें (जैसे, SH-1024, SH-2055, SH-8819)',
    'tracker.btn': 'सामग्री ट्रैक करें',
    'tracker.not_found': 'सक्रिय डिलीवरी सूची में ऑर्डर संदर्भ नहीं मिला। कृपया दूसरी आईडी दर्ज करें या सुपरवाइजर से संपर्क करें।',
    'tracker.site': 'पहुंचने का स्थान (कार्यस्थल)',
    'tracker.items': 'ऑर्डर की गई सामग्री',
    'tracker.quantity': 'मात्रा / वॉल्यूम',
    'tracker.driver': 'सुपरवाइजर / चालक',
    'tracker.vehicle': 'वाहन पंजीकरण नंबर',
    'tracker.status_pending': 'आवंटन लंबित',
    'tracker.status_pending_desc': 'सामग्री को केंद्रीय स्टॉकयार्ड में छाना और एकत्र किया जा रहा है। हाइड्रोलिक डम्पर कतार आवंटित की जा रही है।',
    'tracker.status_transit': 'मार्ग में (डिलीवरी जारी)',
    'tracker.status_transit_desc': 'ट्रैक्टर/डम्पर रिंग रोड बाईपास डिपो से निकल चुका है और आपके कार्यस्थल की ओर बढ़ रहा है।',
    'tracker.status_delivered': 'वितरित और अनलोड किया गया',
    'tracker.status_delivered_desc': 'वाहन ने साइट ड्रॉप-ऑफ पूरा कर लिया है, हाइड्रोलिक टिपिंग की पुष्टि हो गई है, और ग्राहक द्वारा सामग्री सत्यापित कर ली गई है।',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('shahil_construction_lang');
      if (stored === 'hi' || stored === 'en') {
        return stored;
      }
    } catch (e) {
      // Ignored
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('shahil_construction_lang', lang);
    } catch (e) {
      // Ignored
    }
  };

  const t = (key: string): string => {
    const translationSet = translations[language];
    return translationSet[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
