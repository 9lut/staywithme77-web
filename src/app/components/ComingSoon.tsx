"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { siteConfig } from "@/app/lib/siteConfig";

const titles = [
  "StayWithMe 77 @HatYai",
  "ที่พักหาดใหญ่",
  "พักสบาย ใจกลางเมือง",
  "Hat Yai accommodation",
  "Stay comfortably in the city",
  "",
];

const features = [
  "สะอาด สะดวก มีที่จอดรถฟรีบริเวณที่พัก",
  "บริการช่วยเหลือตลอด 24 ชั่วโมง",
  "ฟรี Wi-Fi ความเร็วสูง",
  "เช็คอิน – เช็คเอาท์ยืดหยุ่นตามนัด",
];

export default function ComingSoon() {
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    let titleIndex = 0;
    let characterIndex = 0;
    let timeout: number;

    const typeNext = () => {
      const title = titles[titleIndex];
      characterIndex += 1;
      setTypedTitle(title.slice(0, characterIndex));
      if (characterIndex < title.length) {
        timeout = window.setTimeout(typeNext, 95);
      } else {
        timeout = window.setTimeout(() => {
          titleIndex = (titleIndex + 1) % titles.length;
          characterIndex = 0;
          typeNext();
        }, 5000);
      }
    };

    typeNext();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="relative min-h-[100svh] w-full flex flex-col items-center p-4">
      {/* Background */}
      <Image
        src={siteConfig.assets.heroBackground}
        alt="StayWithMe77 Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,20,0.62)_0%,rgba(8,8,20,0.72)_55%,rgba(8,8,20,0.55)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-4 pb-20 pt-[80px] md:pb-20 md:pt-[100px]">
        <div className="flex w-full max-w-[460px] flex-col items-center gap-5 md:max-w-[1180px] md:gap-7">
          <Image
            src={siteConfig.assets.logoGold}
            alt="StayWithMe77 Logo"
            width={320}
            height={320}
            className="object-contain drop-shadow-2xl md:w-[400px] mb-4"
            priority
          />

          {/* Headline */}
          <h1 className="w-full text-center text-[clamp(2.6rem,6vw,4rem)] font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            {typedTitle}
            <span className="cursor-blink text-amber-400">|</span>
          </h1>

          {/* Feature Bullets */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/20 bg-white/[0.11] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-8 md:gap-y-4 md:max-w-[800px] xl:max-w-none xl:flex xl:items-center xl:justify-center xl:gap-7 xl:rounded-full xl:px-8 xl:py-3">
            <span
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              aria-hidden="true"
            />
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CircleCheck
                  aria-hidden="true"
                  size={17}
                  className="shrink-0 text-amber-400"
                />
                <p className="text-sm leading-snug text-white/90">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
