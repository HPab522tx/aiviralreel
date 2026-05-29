import { useCallback, useEffect, useRef, useState } from "react";
import { api, ApiRequestError } from "@/services/api";

export type UploadStatus = "idle" | "initializing" | "uploading" | "finalizing" | "done" | "error" | "canceled";

export type UploadTask = {
  id: string;
  file: File;
  progress: number; // 0..100
  status: UploadStatus;
  uploadId?: string;
  assetId?: string;
  error?: string;
};

type Listener = (tasks: UploadTask[]) => void;

// Simple in-memory upload queue. Swap the mock progression for XHR/fetch
// against a real signed-URL upload when the backend is ready.
export function useUpload() {
  const [tasks, setTasks] = useState<UploadTask[]>([]);
  const tasksRef = useRef<UploadTask[]>([]);
  const aborters = useRef<Map<string, () => void>>(new Map());

  useEffect(() => { tasksRef.current = tasks; }, [tasks]);

  const patch = useCallback((id: string, p: Partial<UploadTask>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...p } : t)));
  }, []);

  const runTask = useCallback(async (task: UploadTask) => {
    let canceled = false;
    aborters.current.set(task.id, () => { canceled = true; });
    try {
      patch(task.id, { status: "initializing" });
      const init = await api.initUpload({
        filename: task.file.name,
        size: task.file.size,
        contentType: task.file.type || "application/octet-stream",
      });
      if (canceled) return;
      patch(task.id, { status: "uploading", uploadId: init.uploadId });

      // Simulated chunk progress — replace with real upload PUT loop later.
      await new Promise<void>((resolve, reject) => {
        const tick = () => {
          if (canceled) return reject(new Error("canceled"));
          const current = tasksRef.current.find((t) => t.id === task.id);
          const p = Math.min(100, (current?.progress ?? 0) + Math.random() * 9 + 3);
          patch(task.id, { progress: p });
          if (p >= 100) resolve();
          else setTimeout(tick, 280);
        };
        tick();
      });

      patch(task.id, { status: "finalizing" });
      const done = await api.completeUpload({ uploadId: init.uploadId });
      if (canceled) return;
      patch(task.id, { status: "done", progress: 100, assetId: done.assetId });
    } catch (err) {
      if (canceled) { patch(task.id, { status: "canceled" }); return; }
      const message = err instanceof ApiRequestError ? err.message : err instanceof Error ? err.message : "Upload failed";
      patch(task.id, { status: "error", error: message });
    } finally {
      aborters.current.delete(task.id);
    }
  }, [patch]);

  const enqueue = useCallback((files: File[] | FileList) => {
    const next: UploadTask[] = Array.from(files).map((file) => ({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      file,
      progress: 0,
      status: "idle",
    }));
    setTasks((prev) => [...next, ...prev]);
    next.forEach((t) => void runTask(t));
    return next.map((t) => t.id);
  }, [runTask]);

  const cancel = useCallback((id: string) => {
    aborters.current.get(id)?.();
  }, []);

  const remove = useCallback((id: string) => {
    cancel(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, [cancel]);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => t.status !== "done"));
  }, []);

  return { tasks, enqueue, cancel, remove, clearCompleted };
}

export type UseUpload = ReturnType<typeof useUpload>;
export type { Listener };
