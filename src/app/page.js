import StoreLayout from "@/components/StoreLayout";
import CakeCardGrid from "@/components/CakeCardGrid";

export default function Home() {
  return (
    <StoreLayout>
      <section aria-label="تشكيلة الكيك">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#422c31] sm:text-3xl">
            تشكيلة الكيك
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8a7268]">
            استعرض تفاصيل كل قالب بتجربة تفاعلية سلسة
          </p>
        </div>
        <CakeCardGrid />
      </section>
    </StoreLayout>
  );
}