export default function SiteFooter() {
  return (
    <footer className="border-t bg-white py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
        <div className="text-balance text-center font-medium text-muted-foreground text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href="https://github.com/MrInspection"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Moussa
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/MrInspection/pandaflow"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
