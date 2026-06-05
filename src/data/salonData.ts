/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, ServicePackage, Review, GalleryItem, CouponCode, LoyaltyUser, Booking } from "../types";

export const SERVICES: Service[] = [
  {
    id: "bridal-makeup",
    name: "Bridal Make-up",
    category: "makeup",
    description: "Premium deluxe signature makeup tailored for your special day. Includes flawless HD/Airbrush foundation, facial contouring, luxury dramatic eyes highlight, eyelashes, lipstick matching, and dual dupatta/veil setting.",
    priceRange: "Rs. 25,000 - 45,000",
    minPrice: 25000,
    duration: "180 min",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
    features: ["HD Airbrush Foundation", "Intricate Lash Extension", "Dupatta & Jewelry Setting", "Long-lasting 18hr Hold", "Pre-bridal Consultation"]
  },
  {
    id: "party-makeup",
    name: "Party Make-up",
    category: "makeup",
    description: "Exquisite glam for special social events, wedding guest appearances, or formal dinners. Custom color palette matched perfectly with your designer outfit.",
    priceRange: "Rs. 6,000 - 12,000",
    minPrice: 6000,
    duration: "75 min",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    features: ["Dewy Soft Skin Finish", "Smokey/Glittery Eye Styling", "Flawless Contouring", "Premium Eyelashes", "Matte Lip Set"]
  },
  {
    id: "hair-styling",
    name: "Hairstyling",
    category: "hair",
    description: "Elegant professional hairstyles ranging from traditional Pakistani bridal buns, modern voluminous curls, crown braids, to customized mess buns with floral integration.",
    priceRange: "Rs. 2,500 - 6,000",
    minPrice: 2500,
    duration: "45 min",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&auto=format&fit=crop&q=80",
    features: ["Heat Shielding Hair Prep", "Intricate Braids & Buns", "Fresh Flower Accessories Placement", "Heavy-duty Volume Hold Spray", "Modern Blowdry Elegance"]
  },
  {
    id: "hydra-facial",
    name: "Hydra Facial",
    category: "skin",
    description: "The ultimate skin rejuvenation treatment. Multi-step facial utilizes patented technology to cleanse, exfoliate, extract impurities, and deeply hydrate your skin with vital serums.",
    priceRange: "Rs. 8,000 - 15,000",
    minPrice: 8000,
    duration: "60 min",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&auto=format&fit=crop&q=80",
    features: ["Deep Pore Vacuum Extraction", "Glycolic Acid Peel Therapy", "Antioxidant & Peptide Infusion", "Under-eye Depuffing treatment", "Cold Hammer Collagen Lock"]
  },
  {
    id: "mehndi-design",
    name: "Mehndi Design",
    category: "henna",
    description: "Breathtaking traditional and modern mehndi application. Exquisitely detailed hand designs from Arabic flow patterns, heavy bridal motifs, to delicate minimal finger work.",
    priceRange: "Rs. 1,500 - 8,500",
    minPrice: 1500,
    duration: "90 min",
    imageUrl: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=800&auto=format&fit=crop&q=80",
    features: ["100% Organic Henna Cone", "High Contrast Dark Maroon Stain", "Traditional & Arabic Fusions", "Intricate Mandalas & Peacock motifs", "Drying sealer application"]
  },
  {
    id: "hair-extensions",
    name: "Hair Extensions",
    category: "hair",
    description: "Add instant thickness, length, and volume with our top-quality 100% human Remy hair extensions. Available in clip-ins, tape-ins, and micro-ring integrations.",
    priceRange: "Rs. 15,000 - 35,000",
    minPrice: 15000,
    duration: "120 min",
    imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&auto=format&fit=crop&q=80",
    features: ["100% Premium Real Hair Extensions", "Flawless Color Matching", "Customized Length Cuts", "Damage-free Application Track", "Comprehensive Styling Care Lesson"]
  },
  {
    id: "manicure",
    name: "Manicure",
    category: "nails",
    description: "Exclusive pampering for your hands. Includes deep nail shaping, cuticle therapy, luxury scrub massage, paraffin hydration treatment, and high-shine gel polish.",
    priceRange: "Rs. 2,000 - 4,500",
    minPrice: 2000,
    duration: "40 min",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80",
    features: ["Dead Skin Scrubing Mask", "Paraffin Hot Oil Wrap", "Cuticle Nourishment Oil", "Chic Gel Polish Colors", "Calming Accupressure Hand Massage"]
  },
  {
    id: "pedicure",
    name: "Pedicure",
    category: "nails",
    description: "Treat your tired feet in a luxury massage chair. Includes dead skin heel filing, mineral salt exfoliation bath, organic mud mask, and long-lasting nail lacquer.",
    priceRange: "Rs. 2,500 - 5,500",
    minPrice: 2500,
    duration: "50 min",
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&auto=format&fit=crop&q=80",
    features: ["Warm Sea Salt Soak", "Callus Softening Filing", "Oatmeal Mud Foot Overlay", "Reflexology Muscle Massage", "Antibacterial Clean Sanitizer"]
  },
  {
    id: "makeup-services",
    name: "Make-up Services",
    category: "makeup",
    description: "Soft everyday glow, professional media headshot makeup, or subtle morning wedding vibes. Elegant and soft approach to enhance your inherent beauty.",
    priceRange: "Rs. 4,000 - 8,000",
    minPrice: 4000,
    duration: "45 min",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80",
    features: ["Lightweight Nude Tint Foundation", "Natural Soft Eye shadow", "Gentle Brow Tint Sculpting", "Satin Velvet Blush", "Hydrating Plumping Gloss"]
  },
  {
    id: "laser-hair-removal",
    name: "Laser Hair Removal",
    category: "skin",
    description: "Say goodbye to traditional waxing. Advanced safe laser technology targeting hair follicles for silky smooth skin. Fully cooled tip ensures premium pain-free sessions.",
    priceRange: "Rs. 5,000 - 20,000",
    minPrice: 5000,
    duration: "30 min",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80",
    features: ["Tri-wavelength Laser System", "Subzero Contact Cooling Shield", "FDA Approved Safe Facial Scanner", "Certified Professional Aesthetician", "Post-laser Soothing Gel"]
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "pkg-basic",
    name: "Heavenly Basic Glow",
    price: "Rs. 12,500",
    originalPrice: "Rs. 16,500",
    description: "Perfect package for dynamic bridesmaids and party guests looking for a beautiful and highly coordinated group glow-up.",
    features: ["Exquisite Party Makeup & Lashes", "Elegant Hair curls/Blowdry style", "Premium Hydrating Sheet Mask Facial", "Double Sided Hand Mehndi design"],
    badge: "Most Popular",
    popular: false
  },
  {
    id: "pkg-premium",
    name: "Premium Royale Bridal Package",
    price: "Rs. 38,000",
    originalPrice: "Rs. 52,000",
    description: "Our signature all-inclusive pre-wedding and big-day luxury treatment for brides desiring unmatched custom perfection.",
    features: ["Deluxe Airtight HD Bridal Makeup", "Intricate Regal Hairstyle with Hair extensions", "Premium Multistep Hydra Facial", "Full Bridal Hand & Arm Intricate Mehndi", "Deluxe Manicure & Pedicure duo"],
    badge: "Supreme Luxury",
    popular: true
  },
  {
    id: "pkg-bridal",
    name: "Ultimate Elite Queen Bridal",
    price: "Rs. 58,000",
    originalPrice: "Rs. 80,000",
    description: "The dream multi-day luxury curation covering Mehndi, Barat/Reception, premium skin prep, and full royal spa protocols.",
    features: ["2 Days of Distinct Luxury Makeup Looks", "Two Custom Royal Hairstyles & Accessories", "Pre-wedding Skin Whitening facial treatment", "Deep Nourishing Mud Scrubs", "2 Members Party Makeup companion passes!"],
    badge: "All-Inclusive Multi-Day",
    popular: false
  }
];

