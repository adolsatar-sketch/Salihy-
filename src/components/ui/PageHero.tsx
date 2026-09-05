import { Reveal } from "@/components/ui/Reveal";
import { LogoHeroMark } from "@/components/motion/LogoHeroMark";
import { LogoHeroMarkMobile } from "@/components/motion/LogoHeroMarkMobile";

/**
 * The shared inner-page hero: the official logo is the visual centerpiece
 * (never a photo of a fighter), with the page's own eyebrow/title/subtitle
 * appearing underneath as secondary text. Used on every route's opening
 * section so no page reduces to "a headline over a flat black background".
 */
export function PageHero({
  number,
  eyebrow,
  title,
  subtitle,
}: {
  number: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-obsidian/92 pb-4 pt-32 sm:pt-36">
      <LogoHeroMark className="mx-auto hidden md:block" />
      <LogoHeroMarkMobile className="mx-auto md:hidden" />

      <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-6 text-center sm:px-10 sm:pb-16">
        <Reveal>
          <p className="font-heading text-xs tracking-[0.4em] text-steel">
            {number} — {eyebrow}
          </p>
          <h1 className="font-heading text-balance mt-6 text-4xl text-bone sm:text-5xl md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-4 text-sm leading-relaxed text-steel sm:text-base">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
