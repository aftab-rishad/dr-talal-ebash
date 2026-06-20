/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  Check,
  ClipboardList,
  RefreshCw,
  AlertCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Question {
  id: number;
  text: string;
  subtext: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Incomplete Emptying (Miktionsstörung)",
    subtext:
      "How often have you had a sensation of not emptying your bladder completely after you finished urinating?",
  },
  {
    id: 2,
    text: "Frequency (Pollakisurie)",
    subtext:
      "How often have you had to urinate again less than two hours after you finished urinated?",
  },
  {
    id: 3,
    text: "Intermittency (Harnstottern)",
    subtext:
      "How often have you found you stopped and started again several times when you urinated?",
  },
  {
    id: 4,
    text: "Urgency (Imperativer Harndrang)",
    subtext: "How often have you found it difficult to postpone urination?",
  },
  {
    id: 5,
    text: "Weak Stream (Abschwächung des Harnstrahls)",
    subtext: "How often have you had a weak urinary stream?",
  },
  {
    id: 6,
    text: "Straining (Einsatz von Bauchpresse)",
    subtext: "How often have you had to push or strain to begin urination?",
  },
  {
    id: 7,
    text: "Nocturia (Nykturie)",
    subtext:
      "Typically, how many times did you get up to urinate from the time you went to bed at night until you got up in the morning?",
  },
];

const QUALITY_OF_LIFE_QUESTION = {
  text: "Quality of Life (Lebensqualität)",
  subtext:
    "If you were to spend the rest of your life with your prostate condition just the way it is now, how would you feel about that?",
  options: [
    { value: 0, label: "Delighted (Ausgezeichnet)" },
    { value: 1, label: "Pleased (Sehr zufrieden)" },
    { value: 2, label: "Mostly Satisfied (Weitgehend zufrieden)" },
    { value: 3, label: "Mixed (Gemischt)" },
    { value: 4, label: "Mostly Dissatisfied (Weitgehend unzufrieden)" },
    { value: 5, label: "Unhappy (Unglücklich)" },
    { value: 6, label: "Terrible (Schrecklich)" },
  ],
};

const OPTIONS = [
  { value: 0, label: "Not at all (Gar nicht)" },
  { value: 1, label: "Less than 1 time in 5" },
  { value: 2, label: "Less than half the time" },
  { value: 3, label: "About half the time" },
  { value: 4, label: "More than half the time" },
  { value: 5, label: "Almost always (Fast immer)" },
];

interface SymptomScoreProps {
  onCalculate: (score: number, qol: number) => void;
  onInitiateInquiry: (focus: string) => void;
}