export const GOOGLE_RATING = {
  score: 4.5,
  totalReviews: 143,
  salonName: "Bridal’s Heaven Salon",
  category: "Beauty Salon",
  address: "12 Iqbal Nagar, Akal Wala Road, Iqbal Nagar, Toba Tek Singh, 36050, Pakistan",
  phone: "0333 2219354",
  workingHours: "9:00 AM - 6:00 PM (Daily)"
};

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Ayesha Imran",
    rating: 5,
    relativeTime: "2 days ago",
    text: "Bridal’s Heaven Salon made my big day absolutely magical! Their bridal makeup is so lightweight and stayed flawless until midnight. Everyone kept praising my makeup and hair curls. The staff is so sweet. Truly the best salon in Toba Tek Singh!",
    isVerified: true,
    serviceType: "Bridal Make-up"
  },
  {
    id: "rev-2",
    author: "Zainab Fatima",
    rating: 5,
    relativeTime: "1 week ago",
    text: "I booked their luxury Hydra Facial and Mehndi Design. The skin glow after facial was immediate and amazing. The henna stain was incredibly deep maroon color! Highly recommend 0333 2219354 to book in advance.",
    isVerified: true,
    serviceType: "Hydra Facial"
  },
  {
    id: "rev-3",
    author: "Mariam Jameel",
    rating: 4,
    relativeTime: "2 weeks ago",
    text: "Great experience with party makeup. Very professional environment. They close exactly at 6 PM so make sure to get early slots. Recommended!",
    isVerified: true,
    serviceType: "Party Make-up"
  },
  {
    id: "rev-4",
    author: "Sadia Bibi",
    rating: 5,
    relativeTime: "3 weeks ago",
    text: "Outstanding manicure and pedicure. Extremely clean tools and very relaxing massage chairs. 10/10 for hygiene standards in Iqbal Nagar neighborhood.",
    isVerified: true,
    serviceType: "Manicure & Pedicure"
  },
  {
    id: "rev-5",
    author: "Kinza Rashid",
    rating: 4,
    relativeTime: "1 month ago",
    text: "My wedding hairstyle and makeup session was top notch. They used original international products, no cheap alternatives. Very honest and reasonable rates.",
    isVerified: true,
    serviceType: "Bridal Make-up"
  },
  {
    id: "rev-6",
    author: "Farah Naaz",
    rating: 5,
    relativeTime: "1 month ago",
    text: "Laser hair removal requires a few sessions but it has been absolutely pain free. Best skincare team in Toba Tek Singh.",
    isVerified: true,
    serviceType: "Laser Hair Removal"
  }
];

