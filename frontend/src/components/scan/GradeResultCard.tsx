import React from "react";
import Badge from "@/components/ui/Badge";
import { getGradeLabel } from "@/lib/utils";
import { gradeToBadgeVariant } from "@/components/ui/Badge";
import { GradeResult } from "@/lib/types";

export default function GradeResultCard({ result }: { result: GradeResult }) {
  const confidencePercent = result.confidence.toFixed(0);

  return (
    <div className="card animate-slide-up mt-4">
      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex flex-col items-center justify-center mb-6 relative overflow-hidden">
        <div className="text-6xl mb-2">🧅</div>
        <div className="text-sm font-medium text-primary-800">Bawang Merah</div>
        <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-primary">
          AI Analyzed
        </div>
      </div>

      <div className="flex flex-col items-center mb-6 border-b border-gray-100 pb-6">
        <Badge variant={gradeToBadgeVariant(result.grade)} size="md">
          {result.grade}
        </Badge>
        <h2 className="text-xl font-bold text-primary mt-3">{getGradeLabel(result.grade)}</h2>
        <p className="text-sm text-gray-500 mt-1">{result.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Tingkat Kepercayaan</span>
          <span className="text-sm font-bold text-accent">{confidencePercent}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-1000 ease-out" 
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-primary mb-3">Atribut Kualitas</h3>
        <div className="space-y-3">
          {result.attributes.map((attr, idx) => (
            <div key={idx} className="flex flex-col animate-fade-in" style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">{attr.name}</span>
                <span className="text-xs font-semibold">{attr.value}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-light transition-all duration-1000 ease-out" 
                  style={{ width: `${attr.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
