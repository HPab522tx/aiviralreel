import { useCallback, useEffect, useRef, useState } from "react";
import { api, type ProcessJob } from "@/services/api";
import { config } from "@/lib/config";

export type ProcessingStage = ProcessJob["status"];

const STAGE_ORDER: ProcessingStage[] = [
  "queued", "analyzing", "captioning", "scoring", "rendering", "ready",
];

export const STAGE_LABEL: Record<ProcessingStage, string> = {
  queued: "Queued",
  analyzing: "Analyzing scenes",
  captioning: "Generating captions",
  scoring: "Scoring virality",
  rendering: "Rendering reel",
  ready: "Ready",
  failed: "Failed",
};

function stageFromProgress(p: number): ProcessingStage {
  if (p >= 100) return "ready";
  if (p >= 80) return "rendering";
  if (p >= 60) return "scoring";
  if (p >= 35) return "captioning";
  if (p >= 10) return "analyzing";
  return "queued";
}

// Hook for tracking realtime rendering progress of a processing job.
// Today it simulates a tick; once the backend is live we'll subscribe to
// the realtime channel (Supabase Realtime or WS) keyed on the job id.
export function useProcessing(assetId: string | null) {
  const [job, setJob] = useState<ProcessJob | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(async () => {
    if (!assetId) return;
    const created = await api.startProcessing({ assetId });
    setJob(created);
  }, [assetId]);

  useEffect(() => {
    if (!job || job.status === "ready" || job.status === "failed") return;
    if (!config.useMockApi) {
      // Real backend: poll status (replace with WS subscription).
      const t = setInterval(async () => {
        const next = await api.getProcessingStatus(job.id);
        setJob(next);
        if (next.status === "ready" || next.status === "failed") clearInterval(t);
      }, 1500);
      timerRef.current = t;
      return () => clearInterval(t);
    }
    // Mock progression
    const t = setInterval(() => {
      setJob((prev) => {
        if (!prev) return prev;
        const p = Math.min(100, prev.progress + Math.random() * 7 + 2);
        const status = stageFromProgress(p);
        return { ...prev, progress: p, status, viralScore: status === "ready" ? 70 + Math.floor(Math.random() * 28) : prev.viralScore };
      });
    }, 350);
    timerRef.current = t;
    return () => clearInterval(t);
  }, [job?.id, job?.status]);

  const cancel = useCallback(async () => {
    if (!job) return;
    if (timerRef.current) clearInterval(timerRef.current);
    await api.cancelProcessing(job.id);
    setJob({ ...job, status: "failed", message: "Canceled" });
  }, [job]);

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setJob(null);
  }, []);

  const stageIndex = job ? STAGE_ORDER.indexOf(job.status) : -1;
  const isRunning = !!job && job.status !== "ready" && job.status !== "failed";

  return { job, start, cancel, reset, stageIndex, stages: STAGE_ORDER, isRunning };
}

export type UseProcessing = ReturnType<typeof useProcessing>;
