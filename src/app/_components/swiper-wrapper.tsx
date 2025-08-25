'use client';

import dynamic from 'next/dynamic';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface PhoneSet {
  center: string;
  left: string;
  right: string;
}

interface SwiperWrapperProps {
  phoneSets: PhoneSet[];
}

function SwiperWrapper({ phoneSets }: SwiperWrapperProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={50}
      slidesPerView={1}
      className="w-full h-full z-20"
    >
      {phoneSets.map((set, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[700px] flex items-center justify-center">
            {/* Left phone */}
            <div className="absolute left-1/2 -translate-x-[95%] top-16 rotate-[-8deg] hidden md:block z-10 scale-90 opacity-70 animate-float-slow">
              <div className="relative w-[260px] h-[520px] rounded-[40px] bg-neutral-900 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-black/20 overflow-hidden">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-black/50" />
                <Image
                  src={set.left}
                  alt="Left phone"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right phone */}
            <div className="absolute left-1/2 -translate-x-[5%] top-16 rotate-[8deg] hidden md:block z-10 scale-90 opacity-70 animate-float-delay">
              <div className="relative w-[260px] h-[520px] rounded-[40px] bg-neutral-900 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)] ring-1 ring-black/20 overflow-hidden">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-black/50" />
                <Image
                  src={set.right}
                  alt="Right phone"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Center phone */}
            <div className="relative z-20 animate-float">
              <div className="relative w-[300px] h-[600px] sm:w-[320px] sm:h-[640px] rounded-[48px] bg-neutral-900 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.7)] ring-2 ring-black/30 overflow-hidden">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-black/50" />
                <Image
                  src={set.center}
                  alt="Center phone"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// Export as dynamic component to ensure client-side rendering
export default dynamic(() => Promise.resolve(SwiperWrapper), {
  ssr: false,
});
