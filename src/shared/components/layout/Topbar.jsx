import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-ink-100 flex items-center px-4 lg:px-8 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden h-10 w-10 grid place-items-center rounded-md hover:bg-ink-100"
        aria-label="Fungua menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1" />

      <button className="h-10 w-10 grid place-items-center rounded-md hover:bg-ink-100 relative">
        <svg className="h-5 w-5 text-ink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger" />
      </button>

      <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
        Toka
      </Button>
    </header>
  );
}