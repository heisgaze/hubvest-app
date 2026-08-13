import { PFIResult, GradeLevel } from "./types";

/**
 * Calculate Price Fairness Index
 * PFI = (Harga Petani / Harga Pasar Referensi) × 100
 * Green ≥ 80, Yellow 60-79, Red < 60
 */
export function calculatePFI(
  farmerPrice: number,
  marketPrice: number
): PFIResult {
  if (marketPrice <= 0) {
    return {
      score: 0,
      status: "red",
      label: "Tidak Valid",
      description: "Harga pasar tidak tersedia",
      farmerPrice,
      marketPrice,
    };
  }

  const score = Math.round((farmerPrice / marketPrice) * 100);
  const clampedScore = Math.min(Math.max(score, 0), 150);

  let status: PFIResult["status"];
  let label: string;
  let description: string;

  if (clampedScore >= 80) {
    status = "green";
    label = "Harga Wajar";
    description = "Harga yang ditawarkan sesuai dengan harga pasar saat ini.";
  } else if (clampedScore >= 60) {
    status = "yellow";
    label = "Perlu Negosiasi";
    description = "Harga di bawah rata-rata pasar. Pertimbangkan untuk negosiasi.";
  } else {
    status = "red";
    label = "Di Bawah Batas";
    description =
      "Harga jauh di bawah harga pasar. Tidak disarankan untuk menerima.";
  }

  return {
    score: clampedScore,
    status,
    label,
    description,
    farmerPrice,
    marketPrice,
  };
}

/**
 * Format currency to Indonesian Rupiah
 */
export function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat("id-ID").format(amount);
  return `Rp ${formatted}`;
}

/**
 * Format number with dots as thousands separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

/**
 * Get commodity emoji based on name
 */
export function getCommodityEmoji(name?: string): string {
  switch (name) {
    case 'Bawang Merah': return '🧅';
    case 'Cabai Rawit': return '🌶️';
    case 'Kentang': return '🥔';
    case 'Tomat': return '🍅';
    case 'Bawang Putih': return '🧄';
    case 'Wortel': return '🥕';
    default: return '📦';
  }
}

/**
 * Get grade color class
 */
export function getGradeColor(grade: GradeLevel): string {
  switch (grade) {
    case "A":
      return "grade-a";
    case "B":
      return "grade-b";
    case "C":
      return "grade-c";
    default:
      return "grade-b";
  }
}

/**
 * Get grade label
 */
export function getGradeLabel(grade: GradeLevel): string {
  switch (grade) {
    case "A":
      return "Sangat Baik";
    case "B":
      return "Baik";
    case "C":
      return "Cukup";
    default:
      return "Tidak Diketahui";
  }
}

/**
 * Format relative time
 */
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format short date
 */
export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

/**
 * Generate a mock confidence score
 */
export function mockConfidence(): number {
  return Math.floor(Math.random() * (98 - 75 + 1)) + 75;
}

/**
 * Generate a mock grade
 */
export function mockGrade(): GradeLevel {
  const grades: GradeLevel[] = ["A", "B", "C"];
  const weights = [0.5, 0.35, 0.15]; // Weighted towards A
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < grades.length; i++) {
    cumulative += weights[i];
    if (rand <= cumulative) return grades[i];
  }
  return "B";
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
