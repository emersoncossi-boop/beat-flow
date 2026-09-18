'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button
        className="mt-4 px-4 py-2 bg-[#8A3FFC] text-white rounded"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