export const COUPONS: CouponCode[] = [
  { code: "HEAVEN20", discountPercent: 20, description: "20% OFF on all Makeup & Hair Styling services!" },
  { code: "BRIDAL30", discountPercent: 30, description: "30% OFF on premium packages!" },
  { code: "HYDRA50", discountPercent: 50, description: "Flat 50% discount on your first Hydra Facial visit!" },
  { code: "WELCOME10", discountPercent: 10, description: "10% Welcome discount for new customers in Iqbal Nagar." }
];

export const LOYALTY_TIERS = [
  { tier: "Bronze", pointsNeeded: 0, perks: "Earn 1 point per Rs. 100 spent. Redeem for sweet nail accessories." },
  { tier: "Silver", pointsNeeded: 300, perks: "5% extra discount. Free premium blowdry on your birthday week." },
  { tier: "Gold", pointsNeeded: 800, perks: "10% extra discount. Free companion party styling once a year." },
  { tier: "Platinum", pointsNeeded: 1500, perks: "15% extra discount. Free priority queue appointment booking & VIP lounge access." }
];

// Curating exactly 45 unique professional images categories to reach high range of images (30-60 requested)
// We will generate different items with unique beautiful photos representing Bridal, Hair, Facials and Mehndi.
export const GALLERY_ITEMS: GalleryItem[] = [];

const bridalPhotos = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"
];

const hairPhotos = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df",
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d",
  "https://images.unsplash.com/photo-1522336572468-97b06e8ef143",
  "https://images.unsplash.com/photo-1605497746444-ac9dbd324148",
  "https://images.unsplash.com/photo-1560869713-7d0a294308ed",
  "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3",
  "https://images.unsplash.com/photo-1516914949494-dfaf8ef3b582",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
];

const facialPhotos = [
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
  "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
  "https://images.unsplash.com/photo-1590156546746-c589b91319c3",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
  "https://images.unsplash.com/photo-1510832198440-a52376950479",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4"
];

const mehndiPhotos = [
  "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51",
  "https://images.unsplash.com/photo-1616165415772-f8319f6fc070",
  "https://images.unsplash.com/photo-1589156280159-27698a70f29e",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
  "https://images.unsplash.com/photo-1578632767115-351597cf2477",
  "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
  "https://images.unsplash.com/photo-1526312487042-83424d689adf",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
];

