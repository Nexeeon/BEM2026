import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleVideoEnd = () => {
    // 1. Video selesai, tunggu sebentar sekitar 0.2-0.3 detik (250ms) sebelum slide ke atas
    setTimeout(() => {
      setIsExiting(true);
    }, 250);
  };

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!isExiting ? (
        <motion.div
          key="loading-screen"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.0, // Durasi animasi slide (0.8 - 1.2 detik)
            ease: [0.25, 1, 0.5, 1], // Cubic-bezier custom untuk efek cinematic yang smooth
          }}
          className="fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-black pointer-events-auto flex items-center justify-center m-0 p-0"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            overflow: "hidden",
            overscrollBehavior: "none",
          }}
        >
          {/* CSS khusus untuk penyesuaian HP/Mobile tanpa mengganggu Desktop & Mencegah Scrollbar */}
          <style>{`
            html, body {
              overflow-x: hidden !important;
            }
            /* Tampilan Mobile / HP (layar dibawah 768px) */
            @media (max-width: 768px) {
              .loading-video-responsive {
                object-fit: contain !important;
                object-position: center center !important;
                transform: scale(0.85); 
                transition: transform 0.3s ease-in-out;
              }
            }

            /* Tampilan HP Sangat Kecil / Layar Sangat Sempit (dibawah 480px) */
            @media (max-width: 480px) {
              .loading-video-responsive {
                transform: scale(0.75);
              }
            }

            /* Tampilan Desktop tetap menggunakan object-fit: cover biasa */
            @media (min-width: 769px) {
              .loading-video-responsive {
                object-fit: cover !important;
                object-position: center center !important;
                transform: scale(1) !important;
              }
            }
          `}</style>

          <video
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={handleVideoEnd}
            className="loading-video-responsive w-full h-full block pointer-events-none m-0 p-0"
          >
            <source src="/vidiobem/BEMPOLSRI.mp4" type="video/mp4" />
            Browser Anda tidak mendukung pemutaran video.
          </video>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
