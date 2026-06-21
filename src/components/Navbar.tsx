/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HardHat, Phone, Menu, X, ShieldCheck, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'catalogue', label: t('nav.catalogue') },
    { id: 'estimator', label: t('nav.estimator') },
    { id: 'assistant', label: t('nav.assistant') },
    { id: 'tracker', label: t('nav.tracker') },
    { id: 'about', label: t('nav.about') },
    { id: 'faqs', label: t('nav.faqs') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  const LanguageSelector = () => (
    <div className="flex items-center bg-neutral-950 p-1 rounded-md border border-neutral-800 space-x-1" id="language-switcher">
      <Languages className="w-3.5 h-3.5 text-neutral-500 mx-1 hidden sm:block" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-[10px] sm:text-[11px] font-mono rounded font-bold transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-amber-500 text-neutral-950 shadow-sm'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
        }`}
        id="lang-btn-en"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2 py-1 text-[10px] sm:text-[11px] font-mono rounded font-bold transition-all cursor-pointer ${
          language === 'hi'
            ? 'bg-amber-500 text-neutral-950 shadow-sm'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
        }`}
        id="lang-btn-hi"
      >
        हिंदी
      </button>
    </div>
  );


  return (
    <nav className="sticky top-0 z-50 bg-neutral-900/95 border-b border-amber-500/20 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-amber-500 text-neutral-950 p-2.5 rounded-lg shadow-md flex items-center justify-center">
              <span className="font-display font-black text-xl text-neutral-950">S</span>
            </div>
            <div>
              <span className="text-xl font-display font-black tracking-wider block text-white uppercase leading-none">
                SHAHIL
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500 block">
                Construction Services
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-inner'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact Fast CTA & Admin Button */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <button
              onClick={onOpenAdmin}
              className="text-xs font-mono text-neutral-400 hover:text-amber-500 transition-colors px-2 py-1 border border-neutral-700 hover:border-amber-500/50 rounded"
              title="Admin Portal"
            >
              Portal Login
            </button>
            <a
              href="tel:6263063245"
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-505 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-bold px-4 py-2.5 rounded-lg shadow-lg hover:shadow-amber-500/10 transition-all font-mono text-sm border-b-2 border-amber-700 active:translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>+91 62630 63245</span>
            </a>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={onOpenAdmin}
              className="text-[10px] font-mono text-neutral-400 px-1.5 py-1 border border-neutral-800 rounded"
            >
              Admin
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-amber-500/10 py-3 px-4 animate-fadeIn">
          <div className="flex justify-between items-center pb-2.5 border-b border-neutral-800 mb-3 text-xs font-mono">
            <span className="text-neutral-400">भाषा चुनें / Choose Language</span>
            <LanguageSelector />
          </div>
          <div className="space-y-1.5 pb-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors flex justify-between items-center ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border-l border-transparent hover:border-amber-500'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <ShieldCheck className="w-4 h-4" />}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-800 space-y-2.5">
            <a
              href="tel:6263063245"
              className="flex items-center justify-center space-x-3 bg-amber-500 text-neutral-950 font-bold px-4 py-3 rounded-xl shadow-lg font-mono"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span>Call: +91 62630 63245</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
