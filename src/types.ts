/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  category: "makeup" | "hair" | "skin" | "henna" | "nails";
  description: string;
  priceRange: string;
  minPrice: number;
  duration: string;
  imageUrl: string;
  features: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  customerName: string;
  phone: string;
  email?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  appliedCoupon?: string;
  discountAmount?: number;
  finalPrice?: number;
}

export interface Review {
  id: string;
  author: string;
  authorAvatar?: string;
  rating: number;
  relativeTime: string;
  text: string;
  isVerified: boolean;
  serviceType?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "bridal" | "hair" | "facial" | "mehndi";
  imageUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  description?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export interface CouponCode {
  code: string;
  discountPercent: number;
  description: string;
  minSpend?: number;
}

export interface LoyaltyUser {
  phone: string;
  name: string;
  points: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  visits: number;
}
