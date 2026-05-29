// API service layer — single chokepoint between UI and backend.
// Today returns mocked responses; flip config.useMockApi to false once a real
// FastAPI / Supabase / Stripe backend is wired up.

import { config } from "@/lib/config";

export type ApiError = {
  status: number;
  code: string;
  message: string;
};

export class ApiRequestError extends Error implements ApiError {
  status: number;
  code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

type RequestOptions = RequestInit & { auth?: boolean; signal?: AbortSignal };

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("vr_auth_token");
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem("vr_auth_token", token);
  else window.localStorage.removeItem("vr_auth_token");
}

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${config.apiBaseUrl}${path}`;
  const headers = new Headers(opts.headers);
  if (!headers.has("Content-Type") && !(opts.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (opts.auth !== false) {
    const token = getAuthToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    let body: { code?: string; message?: string } = {};
    try { body = await res.json(); } catch { /* empty */ }
    throw new ApiRequestError(res.status, body.code ?? "unknown", body.message ?? res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

// ---------- Types ----------
export type UploadInitResponse = { uploadId: string; uploadUrl: string };
export type UploadCompleteResponse = { assetId: string; thumbnailUrl: string };

export type ProcessJob = {
  id: string;
  assetId: string;
  status: "queued" | "analyzing" | "captioning" | "scoring" | "rendering" | "ready" | "failed";
  progress: number; // 0..100
  viralScore?: number;
  thumbnailUrl?: string;
  message?: string;
};

export type ViralScore = {
  score: number;
  hookStrength: number;
  retention: number;
  shareability: number;
  reasons: string[];
};

export type AiRecommendation = {
  id: string;
  title: string;
  detail: string;
  impact: "low" | "medium" | "high";
};

export type Me = { id: string; email: string; plan: "free" | "pro" | "studio" };

// ---------- Mock helpers ----------
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min));

// ---------- API surface ----------
export const api = {
  // Auth
  async me(): Promise<Me> {
    if (config.useMockApi) { await delay(200); return { id: "mock-user", email: "creator@viralreel.ai", plan: "pro" }; }
    return request<Me>(config.endpoints.me);
  },

  // Uploads
  async initUpload(input: { filename: string; size: number; contentType: string }): Promise<UploadInitResponse> {
    if (config.useMockApi) {
      await delay(300);
      const uploadId = `up_${Math.random().toString(36).slice(2, 10)}`;
      return { uploadId, uploadUrl: `mock://upload/${uploadId}` };
    }
    return request<UploadInitResponse>(config.endpoints.uploadInit, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async completeUpload(input: { uploadId: string }): Promise<UploadCompleteResponse> {
    if (config.useMockApi) {
      await delay(400);
      return { assetId: `asset_${input.uploadId}`, thumbnailUrl: "" };
    }
    return request<UploadCompleteResponse>(config.endpoints.uploadComplete, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  // Processing
  async startProcessing(input: { assetId: string }): Promise<ProcessJob> {
    if (config.useMockApi) {
      await delay(250);
      return {
        id: `job_${Math.random().toString(36).slice(2, 10)}`,
        assetId: input.assetId,
        status: "queued",
        progress: 0,
      };
    }
    return request<ProcessJob>(config.endpoints.processStart, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async getProcessingStatus(jobId: string): Promise<ProcessJob> {
    if (config.useMockApi) {
      await delay(150);
      // The use-processing hook owns the simulated progression; this is a fallback.
      return { id: jobId, assetId: "asset_mock", status: "rendering", progress: rand(20, 90) };
    }
    return request<ProcessJob>(config.endpoints.processStatus(jobId));
  },

  async cancelProcessing(jobId: string): Promise<void> {
    if (config.useMockApi) { await delay(120); return; }
    return request<void>(config.endpoints.processCancel(jobId), { method: "POST" });
  },

  // AI
  async getViralScore(input: { assetId: string }): Promise<ViralScore> {
    if (config.useMockApi) {
      await delay(400);
      return {
        score: rand(72, 96),
        hookStrength: rand(60, 99),
        retention: rand(55, 95),
        shareability: rand(50, 95),
        reasons: [
          "Strong first-frame motion detected",
          "Trending audio match within top 1%",
          "Caption rhythm aligns with viewer retention peaks",
        ],
      };
    }
    return request<ViralScore>(config.endpoints.aiViralScore, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async getRecommendations(input: { assetId: string }): Promise<AiRecommendation[]> {
    if (config.useMockApi) {
      await delay(350);
      return [
        { id: "r1", title: "Cut first 0.4s", detail: "Push the hook earlier — viewers drop within 700ms.", impact: "high" },
        { id: "r2", title: "Add captions at 0:02", detail: "Lift retention by ~14% with rhythmic subtitles.", impact: "medium" },
        { id: "r3", title: "Loop last 1.2s", detail: "Boost replay probability and watch-time multiplier.", impact: "high" },
      ];
    }
    return request<AiRecommendation[]>(config.endpoints.aiRecommend, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
};

export { request as apiRequest };
