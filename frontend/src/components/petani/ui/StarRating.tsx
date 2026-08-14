"use client";

import { useState } from "react";

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export default function StarRating({
  rating = 0,
  maxStars = 5,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(rating);

  const displayRating = interactive
    ? hoverRating || selectedRating
    : rating;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayRating;
        const isHalf =
          !isFilled && starValue - 0.5 <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform duration-150 disabled:opacity-100`}
            onClick={() => {
              if (interactive) {
                setSelectedRating(starValue);
                onChange?.(starValue);
              }
            }}
            onMouseEnter={() =>
              interactive && setHoverRating(starValue)
            }
            onMouseLeave={() => interactive && setHoverRating(0)}
            aria-label={`${starValue} bintang`}
          >
            <svg
              className={sizes[size]}
              viewBox="0 0 24 24"
              fill={isFilled ? "#F59E0B" : isHalf ? "url(#halfGrad)" : "#E5E7EB"}
              stroke={isFilled || isHalf ? "#F59E0B" : "#D1D5DB"}
              strokeWidth="1"
            >
              {isHalf && (
                <defs>
                  <linearGradient id="halfGrad">
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>
              )}
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
