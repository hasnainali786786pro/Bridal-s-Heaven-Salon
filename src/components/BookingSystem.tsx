/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, Sparkles, CheckCircle2, MessageSquare, ClipboardCheck, ArrowRight, BookOpen, AlertCircle, ShoppingBag } from "lucide-react";
import { SERVICES, COUPONS } from "../data/salonData";
import { Booking, Service } from "../types";

const TIME_SLOTS = [
  "09:00 AM - 10:30 AM",
  "10:30 AM - 12:00 PM",
  "12:00 PM - 01:30 PM",
  "01:30 PM - 03:00 PM",
  "03:00 PM - 04:30 PM",
  "04:30 PM - 06:00 PM"
];

interface BookingSystemProps {
  initialServiceId?: string;
  onNewBookingCreated: (booking: Booking) => void;
  activePromoFromPopup?: string;
  onClearPromoFromPopup?: () => void;
}

export default function BookingSystem({
  initialServiceId = "",
  onNewBookingCreated,
  activePromoFromPopup = "",
  onClearPromoFromPopup,
}: BookingSystemProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  
  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorText, setErrorText] = useState("");

  const activePromoCode = activePromoFromPopup || "";

  // Auto apply promo code if triggered from popup
  useEffect(() => {
    if (activePromoCode) {
      const match = COUPONS.find((c) => c.code.toUpperCase() === activePromoCode.toUpperCase());
      if (match) {
        setAppliedCouponCode(match.code);
        setDiscountPercent(match.discountPercent);
        setCouponInput(match.code);
        if (onClearPromoFromPopup) {
          onClearPromoFromPopup();
        }
      }
    }
  }, [activePromoCode, onClearPromoFromPopup]);

  // Sync state if initialServiceId changes
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId);

  // Calculate pricing
  const basePrice = selectedService ? selectedService.minPrice : 0;
  const discountVal = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = Math.max(0, basePrice - discountVal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");
    const codeClean = couponInput.trim().toUpperCase();
    const match = COUPONS.find((c) => c.code === codeClean);
    if (match) {
      setAppliedCouponCode(match.code);
      setDiscountPercent(match.discountPercent);
    } else {
      setErrorText("Invalid Coupon Code. Try HEAVEN20 or BRIDAL30!");
      setAppliedCouponCode("");
      setDiscountPercent(0);
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!selectedServiceId) {
      setErrorText("Please select a gorgeous service to proceed.");
      return;
    }
    if (!bookingDate) {
      setErrorText("Please pick a beautiful date for your appointment.");
      return;
    }
    if (!selectedSlot) {
      setErrorText("Please select an available time period.");
      return;
    }
    if (!customerName.trim()) {
      setErrorText("Kindly enter your name before booking.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setErrorText("Please enter a valid phone number (e.g. 0333 2219354) so we can reach you.");
      return;
    }

    // Prepare real Booking object
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      serviceId: selectedServiceId,
      serviceName: selectedService ? selectedService.name : "Beauty Service",
      date: bookingDate,
      timeSlot: selectedSlot,
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      email: customerEmail.trim() || undefined,
      status: "pending", // Starts as pending, owner confirms
      createdAt: new Date().toISOString(),
      appliedCoupon: appliedCouponCode || undefined,
      discountAmount: discountVal > 0 ? discountVal : undefined,
      finalPrice: finalPrice,
    };

    // Save to State/LocalStorage
    onNewBookingCreated(newBooking);
    setConfirmedBooking(newBooking);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setSelectedServiceId("");
    setBookingDate("");
    setSelectedSlot("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCouponInput("");
    setAppliedCouponCode("");
    setDiscountPercent(0);
    setErrorText("");
  };

  // Build the live Whatsapp direct booking text link mapping to 923332219354
  const buildWhatsAppLink = (booking: Booking): string => {
    const rawMsg = `Salam Bridal's Heaven Salon! I would like to confirm my beauty appointment:
------------------------------
✨ Booking Ref: ${booking.id}
💇 Service: ${booking.serviceName}
📆 Date: ${booking.date}
⏰ Time: ${booking.timeSlot}
👩 Name: ${booking.customerName}
📞 Phone: ${booking.phone}
💰 Final Fee Estimate: Rs. ${booking.finalPrice?.toLocaleString()}
------------------------------
Thank you! Please verify my slot.`;

    const encoded = encodeURIComponent(rawMsg);
    return `https://wa.me/923332219354?text=${encoded}`;
  };

  return (
    <div id="booking-system-wrapper" className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden text-slate-800">
      
      {/* Visual Indicator Progress Bar or Status Header */}
      <div className="bg-gradient-to-r from-rose-800 to-[#7a1c43] px-6 py-5 text-white flex justify-between items-center">
        <div>
          <h4 className="font-serif text-lg font-semibold tracking-wide flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-amber-300" />
            V.I.P Booking Wizard
          </h4>
          <p className="text-[11px] text-rose-100 mt-0.5">
            Book slots in Toba Tek Singh instantly. Open daily until 6:00 PM.
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full uppercase tracking-widest font-mono text-amber-300 font-semibold">
            SECURE CHECKOUT
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {errorText && (
          <div className="mb-4 bg-rose-50 text-rose-800 text-xs px-4 py-3 rounded-xl border border-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        {!confirmedBooking ? (
          <form onSubmit={handleCreateBooking} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEFT SIDE FORM inputs */}
              <div className="space-y-4">
                
                {/* 1. SELECT SERVICE */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    1. Select Service
                  </label>
                  <div className="relative">
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-rose-400 focus:bg-white transition-colors appearance-none"
                    >
                      <option value="">-- Choose a Luxury Treatment --</option>
                      {SERVICES.map((serv) => (
                        <option key={serv.id} value={serv.id}>
                          {serv.name} ({serv.priceRange})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 2. PICK DATE */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    2. Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-850 font-medium focus:outline-none focus:ring-1 focus:ring-rose-400 focus:bg-white transition-colors"
                    />
                    <div className="absolute right-3 top-2.5 pointer-events-none text-slate-400">
                      <CalendarIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 3. TIME SLOTS */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    3. Preferable Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-2.5 py-2 rounded-xl text-[10px] sm:text-xs font-semibold tracking-wide border transition-all text-center ${
                            active
                              ? "bg-rose-900 border-[#7a1c43] text-white shadow-sm"
                              : "bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT SIDE CUSTOMER DATA */}
              <div className="space-y-4 bg-rose-50/30 rounded-2xl p-5 border border-rose-100/40">
                
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-rose-800" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Ali"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-slate-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-800" />
                    WhatsApp/Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0333 2219354"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-slate-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-serif">
                    *Will be used for sending instant notifications.
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-rose-800" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. fatima@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-white border border-slate-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                </div>

              </div>

            </div>

            {/* PAYMENT SUMMARY AND PROMO COUPON INTERACTION */}
            <hr className="border-rose-100" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Promo validation form */}
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  Activate Promo Discount
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. HEAVEN20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-400 uppercase font-mono w-full"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all"
                  >
                    Apply
                  </button>
                </div>
                {appliedCouponCode && (
                  <span className="block text-[11px] text-[#7a1c43] font-sans mt-1.5 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                    Success! Coupon <strong>{appliedCouponCode}</strong> applied ({discountPercent}% discount).
                  </span>
                )}
              </div>

              {/* Dynamic Live pricing invoice Card */}
              <div className="bg-[#7a1c43]/5 border border-rose-200 rounded-2xl p-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7a1c43] flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3 text-rose-700" /> Estimated Pricing Detail
                </span>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Base:</span>
                    <span className="font-medium">
                      {selectedService ? `Rs. ${basePrice.toLocaleString()}` : "Rs. 0"}
                    </span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount ({discountPercent}%):</span>
                      <span>- Rs. {discountVal.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-rose-100/50 my-1" />
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-800 text-sm">Amount Payable:</span>
                    <span className="text-xl font-serif font-black text-[#58102d]">
                      Rs. {finalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="inline-flex gap-1.5 items-center bg-amber-500/10 text-amber-900 text-[10px] px-2 py-0.5 rounded-full mt-1">
                    <Sparkles className="w-3 h-3 text-amber-600 fill-amber-300" />
                    <span>Loyalty Points Projected: +{Math.round(finalPrice / 100)} Points</span>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA BOOK SUBMIT BUTTON */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-rose-800 via-[#7a1c43] to-amber-600 hover:from-rose-900 hover:to-amber-700 text-white font-serif tracking-wider font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-98 inline-flex items-center justify-center gap-2"
              >
                Book Appointment & Lock Slot
                <ArrowRight className="w-4 h-4 text-rose-200 animate-pulse" />
              </button>
            </div>

          </form>
        ) : (
          /* CONFIRMED BOOKING STATE ANIMATED CARDS */
          <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in-95 duration-400">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-150 text-emerald-800 mb-2 shadow-inner">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h5 className="font-serif text-2xl font-bold text-slate-900">
                Booking Proposal Created!
              </h5>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Thank you <strong className="text-rose-900">{confirmedBooking.customerName}</strong>. Your requested slot is locked on hold for 15 minutes.
              </p>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3 shadow-inner">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Services:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.serviceName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Appointment Date:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Time Sequence:</span>
                <span className="font-bold text-slate-880">{confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Phone Trace:</span>
                <span className="font-mono font-bold text-slate-800">{confirmedBooking.phone}</span>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-200/60 pt-2 text-sm">
                <span className="font-semibold text-slate-600">Total Price:</span>
                <span className="font-bold text-[#7a1c43]">Rs. {confirmedBooking.finalPrice?.toLocaleString()}</span>
              </div>
            </div>

            {/* SIMULATED WHATSAPP CONFIRMATION CTA */}
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="p-3 bg-rose-50 text-rose-900 border border-rose-100 rounded-xl text-xs flex items-start gap-2.5 text-left">
                <MessageSquare className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <strong className="block font-sans font-semibold">Verify Instantly on WhatsApp!</strong>
                  To speed up confirmation, click below to dispatch a pre-filled booking copy directly to our Toba Tek Singh reception helpline.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  onClick={resetForm}
                  className="px-5 py-3 rounded-xl border border-slate-300 text-xs text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
                >
                  Book Another Service
                </button>
                <a
                  href={buildWhatsAppLink(confirmedBooking)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  Send WhatsApp Confirmation
                  <ArrowRight className="w-4 h-4 text-emerald-200 animate-pulse" />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
