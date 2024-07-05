import Link from "next/link"

const AE_LINK = "https://ae.studio?utm_source=sds&utm_medium=referral&utm_campaign=pixelartbuilder&utm_content=footer&utm_term=3ff5251a-e107-4d47-bfb8-b2962debd252"
export function Footer() {
  return (
    <footer className="print:hidden bg-logo-bg/70 text-white py-10 drop-shadow-xl">
      <div className="container mx-auto flex justify-between flex-col md:flex-row gap-5 items-center">
          <div className="text-center">© 2024 Pixel Art Builder<br />All rights reserved</div>
          <div className="text-center">Made with 🧡 by <Link href={AE_LINK} className="underline" target="_blank">AE Studio</Link></div>
          <a href={AE_LINK} className="font-semibold bg-[#C32A31] hover:bg-[#C32A31]/80 text-white py-2 px-4 rounded transition">Learn more →</a>
        </div>
    </footer>
  )
}