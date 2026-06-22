/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Activity, ShieldCheck, CheckCircle } from "lucide-react";

export interface ClinicalFocusItem {
  id: string;
  title: string;
  regionalTitle: string;
  short: string;
  description: string;
  symptoms: string[];
  procedures: string[];
  premiumInsight: string;
}

export const clinicalFocuses: ClinicalFocusItem[] = [
  {
    id: "holep-bph",
    title: "BPH & HoLEP Surgery",
    regionalTitle: "Benign Prostatic Hyperplasia & Holmium-Laser",
    short: "Modern medication and laser therapy (HoLEP) for benign prostatic hyperplasia with excellent outcome criteria.",
    description: "Benign prostatic hyperplasia (BPH) affects most men as they mature. We provide tiered management starting from pharmacotherapy optimization (alpha-blockers, 5-ARIs) up to surgical intervention. Our gold-standard technique is HoLEP (Holmium Laser Enucleation of the Prostate): an advanced, minimally invasive operation suited for large prostates that minimizes bleeding and ensures swift urinary rehabilitation.",
    symptoms: [
      "Nocturia (frequent night passing)",
      "Weak or interrupted urinary flow",
      "Straining or sensation of incomplete bladder voiding",
      "Urgency and transient urge leakage episodes"
    ],
    procedures: [
      "HoLEP (Holmium Laser Enucleation)",
      "Bipolar TURP (Transurethral Resection)",
      "Prostata-Medikation Therapy design"
    ],
    premiumInsight: "HoLEP represents a total paradigm shift. By using laser energy to anatomically enucleate the adenomatous prostate lobes, we achieve immediate mechanical obstruction relief while completely preserving urethral continence mechanics."
  },
  {
    id: "uro-oncology",
    title: "Surgical Uro-Oncology",
    regionalTitle: "Urological Oncology and Tumor Surgery",
    short: "Comprehensive clinical diagnostic screening and standard-setting surgeries for prostate, kidney, and bladder malignant cancers.",
    description: "Specialized oncology services cover the therapeutic spectrum of urological cancers. Employing evidence-based Guidelines (EAU / DGU), patients get custom treatment options. We champion minimally invasive laparoscopic approaches to access kidneys, adrenal glands, and pelvic elements, prioritizing tumor safety margins while minimizing post-intervention recovery times.",
    symptoms: [
      "Hematuria (blood in urine: painless, gross)",
      "Elevated PSA (Prostate Specific Antigen) readings",
      "Flank discomfort or renal system mass findings"
    ],
    procedures: [
      "Laparoscopic Radical Prostatectomy",
      "Laparoscopic Nephrectomy / Partial Nephrectomy",
      "Endoscopic TURBT (Transurethral Resection of Bladder Tumors)"
    ],
    premiumInsight: "Oncological surgery is measured first by margin safety. We marry strict oncological resection protocols with laparoscopic precision to excise tumors cleanly while preserving crucial adjacent renal or nervous tissue."
  },
  {
    id: "minimally-invasive",
    title: "Endourology & Minimally Invasive",
    regionalTitle: "Minimally Invasive Urology & Endourology",
    short: "High-definition endoscopic intervention for urinary tract pathologies, stones, and stricture corrections.",
    description: "Utilizing natural urinary passages removes the need for incisions entirely. Endourological management for kidney stones, ureteral calculi, and urethral strictures employs high-definition digital scopes, pneumatic/laser lithotripters, and micro-stent implants to safely restore physiological flow dynamics.",
    symptoms: [
      "Acute renal colic (spasmodic flank pain)",
      "Recurrent kidney stone form patterns",
      "Post-catheterization urinary stricture parameters"
    ],
    procedures: [
      "URS / RIRS (Flexible Ureterorenoscopy with laser lithotripsy)",
      "Laser Urethrotomy / Otis Internal Urethrotomy",
      "Double-J Stent Placement & complex extraction"
    ],
    premiumInsight: "Leaving no external incisions translates to negligible wound complications and minimized pain. Using flexible optical devices and fine thulium/holmium lasers, we pulverize difficult calculi directly inside the calyces safely."
  },
  {
    id: "reconstructive-general",
    title: "Reconstructive & General Urology",
    regionalTitle: "Reconstructive & General Urology",
    short: "Functional urology, stricture correction, and clinical diagnostic management of male health indicators.",
    description: "Restoring physical form and function is central to therapeutic urologic care. This subspecialty covers micro-surgical vascular evaluations, correction of anatomical curvatures (such as Peyronie's disease), bladder visual mapping, and functional reconstructive surgeries.",
    symptoms: [
      "Meatal narrowing or urethral stricture symptoms",
      "Anatomical deviation or painful erections",
      "Recurrent urogenital infections"
    ],
    procedures: [
      "Urethroplasty (with buccal mucosal graft)",
      "Circumcision & frenuloplasty corrections",
      "Varicose testicular vein ligations"
    ],
    premiumInsight: "Functional reconstruction directly impacts a patient's self-esteem and daily peace. Precision planning of tissue transfers, including oral mucosa grafts, yields high long-term success rates even in recurrent strictures."
  }
];

