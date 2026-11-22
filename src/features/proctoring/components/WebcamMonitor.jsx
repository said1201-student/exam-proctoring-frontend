import { useEffect, useRef, useState } from "react";

export function WebcamMonitor() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ video: { width: 320, height: 240 }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setStatus("active");
      })
      .catch((err) => {
        if (!cancelled) setStatus(err.name === "NotAllowedError" ? "denied" : "error");
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const statusText = {
    loading: "Inawasha kamera...",
    active: "Kamera inafanya kazi",
    denied: "Kamera imezuiwa",
    error: "Hitilafu ya kamera",
  }[status];

  return (
    <div className="rounded-lg overflow-hidden border border-ink-100 bg-ink-900">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {status !== "active" && (
          <div className="absolute inset-0 grid place-items-center text-ink-300 text-xs p-2 text-center">
            {statusText}
          </div>
        )}
        {status === "active" && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-white text-xs">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            REC
          </div>
        )}
      </div>
      <div className="px-3 py-2 bg-ink-900 text-xs text-ink-300 border-t border-white/10">
        {status === "active" ? "🟢 Uangalizi unaendelea" : `⚠️ ${statusText}`}
      </div>
    </div>
  );
}