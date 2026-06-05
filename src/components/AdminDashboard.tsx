/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Users, Coins, Calendar, CheckCircle, Clock, Trash2, ShieldCheck, Sparkles, PlusCircle, Filter, RotateCcw } from "lucide-react";
import { Booking } from "../types";
import { SERVICES } from "../data/salonData";

interface AdminDashboardProps {
  bookings: Booking[];
  onConfirmBooking: (id: string) => void;
  onCancelBooking: (id: string) => void;
  onAddSimulatedBooking: (booking: Booking) => void;
}

export default function AdminDashboard({
  bookings,
  onConfirmBooking,
  onCancelBooking,
  onAddSimulatedBooking,
}: AdminDashboardProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed">("all");
  
  // States for simulated guest creator modal/popup
  const [showCreator, setShowCreator] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestServiceId, setGuestServiceId] = useState(SERVICES[0]?.id || "");
  const [guestDate, setGuestDate] = useState("");
  const [guestSlot, setGuestSlot] = useState("12:00 PM - 01:30 PM");

  // Calculate Metrics
  const totalBookCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  
  const estimatedRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + (b.finalPrice || 0), 0);

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const handleCreateWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !guestServiceId || !guestDate) return;

    const chosenService = SERVICES.find((s) => s.id === guestServiceId);
    const newGuestBooking: Booking = {
      id: `walkin-${Date.now()}`,
      serviceId: guestServiceId,
      serviceName: chosenService ? chosenService.name : "Beauty treatment",
      date: guestDate,
      timeSlot: guestSlot,
      customerName: `Walk-in: ${guestName}`,
      phone: guestPhone,
      status: "confirmed", // walkins directly confirmed
      createdAt: new Date().toISOString(),
      finalPrice: chosenService ? chosenService.minPrice : 1500,
    };

    onAddSimulatedBooking(newGuestBooking);
    
    // reset
    setGuestName("");
    setGuestPhone("");
    setGuestDate("");
    setShowCreator(false);
  };

  return (
    <div className="bg-slate-900 text-[#eceff4] rounded-3xl border border-slate-800 shadow-2xl p-6 overflow-hidden">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
            ADMIN REGISTRATION SHELF (PROTOTYPE METRICS)
          </span>
          <h3 className="text-2xl font-serif text-[#fff] font-bold tracking-wide mt-1">
            Bridal's Heaven Booking Dashboard
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Fully operational client-side supervisor console to test live data updates.
          </p>
        </div>

        <div>
          <button
            onClick={() => setShowCreator(!showCreator)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs font-bold font-sans tracking-wide rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Simulate Walk-in Guest
          </button>
        </div>
      </div>

      {/* KPI statistics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Metric 1 */}
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-850 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-wide block">
              Total Proposals
            </span>
            <span className="text-xl font-bold font-serif text-white">{totalBookCount}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-850 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-wide block">
              Pending Validation
            </span>
            <span className="text-xl font-bold font-serif text-amber-300">{pendingCount}</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-850 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-wide block">
              Confirmed Slots
            </span>
            <span className="text-xl font-bold font-serif text-emerald-300">{confirmedCount}</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-850 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-450">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-sans font-bold tracking-wide block">
              Projected Revenue
            </span>
            <span className="text-xl font-bold font-serif text-rose-300">
              Rs. {estimatedRevenue.toLocaleString()}
            </span>
          </div>
        </div>

      </div>

      {/* WALK-IN SIMULATOR FORM MODAL OVERLAY */}
      {showCreator && (
        <form
          onSubmit={handleCreateWalkin}
          className="bg-slate-800 p-5 rounded-2xl border border-amber-500/30 mb-6 space-y-4 animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Fast Walk-in Registrator
            </span>
            <button
              onClick={() => setShowCreator(false)}
              type="button"
              className="text-slate-400 hover:text-white shrink-0 text-xs font-bold uppercase"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">
                Guest Name
              </label>
              <input
                type="text"
                required
                placeholder="Amina Ahmed"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">
                Phone Connection
              </label>
              <input
                type="tel"
                required
                placeholder="0321 0000000"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">
                Treatment
              </label>
              <select
                value={guestServiceId}
                onChange={(e) => setGuestServiceId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">
                Booking Date
              </label>
              <input
                type="date"
                required
                value={guestDate}
                onChange={(e) => setGuestDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-bold mb-1">
                Time Interval
              </label>
              <select
                value={guestSlot}
                onChange={(e) => setGuestSlot(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="09:00 AM - 10:30 AM">09:00 - 10:30 AM</option>
                <option value="12:00 PM - 01:30 PM">12:00 - 01:30 PM</option>
                <option value="03:00 PM - 04:30 PM">03:00 - 04:30 PM</option>
                <option value="04:30 PM - 06:00 PM">04:30 - 06:00 PM</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl tracking-wide transition-all uppercase"
          >
            Log Walk-in & Add to Ledger
          </button>
        </form>
      )}

      {/* Booking list section */}
      <div>
        
        {/* Table Filter buttons */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-xl text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(["all", "pending", "confirmed", "completed"] as const).map((t) => {
              const active = filter === t;
              return (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize tracking-wide transition-colors ${
                    active ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Raw List of appointments */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-slate-800/30 border border-dashed border-slate-800 text-slate-500 text-xs">
            No booking records fit the selected filter category. Try simulator tool!
          </div>
        ) : (
          <div>
            {/* Mobile View: Clean Stacked Cards (Visible only on mobile, hidden on tablet md up) */}
            <div className="space-y-4 md:hidden">
              {filteredBookings.map((book) => (
                <div key={book.id} className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">{book.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{book.phone}</div>
                      <div className="text-[9px] text-amber-500 font-mono tracking-wider font-semibold">Ref: {book.id}</div>
                    </div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest ${
                        book.status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                          : book.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/25 animate-pulse"
                          : book.status === "completed"
                          ? "bg-blue-400/15 text-blue-300 border border-blue-400/20"
                          : "bg-slate-500/15 text-slate-400 border border-slate-500/20"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-sans">Service</span>
                      <span className="font-semibold text-amber-200">{book.serviceName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-sans">Est. Fee</span>
                      <span className="font-mono text-white font-bold text-sm">Rs. {book.finalPrice?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-sans">Date</span>
                      <span className="font-sans text-neutral-200">{book.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-sans">Time</span>
                      <span className="text-neutral-200">{book.timeSlot}</span>
                    </div>
                  </div>

                  {((book.status as string) === "pending" || (book.status as string) !== "cancelled") && (
                    <div className="flex gap-2 justify-end pt-2 border-t border-slate-800/35">
                      {book.status === "pending" && (
                        <button
                          onClick={() => onConfirmBooking(book.id)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {(book.status as string) !== "cancelled" && (
                        <button
                          onClick={() => onCancelBooking(book.id)}
                          className="px-3.5 py-1.5 bg-rose-950/70 hover:bg-rose-900 border border-rose-900/30 text-rose-300 font-bold rounded-lg text-[10px] transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop View: Full Table (Hidden on small viewports, shown on md up) */}
            <div className="hidden md:block overflow-x-auto rounded-xl">
              <table className="w-full text-left text-xs bg-slate-950/20">
                <thead className="bg-[#58102d]/20 text-slate-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Reference / Customer</th>
                    <th className="p-3">Requested service</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Fee Est.</th>
                    <th className="p-3 text-center">Interventions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredBookings.map((book) => {
                    return (
                      <tr key={book.id} className="hover:bg-slate-850/50 transition-colors">
                        
                        {/* Name / phone */}
                        <td className="p-3">
                          <div className="font-bold text-white max-w-[140px] truncate">
                            {book.customerName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{book.phone}</div>
                          <div className="text-[9px] text-[#7a1c43] font-bold tracking-tight">Ref: {book.id}</div>
                        </td>

                        {/* service */}
                        <td className="p-3 font-semibold text-amber-200">
                          {book.serviceName}
                        </td>

                        {/* date time */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="font-sans font-medium text-white">{book.date}</div>
                          <div className="text-[10px] text-slate-400">{book.timeSlot}</div>
                        </td>

                        {/* Status */}
                        <td className="p-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${
                              book.status === "confirmed"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : book.status === "pending"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                                : book.status === "completed"
                                ? "bg-blue-500/15 text-blue-400 border border-blue-500/15"
                                : "bg-slate-500/15 text-slate-400 border border-slate-500/15"
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="p-3 text-right font-mono font-bold text-[#fafafa]">
                          Rs. {book.finalPrice?.toLocaleString()}
                        </td>

                        {/* actions */}
                        <td className="p-3 text-center">
                          <div className="flex gap-1.5 items-center justify-center">
                            {book.status === "pending" && (
                              <button
                                onClick={() => onConfirmBooking(book.id)}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] transition-colors"
                                title="Confirm booking validation"
                              >
                                Approve
                              </button>
                            )}
                            {book.status !== "cancelled" && (
                              <button
                                onClick={() => onCancelBooking(book.id)}
                                className="px-2 py-1 bg-rose-950/70 hover:bg-rose-900 border border-rose-900/30 text-rose-300 font-bold rounded text-[10px] transition-colors"
                                title="Cancel / scrap slot"
                              >
                                Cancel
                              </button>
                            )}
                            {book.status === "cancelled" && (
                              <span className="text-[10px] text-slate-500 italic">No Actions</span>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