interface ClinicalFocusesProps {
  onScrollToSection: (id: string) => void;
  onSelectInquiryType: (type: string) => void;
}

export default function ClinicalFocuses({ onScrollToSection, onSelectInquiryType }: ClinicalFocusesProps) {
  const [activeClinicalFocus, setActiveClinicalFocus] = useState<string>("holep-bph");

  return (
    <section id="focus-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-3.5 max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[#18594D] font-bold">
          Medical Core Focus Areas
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
          Comprehensive Specialist Urology Care
        </h2>
        <p className="text-stone-500 text-sm md:text-base leading-relaxed font-sans font-light">
          Bringing elite Board Certified precision across standard-defining surgeries. Discover specialized therapy categories offered at our New York clinic.
        </p>
      </div>

      {/* Focus Selector Tab layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-4">
        {/* Service Links: Left 5 Columns */}
        <div className="lg:col-span-5 space-y-3">
          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-bold mb-4">
            Explore Surgical Subspecialties
          </p>
          {clinicalFocuses.map((focus) => (
            <button
              key={focus.id}
              onClick={() => setActiveClinicalFocus(focus.id)}
              className={`w-full p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                activeClinicalFocus === focus.id
                  ? "bg-white border-gold-400 shadow-md ring-1 ring-gold-200/50"
                  : "bg-transparent border-stone-200/80 hover:border-gold-300"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  {focus.title}
                </h3>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeClinicalFocus === focus.id ? "text-gold-600 translate-x-1" : "text-stone-400"
                }`} />
              </div>
              <p className="text-stone-500 text-xs font-sans mt-2 line-clamp-2 leading-relaxed">
                {focus.short}
              </p>
            </button>
          ))}
        </div>

        {/* Active Service Deep Dive Details Card: Right 7 Columns */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {clinicalFocuses.map((focus) => {
              if (focus.id !== activeClinicalFocus) return null;
              return (
                <motion.div
                  key={focus.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gold-200/50 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8"
                >
                  <div className="flex items-baseline justify-between border-b border-stone-100 pb-5 flex-wrap gap-2">
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-gold-600 block font-semibold uppercase tracking-wider">
                        {focus.regionalTitle}
                      </span>
                      <h4 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                        {focus.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200">
                      Accredited Focus
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed font-sans font-light">
                    {focus.description}
                  </p>

                  {/* Common indicative symptoms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3">
                      <h5 className="font-mono text-xs uppercase tracking-widest text-[#18594D] font-bold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-gold-600 shrink-0" /> Indicative Clinical Symptoms
                      </h5>
                      <ul className="space-y-2">
                        {focus.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-stone-600 font-sans font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-mono text-xs uppercase tracking-widest text-[#18594D] font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-gold-600 shrink-0" /> Core Surgical Therapies
                      </h5>
                      <ul className="space-y-2">
                        {focus.procedures.map((procedure, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-sans font-medium">
                            <CheckCircle className="w-4 h-4 text-[#1E6F60] shrink-0 mt-0.5" />
                            <span>{procedure}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Dr. Doe's Premium Expert Insight Box */}
                  <div className="bg-gold-50/50 border border-gold-200/40 p-5 rounded-2xl space-y-1.5">
                    <p className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-bold">
                      Dr. Doe's Clinical Perspective
                    </p>
                    <p className="text-stone-700 text-xs leading-relaxed italic font-sans font-light">
                      "{focus.premiumInsight}"
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
                    {focus.id === "holep-bph" && (
                      <button
                        onClick={() => onScrollToSection("calculator-section")}
                        className="px-5 py-3.5 bg-transparent hover:bg-stone-55 border border-stone-205 text-stone-701 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all text-center cursor-pointer"
                      >
                        Execute Prostate Score Test
                      </button>
                    )}
                    <button
                      onClick={() => onSelectInquiryType(focus.title)}
                      className="px-6 py-3.5 bg-[#1E6F60] hover:bg-[#18594D] text-white rounded-xl font-mono text-[10px] uppercase tracking-widest text-center cursor-pointer transition-all shadow-sm"
                    >
                      Request Specific Consulting
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
