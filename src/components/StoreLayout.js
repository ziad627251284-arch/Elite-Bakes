import SiteBackground from "./SiteBackground";
import StoreHeader from "./StoreHeader";
import StoreFooter from "./StoreFooter";

export default function StoreLayout({ children, width = "max-w-7xl" }) {
  return (
    <div dir="rtl" className="relative min-h-screen">
      <SiteBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <StoreHeader />
        <main
          className={`mx-auto w-full ${width} flex-1 px-4 pb-20 sm:px-6 lg:px-10`}
        >
          {children}
        </main>
        <StoreFooter />
      </div>
    </div>
  );
}