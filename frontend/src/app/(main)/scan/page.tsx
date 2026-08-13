import React from "react";
import HeaderBar from "@/components/ui/HeaderBar";
import CameraViewfinder from "@/components/scan/CameraViewfinder";

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderBar title="Scan Komoditas" showBack={true} />
      <CameraViewfinder />
    </div>
  );
}
