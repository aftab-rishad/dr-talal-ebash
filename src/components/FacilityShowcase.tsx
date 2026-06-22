/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function FacilityShowcase() {
  return (
    <section className="bg-white border-y border-stone-200/40 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#18594D] font-bold">
            Class-A Medical Facility
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 tracking-tight leading-tight">
            State-of-the-Art <br />
            Urological Laser Center
          </h2>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed font-sans font-light">
            Our clinic at General Medical Hospital is outfitted with the latest advanced therapeutic technologies, including state-of-the-art Holmium lasers for prostate enucleation (HoLEP), high-definition 3D laparoscopy towers, and full-spectrum endoscopic instrumentation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
            <div className="space-y-1">
              <div className="font-serif text-lg font-normal text-stone-900">Advanced HoLEP</div>
              <div className="font-sans text-xs text-stone-500 font-light">
                Precision laser tissue dissection and rapid recovery protocols.
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-lg font-normal text-stone-900">3D Laparoscopy</div>
              <div className="font-sans text-xs text-stone-500 font-light font-sans">
                Enhanced spatial perception for complex keyhole oncology surgeries.
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gold-200/50 group">
            <img
              src="/src/assets/images/laser_urology_center_1781988456815.jpg"
              alt="State-of-the-art diagnostic and urological laser center"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
