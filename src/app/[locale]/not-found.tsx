import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";

// Segment-level not-found can't read the [locale] param, so it renders in
// the default locale — still fully themed rather than a bare Next.js page.
export default function NotFound() {
  const locale = defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center bg-obsidian px-6 text-center">
      <Image src="/assets/logo/logo-mark.png" alt="" width={96} height={96} className="opacity-50" />
      <p className="font-heading mt-8 text-7xl text-bone sm:text-8xl">404</p>
      <h1 className="font-heading mt-4 text-2xl text-bone sm:text-3xl">{dict.common.notFoundTitle}</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-steel">{dict.common.notFoundBody}</p>
      <div className="mt-10">
        <ButtonLink href={localePath(locale, "/")} variant="primary">
          {dict.common.backHome}
        </ButtonLink>
      </div>
    </section>
  );
}
