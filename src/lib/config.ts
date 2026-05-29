// Frontend runtime config. Public values only — secrets belong in server fns.
// Wire to backend later by setting VITE_API_BASE_URL in env.

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
  wsBaseUrl: import.meta.env.VITE_WS_BASE_URL ?? "",
  useMockApi: (import.meta.env.VITE_USE_MOCK_API ?? "true") !== "false",
  app: {
    name: "ViralReel AI",
    version: "0.1.0",
  },
  features: {
    auth: false,        // flip when Supabase auth is wired
    billing: false,     // flip when Stripe is wired
    realtime: true,     // mock realtime channel for progress
    aiGateway: false,   // flip when OpenAI / Lovable AI is wired
    ffmpeg: false,      // flip when server-side FFmpeg is wired
  },
  upload: {
    maxFileSizeMB: 2048,
    accept: ["video/mp4", "video/quicktime", "video/webm"],
    chunkSizeMB: 8,
  },
  endpoints: {
    uploadInit: "/uploads/init",
    uploadChunk: "/uploads/chunk",
    uploadComplete: "/uploads/complete",
    processStart: "/process/start",
    processStatus: (id: string) => `/process/${id}/status`,
    processCancel: (id: string) => `/process/${id}/cancel`,
    aiRecommend: "/ai/recommend",
    aiViralScore: "/ai/viral-score",
    trends: "/trends",
    analytics: "/analytics",
    me: "/auth/me",
    login: "/auth/login",
    logout: "/auth/logout",
    billingCheckout: "/billing/checkout",
    billingPortal: "/billing/portal",
  },
} as const;

export type AppConfig = typeof config;
