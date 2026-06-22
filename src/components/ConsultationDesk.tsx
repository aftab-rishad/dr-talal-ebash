/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AppointmentInquiry } from "../types";
import {
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Award,
  FileText,
  Phone,
  Printer,
  Send,
  Clock,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConsultationDeskProps {
  initialConcern?: string;
}

export default function ConsultationDesk({
  initialConcern = "General Consultation",
}: ConsultationDeskProps) {
  const [inquiries, setInquiries] = useState<AppointmentInquiry[]>([]);
  const [formData, setFormData] = useState<AppointmentInquiry>({
    fullName: "",
    email: "",
    phone: "",
    primaryConcern: initialConcern,
    consultationType: "newyork-inperson",
    notes: "",
    referringDoctor: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"book" | "my-bookings">("book");

  // Sync initial concern
  useEffect(() => {
    if (initialConcern) {
      setFormData((prev) => ({ ...prev, primaryConcern: initialConcern }));
    }
  }, [initialConcern]);

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("doe_consultations");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load consultations", e);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (
    type: "newyork-inperson" | "second-opinion" | "urgent-advice",
  ) => {
    setFormData((prev) => ({ ...prev, consultationType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const updated = [formData, ...inquiries];
      setInquiries(updated);
      localStorage.setItem("doe_consultations", JSON.stringify(updated));
      setSubmitting(false);
      setSuccessMsg(
        "Your consultation slot has been reserved. In accordance with national healthcare regulation and HIPAA standard, our chief clinical coordinator will reach out to you within 4 hours.",
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        primaryConcern: "General Consultation",
        consultationType: "newyork-inperson",
        notes: "",
        referringDoctor: "",
      });
    }, 1200);
  };

  const handleClear = (index: number) => {
    const updated = inquiries.filter((_, i) => i !== index);
    setInquiries(updated);
      localStorage.setItem("doe_consultations", JSON.stringify(updated));
  };

  // Get dynamic document list required based on selected clinical focus
  const getDocumentGuide = (concern: string) => {
    switch (concern) {
      case "Surgical Oncology / Uro-Oncology":
        return [
          { name: "Recent PSA lab logs (within 3 months)", required: true },
          {
            name: "Prostate/Bladder MRI mpMRI logs (DICOM format CD or cloud link)",
            required: true,
          },
          {
            name: "Histopathology reports from prior biopsies",
            required: true,
          },
          {
            name: "Current medication list & hematological labs",
            required: false,
          },
        ];
      case "HoLEP / Prostate Enlargement (BPH)":
        return [
          { name: "Prior Uroflowmetry recordings / graphs", required: false },
          {
            name: "Post-void residual (PVR) ultrasound reports if available",
            required: false,
          },
          { name: "Serum Creatinine & PSA levels", required: true },
          {
            name: "Current BPH medications (e.g., Duodart, Tamsulosin)",
            required: true,
          },
        ];
      case "Minimally Invasive Laparoscopy":
        return [
          {
            name: "Abdominal/Pelvic CT Scan visual archives & reports",
            required: true,
          },
          { name: "Previous abdominal surgical histories", required: true },
          {
            name: "Surgical safety clearance from cardiologist (if over 65)",
            required: false,
          },
        ];
      default:
        return [
          {
            name: "Referral note from primary urologist / internist",
            required: false,
          },
          { name: "Latest routine kidney function panel", required: true },
          { name: "Detailed timeline of symptom progression", required: false },
        ];
    }
  };

  const doctorDocuments = getDocumentGuide(formData.primaryConcern);

  return (
    <div
      id="booking-section"
      className="bg-white border border-gold-200/50 rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto"
    >
      {/* Navigation tabs */}
      <div className="bg-stone-900 px-6 py-4 flex items-center justify-between border-b border-gold-400/20">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setActiveTab("book");
              setSuccessMsg(null);
            }}
            className={`font-mono text-xs uppercase tracking-wider cursor-pointer pb-2 transition-all ${
              activeTab === "book"
                ? "text-gold-200 border-b-2 border-gold-400 font-bold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            Clinical Scheduling
          </button>
          <button
            onClick={() => setActiveTab("my-bookings")}
            className={`font-mono text-xs uppercase tracking-wider cursor-pointer pb-2 transition-all relative ${
              activeTab === "my-bookings"
                ? "text-gold-200 border-b-2 border-gold-400 font-bold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            My Saved Requests ({inquiries.length})
            {inquiries.length > 0 && (
              <span className="absolute -top-1.5 -right-3.5 bg-gold-400 text-stone-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {inquiries.length}
              </span>
            )}
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-stone-400 font-mono text-[10px]">
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span>
            Active Response Desk: <strong>EST (New York)</strong>
          </span>
        </div>
      </div>

      <div className="p-6 md:p-10">
        {activeTab === "book" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Consultation Form: Left Column */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              {successMsg ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-stone-900 space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-serif text-lg font-bold text-emerald-950">
                      Registration Confirmed
                    </span>
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed font-sans">
                    {successMsg}
                  </p>
                  <div className="p-4 bg-emerald-100/30 rounded-xl space-y-2 border border-emerald-200/50">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                      Pre-Appointment Task Checklist
                    </p>
                    <p className="text-stone-600 text-[11px] leading-relaxed font-sans">
                      Please arrange to have your medical records and digital
                      imaging files sent securely or ready for upload prior to
                      your scheduled review session.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSuccessMsg(null)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-mono tracking-wide cursor-pointer transition-colors"
                    >
                      Make Another Placement
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("my-bookings");
                        setSuccessMsg(null);
                      }}
                      className="px-4 py-2 bg-white border border-emerald-200 hover:border-emerald-300 rounded-lg text-xs font-mono tracking-wide cursor-pointer text-stone-700"
                    >
                      View Active List
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Select consultation mode */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-stone-500 uppercase tracking-wider">
                      Consultation Pathway
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleTypeSelect("newyork-inperson")}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between h-20 cursor-pointer ${
                          formData.consultationType === "newyork-inperson"
                            ? "bg-stone-950 text-gold-200 border-stone-950 shadow-md"
                            : "bg-stone-50 text-stone-600 border-stone-200 hover:border-gold-300"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider block font-bold">
                          New York Clinic
                        </span>
                        <span className="text-xs font-serif font-light block">
                          General Medical Health
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTypeSelect("second-opinion")}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between h-20 cursor-pointer ${
                          formData.consultationType === "second-opinion"
                            ? "bg-stone-950 text-gold-200 border-stone-950 shadow-md"
                            : "bg-stone-50 text-stone-600 border-stone-200 hover:border-gold-300"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider block font-bold">
                          Second Opinion
                        </span>
                        <span className="text-xs font-serif font-light block">
                          Global Teleconsult
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTypeSelect("urgent-advice")}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between h-20 cursor-pointer ${
                          formData.consultationType === "urgent-advice"
                            ? "bg-stone-950 text-gold-200 border-stone-950 shadow-md"
                            : "bg-stone-50 text-stone-700 border-stone-200 hover:border-gold-300"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider block font-bold">
                          Urgent Review
                        </span>
                        <span className="text-xs font-serif font-light block">
                          Oncology Fast Track
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Form inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Johnathan Davis / Patient Name"
                        required
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white font-sans transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="patient@example.com"
                        required
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white font-sans transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Mobile / WhatsApp{" "}
                        <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 XXXXXXX / +49 17X"
                        required
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white font-sans transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest">
                        Primary Clinical Concern
                      </label>
                      <select
                        name="primaryConcern"
                        value={formData.primaryConcern}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white font-sans transition-all"
                      >
                        <option value="Surgical Oncology / Uro-Oncology">
                          Urological Oncology / Prostate Cancer
                        </option>
                        <option value="HoLEP / Prostate Enlargement (BPH)">
                          Prostate Enlargement (HoLEP Therapy)
                        </option>
                        <option value="Minimally Invasive Laparoscopy">
                          Laparoscopic Procedures
                        </option>
                        <option value="Reconstructive Urology">
                          Reconstructive Surgery
                        </option>
                        <option value="General Consultation">
                          General Clinical Consultation
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest">
                      Referring Physician (Optional)
                    </label>
                    <input
                      type="text"
                      name="referringDoctor"
                      value={formData.referringDoctor}
                      onChange={handleChange}
                      placeholder="Dr. Med. / Consultant Name"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white font-sans transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-stone-500 uppercase tracking-widest">
                      Clinical Notes & Symptoms (Zusammenfassung)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes || ""}
                      onChange={handleChange}
                      placeholder="Briefly state duration of LUTS, elevated PSA levels, or relevant diagnostic findings."
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 focus:bg-white font-sans transition-all"
                    />
                  </div>

                  {/* Submission dispatch */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#18594D] hover:bg-[#18594D] text-white font-mono text-xs tracking-widest uppercase rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gold-300 border-t-transparent rounded-full animate-spin" />
                        Validating Clinical Standards...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        Dispatch Secure Inflow Request
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>

            {/* Preparation Helper: Right Column */}
            <div className="lg:col-span-5 bg-gold-50/30 border border-gold-200/40 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gold-600 shrink-0" />
                  <span className="font-serif text-lg font-medium text-stone-900">
                    Required Records Guide
                  </span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed font-sans">
                  To secure an expedited, medically comprehensive review during
                  your appointment with Dr. Doe, please prepare the following
                  dossier:
                </p>

                <div className="space-y-3 pt-2">
                  {doctorDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2 bg-white rounded-lg border border-stone-200/50 text-xs font-sans"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                          doc.required
                            ? "bg-rose-500 animate-pulse"
                            : "bg-stone-400"
                        }`}
                      />
                      <div className="space-y-0.5">
                        <span className="font-medium text-stone-800 leading-tight block">
                          {doc.name}
                        </span>
                        <span className="text-[9px] font-mono tracking-wider uppercase block">
                          {doc.required ? (
                            <span className="text-rose-600 font-semibold">
                              Strictly Requested
                            </span>
                          ) : (
                            <span className="text-stone-400">
                              Contextual / Helpful
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-900 text-gold-50/90 rounded-xl space-y-3.5 border border-gold-400/10">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" /> Fast-Track Oncology
                  Policy
                </div>
                <p className="text-stone-300 text-[11px] leading-relaxed font-sans">
                  Patients carrying urgent histopathology confirms of{" "}
                  <strong>Carcinoma / Prostate/Bladder malignancies</strong>{" "}
                  bypass traditional scheduling queues. Specify "Urgent Oncology
                  Review" to access immediate triage within 48 hours.
                </p>
                <div className="flex items-center gap-3 border-t border-gold-400/10 pt-3 text-[10px] font-mono text-[#1E6F60]">
                  <Award className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Licensed under National Medical Board</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Past inquiries queue stored in localStorage */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-serif text-xl text-stone-900 font-medium">
                Your Saved Registration Logs ({inquiries.length})
              </h4>
              <p className="text-stone-500 text-xs font-sans">
                Saved locally in browser sandbox
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-stone-400 space-y-3">
                <FileText className="w-10 h-10 mx-auto text-stone-300 stroke-1" />
                <p className="text-sm font-sans">
                  No saved consultation bookings found on this device.
                </p>
                <button
                  onClick={() => setActiveTab("book")}
                  className="text-xs font-mono text-gold-600 hover:text-gold-800 hover:underline cursor-pointer"
                >
                  Create a booking request now →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq, idx) => {
                  const documentsNeeded = getDocumentGuide(inq.primaryConcern);
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={idx}
                      className="p-5 border border-stone-200 rounded-2xl bg-stone-50/50 space-y-4 relative group"
                    >
                      <button
                        onClick={() => handleClear(idx)}
                        className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors bg-white rounded-lg border border-stone-100 hover:border-stone-300 cursor-pointer"
                        title="Remove record locally"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[9px] uppercase tracking-wider bg-stone-900 text-gold-200 px-2 py-0.5 rounded font-bold">
                              {inq.consultationType === "newyork-inperson"
                                ? "New York General Medical"
                                : inq.consultationType === "second-opinion"
                                  ? "Global Teleconsult"
                                  : "Urgent Oncology Review"}
                            </span>
                            <span className="text-stone-400 text-xs font-mono">
                              Local Log #{inquiries.length - idx}
                            </span>
                          </div>
                          <h5 className="font-serif text-lg text-stone-900 font-semibold mt-1">
                            {inq.fullName}
                          </h5>
                          <p className="text-stone-600 text-xs font-sans">
                            {inq.email} | {inq.phone}
                          </p>
                        </div>

                        <div className="space-y-1 md:text-right">
                          <p className="text-xs font-mono text-gold-700 uppercase tracking-wider font-semibold">
                            Primary Department Inflow
                          </p>
                          <div className="text-stone-800 text-xs font-medium font-serif italic">
                            {inq.primaryConcern}
                          </div>
                          {inq.referringDoctor && (
                            <p className="text-stone-500 text-[10px] font-sans">
                              Referrer: {inq.referringDoctor}
                            </p>
                          )}
                        </div>
                      </div>

                      {inq.notes && (
                        <div className="p-3 bg-white border border-stone-200/50 rounded-xl text-xs text-stone-600 leading-relaxed font-sans italic">
                          "{inq.notes}"
                        </div>
                      )}

                      {/* Required Records Checkoff inside saved logs */}
                      <div className="pt-2 border-t border-stone-200">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-2 font-bold">
                          Prepare the following dossier for clinical intake:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {documentsNeeded.map((doc, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center gap-1.5 text-xs text-stone-600 font-sans"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">{doc.name}</span>
                              {doc.required && (
                                <span className="text-[8px] font-mono text-rose-500 font-bold shrink-0">
                                  (Required)
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Print / Archive Action */}
                      <button
                        onClick={() => window.print()}
                        className="text-xs font-mono text-stone-600 hover:text-stone-900 flex items-center gap-1 mt-2 underline cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Referral PDF
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
