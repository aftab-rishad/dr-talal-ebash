/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck } from "lucide-react";
import { AppointmentsCalendar } from "./common/Svg";

interface HeaderProps {
  onScrollToSection: (id: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  return (
    <>
      {/* Editorial Top Bar */}
      <div className="bg-[#18594D] text-gold-50 py-2 px-4 border-b border-gold-400/10 text-[10px] uppercase tracking-widest font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>
              Bridging German Medical Precision & UAE Clinical Standards
            </span>
          </div>
          <div className="flex items-center gap-4 animate-fade-in">
            <span className="hidden sm:inline">
              Licensed Department: Saudi German Health Dubai
            </span>
            <span>Board Certification: German Facharzt</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 bg-gold-50/90 backdrop-blur-md z-40 border-b border-gold-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-xl sm:text-2xl tracking-normal font-semibold text-stone-900">
                Dr. Talal Ebash
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#18594D] font-medium">
                Facharzt für Urologie
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-stone-500 tracking-tight">
              Consultant Urologist & Head of Department | Urology
            </p>
          </div>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-widest text-stone-600">
            <button
              onClick={() => onScrollToSection("focus-section")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Clinical Focus
            </button>
            <button
              onClick={() => onScrollToSection("timeline-section")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Credentials Track
            </button>
            <button
              onClick={() => onScrollToSection("calculator-section")}
              className="hover:text-stone-950 transition-colors cursor-pointer text-gold-700"
            >
              Symptom Test (IPSS)
            </button>
            <button
              onClick={() => onScrollToSection("booking-section")}
              className="hover:text-stone-950 transition-colors cursor-pointer"
            >
              Intake Hub
            </button>
          </nav>

          <button
            onClick={() => onScrollToSection("booking-section")}
            className="bg-gold-500 hover:bg-[#18594D] text-white font-sans font-medium text-[10px] tracking-widest uppercase py-3 px-6 rounded-lg transition-all text-center flex items-center gap-2 cursor-pointer"
          >
            Request Appointment <AppointmentsCalendar className="w-3 h-3" />
          </button>
        </div>
      </header>
    </>
  );
}
