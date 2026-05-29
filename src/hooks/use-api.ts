import { useCallback, useEffect, useRef, useState } from "react";
import { ApiRequestError } from "@/services/api";

// Lightweight async hook with loading + error states. Drop-in for any
// api.* call without pulling in a query lib for prototype views.
export function useApi<TArgs extends unknown[], TData>(
  fn: (...args: TArgs) => Promise<TData>,
  opts: { immediate?: TArgs } = {},
) {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<ApiRequestError | Error | null>(null);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);

  const run = useCallback(async (...args: TArgs) => {
    setLoading(true); setError(null);
    try {
      const result = await fn(...args);
      if (mounted.current) setData(result);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      if (mounted.current) setError(err);
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    if (opts.immediate) void run(...opts.immediate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading, run, reset: () => { setData(null); setError(null); } };
}
