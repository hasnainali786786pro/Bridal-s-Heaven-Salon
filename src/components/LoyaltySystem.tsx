/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, Search, Sparkles, Plus, CheckCircle, Flame, Shield, ArrowRight } from "lucide-react";
import { LOYALTY_TIERS } from "../data/salonData";

interface LoyaltyUserMock {
  phone: string;
  name: string;
  points: number;
}

export default function LoyaltySystem() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [matchedUser, setMatchedUser] = useState<LoyaltyUserMock | null>(null);
  const [searched, setSearched] = useState(false);
  const [justUpgraded, setJustUpgraded] = useState(false);

  // Simple database on client state
  const [loyaltyDB, setLoyaltyDB] = useState<{ [phone: string]: LoyaltyUserMock }>({
    "03332219354": { phone: "03332219354", name: "Fatima Noor", points: 120 },
    "03214455823": { phone: "03214455823", name: "Ayesha Khan", points: 350 },
    "03001234567": { phone: "03001234567", name: "Nimra Sheikh", points: 820 },
  });

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPh = phoneNumber.replace(/[^0-9]/g, "");
    setSearched(true);
    
    // Look up in DB
    const found = (Object.values(loyaltyDB) as LoyaltyUserMock[]).find((user) => user.phone.includes(cleanPh) || cleanPh.includes(user.phone));
    if (found) {
      setMatchedUser(found);
    } else {
      // Create a mock user on the fly if they look up a new number
      const newMock: LoyaltyUserMock = {
        phone: cleanPh || "03123456789",
        name: phoneNumber.length > 5 ? "Lovely Guest" : "Guest Member",
        points: 0
      };
      setMatchedUser(newMock);
    }
  };

  const getTierDetails = (points: number) => {
    if (points >= 1500) {
      return { tier: "Platinum", nextTier: "Ultimate Master", gap: 0, progress: 100, color: "text-blue-400 bg-blue-500/10 border-blue-500/35" };
    } else if (points >= 800) {
      return { tier: "Gold", nextTier: "Platinum", gap: 1500 - points, progress: ((points - 800) / 700) * 100, color: "text-amber-500 bg-amber-500/10 border-amber-500/35" };
    } else if (points >= 300) {
      return { tier: "Silver", nextTier: "Gold", gap: 800 - points, progress: ((points - 300) / 500) * 100, color: "text-slate-300 bg-slate-300/10 border-slate-300/35" };
    } else {
      return { tier: "Bronze", nextTier: "Silver", gap: 300 - points, progress: (points / 300) * 100, color: "text-amber-800 bg-amber-800/10 border-amber-800/35" };
    }
  };

  const handleAddPointsSim = () => {
    if (!matchedUser) return;
    const addedPoints = 150;
    const upgradedPoints = matchedUser.points + addedPoints;
    
    const updated = {
      ...matchedUser,
      points: upgradedPoints
    };

    setMatchedUser(updated);
    
    // Sync back to db
    setLoyaltyDB((prev) => ({
      ...prev,
      [matchedUser.phone]: updated
    }));

    setJustUpgraded(true);
    setTimeout(() => setJustUpgraded(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden p-6 text-slate-800">
      
      {/* Title */}
      <div className="mb-6">
        <span className="text-[10px] bg-amber-100 font-sans tracking-widest font-extrabold uppercase text-[#7a1c43] px-2.5 py-1 rounded-full mb-2 inline-block">
          💝 BEAUTY LOYALTY CLUB
        </span>
        <h3 className="font-serif text-2xl font-semibold text-slate-800">
          Bridal’s Heaven Rewards Tracker
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Every session earns you rewards. Collect points and unlock premium free services, birthday blows, and airbrush makeup upgrades!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Lookup left block */}
        <div className="space-y-4">
          <form onSubmit={handleQuery} className="bg-rose-50/40 border border-rose-150 p-4 rounded-2xl">
            <span className="block text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">
              Enter Phone to Check Points Ledger
            </span>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="e.g. 03332219354"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-2.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1.5 p-1.5 rounded-lg bg-[#7a1c43] hover:bg-rose-900 text-white transition-colors"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 italic font-serif mt-2">
              *New guests can type their phone to register instant accounts. Try 03332219354!
            </p>
          </form>

          {/* Tiers catalog info */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
              Club Privileges Reference
            </span>
            {LOYALTY_TIERS.map((tier) => (
              <div key={tier.tier} className="flex gap-3 text-xs items-start p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white transiton-colors">
                <div className="p-1 rounded-lg bg-rose-50 text-[#7a1c43] mt-0.5">
                  <Award className="w-4 h-4 fill-rose-100" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    {tier.tier} Tier{" "}
                    <span className="text-[10px] text-slate-400 font-mono">
                      (min {tier.pointsNeeded} pts)
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-normal">{tier.perks}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Query output card right block */}
        <div id="loyalty-card" className="h-full">
          {!searched ? (
            <div className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-rose-105 flex flex-col items-center justify-center p-6 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-rose-300 animate-pulse fill-rose-50 mb-2" />
              <span className="text-xs font-serif font-semibold">Ready to Lookup Account</span>
              <p className="text-[10px] max-w-xs mt-1 leading-normal text-slate-400">
                Type in your phone number left to retrieve your pre-bridal vouchers or simulate points growth!
              </p>
            </div>
          ) : (
            matchedUser && (
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl space-y-4 border border-rose-900 border-opacity-30 relative overflow-hidden h-full">
                {/* Gold glowing background touches */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 font-extrabold uppercase">
                      ACTIVE BEAUTY PASS
                    </span>
                    <h4 className="text-lg font-serif text-[#fff] font-bold mt-0.5">
                      {matchedUser.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Phone: {matchedUser.phone}
                    </span>
                  </div>

                  {/* Tier Label badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                      getTierDetails(matchedUser.points).color
                    }`}
                  >
                    {getTierDetails(matchedUser.points).tier}
                  </span>
                </div>

                <hr className="border-slate-800" />

                {/* Score display */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-805/40 p-3 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                      Redeemable Points
                    </span>
                    <span className="text-2xl font-mono text-amber-300 font-semibold">{matchedUser.points}</span>
                  </div>
                  <div className="bg-slate-805/40 p-3 rounded-xl border border-slate-800 flex flex-col justify-center">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                      Account Status
                    </span>
                    <span className="text-xs text-white font-serif flex items-center gap-1 mt-0.5 font-bold">
                      <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                      Active VIP
                    </span>
                  </div>
                </div>

                {/* Progress bar to next tier */}
                {getTierDetails(matchedUser.points).gap > 0 ? (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Progress to {getTierDetails(matchedUser.points).nextTier}</span>
                      <span className="font-bold text-white">
                        {getTierDetails(matchedUser.points).gap} pts needed
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${getTierDetails(matchedUser.points).progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-400 font-sans italic font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 fill-emerald-500 text-slate-900" />
                    Congratulations! You reached the Ultimate Platinum tier!
                  </div>
                )}

                {/* SIMULATE VALUE INCREMENT */}
                <div className="border border-amber-500/10 bg-amber-500/5 p-3 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-spin" /> Sandbox Simulator
                    </span>
                    <span className="text-slate-400">Add beauty visit</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={handleAddPointsSim}
                      type="button"
                      className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1 text-center transition-colors shadow-md uppercase"
                    >
                      <Plus className="w-3 h-3" /> Log Mock Visit (+150 pts)
                    </button>
                    {justUpgraded && (
                      <span className="text-[10px] text-emerald-300 font-bold animate-pulse inline-flex items-center">
                        Points logged successfully!
                      </span>
                    )}
                  </div>
                </div>

              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
}
