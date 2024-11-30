export default function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-balance text-center text-sm font-medium leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Spectron Labs. All rights reserved. Built by <a
          href="https://github.com/MrInspection"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Moussa
        </a>.
        </div>
      </div>
    </footer>
  )
}
