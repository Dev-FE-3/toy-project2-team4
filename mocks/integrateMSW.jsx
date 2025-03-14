"use client";

import { useEffect, useState } from "react";

export default function IntegrateMSW({ children }) {
  const [isWorkerStarted, setIsWorkerStarted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isWorkerStarted) {
      import("./browser")
        .then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }))
        .then(() => setIsWorkerStarted(true));
    }
  }, [isWorkerStarted]);

  return <>{children}</>;
}
