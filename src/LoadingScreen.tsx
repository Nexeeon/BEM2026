import React, { useState } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleVideoEnd = () => {
    // Mulai animasi fade-out
    setIsFading(true);

    // Berikan delay (800ms) agar animasi fade-out selesai sebelum memanggil callback
    setTimeout(() => {
      onFinish();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-800 ease-in-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        controls={false}
        onEnded={handleVideoEnd}
        className="w-screen h-screen object-cover"
      >
        <source src="/vidiobem/BEMPOLSRI.mp4" type="video/mp4" />
        Browser Anda tidak mendukung pemutaran video.
      </video>
    </div>
  );
};

export default LoadingScreen;
