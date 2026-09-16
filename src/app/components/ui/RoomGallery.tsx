"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import ImageLightbox from "@/app/components/shared/ImageLightbox";

type RoomGalleryProps = { images: string[]; name: string };

export default function RoomGallery({ images, name }: RoomGalleryProps) {
  const t = useTranslations("Gallery");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeImage = images[activeIndex] ?? images[0];
  if (!activeImage) return null;
  const changeImage = (direction: 1 | -1) => setActiveIndex((current) => (current + direction + images.length) % images.length);
  return <>
    <div className="relative mb-3 h-[290px] overflow-hidden rounded-xl bg-slate-200 shadow-[0_18px_45px_rgba(26,26,46,0.14)] sm:h-[380px] lg:h-[440px]">
      <button type="button" onClick={() => setIsLightboxOpen(true)} className="absolute inset-0 z-10 cursor-zoom-in" aria-label={t("open")} />
      <Image src={activeImage} alt={name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 65vw" />
      <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"><Expand size={13} /> {t("expand")}</span>
      <span className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-md bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">{activeIndex + 1} / {images.length}</span>
      {images.length > 1 && <>
        <button type="button" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-white/90 text-foreground shadow-lg transition hover:bg-white" aria-label={t("previous")}><ChevronLeft size={20} /></button>
        <button type="button" onClick={(event) => { event.stopPropagation(); changeImage(1); }} className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-white/90 text-foreground shadow-lg transition hover:bg-white" aria-label={t("next")}><ChevronRight size={20} /></button>
      </>}
    </div>
    <div className="flex max-w-full snap-x gap-2.5 overflow-x-auto pb-1 sm:gap-3">{images.slice(0, 8).map((image, index) => <button type="button" key={`${image}-${index}`} onClick={() => setActiveIndex(index)} className={`relative h-16 w-16 flex-none snap-start overflow-hidden rounded-md border-2 bg-white shadow-sm transition sm:h-auto sm:aspect-square sm:w-[calc((100%-2.5rem)/6)] ${activeIndex === index ? "border-accent" : "border-transparent opacity-75 hover:opacity-100"}`} aria-label={t("select", { number: index + 1 })}><Image src={image} alt={t("image", { name, number: index + 1 })} fill className="object-cover" sizes="160px" /></button>)}</div>
    <ImageLightbox images={images} name={name} activeIndex={activeIndex} open={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} onIndexChange={setActiveIndex} />
  </>;
}
