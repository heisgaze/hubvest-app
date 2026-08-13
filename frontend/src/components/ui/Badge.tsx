import { GradeLevel } from "@/lib/types";

interface BadgeProps {
  variant:
    | "grade-a"
    | "grade-b"
    | "grade-c"
    | "active"
    | "pending"
    | "done"
    | "pfi-green"
    | "pfi-yellow"
    | "pfi-red"
    | "role-farmer"
    | "role-tengkulak";
  children: React.ReactNode;
  size?: "sm" | "md";
}

const variantClasses: Record<string, string> = {
  "grade-a":
    "bg-accent text-white",
  "grade-b":
    "bg-primary-400 text-white",
  "grade-c":
    "bg-warning text-white",
  active:
    "bg-accent/10 text-accent-dark",
  pending:
    "bg-warning-light text-warning-dark",
  done:
    "bg-primary-100 text-primary",
  "pfi-green":
    "bg-accent/10 text-accent-dark border border-accent/20",
  "pfi-yellow":
    "bg-warning-light text-warning-dark border border-warning/20",
  "pfi-red":
    "bg-danger-light text-danger-dark border border-danger/20",
  "role-farmer":
    "bg-accent/10 text-accent-dark",
  "role-tengkulak":
    "bg-primary-100 text-primary",
};

export default function Badge({
  variant,
  children,
  size = "sm",
}: BadgeProps) {
  const sizeClasses =
    size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${sizeClasses} ${variantClasses[variant] || ""}`}
    >
      {children}
    </span>
  );
}

/**
 * Helper to get badge variant from grade
 */
export function gradeToBadgeVariant(
  grade: GradeLevel
): "grade-a" | "grade-b" | "grade-c" {
  return `grade-${grade.toLowerCase()}` as "grade-a" | "grade-b" | "grade-c";
}
