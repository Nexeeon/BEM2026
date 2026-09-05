import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleFinish = React.useCallback(() => {
    setIsExiting(true);
  }, []);

  // Safety fallback timeout (jika video tidak selesai atau gagal dimuat dalam 4.5 detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, [handleFinish]);

  const handleVideoEnd = () => {
    setTimeout(() => {
      handleFinish();
    }, 200);
  };

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!isExiting ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1],
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
            @media (max-width: 768px) {
              .loading-video-responsive {
                object-fit: contain !important;
                object-position: center center !important;
                transform: scale(0.85); 
                transition: transform 0.3s ease-in-out;
              }
            }
            @media (max-width: 480px) {
              .loading-video-responsive {
                transform: scale(0.75);
              }
            }
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
            preload="metadata"
            controls={false}
            onEnded={handleVideoEnd}
            onError={handleFinish}
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
