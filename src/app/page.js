import CakeCardGrid from "@/components/CakeCardGrid";

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f8f5f0] px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
          <p className="text-sm font-bold tracking-[0.12em] text-[#7c4a4e]">
            ELITE BAKES <span className="font-normal tracking-normal">/ إيليت بيكس</span>
          </p>
          <span className="rounded-full border border-[#e6d9c8] bg-white/75 px-3 py-1 text-xs text-[#846c61]">
            منيو الكيك
          </span>
        </header>

        <h2 className="mb-8 text-2xl sm:text-3xl font-bold text-[#422c31]">
          تشكيلة الكيك
        </h2>

        <CakeCardGrid />
      </div>
    </main>
  );
}