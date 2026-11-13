"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FADE_MS = 320;

export default function CakeVideoExperience({ cake }) {
  const separateRef = useRef(null);
  const reassembleRef = useRef(null);
  const activeDirRef = useRef(null);
  const finishGuard = useRef(false);

  const [scene, setScene] = useState("whole"); // whole | separated | wrapper | video
  const [direction, setDirection] = useState("separate"); // separate | reassemble
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const SEPARATE = cake.separateVideo;
  const REASSEMBLE = cake.reassembleVideo;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setReducedMotion(mq.matches);
    sync();

    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const videoFor = useCallback(
    (dir) => (dir === "separate" ? separateRef.current : reassembleRef.current),
    []
  );

  const playDirection = useCallback(
    (dir) => {
      const video = videoFor(dir);
      const other = videoFor(dir === "separate" ? "reassemble" : "separate");

      activeDirRef.current = dir;
      finishGuard.current = false;

      if (other) other.pause();

      setDirection(dir);
      setScene("video");
      setPlaying(true);
      setError(false);

      if (!video) return;

      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }

      const promise = video.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {
          activeDirRef.current = null;
          setPlaying(false);
          setError(true);
          setScene(dir === "separate" ? "whole" : "separated");
        });
      }
    },
    [videoFor]
  );

  // Kick off (or resume) the showcase loop from an idle state.
  useEffect(() => {
    if (!autoPlay || reducedMotion) return;
    if (scene !== "whole" && scene !== "separated") return;

    const nextDir = scene === "whole" ? "separate" : "reassemble";
    const timer = setTimeout(() => playDirection(nextDir), 350);

    return () => clearTimeout(timer);
  }, [scene, autoPlay, reducedMotion, playDirection]);

  const handleEnded = useCallback(
    (dir) => {
      if (activeDirRef.current !== dir) return;
      if (finishGuard.current) return;
      finishGuard.current = true;

      if (autoPlay && !reducedMotion) {
        playDirection(dir === "separate" ? "reassemble" : "separate");
      } else {
        activeDirRef.current = null;
        setPlaying(false);
        setScene(dir === "separate" ? "separated" : "whole");
      }
    },
    [autoPlay, reducedMotion, playDirection]
  );

  const start = (nextDirection) => {
    if (playing) return;

    setError(false);
    setAutoPlay(false);

    if (reducedMotion) {
      if (nextDirection === "separate") {
        const video = separateRef.current;
        if (video && Number.isFinite(video.duration)) {
          try {
            video.currentTime = Math.max(0, video.duration - 0.05);
          } catch {
            /* ignore */
          }
        }
        setScene("separated");
      } else {
        setScene("whole");
      }
      return;
    }

    playDirection(nextDirection);
  };

  const showWrapper = () => {
    if (!cake.wrapperImage) return;
    if (playing && !autoPlay) return;
    setAutoPlay(false);
    setPlaying(false);
    activeDirRef.current = null;
    separateRef.current?.pause();
    reassembleRef.current?.pause();
    setScene("wrapper");
  };

  const returnToWhole = () => {
    if (playing && !autoPlay) return;
    setError(false);
    separateRef.current?.pause();
    reassembleRef.current?.pause();
    setScene("whole");
    setAutoPlay(false);
  };

  // Keep the separate clip parked on its final (separated) frame while idle.
  useEffect(() => {
    if (scene !== "separated") return;
    const video = separateRef.current;
    if (!video) return;

    const seekToEnd = () => {
      if (Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.max(0, video.duration - 0.05);
        } catch {
          /* ignore */
        }
      }
    };

    if (video.readyState >= 1) seekToEnd();
    else video.addEventListener("loadedmetadata", seekToEnd, { once: true });

    return () => video.removeEventListener("loadedmetadata", seekToEnd);
  }, [scene]);

  const isWholeVisible = scene === "whole";
  const isWrapperVisible = scene === "wrapper";
  const isSeparateVisible =
    scene === "separated" || (scene === "video" && direction === "separate");
  const isReassembleVisible = scene === "video" && direction === "reassemble";

  const layerClass =
    "absolute inset-0 h-full w-full object-contain transition-opacity ease-out";
  const fadeStyle = { transitionDuration: `${FADE_MS}ms` };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f5f0] px-4 py-8 text-[#342a28] sm:px-6 sm:py-12 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-semibold text-[#663d43] shadow-sm transition-colors hover:bg-white hover:text-[#8b4a50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            العودة إلى المنيو
          </Link>
          <span className="rounded-full border border-[#e6d9c8] bg-white/75 px-3 py-1 text-xs text-[#846c61]">
            {cake.title}
          </span>
        </header>

        {/* Main product card */}
        <article
          className="
            grid w-full min-w-0 overflow-hidden
            rounded-[28px] border border-[#e9ded2]
            bg-[#fffdf9]
            shadow-[0_20px_65px_rgba(71,44,35,0.08)]
            md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]
            items-start
          "
        >

          {/* Cake visual — first on mobile, left on desktop */}
          <section
            aria-label="مشهد الكيكة التفاعلي"
            className="
              relative order-1 min-w-0 overflow-hidden
              lg:order-2
              aspect-[4/3]
              w-full
              bg-[radial-gradient(ellipse_at_center,#fffdf9_0%,#f5eee6_100%)]
            "
          >
            <div className="absolute inset-0">

              {/* Whole cake (idle / initial state) */}
              <Image
                src={cake.wholeImage}
                alt={cake.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={fadeStyle}
                className={`${layerClass} ${isWholeVisible ? "opacity-100" : "opacity-0"}`}
              />

              {/* Packaging concept */}
              {cake.wrapperImage && (
                <Image
                  src={cake.wrapperImage}
                  alt="تصور تجريبي لتغليف الكيكة"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  style={fadeStyle}
                  className={`${layerClass} ${isWrapperVisible ? "opacity-100" : "opacity-0"}`}
                />
              )}

              {/* Separate clip — stays mounted so the end frame persists */}
              <video
                ref={separateRef}
                className={`${layerClass} ${isSeparateVisible ? "opacity-100" : "opacity-0"}`}
                style={fadeStyle}
                muted
                playsInline
                preload="auto"
                onEnded={() => handleEnded("separate")}
                onTimeUpdate={(event) => {
                  if (activeDirRef.current !== "separate") return;
                  const video = event.currentTarget;
                  if (
                    !video.ended &&
                    Number.isFinite(video.duration) &&
                    video.currentTime >= video.duration - 0.08
                  ) {
                    handleEnded("separate");
                  }
                }}
                onError={() => {
                  activeDirRef.current = null;
                  setPlaying(false);
                  setError(true);
                  setScene("whole");
                }}
                aria-label="تفكيك الكيكة إلى طبقات كاملة"
              >
                <source src={SEPARATE} type="video/mp4" />
              </video>

              {/* Reassemble clip — preloaded so the swap is instant */}
              <video
                ref={reassembleRef}
                className={`${layerClass} ${isReassembleVisible ? "opacity-100" : "opacity-0"}`}
                style={fadeStyle}
                muted
                playsInline
                preload="auto"
                onEnded={() => handleEnded("reassemble")}
                onTimeUpdate={(event) => {
                  if (activeDirRef.current !== "reassemble") return;
                  const video = event.currentTarget;
                  if (
                    !video.ended &&
                    Number.isFinite(video.duration) &&
                    video.currentTime >= video.duration - 0.08
                  ) {
                    handleEnded("reassemble");
                  }
                }}
                onError={() => {
                  activeDirRef.current = null;
                  setPlaying(false);
                  setError(true);
                  setScene("separated");
                }}
                aria-label="إعادة تجميع الكيكة"
              >
                <source src={REASSEMBLE} type="video/mp4" />
              </video>

            </div>

            {/* Scene label badge */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
              <div className="rounded-full border border-[#e7d9cb] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#755d54] shadow-sm" aria-live="polite">
                {scene === "whole" && "الكيكة الكاملة"}
                {scene === "separated" && "تفاصيل الطبقات"}
                {scene === "wrapper" && "تصوّر التغليف"}
                {scene === "video" && (direction === "separate" ? "جاري التفكيك…" : "جاري التجميع…")}
              </div>
            </div>
          </section>

          {/* Product information */}
          <section
            className="
              order-2 flex min-w-0 flex-col
              justify-center
              gap-4 p-5
              sm:p-7
              lg:order-1 lg:gap-5 lg:p-9
            "
          >
            {/* Controls first */}
            <div className="w-full flex flex-wrap gap-3" role="group" aria-label="التحكم في مشاهد الكيكة">

              {scene === "whole" && (
                <button type="button" disabled={playing} onClick={() => start("separate")} className="min-h-12 rounded-xl bg-[#663d43] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#502f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                  مكونات طبقات الكيكة
                </button>
              )}

              {scene === "separated" && (
                <>
                  <button type="button" disabled={playing} onClick={() => start("reassemble")} className="min-h-12 rounded-xl bg-[#663d43] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#523036] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                    إعادة التجميع
                  </button>
                </>
              )}

              {(cake.wrapperImage) && (scene === "whole" || scene === "separated" || (autoPlay && scene === "video")) && (
                <button type="button" disabled={playing && !autoPlay} onClick={showWrapper} className="min-h-12 rounded-xl border border-[#d9bca9] bg-white px-5 py-3 font-semibold text-[#663d43] transition-colors hover:bg-[#f7f0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                  شاهد التغليف
                </button>
              )}

              {scene === "wrapper" && (
                <button type="button" disabled={playing} onClick={returnToWhole} className="min-h-12 rounded-xl bg-[#663d43] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#523036] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                  العودة للكيكة
                </button>
              )}

              {playing && (
                <span role="status" className="self-center text-sm text-[#80665e]">
                  جارٍ عرض التحول…
                </span>
              )}

            </div>

            {/* Cake title below controls */}
            <h1
              className="mt-6 font-bold leading-[1.4] text-[#422c31]"
              style={{
                fontSize: "clamp(1.65rem, 2.7vw, 2.5rem)",
              }}
            >
              {cake.title}
            </h1>
            <p className="mt-3 max-w-lg text-base leading-8 text-[#74655e]">{cake.description}</p>

            {/* Layer labels */}
            {scene === "separated" && (
              <div className="mt-6 rounded-2xl border border-[#e9ded2] bg-white/80 p-4">
                <h2 className="mb-3 font-semibold">
                  مكونات الطبقات — وصف توضيحي
                </h2>

                <ol className="space-y-2 text-sm">
                  {[...cake.layers]
                    .reverse()
                    .map((layer, index) => (
                      <li
                        key={layer.id}
                        className="flex items-center gap-3"
                      >
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f3e7df] text-xs">
                          {index + 1}
                        </span>
                        <span>{layer.name}</span>
                      </li>
                    ))}
                </ol>
              </div>
            )}

            {error && (
              <p role="alert" className="mt-6 text-sm text-red-700">
                تعذر تشغيل الفيديو. جرّب مرة أخرى.
              </p>
            )}

          </section>
        </article>
      </div>
    </main>
  );
}