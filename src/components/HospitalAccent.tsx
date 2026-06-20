/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin } from "lucide-react";

interface HospitalAccentProps {
  onSelectInquiryType: (type: string) => void;
}

export default function HospitalAccent({ onSelectInquiryType }: HospitalAccentProps) {
  return (
    <section className="bg-gold-100/50 py-12 border-b border-gold-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-700 font-bold block">
              Saudi German Health UAE Link
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal tracking-tight">
              Head of Urology at a Premier Regional Medical Group
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed max-w-3xl font-sans font-light">
              As the direct administrative and clinical head, Dr. Ebash drives continuous improvement parameters across diagnostic and surgical urology workflows. Translating decades of rigorous medical chamber guidelines from Nordrhein-Westfalen and Rheinland-Pfalz directly to patient care inside SGH Dubai.
            </p>
          </div>
          <div className="bg-white p-6 border border-gold-200/60 rounded-2xl space-y-3.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#18594D] font-bold">
              <MapPin className="w-4 h-4 text-gold-500" /> Clinic Location
            </div>
            <p className="text-stone-800 font-serif text-base leading-snug">
              Urology Department, Saudi German Hospital Dubai,<br />
              Hessa Street, Al Barsha 3, Dubai, UAE
            </p>
            <button
              onClick={() => onSelectInquiryType("General Consultation")}
              className="text-xs font-mono tracking-wider font-semibold text-gold-600 hover:text-gold-800 underline flex items-center gap-1 cursor-pointer"
            >
              Locate Hospital Desk & Valet Details →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
