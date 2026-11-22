import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ExamRoomPage from "./pages/ExamRoomPage";
import ResultsPage from "./pages/ResultsPage";
import { DashboardLayout } from "./shared/components/layout/DashboardLayout";
import { Card } from "./shared/components/Card";

function Placeholder({ title }) {
  return (
    <DashboardLayout>
      <Card>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-ink-500 mt-1">Ukurasa huu unakuja hivi karibuni.</p>
      </Card>
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/exam/:id" element={<ExamRoomPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/exams" element={<Placeholder title="Mitihani Yangu" />} />
      <Route path="/settings" element={<Placeholder title="Mipangilio" />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}