import { Link, useLocation } from "react-router-dom";
import { Card } from "../shared/components/Card";
import { Button } from "../shared/components/Button";

export default function ResultsPage() {
  const location = useLocation();
  const { score = 0, correctCount = 0, total = 5, answeredCount = 0, violations = 0 } =
    location.state || {};

  const passed = score >= 50;

  return (
    <div className="min-h-screen bg-ink-100 grid place-items-center p-6">
      <Card className="w-full max-w-lg text-center">
        <div
          className={`mx-auto h-20 w-20 rounded-full grid place-items-center text-4xl mb-4 ${
            passed ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {passed ? "🎉" : "😔"}
        </div>

        <h1 className="text-2xl font-semibold text-ink-900">
          {passed ? "Hongera! Umefaulu" : "Jaribu Tena"}
        </h1>
        <p className="text-sm text-ink-500 mt-1">
          {passed ? "Umefanya vizuri sana kwenye mtihani huu." : "Unaweza kujaribu tena baadaye."}
        </p>

        <div className="my-8">
          <p className="text-6xl font-bold text-brand-500">{score}%</p>
          <p className="text-sm text-ink-500 mt-2">
            {correctCount} kati ya {total} maswali sahihi
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm mb-8">
          <div className="bg-ink-100 rounded-md p-3">
            <p className="text-ink-500 text-xs">Zimejibiwa</p>
            <p className="font-semibold text-ink-900 mt-1">
              {answeredCount}/{total}
            </p>
          </div>
          <div className="bg-ink-100 rounded-md p-3">
            <p className="text-ink-500 text-xs">Sahihi</p>
            <p className="font-semibold text-success mt-1">{correctCount}</p>
          </div>
          <div className="bg-ink-100 rounded-md p-3">
            <p className="text-ink-500 text-xs">Ukiukwaji</p>
            <p className={`font-semibold mt-1 ${violations > 0 ? "text-danger" : "text-ink-900"}`}>
              {violations}
            </p>
          </div>
        </div>

        {violations > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-sm text-danger mb-6 text-left">
            ⚠️ Umeondoka kwenye ukurasa <strong>{violations}</strong> mara wakati wa mtihani.
            Tukio hili limerekodiwa.
          </div>
        )}

        <div className="flex gap-2">
          <Link to="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full">
              Rudi Dashboard
            </Button>
          </Link>
          <Link to="/exam/1" className="flex-1">
            <Button className="w-full">Jaribu Tena</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}