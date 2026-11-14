"use client";

import Image from "next/image";
import Link from "next/link";

export default function CakeCard({ cake }) {
  return (
    <Link
      href={`/cake/${cake.id}`}
      className="
        group block min-w-0 overflow-hidden
        rounded-[28px] border border-[#e9ded2]
        bg-[#fffdf9]
        shadow-[0_10px_40px_rgba(71,44,35,0.06)]
        transition-all duration-300
        hover:shadow-[0_20px_60px_rgba(71,44,35,0.12)]
        hover:-translate-y-1
      "
    >
      <article className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f5eee6]">
          <Image
            src={cake.wholeImage}
            alt={cake.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />

          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#663d43] shadow-[0_6px_20px_rgba(71,44,35,0.18)] backdrop-blur transition-all duration-300 group-hover:bg-white group-hover:text-[#8b4a50] group-hover:shadow-[0_10px_26px_rgba(71,44,35,0.24)]">
            عرض التفاصيل
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="font-bold text-lg sm:text-xl leading-snug bg-gradient-to-l from-[#8b4a50] via-[#663d43] to-[#422c31] bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#a05a60] group-hover:via-[#7a464c] group-hover:to-[#5a3a40]">
              {cake.title}
            </h3>

            <span className="shrink-0 inline-flex items-center rounded-full bg-[#f7ece2] px-3 py-1.5 text-sm font-bold text-[#8b4a50] ring-1 ring-[#e9d4c4] transition-colors duration-300 group-hover:bg-[#f1dfd0] group-hover:text-[#7a3f45]">
              {cake.price == null ? "السعر عند الطلب" : `${cake.price} ر.س`}
            </span>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-[#5c4a42]">
            {cake.description}
          </p>
        </div>
      </article>
    </Link>
  );
}