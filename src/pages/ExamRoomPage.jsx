import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button } from "../shared/components/Button";
import { WebcamMonitor } from "../features/proctoring/components/WebcamMonitor";
import { useTabMonitor } from "../features/proctoring/hooks/useTabMonitor";
import { useCountdown } from "../shared/hooks/useCountdown";

const sampleQuestions = [
  {
    id: 1,
    text: "Nini jina la mji mkuu wa Tanzania?",
    options: ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza"],
    correct: 1,
  },
  {
    id: 2,
    text: "Sayari ipi ni kubwa zaidi katika mfumo wa jua?",
    options: ["Mars", "Dunia", "Jupiter", "Saturn"],
    correct: 2,
  },
  {
    id: 3,
    text: "2 + 2 × 3 = ?",
    options: ["12", "8", "10", "6"],
    correct: 1,
  },
  {
    id: 4,
    text: "Nini maana ya 'photosynthesis'?",
    options: [
      "Mchakato wa kupumua",
      "Mchakato wa kutengeneza chakula kwa mimea",
      "Mchakato wa kuzaliana",
      "Mchakato wa kuoza",
    ],
    correct: 1,
  },
  {
    id: 5,
    text: "Nchi ipi ni jirani ya Tanzania upande wa kaskazini?",
    options: ["Msumbiji", "Kenya", "Zambia", "Malawi"],
    correct: 1,
  },
];

export default function ExamRoomPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [violations, setViolations] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);

  const handleViolation = useCallback((v) => {
    setViolations((prev) => [...prev, { ...v, at: new Date() }]);
  }, []);

  const handleExpire = useCallback(() => {
    alert("Muda umekwisha! Mtihani unawasilishwa kiotomatiki.");
    navigate("/results");
  }, [navigate]);

  const { formatted, isLow } = useCountdown(45 * 60, { onExpire: handleExpire });
  useTabMonitor(handleViolation);

  const current = sampleQuestions[currentIndex];
  const total = sampleQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / total) * 100);

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }));
  };

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(total - 1, i + 1));

  const submit = () => {
    const correctCount = sampleQuestions.filter(
      (q) => answers[q.id] === q.correct
    ).length;
    const score = Math.round((correctCount / total) * 100);

    navigate("/results", {
      state: {
        score,
        correctCount,
        total,
        answeredCount,
        violations: violations.length,
      },
    });
  };

  return (
    <div className="min-h-screen bg-ink-100">
      <header className="h-16 bg-white border-b border-ink-100 flex items-center px-4 lg:px-8 gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-2 font-semibold text-ink-900">
          <div className="h-9 w-9 rounded-md bg-brand-500 text-white grid place-items-center">E</div>
          <span className="hidden sm:inline">ExamPro</span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md items-center gap-2 mx-4">
          <div className="flex-1 h-2 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-ink-500 whitespace-nowrap">
            {answeredCount}/{total}
          </span>
        </div>

        <div className="flex-1 md:hidden" />

        <div
          className={clsx(
            "font-mono font-semibold text-lg px-3 py-1.5 rounded-md",
            isLow ? "bg-red-50 text-danger animate-pulse" : "bg-ink-100 text-ink-900"
          )}
        >
          ⏱ {formatted}
        </div>
      </header>

      {violations.length > 0 && (
        <div className="bg-red-50 border-b border-red-200 px-4 lg:px-8 py-2 text-sm text-danger">
          ⚠️ Umeondoka kwenye ukurasa {violations.length} mara. Tukio hili limerekodiwa.
        </div>
      )}

      <div className="p-4 lg:p-8 grid lg:grid-cols-[1fr_320px] gap-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-ink-100 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-ink-500">
              Swali {currentIndex + 1} kati ya {total}
            </span>
            {answers[current.id] !== undefined && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-success">
                ✓ Limejibiwa
              </span>
            )}
          </div>

          <h2 className="text-lg lg:text-xl font-semibold text-ink-900 mb-6">
            {current.text}
          </h2>

          <div className="space-y-3">
            {current.options.map((option, idx) => {
              const selected = answers[current.id] === idx;
              const letter = String.fromCharCode(65 + idx);
              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={clsx(
                    "w-full text-left flex items-center gap-3 p-4 rounded-md border transition-colors",
                    selected
                      ? "border-brand-500 bg-brand-50"
                      : "border-ink-300 hover:border-brand-500 hover:bg-ink-100/50"
                  )}
                >
                  <span
                    className={clsx(
                      "h-8 w-8 rounded-full grid place-items-center text-sm font-semibold shrink-0",
                      selected ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-700"
                    )}
                  >
                    {letter}
                  </span>
                  <span className="text-ink-900">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-ink-100">
            <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0}>
              ← Nyuma
            </Button>
            {currentIndex === total - 1 ? (
              <Button variant="danger" onClick={() => setShowSubmit(true)}>
                Wasilisha Mtihani
              </Button>
            ) : (
              <Button onClick={goNext}>Mbele →</Button>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-ink-700 mb-2">Uangalizi</h3>
            <WebcamMonitor />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-ink-100 p-4">
            <h3 className="text-sm font-semibold text-ink-700 mb-3">Maswali</h3>
            <div className="grid grid-cols-5 gap-2">
              {sampleQuestions.map((q, idx) => {
                const answered = answers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={clsx(
                      "h-9 rounded-md text-sm font-medium transition-colors",
                      isCurrent && "ring-2 ring-brand-500 ring-offset-1",
                      answered
                        ? "bg-brand-500 text-white"
                        : "bg-ink-100 text-ink-700 hover:bg-ink-300/40"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-ink-100 p-4 text-sm space-y-1.5">
            <div className="flex justify-between">
              <span className="text-ink-500">Zimejibiwa</span>
              <span className="font-medium text-success">{answeredCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">Hazijajibiwa</span>
              <span className="font-medium text-warning">{total - answeredCount}</span>
            </div>
          </div>
        </aside>
      </div>

      {showSubmit && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-ink-900">Wasilisha mtihani?</h3>
            <p className="text-sm text-ink-500 mt-2">
              Umejibu maswali <strong>{answeredCount}</strong> kati ya <strong>{total}</strong>.
              {answeredCount < total && " Maswali yaliyobaki hayatahesabiwa."}
            </p>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowSubmit(false)}>
                Ghairi
              </Button>
              <Button variant="danger" className="flex-1" onClick={submit}>
                Ndio, wasilisha
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}