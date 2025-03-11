"use client";

import { useEffect } from "react";

export default function IntegrateMSW({ children }) {
  const startClientMSW = async () => {
    if (typeof window !== "undefined") {
      const { worker } = await import("./browser");
      await worker.start({
        onUnhandledRequest: "bypass",
      });
    }
  };
  useEffect(() => {
    startClientMSW();
  }, []);

  return <>{children}</>;
}
