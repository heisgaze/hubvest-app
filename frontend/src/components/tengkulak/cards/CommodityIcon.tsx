import React from 'react';

interface CommodityIconProps {
  type: string;
  size?: number;
  className?: string;
}

export const CommodityIcon: React.FC<CommodityIconProps> = ({ type, size = 20, className = '' }) => {
  switch (type) {
    case 'bawang':
      // Shallot / Bawang Merah icon (leaf/bulb shape in warm orange-red)
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 3C8 8 5 11 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 11 16 8 12 3Z"
            fill="#E05236"
          />
          <path
            d="M12 3C12 3 14 8 14 13C14 17 12.5 20.5 12 22"
            stroke="#FCA5A5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 3C10 7 8 11 8 15C8 18 9.5 20.5 12 22"
            stroke="#991B1B"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d="M12 2V5"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'cabai':
      // Red Chili pepper icon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M16.5 4.5C14.5 4.5 12.5 6 11 8.5C9 11.8 7.5 15 5 17C3.5 18.2 2 18.5 2 20C2 21 3.5 21.5 5 21C8 20 12 17 15 13.5C18 10 19.5 6.5 18 5C17.5 4.5 17 4.5 16.5 4.5Z"
            fill="#DC2626"
          />
          <path
            d="M18.5 3C18 2 16.5 2 15 3.5L16.5 5L18.5 3Z"
            fill="#16A34A"
          />
          <path
            d="M16 6.5C14.5 8.5 12 12 8 15"
            stroke="#FEF08A"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </svg>
      );

    case 'beras':
      // Rice grain icon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 3C7 6 4 11 4 16C4 19 6.5 21 10 21C15 21 20 16 20 9C20 5 17 3 12 3Z"
            fill="#F59E0B"
          />
          <path
            d="M10 7C8 10 6.5 13 6.5 16"
            stroke="#FEF3C7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'jagung':
      // Corn icon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 2C8 6 6 10 6 15C6 19 9 22 12 22C15 22 18 19 18 15C18 10 16 6 12 2Z"
            fill="#EAB308"
          />
          <circle cx="10" cy="10" r="1.5" fill="#FEF08A" />
          <circle cx="14" cy="10" r="1.5" fill="#FEF08A" />
          <circle cx="12" cy="14" r="1.5" fill="#FEF08A" />
          <circle cx="10" cy="17" r="1.5" fill="#FEF08A" />
          <circle cx="14" cy="17" r="1.5" fill="#FEF08A" />
        </svg>
      );

    case 'tomat':
      // Tomato icon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="13" r="8" fill="#EF4444" />
          <path
            d="M12 3C11 4.5 9 5 8 5M12 3C13 4.5 15 5 16 5M12 3V6"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="9" fill="#10B981" />
        </svg>
      );
  }
};
