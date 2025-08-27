import Container from "@/app/_components/container";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-900">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold tracking-tight">MS Bridge</div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-slate-300">
              By <span className="font-semibold">Syntax Lab Technology</span>
            </p>
            <p className="mt-4 text-sm text-neutral-600 dark:text-slate-300 max-w-md">
              New landing, releases, APK downloads, and blog — everything about MS Bridge in one place.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-slate-100">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/features" className="hover:underline">Features</Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">Blog</Link>
              </li>
              <li>
                <Link href="/technologies" className="hover:underline">Technologies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-slate-100">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/versions" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Download APK
                </a>
              </li>
              <li>
                <Link href="/posts" className="hover:underline">Blog </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600 dark:text-slate-300">
            © {year} Syntax Lab Technology · MS Bridge
          </p>
          <p className="text-xs text-neutral-600 dark:text-slate-300">
            <a href="https://rafay99.com/contact-me" target="_blank" rel="noopener noreferrer" className="hover:underline">Made with ❤️ by Abdul Rafay</a>
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <span className="text-neutral-400">•</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
            
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
