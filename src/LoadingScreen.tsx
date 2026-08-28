import React, { useState } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleVideoEnd = () => {
    // Mulai animasi fade-out
    setIsFading(true);

    // Delay 800ms agar animasi fade-out selesai sebelum callback
    setTimeout(() => {
      onFinish();
    }, 800);
  };

  return (
    <>
      {/* CSS khusus untuk penyesuaian HP/Mobile tanpa mengganggu Desktop */}
      <style>{`
        /* Tampilan Mobile / HP (layar dibawah 768px) */
        @media (max-width: 768px) {
          .loading-video-responsive {
            object-fit: contain !important;
            object-position: center center !important;
            /* Mengatur zoom out video khusus mobile agar logo & tulisan tidak terpotong */
            transform: scale(0.85); 
            transition: transform 0.3s ease-in-out;
          }
        }

        /* Tampilan HP Sangat Kecil / Layar Sangat Sempit (dibawah 480px) */
        @media (max-width: 480px) {
          .loading-video-responsive {
            transform: scale(0.75); /* Sedikit lebih di-zoom out agar tulisan bawah pasti muat */
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

      <div
        className={`fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-black transition-opacity duration-800 ease-in-out pointer-events-auto flex items-center justify-center ${
          isFading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          playsInline
          controls={false}
          onEnded={handleVideoEnd}
          className="loading-video-responsive w-full h-full block pointer-events-none"
        >
          <source src="/vidiobem/BEMPOLSRI.mp4" type="video/mp4" />
          Browser Anda tidak mendukung pemutaran video.
        </video>
      </div>
    </>
  );
};

export default LoadingScreen;
