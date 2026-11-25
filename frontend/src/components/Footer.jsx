function Footer() {
  return (
    <footer className="mt-16 font-sans">
      {/* Val koji prelazi iz bijele stranice u tamnoplavi footer */}
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className="block h-10 w-full md:h-14">
        <path d="M0 30 C 240 70 480 -10 720 30 C 960 70 1200 -10 1440 30 L1440 60 L0 60 Z" className="fill-aqua/60" />
        <path d="M0 40 C 240 75 480 5 720 40 C 960 75 1200 5 1440 40 L1440 60 L0 60 Z" className="fill-navy" />
      </svg>

      <div className="relative -mt-px bg-navy text-white">
        <div className="mx-auto flex max-w-[1064px] flex-col items-center gap-4 px-4 pb-8 pt-4 text-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="" className="size-9" />
            <span className="font-title text-xl">Charterly</span>
          </a>

          <nav aria-label="Poveznice" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <a href="/privacy" className="transition-colors hover:text-aqua">Pravila privatnosti</a>
            <a href="/terms" className="transition-colors hover:text-aqua">Uvjeti korištenja</a>
          </nav>

          <p className="text-xs text-white/50">&copy; 2026 Charterly · Tim G09.2 GitHappens · FER</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
