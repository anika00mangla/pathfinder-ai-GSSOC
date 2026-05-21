"use client";

import ErrorFallback from "@/components/error-fallback";

export default function QuizDetailError({ error, reset }) {
  return (
    <ErrorFallback
      error={error}
      reset={reset}
      heading="Failed to load quiz details"
      backHref="/interview"
      backLabel="Back to Interview Prep"
    />
  );
}
