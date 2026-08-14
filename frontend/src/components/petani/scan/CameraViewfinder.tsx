"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CameraViewfinder() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    
    startCamera();

    return () => {
      // Cleanup stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-black flex flex-col items-center justify-between py-12 overflow-hidden">
      {/* Live Camera Feed */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Viewfinder Overlay area */}
      <div className="relative w-72 h-72 mt-16 z-10">
        <div className="absolute inset-0 border-2 border-transparent">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-lg"></div>
        </div>
        
        {/* Animated Scan Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_10px_#52B788] animate-scan-line"></div>
      </div>

      <div className="text-white text-center mt-8 z-10 bg-black/50 px-4 py-2 rounded-full">
        <p className="text-sm font-medium">Arahkan kamera ke komoditas</p>
      </div>

      {/* Capture Button */}
      <div className="mb-8 z-10">
        <button 
          onClick={() => router.push("/scan/result")}
          className="w-20 h-20 rounded-full border-4 border-accent bg-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 rounded-full border-2 border-gray-200"></div>
        </button>
      </div>
    </div>
  );
}
