import { BrandMark } from "@/components/motion/BrandMark";

/**
 * A single, quiet seam between two sections — used sparingly, not on every
 * boundary — carrying the circular kanku emblem as a small centered detail
 * rather than a plain rule.
 */
export function BrandDivider() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center bg-obsidian/92 py-10 sm:py-14">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-bone/15 sm:w-24" />
      <div className="relative mx-4 h-10 w-10 shrink-0 sm:h-12 sm:w-12">
        <BrandMark variant="emblem" maxOpacity={0.28} parallax={6} sweep className="absolute inset-0 h-full w-full" />
      </div>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-bone/15 sm:w-24" />
    </div>
  );
}
