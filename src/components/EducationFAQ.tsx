/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CornerDownRight } from "lucide-react";

export default function EducationFAQ() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[#1E6F60] font-bold animate-pulse">
          Urological FAQs
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
          Understand HoLEP, Oncology Triage, & Consultation Criteria
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-2 p-5 bg-white border border-stone-200/60 rounded-2xl">
          <h4 className="font-serif text-base font-semibold text-stone-900 flex items-start gap-1">
            <CornerDownRight className="w-4 h-4 text-[#1E6F60] shrink-0 mt-1" />
            Why constitutes HoLEP the gold standard over TURP?
          </h4>
          <p className="text-stone-600 text-xs leading-relaxed font-sans font-light">
            TURP (Transurethral Resection of the Prostate) scrapes tissue in fragments, which can cause significant bleeding, and are limited by prostate gland volume. <strong>HoLEP</strong> enucleates the tissue block fully using laser energy with laser coagulation. It is safer, supports massive glands, and lowers catheterization times immensely.
          </p>
        </div>

        <div className="space-y-2 p-5 bg-white border border-stone-200/60 rounded-2xl">
          <h4 className="font-serif text-base font-semibold text-stone-900 flex items-start gap-1">
            <CornerDownRight className="w-4 h-4 text-[#1E6F60] shrink-0 mt-1" />
            Do you host digital Teleconsultations for German residents?
          </h4>
          <p className="text-stone-600 text-xs leading-relaxed font-sans font-light">
            Yes. Having served as <strong>Chefarzt</strong> in Rheinland-Pfalz, Dr. Ebash regularly provides digital second opinions and therapeutic designs for patients in Germany, coordination files can be verified using GDPR compliant channels.
          </p>
        </div>

        <div className="space-y-2 p-5 bg-white border border-stone-200/60 rounded-2xl">
          <h4 className="font-serif text-base font-semibold text-stone-900 flex items-start gap-1">
            <CornerDownRight className="w-4 h-4 text-[#1E6F60] shrink-0 mt-1" />
            How fast are prostate cancer reviews structured?
          </h4>
          <p className="text-stone-600 text-xs leading-relaxed font-sans font-light">
            Urgent oncology cases with elevated PSA velocity or histopathology confirmations bypass typical administrative slots. Specialized fast-tracking aims to evaluate patients within 48 to 72 hours.
          </p>
        </div>

        <div className="space-y-2 p-5 bg-white border border-stone-200/60 rounded-2xl">
          <h4 className="font-serif text-base font-semibold text-stone-900 flex items-start gap-1">
            <CornerDownRight className="w-4 h-4 text-[#1E6F60] shrink-0 mt-1" />
            What files should I prepare for post-TURP secondary failures?
          </h4>
          <p className="text-stone-600 text-xs leading-relaxed font-sans font-light">
            Please gather copies of the original surgery histopathology report, uroflowmetry charts, and ultrasound post-void residual volumes to map sphincter and detrusor responses perfectly.
          </p>
        </div>
      </div>
    </section>
  );
}
