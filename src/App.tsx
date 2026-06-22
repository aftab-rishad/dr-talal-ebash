/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HospitalAccent from "./components/HospitalAccent";
import ClinicalFocuses from "./components/ClinicalFocuses";
import FacilityShowcase from "./components/FacilityShowcase";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SymptomScore from "./components/SymptomScore";
import ConsultationDesk from "./components/ConsultationDesk";
import EducationFAQ from "./components/EducationFAQ";
import Footer from "./components/Footer";

export default function App() {
  const [selectedConcern, setSelectedConcern] = useState<string>(
    "General Consultation",
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInquiryChange = (concern: string) => {
    setSelectedConcern(concern);
    scrollToSection("booking-section");
  };

  return (
    <div className="min-h-screen bg-gold-40 text-stone-900 font-sans selection:bg-gold-200 selection:text-stone-900 overflow-x-hidden antialiased">
      {/* Editorial Header */}
      <Header onScrollToSection={scrollToSection} />

      {/* Hero Showcase */}
      <Hero onScrollToSection={scrollToSection} />

      {/* GMH Organization Accent Link */}
      <HospitalAccent onSelectInquiryType={handleInquiryChange} />

      {/* Interactive Clinical Specialties selector */}
      <ClinicalFocuses
        onScrollToSection={scrollToSection}
        onSelectInquiryType={handleInquiryChange}
      />

      {/* Modern Facility Showcase with Image */}
      <FacilityShowcase />

      {/* Mentorship & Accredited Experience track */}
      <section
        id="timeline-section"
        className="bg-stone-900 text-gold-50 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[#1E6F60] font-bold">
              Professional Journey & Clinical Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Two Decades of Specialized Urology Excellence
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-sans font-light">
              Explore the accredited chronological track record of Dr. John
              Doe across major surgical departments and hospital networks globally.
            </p>
          </div>

          <ExperienceTimeline />
        </div>
      </section>

      {/* Diagnostic IPSS test helper */}
      <section
        id="calculator-section"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
      >
        <div className="text-center space-y-3.5 max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-[#18594D] font-bold">
            Interactive Diagnostics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
            Urinary Symptom Index (IPSS)
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed font-sans font-light">
            Measure lower urinary tract symptoms scientifically. Calculate your
            score to determine severity and extract customized clinical
            recommendations under European guideline standards.
          </p>
        </div>

        <SymptomScore
          onCalculate={(score, qol) =>
            console.log(`IPSS Score: ${score}, QoL: ${qol}`)
          }
          onInitiateInquiry={handleInquiryChange}
        />
      </section>

      {/* Main Booking and Privacy Vault Intake Desk */}
      <section
        id="booking-section"
        className="bg-gold-50/50 py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-gold-200/45"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[#18594D] font-bold">
              Patient Coordination Intake
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 tracking-tight">
              Secured Clinical Consultation Request
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed font-sans font-light">
              Submit your symptoms, referrals, or request a second-opinion
              review. Patient confidentiality is protected locally. A
              specialized medical coordinator will expedite your intake.
            </p>
          </div>

          <ConsultationDesk initialConcern={selectedConcern} />
        </div>
      </section>

      {/* Medical FAQs and Guidelines */}
      <EducationFAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}
