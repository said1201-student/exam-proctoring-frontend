import { DashboardLayout } from "../shared/components/layout/DashboardLayout";
import { Card } from "../shared/components/Card";

const stats = [
  { label: "Mitihani Iliyofanywa", value: "12", trend: "+2 wiki hii" },
  { label: "Wastani wa Alama", value: "78%", trend: "+5%" },
  { label: "Mitihani Inayokuja", value: "3", trend: "Wiki hii" },
  { label: "Muda Ulitumika", value: "18h", trend: "Jumla" },
];

const upcomingExams = [
  { id: 1, title: "Hisabati - Mtihani wa Mwisho", subject: "Hisabati", date: "2025-12-05", duration: "120 min", questions: 40 },
  { id: 2, title: "Fizikia - Mtihani wa Mwezi", subject: "Fizikia", date: "2025-12-08", duration: "90 min", questions: 30 },
  { id: 3, title: "Kemia - Jaribio la Vitendo", subject: "Kemia", date: "2025-12-12", duration: "60 min", questions: 20 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink-900">Karibu tena, Saidi 👋</h1>
        <p className="text-sm text-ink-500 mt-1">Hapa ni muhtasari wa shughuli zako.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="!p-5">
            <p className="text-sm text-ink-500">{s.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-semibold text-ink-900">{s.value}</p>
              <span className="text-xs text-success">{s.trend}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-ink-100 flex items-center justify-between">
          <h2 className="font-semibold text-ink-900">Mitihani Inayokuja</h2>
          <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            Ona yote →
          </button>
        </div>

        <div className="divide-y divide-ink-100">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-ink-100/40 transition-colors">
              <div className="h-10 w-10 rounded-md bg-brand-50 text-brand-600 grid place-items-center font-semibold shrink-0">
                {exam.subject[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink-900 truncate">{exam.title}</p>
                <p className="text-sm text-ink-500">
                  {exam.date} · {exam.duration} · Maswali {exam.questions}
                </p>
              </div>
              <button className="h-9 px-4 rounded-md bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors shrink-0">
                Anza
              </button>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}