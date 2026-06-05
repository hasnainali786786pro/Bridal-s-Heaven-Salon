/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Gift, Sparkles, Megaphone, Check } from "lucide-react";

interface PromoPopupProps {
  onApplyPromo: (code: string) => void;
}

export default function PromoPopup({ onApplyPromo }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Show after 3.5 seconds
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("heaven-promo-dismissed");
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("heaven-promo-dismissed", "true");
  };

  const handleApply = () => {
    onApplyPromo("HEAVEN20");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      handleDismiss();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div
        id="promo-card"
        className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100 animate-in fade-in zoom-in-95 duration-300"
      >
        {/* Decor Header */}
        <div className="bg-gradient-to-r from-rose-800 via-[#7a1c43] to-amber-600 px-6 py-8 text-center text-white relative">
          <div className="absolute top-2 right-2">
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Promo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3 backdrop-blur-md">
            <Gift className="w-6 h-6 text-amber-300 fill-amber-300 animate-bounce" />
          </div>
          <span className="text-amber-300 text-[10px] uppercase tracking-widest font-bold block mb-1">
            Bridal Season Exclusive
          </span>
          <h3 className="text-2xl font-serif font-semibold tracking-wide">
            Flat 20% Discount
          </h3>
          <p className="text-rose-100 text-xs font-sans mt-1">
            Valid on All Makeup & Hairstyling Treatments
          </p>
        </div>

        {/* Action Body */}
        <div className="p-6 text-center">
          <p className="text-sm text-slate-600 font-sans mb-4">
            Transform your look with Pakistan's premium artists at <strong className="text-rose-900">Bridal's Heaven Salon</strong> in Iqbal Nagar, Toba Tek Singh.
          </p>

          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 inline-block w-full mb-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-200 text-rose-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full tracking-wider border border-white">
              COUPON CODE
            </div>
            <span className="text-2xl font-mono font-bold tracking-widest text-[#7a1c43] block mt-1 select-all">
              HEAVEN20
            </span>
            <p className="text-[10px] text-slate-400 font-serif mt-1">
              *Applies automatically to bookings when you click activate below
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-500 hover:bg-slate-50 transition-colors"
            >
              No thanks, later
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2.5 rounded-xl bg-[#7a1c43] hover:bg-[#922252] text-xs font-medium text-white transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-300" />
                  Code Applied!
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Activate Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
