/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageSquare, Calculator } from 'lucide-react';

interface FloatingActionsProps {
  onOpenEstimator: () => void;
  onOpenQuotationAction: () => void;
}

export default function FloatingActions({ onOpenEstimator, onOpenQuotationAction }: FloatingActionsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5 print:hidden" id="floating-actions-dock">
      {/* Estimator Quick-Launch */}
      <button
        onClick={onOpenEstimator}
        className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-950 font-bold p-3 px-4.5 rounded-full shadow-2xl hover:shadow-amber-500/30 transition-all border-b-2 border-amber-750 hover:scale-105"
        title="Estimate Construction Needs"
      >
        <Calculator className="w-5 h-5 flex-shrink-0" />
        <span className="text-xs tracking-tight hidden sm:inline">Calculator</span>
      </button>

      {/* WhatsApp Chat Line */}
      <a
        href="https://api.whatsapp.com/send?phone=916263063245&text=Hello%20Shahil%20Construction%20Services%2C%20I%2520want%2520to%2520get%252520pricing%252520details."
        target="_blank"
        rel="noreferrer"
        className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-full shadow-2xl hover:shadow-emerald-600/30 transition-all hover:scale-105"
        title="WhatsApp Live Desk"
      >
        <MessageSquare className="w-5.5 h-5.5 flex-shrink-0" />
        <span className="text-xs tracking-tight hidden sm:inline">WhatsApp</span>
      </a>

      {/* Direct Phone Dial */}
      <a
        href="tel:6263063245"
        className="flex items-center space-x-2 bg-neutral-900 border border-neutral-750 hover:bg-neutral-800 text-amber-500 hover:text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-105"
        title="Call Supervisor Desk"
      >
        <Phone className="w-5.5 h-5.5 flex-shrink-0" />
        <span className="text-xs tracking-tight lg:inline hidden">Call Now</span>
      </a>
    </div>
  );
}
