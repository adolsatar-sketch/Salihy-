import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  title,
  className,
}: {
  number: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 text-steel", className)}>
      <span className="font-heading text-xs tracking-[0.4em]">{number}</span>
      <span className="h-px w-10 bg-steel/50" />
      <span className="font-heading text-xs tracking-[0.4em]">{title}</span>
    </div>
  );
}
