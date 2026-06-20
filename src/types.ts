/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClinicalFocus {
  id: string;
  title: string;
  germanTitle?: string;
  description: string;
  symptoms: string[];
  procedures: string[];
  iconName: string;
  premiumInsight: string;
}

export interface CareerMilestone {
  id: string;
  role: string;
  germanRole?: string;
  institution: string;
  location: string;
  period: string;
  duration: string;
  isCurrent: boolean;
  achievements: string[];
  subspecialties?: string[];
}

export interface IPSSQuestion {
  id: number;
  question: string;
  germanQuestion?: string;
  options: { value: number; label: string }[];
}

export interface AppointmentInquiry {
  fullName: string;
  email: string;
  phone: string;
  primaryConcern: string;
  consultationType: "dubai-inperson" | "second-opinion" | "urgent-advice";
  notes: string;
  referringDoctor?: string;
}
