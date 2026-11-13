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
  {
    id: "al-nassr",
    title: "كيكة نادي النصر",
    titleEn: "Al Nassr Celebration Cake",
    description: "كيكة احتفالية بتصميم نادي النصر وطبقات كريمة وفواكه مشكلة — وصف تصوري يحتاج اعتماد المكونات الفعلية.",
    price: null,
    wholeImage: "/al-nassr/whole.png",
    wrapperImage: null,
    separateVideo: "/videos/al-nassr-separate.mp4",
    reassembleVideo: "/videos/al-nassr-reassemble.mp4",
    layers: [
      { id: "base", name: "قاعدة الكيك", color: "#f9d432" },
      { id: "fruit", name: "طبقة فواكه مشكلة وكريمة", color: "#f5e9d7" },
      { id: "cream", name: "كريمة وفستق", color: "#f7f1dc" },
      { id: "top", name: "السطح بشعار نادي النصر", color: "#1254a3" },
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