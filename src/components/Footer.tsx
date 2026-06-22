/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 px-4 md:px-8 border-t border-gold-400/25">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg text-white font-semibold">Dr. John Doe</span>
              <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest font-bold">Urologist</span>
            </div>
            <p className="text-xs leading-relaxed max-w-md text-stone-400 font-sans font-light">
              Consultant Urologist & Head of Department | Urology, General Medical Hospital.<br />
              Translating two decades of European clinical standards, professional hospital leadership (Chief Medical Officer, Senior Consultant), and comprehensive surgical oncology practices to premium patient care.
            </p>
          </div>

          <div className="space-y-3.5 text-xs font-sans">
            <h5 className="font-mono text-[10px] uppercase text-gold-400 tracking-widest font-bold">
              Clinical Contacts
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-stone-300 font-light">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <span>New York Clinic: 800 22 11 (Toll-free inside USA)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300 font-mono font-light">
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <span>j.doe@example.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <h5 className="font-mono text-[10px] uppercase text-gold-400 tracking-widest font-bold">
              New York Registration
            </h5>
            <p className="leading-relaxed text-stone-500 text-[11px] font-light font-sans">
              Accredited DHA Licensed Consultant.<br />
              General Medical Hospital, New York.<br />
              Conforming to National Medical Governance and International HIPAA Directives.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gold-400/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Dr. John Doe. All Rights Reserved.
          </p>
          <p className="text-[10px]">
            Crafted in compliance with premium medical design standards. Localized state processing.
          </p>
        </div>
      </div>
    </footer>
  );
}
