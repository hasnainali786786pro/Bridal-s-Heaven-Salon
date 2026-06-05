/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Phone, Calendar, Menu, X, Star } from "lucide-react";
import { GOOGLE_RATING } from "../data/salonData";

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Navbar({ currentTab, onTabChange, onOpenBooking }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Brand Section */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-800 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/30" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wide text-slate-800 uppercase block leading-none">
                Bridal’s Heaven
              </span>
              <span className="text-[10px] sm:text-xs font-sans text-rose-800 font-semibold tracking-widest block uppercase">
                Salon & Skin Spa
              </span>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer ${
                    active
                      ? "text-[#7a1c43] border-b-2 border-[#7a1c43] pb-1"
                      : "text-slate-500 hover:text-[#7a1c43]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* CTA Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:03332219354"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#7a1c43] border border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-rose-800" />
              0333 2219354
            </a>
            <button
              onClick={onOpenBooking}
              className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-rose-800 to-[#7a1c43] hover:from-rose-900 text-white text-xs font-serif font-bold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              Book Appointment
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:03332219354"
              className="p-2 rounded-xl border border-slate-100 bg-rose-50/50 text-rose-900 text-xs font-bold flex items-center sm:hidden"
              aria-label="Call salon quick"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer selection menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-rose-100 bg-white/95 backdrop-blur-lg animate-in slide-in-from-top duration-250">
          <div className="px-4 py-4 space-y-2.5">
            {menuItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold block ${
                    active ? "bg-rose-50 text-[#7a1c43] font-black" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <hr className="border-rose-50/70" />

            {/* In-drawer primary CTA bookings */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="tel:03332219354"
                className="py-3 rounded-xl text-xs font-bold text-center border border-rose-200 text-rose-900 bg-rose-50 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                Call Salon
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenBooking();
                }}
                className="py-3 bg-gradient-to-r from-rose-800 to-[#7a1c43] text-[#fff] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
