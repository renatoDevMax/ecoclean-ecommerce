'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CarrinhoLoadingModalProps {
  isOpen: boolean;
  status: 'loading' | 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}

export default function CarrinhoLoadingModal({
  isOpen,
  status,
  message,
  onClose,
}: CarrinhoLoadingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimate(true), 10);
    } else {
      document.body.style.overflow = '';
      setAnimate(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="fixed inset-0 bg-[#183263]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`bg-[#EDF3F9] rounded-xl shadow-2xl w-full max-w-md relative z-10 transition-all duration-300 ease-in-out ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex flex-col items-center space-y-4">
            {status === 'loading' && (
              <div className="w-12 h-12 border-4 border-[#7EC13D] border-t-transparent rounded-full animate-spin" />
            )}

            {status === 'success' && (
              <div className="w-12 h-12 bg-[#7EC13D] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            {status === 'error' && (
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}

            {status === 'warning' && (
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            )}

            <p className="text-[#183263] text-center text-lg font-medium">{message}</p>

            {status !== 'loading' && (
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#183263] text-white rounded-lg hover:bg-[#142a52] transition-colors"
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
