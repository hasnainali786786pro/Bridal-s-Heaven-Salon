/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, ShieldCheck, MapPin, Award } from "lucide-react";
import { GOOGLE_RATING } from "../data/salonData";

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-rose-100 shadow-sm relative overflow-hidden">
      {/* Decorative luxury lines */}
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent top-0" />
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent bottom-0" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 items-center justify-center text-center">
          
          {/* Rating Block */}
          <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0 md:px-2">
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4].map((n) => (
                <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
              <span className="text-sm font-bold text-slate-800 ml-1">{GOOGLE_RATING.score}</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              {GOOGLE_RATING.totalReviews} Google Reviews
            </div>
          </div>

          {/* Location Block */}
          <div className="flex flex-col items-center justify-center border-r border-none md:border-solid border-slate-100 last:border-0 md:px-2">
            <div className="flex items-center gap-1.5 text-rose-800 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold font-serif">Toba Tek Singh</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium truncate max-w-[180px]">
              Iqbal Nagar, Akal Wala Rd
            </div>
          </div>

          {/* Genuine Products Badging */}
          <div className="flex flex-col items-center justify-center border-r border-slate-100 last:border-0 md:px-2">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold font-serif">Genuine Brands</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              100% Original Cosmetics
            </div>
          </div>

          {/* Verified Business Status */}
          <div className="flex flex-col items-center justify-center last:border-0 md:px-2">
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
              <Award className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-bold font-serif">Verified Business</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Open Daily - Closes 6 PM
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
