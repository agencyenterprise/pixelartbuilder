import Image from "next/image";

export function Header() {
  return (
    <header className="print:hidden relative flex items-center justify-between p-4 bg-logo-bg/80 text-white">
      <h1 className="flex items-center text-2xl md:absolute top-4 left-4">
        <Image src='/logo.svg' width={50} height={50} alt="Logo" />
        Pixel Art Builder
      </h1>
      <a
        target="_blank"
        data-analytics="learn-more-about-ae-link"
        className="hidden md:flex flex-col grow md:flex-row p-3 md:p-2.5 justify-center items-center gap-1 md:gap-4 text-sm font-normal md:h-11"
        href="https://ae.studio/ai-solutions?utm_source=sds&amp;utm_medium=referral&amp;utm_campaign=pixelartbuilder&amp;utm_content=top-bar&amp;utm_term=3ff5251a-e107-4d47-bfb8-b2962debd252"
      >
        <span className="font-medium">Made with 🧡 by <span className="underline">AE Studio</span></span>
        <span className="hidden md:flex">•</span>
        <span className="hidden md:block">See what we could build for you</span>
        <div className="hidden md:block">
          <span className="font-semibold underline">Learn more →</span>
        </div>
      </a>
    </header>
  )
}