// Generate exactly 45 unique luxury items with varying titles using Unsplash images
const makeGalleryItems = (): GalleryItem[] => {
  const list: GalleryItem[] = [];
  
  // 12 Bridals
  for (let i = 0; i < 11; i++) {
    const isComparison = i === 0 || i === 3;
    list.push({
      id: `gal-bridal-${i}`,
      title: `Signature Royal Bride Makeup No.${i + 1}`,
      category: "bridal",
      imageUrl: `${bridalPhotos[i % bridalPhotos.length]}?w=700&auto=format&fit=crop&q=80`,
      beforeImageUrl: isComparison ? `${bridalPhotos[(i + 4) % bridalPhotos.length]}?w=700&auto=format&fit=crop&q=80&blur=10` : undefined,
      afterImageUrl: isComparison ? `${bridalPhotos[i % bridalPhotos.length]}?w=700&auto=format&fit=crop&q=80` : undefined,
      description: `Bridals Heaven specialty long-lasting high-definition layout for spectacular evening photography.`
    });
  }
  
  // 11 Hair Styling
  for (let i = 0; i < 11; i++) {
    list.push({
      id: `gal-hair-${i}`,
      title: `Glamourous Crown Voluminous Hairstyle No.${i + 1}`,
      category: "hair",
      imageUrl: `${hairPhotos[i % hairPhotos.length]}?w=700&auto=format&fit=crop&q=80`,
      description: `Custom extensions matching styling with curls or elegant back braiding.`
    });
  }

  // 11 Hydra Facials and Laser Skin Results
  for (let i = 0; i < 11; i++) {
    const isComparison = i === 1 || i === 4;
    list.push({
      id: `gal-facial-${i}`,
      title: `Intense Hydra Facial Pore Rejuvenation No.${i + 1}`,
      category: "facial",
      imageUrl: `${facialPhotos[i % facialPhotos.length]}?w=700&auto=format&fit=crop&q=80`,
      beforeImageUrl: isComparison ? `${facialPhotos[(i + 3) % facialPhotos.length]}?w=700&auto=format&fit=crop&q=80&blur=15&brightness=75` : undefined,
      afterImageUrl: isComparison ? `${facialPhotos[i % facialPhotos.length]}?w=700&auto=format&fit=crop&q=80` : undefined,
      description: `Immediate deep skin hydration resulting in glassy finish and tight aesthetic pores.`
    });
  }

  // 12 Mehndi/Henna design items
  for (let i = 0; i < 12; i++) {
    list.push({
      id: `gal-mehndi-${i}`,
      title: `Intricate Trad Royal Hand Henna Pattern No.${i + 1}`,
      category: "mehndi",
      imageUrl: `${mehndiPhotos[i % mehndiPhotos.length]}?w=700&auto=format&fit=crop&q=80`,
      description: `Custom handcrafted fine lines using natural chemical-free organic deep maroon cones.`
    });
  }

  return list;
};

export const GALLERY_LIST = makeGalleryItems();

// Pre-seeded local bookings for the functional mockup Admin Dashboard
export const PRE_SEEDED_BOOKINGS: Booking[] = [
  {
    id: "book-1",
    serviceId: "bridal-makeup",
    serviceName: "Bridal Make-up",
    date: "2026-06-15",
    timeSlot: "11:00 AM - 02:00 PM",
    customerName: "Ayesha Khan",
    phone: "0321 4455823",
    email: "ayesha.khan@gmail.com",
    status: "confirmed",
    createdAt: "2026-06-04T10:00:00Z",
    finalPrice: 38000
  },
  {
    id: "book-2",
    serviceId: "hydra-facial",
    serviceName: "Hydra Facial",
    date: "2026-06-08",
    timeSlot: "03:00 PM - 04:00 PM",
    customerName: "Nimra Sheikh",
    phone: "0300 1234567",
    email: "nimra.s@yahoo.com",
    status: "pending",
    createdAt: "2026-06-05T08:15:00Z",
    finalPrice: 8000
  },
  {
    id: "book-3",
    serviceId: "mehndi-design",
    serviceName: "Mehndi Design",
    date: "2026-06-10",
    timeSlot: "01:00 PM - 02:30 PM",
    customerName: "Sabahat Fatima",
    phone: "0333 9876543",
    status: "confirmed",
    createdAt: "2026-06-03T11:45:00Z",
    finalPrice: 5500
  }
];

export const INSTAGRAM_POSTS = [
  { id: "ig-1", imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", likes: "1.2k", comments: 92 },
  { id: "ig-2", imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop", likes: "850", comments: 45 },
  { id: "ig-3", imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop", likes: "1.4k", comments: 120 },
  { id: "ig-4", imageUrl: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?w=400&h=400&fit=crop", likes: "910", comments: 64 },
  { id: "ig-5", imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop", likes: "2.1k", comments: 153 },
  { id: "ig-6", imageUrl: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop", likes: "1.1k", comments: 78 }
];
