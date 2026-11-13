import { useMemo, useState } from "react";
import Image from "next/image";

const BASE_DIAMETER = 280;
const SEPARATION = 60;

export default function CakeLayersViewer({
  layers = [],
  layerOffsets = [],
  showLabels = true,
  layerScale = 1,
}) {
  const [imageErrors, setImageErrors] = useState({});

  const { positionedLayers, stageHeight, stageWidth } = useMemo(() => {
    const diameter = BASE_DIAMETER * layerScale;
    const items = layers.map((layer, index) => {
      const width = Number(layer.imageWidth) || 380;
      const height = Number(layer.imageHeight) || 200;
      const displayWidth = diameter;
      const displayHeight = (diameter * height) / width;
      // Compute bottom from sum of previous layers' thickness
      const bottom = layers
        .slice(0, index)
        .reduce((sum, l) => sum + (Number(l.thickness) || 0), 0);
      return {
        ...layer,
        bottom,
        displayWidth,
        displayHeight,
        zIndex: index + 1,
      };
    });

    // Keep the complete expanded stack within the stage, regardless of animation frame.
    const highest = items.reduce(
      (max, layer, index) =>
        Math.max(max, layer.bottom + layer.displayHeight + index * SEPARATION),
      0
    );
    return {
      positionedLayers: items,
      stageHeight: Math.ceil(highest + (showLabels ? 42 : 20)),
      stageWidth: Math.ceil(diameter + (showLabels ? 112 : 12)),
    };
  }, [layers, layerScale, showLabels]);

  return (
    <div className="flex w-full justify-center overflow-visible" aria-label="عارض طبقات الكيك">
      <div
        className="relative max-w-full shrink-0"
        style={{ width: stageWidth, height: stageHeight }}
      >
        {positionedLayers.map((layer, index) => {
          const useImage = Boolean(layer.imageSrc) && !imageErrors[layer.id];
          return (
            <div
              key={layer.id}
              className="absolute left-1/2 flex flex-col items-center select-none"
              style={{
                bottom: layer.bottom + 10,
                transform: `translateX(-50%) translateY(${layerOffsets[index] ?? 0}px)`,
                zIndex: layer.zIndex,
              }}
              aria-label={layer.name}
            >
              {useImage ? (
                <div
                  className="relative max-w-full"
                  style={{ width: layer.displayWidth, height: layer.displayHeight }}
                >
                  <Image
                    src={layer.imageSrc}
                    alt={layer.name}
                    fill
                    sizes="(max-width: 640px) 76vw, 320px"
                    style={{ objectFit: "contain" }}
                    onError={() =>
                      setImageErrors((prev) => ({ ...prev, [layer.id]: true }))
                    }
                  />
                </div>
              ) : (
                <div
                  className="flex items-center justify-center rounded-[50%] border"
                  style={{
                    width: layer.displayWidth,
                    height: layer.displayHeight,
                    background: layer.color || "#e9dfd2",
                    borderColor: "#b9a891",
                  }}
                >
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-stone-800">
                    {layer.name}
                  </span>
                </div>
              )}
              {showLabels && (
                <span className="mt-1 rounded-full border border-[#e6d8c7] bg-white/95 px-3 py-1 text-xs font-semibold whitespace-nowrap text-[#563b38] shadow-sm">
                  {layer.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