export default function SymptomScore({
  onCalculate,
  onInitiateInquiry,
}: SymptomScoreProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [qolAnswer, setQolAnswer] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1); // 1-7 for standard questions, 8 for QoL, 9 for results
  const [showExplanation, setShowExplanation] = useState(false);

  const totalQuestions = QUESTIONS.length + 1; // 7 standard + 1 QoL

  const handleSelectAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 280);
  };

  const handleSelectQol = (value: number) => {
    setQolAnswer(value);
    const sum = (Object.values(answers) as number[]).reduce(
      (acc: number, curr: number) => acc + curr,
      0,
    );
    onCalculate(sum, value);
    setTimeout(() => {
      setCurrentStep(9);
    }, 280);
  };

  const resetCalculator = () => {
    setAnswers({});
    setQolAnswer(null);
    setCurrentStep(1);
  };

  const scoreSum = (Object.values(answers) as number[]).reduce(
    (acc: number, curr: number) => acc + curr,
    0,
  );

  const getSeverity = (score: number) => {
    if (score <= 7)
      return {
        label: "Mild (Leichte Symptomatik)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-100",
        desc: "Your scores indicate a mild symptom level. Standard clinical guidelines generally recommend Active Surveillance (observational management), routine lifestyle optimization (limiting evening fluid intake, avoiding bladder irritants), and annual wellness reviews to monitor progression.",
      };
    if (score <= 19)
      return {
        label: "Moderate (Mittelschwere Symptomatik)",
        color: "text-amber-700 bg-amber-50 border-amber-100",
        desc: "Your scores represent a moderate symptom level, heavily Suggesting Benign Prostatic Hyperplasia (BPH). Clinical consultation is recommended for diagnostic confirmation (uroflowmetry, residual volume analysis) to explore medical therapies or keyhole treatments before bladder changes become structured.",
      };
    return {
      label: "Severe (Schwere Symptomatik)",
      color: "text-rose-700 bg-rose-50 border-rose-100",
      desc: "Your scores reflect advanced, severe urinary obstruction. There is an increased clinical risk of progressive bladder accommodation failure or urinary retention. Under modern German and UAE guidelines, advanced therapies such as HoLEP (laser enucleation) or laparoscopic surgical solutions represent the absolute gold-standard to preserve renal and detrusor bladder function.",
    };
  };

  const severity = getSeverity(scoreSum);

  return (
    <div
      id="calculator-section"
      className="border border-gold-200/50 bg-white shadow-xl rounded-3xl overflow-hidden max-w-4xl mx-auto"
    >
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-gold-50 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9ECFC6] mb-2">
              <ClipboardList className="w-4 h-4 text-gold-400 animate-pulse" />
              Diagnostic Clinical Screening
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-gold-100 font-normal">
              Digital IPSS Assessment Tool
            </h3>
            <p className="text-stone-300 text-xs md:text-sm mt-1 font-sans">
              Evaluate your lower urinary tract symptoms (LUTS) objectively
              using the international standard protocol.
            </p>
          </div>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="self-start md:self-center bg-stone-800 hover:bg-stone-700 text-xs text-gold-300 font-mono tracking-wider border border-gold-400/20 rounded-full px-4 py-2 transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {showExplanation ? "Hide Protocol" : "Clinic Standards"}
          </button>
        </div>

        {/* Clinical Info Panel */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-stone-950/40 rounded-xl mt-6 p-4 border border-gold-400/10 text-xs text-stone-300 leading-relaxed font-sans space-y-2"
            >
              <div className="font-mono text-gold-300 uppercase tracking-widest mb-1 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3 h-3 text-gold-400" /> Medical Context &
                Credibility
              </div>
              <p>
                The **International Prostate Symptom Score (IPSS)** is an
                validated diagnostic instrument utilized globally to categorize
                and track Benign Prostatic Hyperplasia (BPH).
              </p>
              <p>
                As a German-trained former **Chefarzt**, Dr. Talal Ebash
                coordinates care using structured algorithmic evaluation. Scores
                range from **0 to 35** across obstructive and irritative
                symptoms, accompanied by a dedicated **Quality of Life (QoL)
                index**.
              </p>
              <p className="text-gold-300">
                ⭐ Patient privacy is fully protected: This offline-first tool
                processes calculations locally in your browser. No personal
                health records are sent or stored without your explicit
                authorization.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 md:p-10 bg-gold-50/20">
        {currentStep <= QUESTIONS.length && (
          <div>
            {/* Progress indicators */}
            <div className="flex items-center justify-between mb-6 text-xs text-stone-500 font-mono">
              <span>Symptom Evaluation Progress</span>
              <span className="text-gold-600 font-medium">
                Question {currentStep} of {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="bg-gold-500 h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / totalQuestions) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Display */}
            {QUESTIONS.map((q) => {
              if (q.id !== currentStep) return null;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="font-mono text-xs text-gold-600 uppercase tracking-widest font-semibold">
                      Category {q.id}
                    </div>
                    <h4 className="font-serif text-xl md:text-2xl text-stone-900 leading-tight">
                      {q.text}
                    </h4>
                    <p className="text-stone-500 text-sm italic font-sans max-w-2xl">
                      {q.subtext}
                    </p>
                  </div>

                  {/* Standard Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                    {OPTIONS.map((opt) => {
                      const isSelected = answers[q.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectAnswer(q.id, opt.value)}
                          className={`flex items-center justify-between text-left px-5 py-4 rounded-xl border font-sans text-sm transition-all focus:outline-none cursor-pointer group ${
                            isSelected
                              ? "bg-stone-900 text-gold-100 border-stone-900 shadow-md"
                              : "bg-white text-stone-700 border-stone-200/80 hover:border-gold-400 hover:bg-gold-100/10"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center border font-bold ${
                                isSelected
                                  ? "bg-gold-500 text-stone-950 border-gold-400"
                                  : "bg-stone-50 text-stone-500 border-stone-200 group-hover:bg-gold-100/30 group-hover:text-gold-600"
                              }`}
                            >
                              {opt.value}
                            </span>
                            <span className="font-medium">{opt.label}</span>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-gold-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {/* Back action */}
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="mt-8 text-xs font-sans text-stone-500 hover:text-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                ← Back to previous question
              </button>
            )}
          </div>
        )}

        {/* QUALITY OF LIFE STEP */}
        {currentStep === QUESTIONS.length + 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4 text-xs text-stone-500 font-mono">
              <span>Final Assessment Parameter</span>
              <span className="text-gold-600 font-medium font-semibold">
                Question 8 of 8
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1 rounded-full mb-8 overflow-hidden">
              <div className="bg-gold-500 h-full w-full" />
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs text-gold-600 uppercase tracking-widest font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Core Diagnostic
                Parameter
              </div>
              <h4 className="font-serif text-xl md:text-2xl text-stone-900 leading-tight">
                {QUALITY_OF_LIFE_QUESTION.text}
              </h4>
              <p className="text-stone-500 text-sm italic font-sans max-w-2xl">
                {QUALITY_OF_LIFE_QUESTION.subtext}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
              {QUALITY_OF_LIFE_QUESTION.options.map((opt) => {
                const isSelected = qolAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectQol(opt.value)}
                    className={`flex items-center justify-between text-left px-5 py-3.5 rounded-xl border font-sans text-sm transition-all focus:outline-none cursor-pointer group ${
                      isSelected
                        ? "bg-stone-900 text-gold-100 border-stone-900 shadow-md"
                        : "bg-white text-stone-700 border-stone-200/80 hover:border-gold-400 hover:bg-gold-100/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center border font-bold ${
                          isSelected
                            ? "bg-gold-500 text-stone-950 border-gold-400"
                            : "bg-stone-50 text-stone-500 border-stone-200 group-hover:bg-gold-100/30 group-hover:text-gold-600"
                        }`}
                      >
                        {opt.value}
                      </span>
                      <span className="font-medium">{opt.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-gold-400" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentStep(7)}
              className="mt-6 text-xs font-sans text-stone-500 hover:text-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              ← Back to clinical questions
            </button>
          </motion.div>
        )}

        {/* RESULTS PAGE */}
        {currentStep === 9 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total IPSS Score Card */}
              <div className="bg-stone-950 text-gold-100 rounded-2xl p-6 flex flex-col justify-between border border-gold-400/15">
                <div className="font-mono text-xs uppercase tracking-widest text-[#9ECFC6] mb-2 font-bold flex items-center gap-1">
                  <ClipboardList className="w-3.5 h-3.5 text-gold-400" />{" "}
                  Calculated Score
                </div>
                <div className="my-4">
                  <div className="text-5xl md:text-6xl font-serif text-gold-100 font-light flex items-baseline">
                    {scoreSum}
                    <span className="text-xs text-stone-400 font-mono ml-2">
                      / 35 total
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-gold-400 h-full"
                      style={{ width: `${(scoreSum / 35) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-stone-400 text-xs mt-2 italic font-sans leading-relaxed">
                  Higher scores correlate with greater outlet obstruction and
                  irritative mechanics.
                </p>
              </div>

              {/* Quality of Life (QoL) Card */}
              <div className="bg-stone-950 text-gold-100 rounded-2xl p-6 flex flex-col justify-between border border-gold-400/15">
                <div className="font-mono text-xs uppercase tracking-widest text-[#9ECFC6] mb-2 font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-gold-400" /> Life
                  Index (QoL)
                </div>
                <div className="my-4">
                  <div className="text-5xl md:text-6xl font-serif text-gold-100 font-light flex items-baseline">
                    {qolAnswer}
                    <span className="text-xs text-stone-400 font-mono ml-2">
                      / 6 scale
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-gold-500 h-full"
                      style={{ width: `${((qolAnswer || 0) / 6) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gold-400 font-medium">
                  {QUALITY_OF_LIFE_QUESTION.options.find(
                    (o) => o.value === qolAnswer,
                  )?.label || "Not specified"}
                </div>
              </div>

              {/* Severity Category Card */}
              <div className="bg-stone-900 text-gold-100 rounded-2xl p-6 flex flex-col justify-between border border-gold-400/10">
                <div className="font-mono text-xs uppercase tracking-widest text-[#9ECFC6] mb-2 font-bold">
                  Clinical Classification
                </div>
                <div className="my-4">
                  <div className="text-xl md:text-2xl font-serif text-gold-100 leading-tight">
                    {scoreSum <= 7
                      ? "Mild (Leicht)"
                      : scoreSum <= 19
                        ? "Moderate (Mittel)"
                        : "Severe (Schwer)"}
                  </div>
                  <div
                    className={`inline-block mt-3 px-3 py-1 text-xs font-mono rounded-full border ${severity.color}`}
                  >
                    {scoreSum <= 7
                      ? "Class I"
                      : scoreSum <= 19
                        ? "Class II"
                        : "Class III"}
                  </div>
                </div>
                <p className="text-stone-400 text-xs mt-2 italic font-sans leading-relaxed">
                  Referencing current European Association of Urology (EAU)
                  directives.
                </p>
              </div>
            </div>

            {/* Clinical Assessment Box */}
            <div className="p-6 md:p-8 bg-white border border-stone-200/80 rounded-2xl shadow-inner space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h5 className="font-semibold text-stone-900 font-sans text-sm md:text-base uppercase tracking-wider">
                    {severity.label}
                  </h5>
                  <p className="text-stone-600 text-sm leading-relaxed max-w-4xl font-sans">
                    {severity.desc}
                  </p>
                </div>
              </div>

              {/* Dr Ebash custom gold standard advice */}
              <div className="bg-gold-100/30 border-l-4 border-gold-500 p-4 rounded-r-xl space-y-1 mt-4">
                <h6 className="font-serif text-sm text-gold-800 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold-500 animate-spin-slow" />{" "}
                  Expert Note on HoLEP & Minimally Invasive Care
                </h6>
                <p className="text-stone-700 text-xs leading-relaxed font-sans">
                  As the former Chefarzt who introduced HoLEP (laser
                  enucleation) extensively in Rhineland-Palatinate, Germany, Dr.
                  Ebash recommends HoLEP for moderate-to-severe symptoms. Unlike
                  traditional surgery, HoLEP utilizes laser precision to remove
                  large prostatic tissue blocks with near-zero bleeding, low
                  catheterization times, and complete histological safety. It
                  represents the pinnacle of patient-centered European urology.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <button
                onClick={resetCalculator}
                className="w-full sm:w-auto font-mono text-xs tracking-wider text-stone-500 hover:text-stone-900 px-5 py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-stone-200 hover:border-gold-400 bg-white rounded-xl"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset & Redo Quiz
              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() =>
                    onInitiateInquiry(
                      scoreSum >= 20
                        ? "HoLEP/BPH Laser Therapy"
                        : "General Urology Consultation",
                    )
                  }
                  className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-[#9ECFC6] font-sans font-medium text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-xl text-center cursor-pointer"
                >
                  Request Medical Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
