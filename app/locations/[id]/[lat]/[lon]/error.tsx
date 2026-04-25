"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ color: "red", padding: 24 }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset} style={{ marginTop: 16 }}>
        Try again
      </button>
    </div>
  );
}
