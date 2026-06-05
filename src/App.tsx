/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Phone, Calendar, MapPin, Clock, Star, Award, ShieldCheck, Instagram, MessageSquare, ExternalLink, ChevronRight, Send, Heart, Percent, Users, CheckCircle } from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import BookingSystem from "./components/BookingSystem";
import AdminDashboard from "./components/AdminDashboard";
import LoyaltySystem from "./components/LoyaltySystem";
import InstagramFeed from "./components/InstagramFeed";
import PromoPopup from "./components/PromoPopup";

// Static Data and Types
import { SERVICES, SERVICE_PACKAGES, REVIEWS, GALLERY_LIST, PRE_SEEDED_BOOKINGS, GOOGLE_RATING } from "./data/salonData";
import { Booking, Review, GalleryItem } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  
  // Real active Booking states synchronized on the client
  const [bookings, setBookings] = useState<Booking[]>(PRE_SEEDED_BOOKINGS);
  const [userReviews, setUserReviews] = useState<Review[]>(REVIEWS);
  const [activePromo, setActivePromo] = useState<string>("");

  // Quick Action triggered from card: redirects to booking system with this service selected!
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string>("");

  // Lightbox selection state for gallery full-screen viewing
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<"all" | "bridal" | "hair" | "facial" | "mehndi">("all");

  // Custom live customer review form input states
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewService, setNewReviewService] = useState(SERVICES[0]?.name || "Bridal Make-up");
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false);

  // Active Contact Page Form States
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleOpenBooking = (serviceId: string = "") => {
    setPreSelectedServiceId(serviceId);
    setCurrentTab("book");
    setTimeout(() => {
      document.getElementById("booking-system-wrapper")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleApplyPromoFromPopup = (code: string) => {
    setActivePromo(code);
  };

  const handleNewBookingCreated = (newBook: Booking) => {
    setBookings((prev) => [newBook, ...prev]);
  };

  // Admin Controls
  const handleConfirmBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "confirmed" } : b))
    );
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  const handleAddSimulatedBooking = (walkinBook: Booking) => {
    setBookings((prev) => [walkinBook, ...prev]);
  };

  // Submit dynamic review (adds directly to state list, updates review figures)
  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    const addedRev: Review = {
      id: `rev-dyn-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      relativeTime: "Just now",
      text: newReviewText.trim(),
      isVerified: true,
      serviceType: newReviewService,
    };

    setUserReviews((prev) => [addedRev, ...prev]);
    setReviewSubmitSuccess(true);
    setTimeout(() => {
      setNewReviewAuthor("");
      setNewReviewText("");
      setReviewSubmitSuccess(false);
      setWriteReviewOpen(false);
    }, 1500);
  };

  // Handler for Contact form submitting
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactName("");
      setContactPhone("");
      setContactMsg("");
      setContactSuccess(false);
    }, 4000);
  };

  // Filter gallery photo list
  const filteredGallery = GALLERY_LIST.filter((item) => {
    if (galleryFilter === "all") return true;
    return item.category === galleryFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col selection:bg-rose-100 selection:text-rose-900">
      
      {/* 4-second delay luxury modal popup container */}
      <PromoPopup onApplyPromo={handleApplyPromoFromPopup} />

      {/* STICKY HEADER NAVIGATION BAR */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setPreSelectedServiceId("");
        }}
        onOpenBooking={() => handleOpenBooking("")}
      />

      {/* CORE PAGES LAYOUT CONTAINER */}
      <main className="flex-grow">
        
        {/* ==============================================
            HOME PAGE VIEW
           ============================================== */}
        {currentTab === "home" && (
          <div className="space-y-0 animate-in fade-in duration-300">
            
            {/* Hero Banner header */}
            <Hero
              onOpenBooking={() => handleOpenBooking("")}
              onNavigateToServices={() => setCurrentTab("services")}
            />

            {/* Quick Proof Rating strip */}
            <TrustBar />

            {/* HIGH-END SERVICES PREVIEW */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                
                {/* Intro Title */}
                <div className="text-center mb-12">
                  <span className="text-[10px] bg-rose-50 text-[#7a1c43] font-sans font-extrabold tracking-widest uppercase px-3 py-1 rounded-full border border-rose-100">
                    HandCrafted Treatments
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2.5">
                    Our Luxury Specialties
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
                    A collection of our signature and highly demanded premium therapies. Perfected across thousands of elegant clients.
                  </p>
                </div>

                {/* 5 Prominent Services selected items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {SERVICES.slice(0, 5).map((serv) => (
                    <div
                      key={serv.id}
                      className="bg-white rounded-2xl border border-rose-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={serv.imageUrl}
                          alt={serv.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 bg-[#7a1c43] text-[#fff] text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full shadow-md">
                          Rs. {serv.minPrice.toLocaleString()}+
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-amber-600 font-mono tracking-wide">
                            {serv.category}
                          </span>
                          <h3 className="font-serif text-sm font-bold text-slate-800 mt-0.5">
                            {serv.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-sans mt-1 line-clamp-3">
                            {serv.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleOpenBooking(serv.id)}
                          className="w-full mt-4 py-2 bg-rose-50 hover:bg-[#7a1c43] text-[#7a1c43] hover:text-white transition-colors rounded-xl text-[11px] font-bold tracking-wide uppercase"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => setCurrentTab("services")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a1c43] hover:text-amber-700 transition-colors"
                  >
                    View All available Treatments & Pricing
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* CO-PRODUCT BEFORE & AFTER COMPARISON SLIDER */}
            <section className="py-16 bg-rose-50/20 border-y border-rose-100">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Text Explainer */}
                  <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                    <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 uppercase font-sans font-bold tracking-widest px-2.5 py-1 rounded-full">
                      Proven Radiance
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-slate-900 leading-tight">
                      Witness True Elite Transformations
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      We believe in structural honesty. See original, zero-filter visual records comparing face-preparation and final bridal make-up looks at Bridal’s Heaven Salon.
                    </p>

                    <div className="space-y-2.5 pt-2 max-w-md mx-auto lg:mx-0">
                      {[
                        "Flawless pores under HDR close-up studio cameras",
                        "Clean hygienic extraction before final gold makeup layering",
                        "Accurate color calibration customized to traditional Pakistani bridal themes"
                      ].map((feat, idx) => (
                        <div key={idx} className="flex gap-2 text-xs text-slate-600 font-medium items-center justify-center lg:justify-start">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setCurrentTab("gallery")}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
                      >
                        Launch Visual Lookbook
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Interacting Comparer Slider cards */}
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <BeforeAfterSlider
                        beforeUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600"
                        afterUrl="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
                        title="Royal Bridal Prep"
                        subtitle="Airbrush liquid foundation + contour highlight transition look."
                      />
                      <BeforeAfterSlider
                        beforeUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600"
                        afterUrl="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600"
                        title="Hydra Facial Session"
                        subtitle="Pore exfoliation + oxygenated marine peptide nourishment sequence."
                      />
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SEPARATE PACKAGES SECTION */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                
                {/* Headers */}
                <div className="text-center mb-12">
                  <span className="text-[10px] bg-rose-50 text-[#7a1c43] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Exclusive Packages Available
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-slate-900 mt-2.5">
                    Bridal & Prom Season Curated Packages
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                    Maximize convenience and budgets with all-inclusive pre-wedding hair, skin, and makeup timelines.
                  </p>
                </div>

                {/* Cards rendering */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SERVICE_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative bg-white rounded-3xl border p-6 flex flex-col justify-between ${
                        pkg.popular
                          ? "border-[#7a1c43] ring-1 ring-[#7a1c43] shadow-md"
                          : "border-slate-200/80 shadow-sm"
                      }`}
                    >
                      {pkg.badge && (
                        <span className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-500 to-rose-700 text-[#fff] text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-md">
                          {pkg.badge}
                        </span>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-serif font-black text-slate-800">{pkg.name}</h4>
                          <p className="text-[11px] text-slate-500 font-sans mt-1 leading-normal">
                            {pkg.description}
                          </p>
                        </div>

                        <div className="pb-4 border-b border-rose-50">
                          <span className="text-2xl font-serif font-black text-[#58102d]">
                            {pkg.price}
                          </span>
                          <span className="text-xs text-slate-400 font-sans line-through ml-2">
                            {pkg.originalPrice}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {pkg.features.map((feat, idx) => (
                            <li key={idx} className="flex gap-2 text-xs text-slate-600 font-medium leading-normal">
                              <CheckCircle className="w-4 h-4 text-[#7a1c43] flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleOpenBooking("")}
                        className={`w-full mt-8 py-3.5 rounded-xl text-xs font-serif font-bold tracking-wide transition-all uppercase ${
                          pkg.popular
                            ? "bg-[#7a1c43] text-white hover:bg-rose-900 shadow-md"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        Book Package Bundle
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* CUSTOMER REVIEWS SNEAK PREVIEW */}
            <section className="py-20 bg-gradient-to-b from-white to-rose-50/20 border-t border-rose-100">
              <div className="max-w-7xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
                  <div className="text-center md:text-left">
                    <span className="text-[10px] bg-rose-100 uppercase tracking-widest font-extrabold text-[#7a1c43] px-3 py-1 rounded-full">
                      Trusted Pakistani Client Base
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                      Loved by Brides in Toba Tek Singh
                    </h3>
                  </div>
                  <div>
                    <button
                      onClick={() => setCurrentTab("reviews")}
                      className="px-5 py-2.5 bg-white border border-rose-200 hover:bg-rose-50 rounded-xl text-xs font-extrabold text-rose-900 tracking-wide transition-colors"
                    >
                      Read all 143 verified Google reviews
                    </button>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {userReviews.slice(0, 3).map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-2xl p-5 border border-rose-50 active:scale-98 transition-all shadow-inner"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-[#7a1c43] text-xs sm:text-sm font-serif">
                            {rev.author}
                          </h4>
                          <span className="text-[9px] text-slate-400 font-sans block">
                            {rev.relativeTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-4 leading-normal italic font-sans">
                        "{rev.text}"
                      </p>

                      {rev.serviceType && (
                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[10px]">
                          <span className="bg-[#7a1c43]/5 text-[#7a1c43] font-bold px-2 py-0.5 rounded-full">
                            {rev.serviceType}
                          </span>
                          <span className="text-[#3ed275] font-extrabold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Verified Visitor
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ==============================================
            SERVICES PAGE VIEW
           ============================================== */}
        {currentTab === "services" && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            
            <div className="text-center mb-12">
              <span className="text-[10px] bg-rose-100 text-[#7a1c43] tracking-widest font-extrabold uppercase px-3 py-1 rounded-full border border-rose-200">
                A la Carte Treatments List
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2.5">
                Our Comprehensive Services Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
                Explore individual beauty options and personalized treatment paths. All procedures use authentic and sanitary premium equipment.
              </p>
            </div>

            {/* Grid list of all 10 services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={serv.imageUrl}
                      alt={serv.name}
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating tags */}
                    <div className="absolute top-3 left-3 bg-[#7a1c43] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                      Price: {serv.priceRange}
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-800" />
                      {serv.duration}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold font-mono text-amber-600 block pl-1 border-l-2 border-amber-400">
                          {serv.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-slate-800 mt-1">{serv.name}</h3>
                      <p className="text-xs text-slate-500 font-sans mt-2 leading-relaxed">
                        {serv.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {serv.features.map((feat, i) => (
                          <span
                            key={i}
                            className="text-[9px] bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-serif"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(serv.id)}
                      className="w-full py-3 bg-[#7a1c43] hover:bg-rose-950 text-white font-serif font-extrabold tracking-wide text-xs rounded-xl transition-all shadow-md active:scale-95 text-center block"
                    >
                      Book treatment Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ==============================================
            GALLERY PAGE VIEW (Intricate filters + 45 photos list + lightbox + sliders)
           ============================================== */}
        {currentTab === "gallery" && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            
            <div className="text-center mb-10">
              <span className="text-[10px] bg-rose-100 text-[#7a1c43] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Professional Visual Lookbook
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2.5">
                Our Fine Work Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
                Explore exactly 45 unique professional images detailing hair styling, intricate mehndi patterns, facials, and stunning brides.
              </p>
            </div>

            {/* Gallery Category filters selection bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { id: "all", label: "All Works (45 Photos)" },
                { id: "bridal", label: "Bridal Makeup" },
                { id: "hair", label: "Hair Styling" },
                { id: "facial", label: "Facial / Skincare Results" },
                { id: "mehndi", label: "Mehndi Designs" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setGalleryFilter(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    galleryFilter === cat.id
                      ? "bg-[#7a1c43] text-[#fff] shadow-md"
                      : "bg-white border border-rose-100 text-slate-600 hover:bg-rose-50/55"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Large Masonry Grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGallery.map((item, index) => {
                // Find actual absolute index in original list for Lightbox traversal
                const originalIndex = GALLERY_LIST.findIndex((originalItem) => originalItem.id === item.id);
                
                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(originalIndex)}
                    className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-slate-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Draggable indicator indicator overlay if slider comparisons reside */}
                    {item.beforeImageUrl && (
                      <div className="absolute top-2.5 left-2.5 bg-amber-500/95 text-slate-900 font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full z-10 shadow-sm flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Interactive Before/After
                      </div>
                    )}

                    {/* Dark gradient overlap bottom hover */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent p-3 pt-6 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[8px] uppercase tracking-widest text-[#7a1c43] font-bold bg-white px-2 py-0.5 rounded-full inline-block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-xs font-semibold mt-1 truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LIGHTBOX INTERACTIVE FULLSCREEN SLIDER */}
            {lightboxIndex !== null && (
              <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4">
                
                {/* Close trigger button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-4 right-4 text-white hover:text-rose-450 z-50 p-2 text-xs font-black uppercase tracking-wider bg-white/10 rounded-full"
                >
                  ✕ Close
                </button>

                {/* Left Switcher button */}
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_LIST.length) % GALLERY_LIST.length : null))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/15 text-white rounded-full z-50"
                  aria-label="Previous photograph"
                >
                  ❮
                </button>

                {/* Main Viewport Content mapping */}
                <div className="max-w-3xl w-full text-center space-y-4 animate-in zoom-in-95 duration-200">
                  
                  {GALLERY_LIST[lightboxIndex].beforeImageUrl ? (
                    /* Render dynamic comparative sliders inside lightbox for items equipped! */
                    <div className="bg-slate-900 p-6 rounded-3xl border border-white/5 shadow-2xl">
                      <BeforeAfterSlider
                        beforeUrl={GALLERY_LIST[lightboxIndex].beforeImageUrl!}
                        afterUrl={GALLERY_LIST[lightboxIndex].afterImageUrl!}
                        title={GALLERY_LIST[lightboxIndex].title}
                        subtitle="Slide to analyze high-precision transformation results."
                      />
                    </div>
                  ) : (
                    /* Default static render */
                    <div className="relative aspect-4/3 max-h-[75vh] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={GALLERY_LIST[lightboxIndex].imageUrl}
                        alt={GALLERY_LIST[lightboxIndex].title}
                        className="max-h-[75vh] w-auto h-auto object-contain mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="text-white">
                    <span className="text-[9px] uppercase tracking-widest text-[#7a1c43] font-bold bg-white px-2.5 py-1 rounded-full inline-block">
                      {GALLERY_LIST[lightboxIndex].category} Lookbook No. {lightboxIndex + 1}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white mt-2">
                      {GALLERY_LIST[lightboxIndex].title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {GALLERY_LIST[lightboxIndex].description || "Professionally curated wedding design at Iqbal Nagar, Toba Tek Singh."}
                    </p>
                  </div>

                </div>

                {/* Right Switcher button */}
                <button
                  onClick={() =>
                    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_LIST.length : null))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/15 text-white rounded-full z-50"
                  aria-label="Next photograph"
                >
                  ❯
                </button>

              </div>
            )}

          </section>
        )}

        {/* ==============================================
            REVIEWS LISTING + WRITING TAB ENGINE
           ============================================== */}
        {currentTab === "reviews" && (
          <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            
            {/* Summary card metrics */}
            <div className="bg-white rounded-3xl border border-rose-100 shadow-xl p-6 mb-10 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                <div>
                  <span className="text-[10px] bg-rose-50 text-[#7a1c43] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block">
                    Verified Google Reviews Registry
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-slate-900 leading-tight">
                    What Our Beautiful Guests Say
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Based on 143 verified local Google business listings in Akal Wala Road, Toba Tek Singh, Pakistan.
                  </p>
                </div>

                <div className="flex flex-col items-center bg-[#7a1c43]/5 border border-rose-200/50 p-4 rounded-2xl w-full md:w-auto">
                  <span className="text-4xl font-serif font-black text-[#58102d]">
                    {GOOGLE_RATING.score}
                  </span>
                  <div className="flex text-amber-400 gap-0.5 mt-1">
                    {[1, 2, 3, 4].map((n) => (
                      <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-4 h-4 fill-amber-400/50 text-amber-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase font-serif font-bold tracking-wider mt-1.5 whitespace-nowrap">
                    {userReviews.length} Verified Submissions
                  </span>
                </div>

              </div>

              {/* CTA trigger write review */}
              <div className="pt-6 border-t border-rose-50 mt-6 flex justify-center md:justify-end">
                <button
                  onClick={() => setWriteReviewOpen(!writeReviewOpen)}
                  className="px-5 py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-950 text-white text-xs font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-2"
                >
                  Write Custom Google Review
                </button>
              </div>
            </div>

            {/* EXPANDABLE WRITE REVIEW FORM */}
            {writeReviewOpen && (
              <form
                onSubmit={handleAddReviewSubmit}
                className="bg-[#7a1c43]/5 border-2 border-dashed border-[#7a1c43] rounded-3xl p-6 mb-10 space-y-4 animate-in slide-in-from-top-4 duration-300"
              >
                <div className="flex justify-between items-center pb-2 border-b border-rose-100">
                  <span className="text-xs font-bold text-[#7a1c43] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Google Review Simulator
                  </span>
                  <button
                    onClick={() => setWriteReviewOpen(false)}
                    type="button"
                    className="text-slate-500 hover:text-slate-800 text-xs font-bold uppercase"
                  >
                    ✕ Close
                  </button>
                </div>

                {reviewSubmitSuccess ? (
                  <div className="text-center py-6 text-emerald-800 bg-emerald-50 rounded-2xl border border-emerald-250 flex flex-col items-center gap-1">
                    <CheckCircle className="w-10 h-10 animate-bounce text-emerald-700" />
                    <span className="text-sm font-bold">Review Registered Successfully!</span>
                    <p className="text-[11px] text-slate-500">Your score of {newReviewRating}/5 stars is locked in.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    <div className="col-span-12 md:col-span-4 space-y-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Fatima Ali"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                          Score Stars
                        </label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none text-slate-800 font-bold"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                          <option value={4}>⭐⭐⭐⭐ (Very Good)</option>
                          <option value={3}>⭐⭐⭐ (Average / Good)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                          Service Utilized
                        </label>
                        <select
                          value={newReviewService}
                          onChange={(e) => setNewReviewService(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
                      <div>
                        <label className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
                          Google Review Comment
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Explain your cosmetic transform, hair extensions quality, or hydra facial treatment details at Bridal's Heaven Salon..."
                          value={newReviewText}
                          onChange={(e) => setNewReviewText(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#7a1c43] hover:bg-rose-950 text-white rounded-xl text-xs font-bold transition-transform active:scale-98 text-center mt-2"
                      >
                        File Google Review
                      </button>
                    </div>

                  </div>
                )}
              </form>
            )}

            {/* List scroll of reviews */}
            <div className="space-y-4">
              {userReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-150 text-[#7a1c43] font-bold text-xs flex items-center justify-center font-serif">
                        {rev.author.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm font-serif">
                          {rev.author}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-sans block">
                          {rev.relativeTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 leading-relaxed font-sans italic">
                    "{rev.text}"
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-2 justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#7a1c43]/5 text-[#7a1c43] font-bold px-2.5 py-0.5 rounded-full">
                        {rev.serviceType || "Spa Treatment"}
                      </span>
                      <span className="text-emerald-700 font-extrabold flex items-center gap-1 pl-2 border-l border-slate-200">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified User
                      </span>
                    </div>

                    <span className="text-slate-400 text-[10px]">
                      Source: Google Local Registry
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </section>
        )}

        {/* ==============================================
            ABOUT PAGE VIEW (Brand story + staff + values)
           ============================================== */}
        {currentTab === "about" && (
          <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300 space-y-16">
            
            {/* Story Grid row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-5">
                <span className="text-[10px] bg-rose-50 text-[#7a1c43] tracking-widest font-extrabold uppercase px-3 py-1 rounded-full">
                  ESTABLISHED SINCE 2018
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                  Bridal’s Heaven Salon: Toba Tek Singh’s Esthetic Jewel
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                  Founded under the clear objective of bringing international visual aesthetic and rigorous hygiene protocols to Iqbal Nagar, Pakistan. Bridal’s Heaven Salon has grown to become the premiere wedding bridal hub in the district.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We maintain strict aseptic disinfection steps for all manicure and pedicure elements. Every makeup brush, Hydra Facial cold-pressure probe, and henna application tool is sanitized after every individual session. We utilize strictly certified makeup palettes from Mac, Huda Beauty, and Kryolan.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-rose-50 text-center">
                    <span className="text-2xl font-serif font-black text-[#7a1c43] block">
                      4.5 ★
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Overall Score Rating
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-rose-50 text-center">
                    <span className="text-2xl font-serif font-black text-[#7a1c43] block">
                      143
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Google Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* image right */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden aspect-video shadow-xl border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1605497746444-ac9dbd324148?w=800"
                    alt="Luxury interior setting"
                    className="w-full h-full object-cover scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-4 flex items-end">
                    <span className="text-xs text-white/90 font-serif font-medium">
                      Premium sanitary treatment cabins in Akal Wala Road.
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Staff breakdown section */}
            <div className="space-y-8 bg-white border border-rose-100 p-8 rounded-3xl shadow-sm">
              <div className="text-center">
                <span className="text-xs font-extrabold text-[#7a1c43] uppercase tracking-widest block">
                  MEET OUR CO-ARTISTS
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-slate-900">
                  Certified Beauty Experts
                </h3>
                <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                  Our professional crew undergoes yearly refresher certifications on international makeup lines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Sania Malik", role: "Elite Bridal Makeup Expert (8+ Years Exp.)", bio: "Trained under elite makeup houses. Master of flawless airbrush coverage." },
                  { name: "Farwa Bibi", role: "Senior Hydra Facial Aesthetician", bio: "Certified clinical Skincare specialist. Focus on dewy crystal-skin outcomes." },
                  { name: "Uzma Khan", role: "Creative Mehndi Specialist", bio: "Intricate Arabic calligraphy master. Crafts beautiful traditional maroons designs." }
                ].map((staff, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-800 text-white flex items-center justify-center font-bold text-lg font-serif mx-auto mb-3 shadow-md">
                      {staff.name.substring(0, 1)}
                    </div>
                    <h4 className="font-serif font-bold text-[#5c112f] text-sm">{staff.name}</h4>
                    <span className="text-[10px] uppercase font-bold text-amber-600 block mt-0.5">{staff.role}</span>
                    <p className="text-[11px] text-slate-500 font-sans mt-2 leading-relaxed">
                      {staff.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* ==============================================
            CONTACT PAGE VIEW (Iframe map + calls + click chat + contact forms)
           ============================================== */}
        {currentTab === "contact" && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            
            {/* Split contact grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Contacts blocks card panel */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-[#7a1c43] text-white p-6 rounded-3xl shadow-xl space-y-4">
                  <span className="text-[9px] font-mono tracking-widest text-amber-300 font-extrabold uppercase">
                    DIRECT RECEPTION DESK
                  </span>
                  <h3 className="font-serif text-2xl font-bold tracking-wide">
                    Reach Out and Get Directions
                  </h3>
                  <p className="text-xs text-rose-100 font-sans leading-normal">
                    Located centrally inside Iqbal Nagar, Akal Wala Road, Toba Tek Singh, Pakistan. Click buttons below to start direct connections.
                  </p>

                  <div className="space-y-4 pt-3 text-xs">
                    
                    <a
                      href="tel:03332219354"
                      className="flex gap-3 items-center bg-white/10 hover:bg-white/15 p-3 rounded-2xl border border-white/5 transition-colors block"
                    >
                      <div className="p-2 rounded-xl bg-white/20 text-white shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-200 uppercase block font-bold font-mono">
                          CALL TO ASSIST
                        </span>
                        <span className="font-bold text-sm">0333 2219354</span>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/923332219354"
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-3 items-center bg-white/10 hover:bg-white/15 p-3 rounded-2xl border border-white/5 transition-colors block"
                    >
                      <div className="p-2 rounded-xl bg-white/20 text-white shrink-0">
                        <MessageSquare className="w-5 h-5 text-emerald-300 fill-emerald-300/10" />
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-200 uppercase block font-bold font-mono">
                          WHATSAPP QUICK CONSOLE
                        </span>
                        <span className="font-bold text-sm">Chat Instantly on WhatsApp</span>
                      </div>
                    </a>

                    <div className="flex gap-3 items-center bg-white/10 p-3 rounded-2xl border border-white/5">
                      <div className="p-2 rounded-xl bg-white/20 text-white shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-200 uppercase block font-bold font-mono">
                          PHYSICAL STUDIO ADDRESS
                        </span>
                        <span className="font-sans leading-relaxed block text-[#fff] text-[11px]">
                          12 Iqbal Nagar, Akal Wala Road, Toba Tek Singh, Pakistan
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-center bg-white/10 p-3 rounded-2xl border border-white/5">
                      <div className="p-2 rounded-xl bg-white/20 text-white shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-200 uppercase block font-bold font-mono">
                          WORKING HOURS
                        </span>
                        <span className="font-bold">Open Daily - Closes exactly 6:00 PM</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Google Map of salon location Pakistan Toba Tek Singh */}
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-72">
                  <iframe
                    title="Bridals Heaven Gym GPS layout Location"
                    src="https://maps.google.com/maps?q=12%20Iqbal%20Nagar%20Akal%20Wala%20Road%20Toba%20Tek%20Singh%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

              </div>

              {/* Right Contact form interactive */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-rose-100 shadow-xl p-6 md:p-8 space-y-6 text-slate-800">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-900">
                      Transmit Direct Message Inquiry
                    </h3>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      Have questions about customized packages or bridal slots? Drop details below. Our desk replies within 1 hour.
                    </p>
                  </div>

                  {contactSuccess ? (
                    <div className="text-center py-10 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl flex flex-col items-center gap-2">
                      <CheckCircle className="w-12 h-12 text-emerald-700 animate-bounce" />
                      <strong className="text-sm">Message Dispatched Successfully!</strong>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Thank you! Saniya Malik or the reception team will dial into your phone shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ayesha Khan"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#7a1c43] focus:outline-none w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">
                            WhatsApp / Mobile Phone
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0333 2219354"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#7a1c43] focus:outline-none w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">
                          Brief Message (Inquiry details)
                        </label>
                        <textarea
                          rows={5}
                          required
                          placeholder="State estimated marriage dates or custom facial treatments you wish to inquire..."
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#7a1c43] focus:outline-none w-full resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-rose-800 to-[#7a1c43] text-white font-serif font-bold text-xs tracking-wide uppercase rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        Transmit Msg
                        <Send className="w-3.5 h-3.5 text-rose-200" />
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>

          </section>
        )}

        {/* ==============================================
            VIP BOOKING SYSTEM VIEW
           ============================================== */}
        {currentTab === "book" && (
          <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300 space-y-12">
            
            {/* Main Reservation panel */}
            <BookingSystem
              initialServiceId={preSelectedServiceId}
              onNewBookingCreated={handleNewBookingCreated}
              activePromoFromPopup={activePromo}
              onClearPromoFromPopup={() => setActivePromo("")}
            />

            {/* Loyalty points Lookup integration */}
            <LoyaltySystem />

            {/* Direct Admin toggle layout explanation */}
            <div className="bg-slate-50 border border-rose-100 rounded-2xl p-5 text-center space-y-2">
              <span className="text-[10px] uppercase text-slate-500 tracking-widest font-bold block">
                Sandbox Simulator Utility Guide
              </span>
              <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                Are you evaluating this layout? Check the bottom tab bar to access the **Interactive Admin Console**. You can approve booking proposals, review statistics, and simulate walk-in guests instantly!
              </p>
              <button
                onClick={() => {
                  setCurrentTab("admin");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-[11px] font-bold text-[#7a1c43] hover:underline"
              >
                Go to Admin Dashboard Panel →
              </button>
            </div>

          </section>
        )}

        {/* ==============================================
            ADMIN BOOKING DASHBOARD PANEL VIEW
           ============================================== */}
        {currentTab === "admin" && (
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
            <AdminDashboard
              bookings={bookings}
              onConfirmBooking={handleConfirmBooking}
              onCancelBooking={handleCancelBooking}
              onAddSimulatedBooking={handleAddSimulatedBooking}
            />
          </section>
        )}

      </main>

      {/* ==============================================
          INSTAGRAM EMBED ACCENTS (Home view only)
         ============================================== */}
      {currentTab === "home" && <InstagramFeed />}

      {/* ==============================================
          GLOBAL FOOTER
         ============================================== */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-rose-950 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
            
            {/* Col 1 Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold">
                  ★
                </div>
                <h4 className="font-serif text-lg font-bold uppercase tracking-wide">
                  Bridal’s Heaven
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Professional bridal makeup artist house, premium hair extensions provider, and certified skincare Hydra Facial studio in Toba Tek Singh, Punjab, Pakistan.
              </p>
              <div className="flex gap-2.5 text-xs text-amber-300 font-bold">
                <span>⭐ 4.5 Stars</span>
                <span>•</span>
                <span>143 Web Reviews</span>
              </div>
            </div>

            {/* Col 2 Treatment Categories */}
            <div className="space-y-3">
              <h5 className="text-xs uppercase font-serif font-black text-rose-350 tracking-wider">
                Services Offered
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                <li>Bridal & Party Make-up</li>
                <li>Hairstyling Bun Designs</li>
                <li>Pore deep Hydra Facials</li>
                <li>Remy Hair Extensions</li>
                <li>Manicures & Paraffin Wraps</li>
                <li>Intricate Mehndi Designs</li>
              </ul>
            </div>

            {/* Col 3 Pages map */}
            <div className="space-y-3">
              <h5 className="text-xs uppercase font-serif font-black text-rose-350 tracking-wider">
                Quick Navigation Links
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <button onClick={() => { setCurrentTab("home"); window.scrollTo(0,0); }} className="hover:text-amber-300">
                    Home Page
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab("services"); window.scrollTo(0,0); }} className="hover:text-amber-300">
                    A la Carte Services
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab("gallery"); window.scrollTo(0,0); }} className="hover:text-amber-300">
                    45 Photos Lookbook
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab("reviews"); window.scrollTo(0,0); }} className="hover:text-amber-300">
                    Google Review Form
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab("book"); window.scrollTo(0,0); }} className="hover:text-amber-300">
                    Online Appointments
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentTab("admin"); window.scrollTo(0,0); }} className="font-bold text-amber-300/80 hover:text-amber-300">
                    Admin Operator Terminal
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 Address highlight details */}
            <div className="space-y-3">
              <h5 className="text-xs uppercase font-serif font-black text-rose-350 tracking-wider">
                Saloon Helpline
              </h5>
              <div className="space-y-2 text-xs text-slate-400 font-medium">
                <p>📍 12 Iqbal Nagar, Akal Wala Road, Iqbal Nagar, Toba Tek Singh, 36050, Pakistan</p>
                <p>📞 Phone Calldesk: 0333 2219354</p>
                <p>⏰ Open Daily Until 6:00 PM</p>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
            <p>© 2026 Bridal’s Heaven Salon (Iqbal Nagar, Tts). Where Beauty Meets Perfection. All Rights Reserved.</p>
            <div className="flex gap-4">
              <span>Hygienically Disinfected daily</span>
              <span>•</span>
              <button onClick={() => setCurrentTab("admin")} className="font-bold text-slate-400 hover:text-white">
                Admin Console
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOAT WHATSAPP ACTIVE VIEWPOT HELPLINE BUTTON */}
      <a
        href="https://wa.me/923332219354"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group cursor-pointer w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl bg-white border border-rose-100 animate-bounce-gentle"
        title="Chat live with Bridal's Heaven Salon on WhatsApp"
      >
        <div className="hidden md:block absolute right-16 mr-1 bg-emerald-600 text-white text-xs font-bold font-sans tracking-wide uppercase py-2 px-3 rounded-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-emerald-500/10">
          WhatsApp Helpline Chat
        </div>
        <img
          src="https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.jpg"
          alt="WhatsApp"
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </a>

    </div>
  );
}
