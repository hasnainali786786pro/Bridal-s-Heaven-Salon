/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Calendar, Phone, Star, ShieldCheck, Heart } from "lucide-react";
import { GOOGLE_RATING } from "../data/salonData";

interface HeroProps {
  onOpenBooking: () => void;
  onNavigateToServices: () => void;
}

export default function Hero({ onOpenBooking, onNavigateToServices }: HeroProps) {
  return (
    <div className="relative min-h-[550px] sm:min-h-[620px] bg-slate-950 flex items-center justify-center overflow-hidden">
      
      {/* Immersive background photo layout overlaid with a luxury deep-rose gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80"
          alt="Premium luxury bridal look"
          className="w-full h-full object-cover object-center opacity-45 scale-105 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#2f0717]/85 to-slate-950/70" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Floating elegant decor dots and glows */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-rose-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Header Texts */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-400/35 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-amber-300 fill-amber-300/20" />
              Toba Tek Singh's No.1 Beauty Destination
            </div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              Bridal’s Heaven Salon <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-350 via-pink-400 to-amber-300">
                Where Beauty Meets Perfection
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Experience sheer royal comfort and luxury. Specializing in high-end Bridal & Party Make-up, Voluminous Hairstyling, Hydra Facials, Organic Mehndi Designs, and Pain-free Skin Lasers.
            </p>

            {/* Call to Trust stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold">{GOOGLE_RATING.score} / 5</span>
                <span className="text-slate-400">({GOOGLE_RATING.totalReviews} Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#73f39a]" />
                <span>Verified Studio</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-rose-700 via-[#7a1c43] to-amber-500 hover:from-rose-800 hover:to-amber-600 text-white font-serif font-bold tracking-wider text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                Book Appointment Now
              </button>

              <a
                href="tel:03332219354"
                className="w-full sm:w-auto px-7 py-4 bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-rose-350" />
                Call Salon: 0333 2219354
              </a>
            </div>

          </div>

          {/* Right Side visual image block (Elegant overlapping cards) */}
          <div className="hidden lg:col-span-5 lg:flex justify-center relative">
            <div className="relative w-80 h-96">
              
              {/* Decorative behind card */}
              <div className="absolute inset-0 bg-[#7a1c43] rounded-3xl rotate-6 scale-95 opacity-20 border border-rose-500/20" />
              
              {/* Main Card */}
              <div className="absolute inset-0 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop"
                  alt="Aesthetic professional party makeup"
                  className="w-full h-full object-cover scale-105 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Banner overlapping on Image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7a1c43] bg-white px-2 py-0.5 rounded-full inline-block mb-1.5">
                    Live Booking Offer
                  </span>
                  <h4 className="font-serif text-sm font-semibold tracking-wide">
                    Eid & Wedding Season Prep
                  </h4>
                  <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">
                    Get custom consultation passes worth Rs. 3,500 free with all bridal reservations.
                  </p>
                </div>
              </div>

              {/* Little Floating overlay card */}
              <div className="absolute -bottom-4 -left-10 bg-white p-3.5 rounded-2xl border border-rose-100 shadow-xl max-w-[190px] animate-bounce-slow">
                <div className="flex items-center gap-1.5 mb-1 text-[#7a1c43]">
                  <Heart className="w-4 h-4 fill-[#7a1c43]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Bride Favorite</span>
                </div>
                <span className="text-slate-850 text-xs font-bold font-serif leading-none block">
                  HD Airbrush Makeup
                </span>
                <span className="text-[9px] text-[#7a1c43] font-serif font-semibold mt-1 block">
                  Limited slots left today!
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
