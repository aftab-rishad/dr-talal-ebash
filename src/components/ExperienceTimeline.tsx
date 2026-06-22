/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { CareerMilestone } from "../types";
import { Briefcase, Calendar, MapPin, Award, CheckCircle, ChevronDown, ChevronUp, Globe, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MILESTONES: CareerMilestone[] = [
  {
    id: "sgh-hod",
    role: "Consultant Urologist - Head of Department",
    regionalRole: "Chief Medical Officer / Head of Urology",
    institution: "General Medical Hospital",
    location: "New York, USA",
    period: "April 2024 - Present",
    duration: "2 Years 3 Months",
    isCurrent: true,
    achievements: [
      "Leading the Urology Department at General Medical Hospital, one of the largest private hospital groups in the region.",
      "Responsible for clinical governance, department strategy, and the delivery of high-quality urological care to a diverse patient population.",
      "Performing a wide range of urological procedures including minimally invasive, laparoscopic and endoscopic surgeries.",
      "Managing and mentoring a multidisciplinary urology team while ensuring adherence to international clinical standards and patient safety protocols."
    ],
    subspecialties: ["Surgical Oncology", "HoLEP", "Laparoscopic Urology", "Clinical Governance"]
  },
  {
    id: "sgh-consultant",
    role: "Consultant Urologist",
    regionalRole: "Specialist in Urology (Consultant)",
    institution: "General Medical Hospital",
    location: "New York, USA",
    period: "October 2023 - April 2024",
    duration: "7 Months",
    isCurrent: false,
    achievements: [
      "Delivered specialized urological care including diagnostic and surgical management of urological conditions.",
      "Contributed to the department's medical governance and clinical operations prior to assuming the Head of Department role."
    ],
    subspecialties: ["Diagnostics", "Therapeutic Management", "Surgical Urology"]
  },
  {
    id: "kio-chefarzt",
    role: "Chefarzt (Chief Medical Director - Urology)",
    regionalRole: "Chief Medical Director of Urology Clinic",
    institution: "State Regional Hospital",
    location: "California, USA",
    period: "July 2021 - October 2023",
    duration: "2 Years 4 Months",
    isCurrent: false,
    achievements: [
      "Led the Urology Department as Chief Physician, building it from the ground up into a fully functioning and highly successful surgical unit.",
      "Established and introduced key advanced services including laparoscopic urology, reconstructive urology, and HoLEP (Holmium Laser Enucleation of the Prostate) for BPH treatment.",
      "Oversaw all clinical, surgical, and bureaucratic operations, driving continuous improvement in qualitative safety and patient outcomes.",
      "Held the official 'Weiterbildungsermächtigung' (accredited training authorization) to structuredly train junior physicians pursuing specialization (Board Certification) in urology."
    ],
    subspecialties: ["HoLEP Pioneer", "Laparoscopic Urology", "Reconstructive Urology", "Structured Medical Training (Board training)"]
  },
  {
    id: "rmk-loa",
    role: "Leitender Oberarzt & Head of Oncology",
    regionalRole: "Senior Attending & Head of Uro-Oncology",
    institution: "University Medical Center",
    location: "Los Angeles, California, USA",
    period: "August 2016 - June 2021",
    duration: "4 Years 11 Months",
    isCurrent: false,
    achievements: [
      "Served as Senior Attending Urologist (Leitender Oberarzt) and officially directed the Section of Urological Oncology (Leiter der Onkologie).",
      "Managed highly complex uro-oncological cases including radical prostatectomies, cystectomies with urinary diversion, nephrectomies, and multi-modal treatment designs.",
      "Deputized for department leadership and held operational accountability for surgical schedules and intensive care parameters.",
      "Supervised, mentored, and certified junior medical staff through complex surgical guidelines."
    ],
    subspecialties: ["Surgical Oncology", "Urological Malignancies", "Radical Cystectomy & Prostatectomy"]
  },
  {
    id: "rmk-oa",
    role: "Oberarzt (Attending Urologist)",
    regionalRole: "Attending Urologist",
    institution: "University Medical Center",
    location: "Los Angeles, California, USA",
    period: "April 2015 - August 2016",
    duration: "1 Year 5 Months",
    isCurrent: false,
    achievements: [
      "Conducted specialized endoscopic, open, and minimally invasive urological surgeries.",
      "Co-managed outpatient clinical guidelines and led interdisciplinary tumor-boards."
    ],
    subspecialties: ["Endourology", "Clinical Oncology", "Staff Guidance"]
  },
  {
    id: "kio-facharzt",
    role: "Specialist (Board Certified Specialist)",
    regionalRole: "Board Certified Specialist",
    institution: "State Regional Hospital",
    location: "California, USA",
    period: "2013 - 2015",
    duration: "2 Years",
    isCurrent: false,
    achievements: [
      "Practiced as certified specialist urologist upon completing the comprehensive National Board Certification.",
      "Performed advanced diagnostics, flexible cystoscopies, and basic-to-moderate urological operations."
    ]
  },
  {
    id: "kio-resident",
    role: "Assistenzarzt (Urology Resident)",
    regionalRole: "Resident Doctor",
    institution: "State Regional Hospital",
    location: "California, USA",
    period: "2007 - 2013",
    duration: "6 Years",
    isCurrent: false,
    achievements: [
      "Completed 6 years of intensive structured surgical residency, dealing with full-spectrum urological cases and emergency urological trauma."
    ]
  },
  {
    id: "marienkrankenhaus",
    role: "Assistenzarzt (Resident Doctor)",
    regionalRole: "Resident in Urology",
    institution: "City General Hospital",
    location: "Chicago, Illinois, USA",
    period: "2006 - 2007",
    duration: "1 Year",
    isCurrent: false,
    achievements: [
      "Gained key initial clinical training within the highly respected City General Hospital department in Chicago."
    ]
  }
];

export default function ExperienceTimeline() {
  const [filterRegion, setFilterRegion] = useState<"all" | "ny" | "national">("all");
  const [expandedId, setExpandedId] = useState<string | null>("sgh-hod");

  const filteredMilestones = MILESTONES.filter((m) => {
    if (filterRegion === "all") return true;
    if (filterRegion === "ny") return m.location.includes("New York");
    if (filterRegion === "national") return m.location.includes("USA") && !m.location.includes("New York");
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Region Filter Segment */}
      <div className="flex justify-center">
        <div className="bg-stone-100 p-1 rounded-full border border-gold-200/50 inline-flex">
          <button
            onClick={() => setFilterRegion("all")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider transition-all cursor-pointer ${
              filterRegion === "all"
                ? "bg-stone-900 text-gold-200 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            All Milestones ({MILESTONES.length})
          </button>
          <button
            onClick={() => setFilterRegion("ny")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider transition-all cursor-pointer ${
              filterRegion === "ny"
                ? "bg-stone-900 text-gold-200 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            New York Headship
          </button>
          <button
            onClick={() => setFilterRegion("national")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider transition-all cursor-pointer ${
              filterRegion === "national"
                ? "bg-stone-900 text-gold-200 shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            National Clinical Track
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative max-w-4xl mx-auto pl-4 sm:pl-8 border-l border-gold-300/40 py-2 space-y-8">
        {filteredMilestones.map((milestone, index) => {
          const isExpanded = expandedId === milestone.id;
          return (
            <motion.div
              layout="position"
              key={milestone.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-8 sm:-left-12 top-1.5 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                milestone.isCurrent
                  ? "bg-stone-950 border-gold-400 text-gold-300 ring-4 ring-gold-200/30"
                  : "bg-white border-gold-300 text-stone-500 group-hover:border-stone-950 group-hover:text-stone-950"
              }`}>
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Box container */}
              <div className={`p-6 rounded-2xl border transition-all ${
                milestone.isCurrent
                  ? "bg-stone-950 text-gold-100 border-gold-400/25 shadow-xl"
                  : "bg-white text-stone-900 border-stone-200/80 hover:border-gold-300 shadow-sm"
              }`}>
                <div 
                  onClick={() => toggleExpand(milestone.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {milestone.isCurrent && (
                        <span className="bg-gold-500 text-stone-950 font-mono text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                          Current HOD
                        </span>
                      )}
                      <span className={`font-mono text-xs font-medium tracking-wide flex items-center gap-1 ${
                        milestone.isCurrent ? "text-gold-400" : "text-gold-600"
                      }`}>
                        <Calendar className="w-3.5 h-3.5 inline" /> {milestone.period}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-medium tracking-tight mt-1">
                      {milestone.role}
                    </h4>
                    {milestone.regionalRole && (
                      <p className={`text-xs italic font-sans ${milestone.isCurrent ? "text-stone-400" : "text-stone-500"}`}>
                        Regional Title: {milestone.regionalRole}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs mt-3 flex-wrap">
                      <span className={`font-semibold flex items-center gap-1 ${
                        milestone.isCurrent ? "text-stone-200" : "text-stone-700"
                      }`}>
                        <Globe className="w-3.5 h-3.5 text-gold-400" /> {milestone.institution}
                      </span>
                      <span className={`flex items-center gap-1 ${
                        milestone.isCurrent ? "text-stone-400" : "text-stone-500"
                      }`}>
                        <MapPin className="w-3.5 h-3.5" /> {milestone.location}
                      </span>
                    </div>
                  </div>

                  <button className={`p-2 rounded-full border transition-all ${
                    milestone.isCurrent 
                      ? "border-stone-800 hover:bg-stone-900 text-gold-300" 
                      : "border-stone-100 hover:bg-stone-50 text-stone-500"
                  }`}>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Achievements block */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-gold-300/10 space-y-4">
                        <div className="space-y-2.5">
                          <p className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                            milestone.isCurrent ? "text-gold-400" : "text-gold-600"
                          }`}>
                            Clinical Responsibilities & Milestones
                          </p>
                          <ul className="space-y-2">
                            {milestone.achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                                <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  milestone.isCurrent ? "text-gold-400" : "text-gold-600"
                                }`} />
                                <span className={milestone.isCurrent ? "text-stone-300" : "text-stone-600"}>
                                  {ach}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Subspecialties / Tags */}
                        {milestone.subspecialties && (
                          <div className="pt-2 space-y-2">
                            <p className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                              milestone.isCurrent ? "text-gold-400" : "text-gold-600"
                            }`}>
                              Accredited focus
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {milestone.subspecialties.map((sub, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider uppercase ${
                                    milestone.isCurrent
                                      ? "bg-stone-850 text-gold-300 border border-gold-400/10"
                                      : "bg-stone-100 text-stone-700 border border-stone-200"
                                  }`}
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Accredited clinical seal (National standards) */}
                        {milestone.location.includes("USA") && (
                          <div className={`flex items-center gap-2 p-3 rounded-lg border text-xs leading-relaxed ${
                            milestone.isCurrent
                              ? "bg-stone-900 border-gold-400/10 text-stone-300"
                              : "bg-gold-50/40 border-gold-200/40 text-stone-700"
                          }`}>
                            <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0" />
                            <span>
                              Evaluated and practiced under the stringent standards of the <strong>American Board of Urology (ABU)</strong>, conforming to high American Urological Association (AUA) directives.
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
