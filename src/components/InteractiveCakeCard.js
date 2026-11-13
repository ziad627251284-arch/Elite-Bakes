"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import CakeLayersViewer from "./CakeLayersViewer";
import { STRAWBERRY_PISTACHIO_CAKE as cake } from "./cakeData";

const SCENES = { WHOLE: "whole", SEPARATED: "separated", WRAPPER: "wrapper" };
const GAP = 60;

export default function InteractiveCakeCard() {
  const { layers, wholeImage, wrapperImage } = cake;
  const [scene, setScene] = useState(SCENES.WHOLE);
  const [isAnimating, setIsAnimating] = useState(false);
  const [layerOffsets, setLayerOffsets] = useState(() => layers.map(() => 0));
  const [wholeError, setWholeError] = useState(false);
  const [wrapperError, setWrapperError] = useState(false);
  const timelineRef = useRef(null);
  const animationRef = useRef(false);
  const offsetsRef = useRef(layers.map(() => 0));

  useEffect(() => () => {
    timelineRef.current?.kill();
  }, []);

  const animateLayers = useCallback((separate) => {
    if (animationRef.current) return;
    const targets = layers.map((_, index) => (separate ? -index * GAP : 0));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || layers.length === 0) {
      offsetsRef.current = targets;
      setLayerOffsets(targets);
      setScene(separate ? SCENES.SEPARATED : SCENES.WHOLE);
      return;
    }

    // Mount the layers immediately when leaving the whole-cake photograph.
    if (separate) setScene(SCENES.SEPARATED);
    animationRef.current = true;
    setIsAnimating(true);
    timelineRef.current?.kill();

    const proxies = offsetsRef.current.map((value) => ({ value }));
    const timeline = gsap.timeline({
      onComplete: () => {
        offsetsRef.current = targets;
        setLayerOffsets(targets);
        setScene(separate ? SCENES.SEPARATED : SCENES.WHOLE);
        animationRef.current = false;
        setIsAnimating(false);
        timelineRef.current = null;
      },
    });

    proxies.forEach((proxy, index) => {
      timeline.to(
        proxy,
        {
          value: targets[index],
          duration: 0.7,
          ease: "power2.inOut",
          onUpdate: () => {
            const next = proxies.map((item) => item.value);
            offsetsRef.current = next;
            setLayerOffsets(next);
          },
        },
        index * 0.12
      );
    });
    timelineRef.current = timeline;
  }, [layers]);

  const showWrapper = () => {
    if (animationRef.current) return;
    setScene(SCENES.WRAPPER);
    offsetsRef.current = layers.map(() => 0);
    setLayerOffsets(offsetsRef.current);
  };

  const showWhole = () => {
    if (animationRef.current) return;
    setScene(SCENES.WHOLE);
    offsetsRef.current = layers.map(() => 0);
    setLayerOffsets(offsetsRef.current);
  };

  const sceneLabel = {
    [SCENES.WHOLE]: "الكيكة الكاملة",
    [SCENES.SEPARATED]: "تفاصيل الطبقات",
    [SCENES.WRAPPER]: "تصوّر التغليف",
  }[scene];

  return (
    <section dir="rtl" className="min-h-screen bg-[#f8f5f0] px-4 py-8 text-[#342a28] sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
          <p className="text-sm font-bold tracking-[0.12em] text-[#7c4a4e]">ELITE BAKES <span className="font-normal tracking-normal">/ إيليت بيكس</span></p>
          <span className="rounded-full border border-[#e6d9c8] bg-white/75 px-3 py-1 text-xs text-[#846c61]">عرض تصميمي تفاعلي</span>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#e9ded2] bg-[#fffdf9] shadow-[0_20px_65px_rgba(71,44,35,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col justify-center px-6 py-8 sm:px-9 sm:py-10 lg:px-10 lg:py-12">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4e9e3] px-3 py-1.5 text-xs font-semibold text-[#824a4e]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a36a6d]" />
                تجربة تفاعلية
              </span>
              <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[#a38a75]">THE CAKE COLLECTION</p>
              <h1 className="mb-5 text-3xl font-bold leading-[1.4] text-[#422c31] sm:text-4xl lg:text-[2.65rem]">{cake.title}</h1>
              <p className="max-w-lg text-base leading-8 text-[#74655e]">{cake.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#eee5dc] pt-5 text-sm text-[#806e63]">
                <span>{layers.length} طبقات</span>
                <span aria-hidden="true" className="text-[#c6ad9b]">•</span>
                <span>استكشف المكونات بصريًا</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="التحكم في مشاهد الكيكة">
                {scene === SCENES.WHOLE && (
                  <button type="button" disabled={isAnimating} onClick={() => animateLayers(true)} className="min-h-12 rounded-xl bg-[#663d43] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#502f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                    اكتشف طبقات الكيكة
                  </button>
                )}
                {scene === SCENES.SEPARATED && (
                  <>
                    <button type="button" disabled={isAnimating} onClick={() => animateLayers(false)} className="min-h-12 rounded-xl bg-[#663d43] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#502f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                      إعادة التجميع
                    </button>
                    <button type="button" disabled={isAnimating} onClick={showWrapper} className="min-h-12 rounded-xl border border-[#d9c6b2] bg-white px-5 py-3 font-semibold text-[#663d43] transition-colors hover:bg-[#f7f0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                      شاهد التغليف
                    </button>
                  </>
                )}
                {scene === SCENES.WRAPPER && (
                  <button type="button" disabled={isAnimating} onClick={showWhole} className="min-h-12 rounded-xl bg-[#663d43] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#502f34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#663d43] disabled:opacity-50">
                    العودة إلى الكيكة
                  </button>
                )}
              </div>

              <p className="mt-8 max-w-lg border-t border-[#eee5dc] pt-5 text-xs leading-6 text-[#8a7c74]">
                الصور والطبقات والتغليف تصورات مولّدة بالذكاء الاصطناعي لأغراض العرض فقط، ولا تمثل منتجات أو تغليفًا معتمدًا من المخبز.
              </p>
            </div>

            <div className="flex min-w-0 flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#fffdf9_0%,#f5eee6_100%)] px-4 py-8 sm:px-8 lg:min-h-[570px] lg:py-10">
              <div className="flex w-full min-w-0 items-center justify-center">
                {scene === SCENES.WHOLE && (
                  wholeImage && !wholeError ? (
                    <div className="relative aspect-[636/469] w-full max-w-[520px]">
                      <Image src={wholeImage} alt={cake.title} fill priority sizes="(max-width: 1024px) 90vw, 520px" style={{ objectFit: "contain" }} className="drop-shadow-[0_22px_24px_rgba(72,42,38,0.12)]" onError={() => setWholeError(true)} />
                    </div>
                  ) : (
                    <CakeLayersViewer layers={layers} layerOffsets={layerOffsets} showLabels={false} layerScale={0.85} />
                  )
                )}
                {scene === SCENES.SEPARATED && (
                  <div className="w-full max-w-[450px] overflow-visible [zoom:0.8] sm:[zoom:1]">
                    <CakeLayersViewer layers={layers} layerOffsets={layerOffsets} showLabels layerScale={1} />
                  </div>
                )}
                {scene === SCENES.WRAPPER && (
                  wrapperImage && !wrapperError ? (
                    <div className="relative aspect-[539/486] w-full max-w-[460px]">
                      <Image src={wrapperImage} alt={`تصور تغليف ${cake.title}`} fill sizes="(max-width: 1024px) 90vw, 460px" style={{ objectFit: "contain" }} className="drop-shadow-[0_22px_24px_rgba(72,42,38,0.12)]" onError={() => setWrapperError(true)} />
                    </div>
                  ) : (
                    <div className="flex aspect-square w-full max-w-[400px] items-center justify-center rounded-2xl border border-dashed border-[#d4c5b8] bg-white/60 p-6 text-center text-sm text-[#796c65]">
                      تعذر عرض صورة التغليف التجريبية
                    </div>
                  )
                )}
              </div>
              <div className="mt-5 rounded-full border border-[#e7d9cb] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#755d54]" aria-live="polite">
                {sceneLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
