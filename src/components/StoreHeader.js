export default function StoreHeader() {
  return (
    <header className="flex flex-col items-center gap-1.5 px-4 pb-2 pt-10 text-center sm:pt-14">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-[#a98a6d]">
        Bespoke Bakery
      </span>
      <h1 className="font-serif text-3xl font-bold leading-none tracking-[0.06em] text-[#5a3540] sm:text-[2.6rem]">
        ELITE BAKES
      </h1>
      <p className="text-sm font-medium tracking-[0.25em] text-[#8a6a5f]">إيليت بيكس</p>
      <span
        aria-hidden="true"
        className="mt-2 h-px w-20 bg-gradient-to-l from-transparent via-[#cdb59b] to-transparent"
      />
    </header>
  );
}