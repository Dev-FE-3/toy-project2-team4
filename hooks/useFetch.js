"use client";

import { useState, useEffect, useCallback } from "react";

export function useFetch(url, options = {}) {
  const { immediate = true, method = "GET", ...fetchOptions } = options;

  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (overrideOptions) => {
      const controller = new AbortController();
      const { signal } = controller;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(url, {
          method,
          ...fetchOptions,
          ...overrideOptions,
          signal,
          headers: {
            "Content-Type": "application/json",
            ...fetchOptions.headers,
            ...overrideOptions?.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });

        return { data, response };
      } catch (error) {
        const errorObject = error instanceof Error ? error : new Error(String(error));
        setState((prev) => ({ ...prev, loading: false, error: errorObject }));
        return { data: null, error: errorObject };
      }
    },
    [url],
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }

    const controller = new AbortController();
    return () => {
      controller.abort(); // 요청을 중단
    };
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}
