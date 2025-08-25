import Image from "next/image";

export default function IphoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-[300px] h-[600px] sm:w-[320px] sm:h-[640px] rounded-[48px] bg-black shadow-[0_40px_90px_-20px_rgba(0,0,0,0.7)] ring-2 ring-black/30 overflow-hidden animate-float">
      {/* iPhone notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-20" />

      {/* Screen */}
      <Image src={src} alt={alt} fill className="object-cover" priority />

      {/* Side buttons */}
      <div className="absolute left-0 top-24 w-1 h-12 bg-gray-800 rounded-r-md" />
      <div className="absolute right-0 top-32 w-1 h-20 bg-gray-800 rounded-l-md" />
    </div>
  );
}