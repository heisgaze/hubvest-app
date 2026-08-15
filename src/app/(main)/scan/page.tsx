import React from "react";
import HeaderBar from "@/components/petani/ui/HeaderBar";
import CameraViewfinder from "@/components/petani/scan/CameraViewfinder";

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderBar title="Scan Komoditas" showBack={true} />
      <CameraViewfinder />
    </div>
  );
}
