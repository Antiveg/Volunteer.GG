"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { ErrorAttributes } from '@/types'

interface Props {
    error: ErrorAttributes
}

const ErrorBox = ({ error } : Props) => {
  const router = useRouter();

  const status = typeof error === 'string' ? undefined : error.status;
  const message = typeof error === 'string' ? error : error.message;

  return (
    <div className="flex flex-col min-h-96 items-center justify-center w-full h-full bg-red-50 p-6 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">
        {status ?? 'Error'}
      </h1>
      <p className="text-xl text-red-700 mb-8">{message ?? 'Something went wrong.'}</p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        aria-label="Go back to home"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorBox;