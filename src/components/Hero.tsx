/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Phone } from "lucide-react";
import { ArrowRightDown } from "./common/Svg";

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section className="relative bg-[#18594D] text-gold-50 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gold-450/15">
      {/* Absolute luxury background glow & image proxy */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
          alt="Saudi German Health Dubai luxury consulting suit"
          className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none filter brightness-75 scale-102 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Main Hero Typography: Left Column */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          <div className="space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/10 border border-gold-400/20 text-gold-400 text-[10px] font-mono uppercase tracking-widest rounded-full">
              <Award className="w-3.5 h-3.5 animate-spin-slow" />
              Dubai Clinic & German Board Standards
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1]">
              German Clinical Precision.
              <br />
              <span className="text-[#9ECFC6] font-normal italic">
                Dubai Medical Excellence.
              </span>
            </h1>
          </div>

          <p className="font-sans text-stone-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Bringing over{" "}
            <strong>20 years of clinical urological surgery</strong> and premier
            leadership as former <strong>Chefarzt</strong> in
            Rhineland-Palatinate, Germany. Dr. Talal Ebash directs the Urology
            Department at Saudi German Hospital UAE with an evidence-based,
            patient-centered dedication.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onScrollToSection("booking-section")}
              className="bg-gold-500 hover:bg-[#18594D] text-white font-sans font-medium text-xs tracking-widest uppercase py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all text-center flex items-center gap-1 cursor-pointer"
            >
              Schedule Consultation <ArrowRightDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => onScrollToSection("calculator-section")}
              className="bg-transparent hover:bg-white/5 border border-gold-300/45 text-gold-200 font-mono text-xs tracking-widest uppercase py-4 px-8 rounded-lg transition-all text-center cursor-pointer"
            >
              Perform Prostate symptom test
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="border-t border-gold-400/15 pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left max-w-xl">
            <div>
              <div className="font-serif text-2xl md:text-3xl font-light text-white">
                20+ Years
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-stone-400 mt-1">
                Urological Experience
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl md:text-3xl font-light text-[#9ECFC6]">
                German Chefarzt
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-stone-400 mt-1">
                Department Directorship
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-serif text-2xl md:text-3xl font-light text-white">
                Saudi German
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-stone-400 mt-1">
                UAE Headship
              </div>
            </div>
          </div>
        </div>

        {/* Quick Doctor Summary Card: Right Column */}
        <div className="lg:col-span-4 bg-stone-900/90 border border-gold-400/15 rounded-3xl p-6 space-y-6 shadow-2xl backdrop-blur-sm self-start">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block font-bold">
              CLINICAL PRINCIPLES
            </span>
            <h3 className="font-serif text-xl font-normal text-white">
              Our Medical Commitment
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 items-start text-xs text-stone-300 leading-relaxed font-sans">
              <div className="w-5 h-5 rounded bg-gold-400/10 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong className="text-white block font-medium">
                  Histological & Oncological Safety
                </strong>
                Strictly prioritizing complete tumor margins and therapeutic
                safety across surgical oncology protocols.
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs text-stone-300 leading-relaxed font-sans">
              <div className="w-5 h-5 rounded bg-gold-400/10 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong className="text-white block font-medium">
                  Physiological Preservation
                </strong>
                Leveraging advanced techniques (HoLEP, laparoscopic suturing) to
                preserve tissue, sexual wellness, and continence.
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs text-stone-300 leading-relaxed font-sans">
              <div className="w-5 h-5 rounded bg-gold-400/10 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong className="text-white block font-medium font-bold">
                  German-DHA Clinical Governance
                </strong>
                Maintaining stringent clinical standards through surgical team
                training, audits, and multidisciplinary coordination in Dubai.
              </div>
            </div>
          </div>

          {/* Quick Contact Action */}
          <div className="border-t border-gold-400/10 pt-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">
                DUBAI PRIORITY LINE
              </span>
              <span className="text-xs font-mono font-medium text-gold-300 block">
                Saudi German Coordinator
              </span>
            </div>
            <a
              href="tel:+9718002211"
              className="p-2.5 bg-stone-850 hover:bg-stone-800 border border-gold-400/15 rounded-xl text-gold-400 transition-colors flex items-center gap-1.5 animate-pulse"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono tracking-wider">
                CALL Toll-Free
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
