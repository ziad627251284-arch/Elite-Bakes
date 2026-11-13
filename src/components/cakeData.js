export const cakes = [
  {
    id: "strawberry-pistachio",
    title: "كيك الفراولة والبستاشيو",
    titleEn: "Strawberry Pistachio Cake",
    description: "كيك فاخر بطبقات الفراولة الطازجة وكريمة البستاشيو الفاخرة",
    price: 199,
    wholeImage: "/strawberry-pistachio/whole.webp",
    wrapperImage: "/strawberry-pistachio/packaging.webp",
    separateVideo: "/videos/strawberry-pistachio-separate.mp4",
    reassembleVideo: "/videos/strawberry-pistachio-reassemble.mp4",
    layers: [
      { id: "base", name: "قاعدة الكيك", color: "#f3e5ab", thickness: 42, imageSrc: "/strawberry-pistachio/layer-01.png", imageWidth: 380, imageHeight: 199 },
      { id: "strawberry", name: "طبقة الفراولة", color: "#ff9aa2", thickness: 32, imageSrc: "/strawberry-pistachio/layer-02.png", imageWidth: 350, imageHeight: 200 },
      { id: "cream", name: "كريمة البستاشيو", color: "#d8e2dc", thickness: 38, imageSrc: "/strawberry-pistachio/layer-03.png", imageWidth: 349, imageHeight: 204 },
      { id: "topping", name: "تزيين السطح", color: "#b5e48c", thickness: 22, imageSrc: "/strawberry-pistachio/layer-04.png", imageWidth: 375, imageHeight: 221 },
    ],
  },
];

export const STRAWBERRY_PISTACHIO_CAKE = cakes[0];

export function getCakeById(id) {
  return cakes.find((cake) => cake.id === id);
}

export function getAllCakes() {
  return cakes;
}

export default cakes;