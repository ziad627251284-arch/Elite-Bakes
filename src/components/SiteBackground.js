export default function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[#f4ecdd]" />
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-15%,#fffdf9_0%,rgba(255,253,249,0)_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_120%,#e9d9c2_0%,rgba(233,217,194,0)_62%)]" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#dccbb4_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
}