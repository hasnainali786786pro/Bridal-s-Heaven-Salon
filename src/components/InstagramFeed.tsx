/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Heart, MessageCircle, Instagram, ExternalLink } from "lucide-react";
import { INSTAGRAM_POSTS } from "../data/salonData";

export default function InstagramFeed() {
  const [likesState, setLikesState] = useState<{ [key: string]: { count: string; liked: boolean } }>(
    INSTAGRAM_POSTS.reduce((acc, pos) => {
      acc[pos.id] = { count: pos.likes, liked: false };
      return acc;
    }, {} as any)
  );

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLikesState((prev) => {
      const current = prev[id];
      if (current.liked) {
        // Unliked: parse basic floats or keep string
        return {
          ...prev,
          [id]: { count: current.count.replace(" (You)", ""), liked: false },
        };
      } else {
        return {
          ...prev,
          [id]: { count: `${current.count} (You)`, liked: true },
        };
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-white to-rose-50/20 py-12 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Title */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-rose-50 to-pink-50 rounded-full text-xs text-[#7a1c43] font-semibold tracking-wider uppercase mb-2 border border-rose-100">
            <Instagram className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
            Social Lookbook
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-slate-800">
            Inspiring Bridal Transformations
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
            Stay updated with daily snapshots, live makeup sessions, and exclusive henna updates by following us on Instagram.
          </p>
        </div>

        {/* Instagrid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
            >
              <img
                src={post.imageUrl}
                alt="Instagram salon post look"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-3 p-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center gap-1.5 focus:outline-none hover:text-rose-400 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likesState[post.id]?.liked ? "fill-rose-500 text-rose-500" : "fill-transparent"
                      }`}
                    />
                    <span className="text-xs font-bold">{likesState[post.id]?.count}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-white/95">
                    <MessageCircle className="w-5 h-5 fill-white/10" />
                    <span className="text-xs font-bold">{post.comments}</span>
                  </div>
                </div>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-pink-300 hover:text-pink-100 transition-colors mt-2"
                >
                  View post
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#7a1c43] hover:text-amber-700 hover:underline transition-colors block md:inline"
          >
            Follow @BridalsHeavenToba on Instagram for seasonal giveaways!
          </a>
        </div>

      </div>
    </div>
  );
}
