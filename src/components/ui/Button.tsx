import { TransitionLink } from "@/components/transitions/TransitionLink";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden px-7 py-3.5 text-sm tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-active";

const variants = {
  primary: "bg-active text-bone hover:bg-blood",
  outline: "border border-bone/30 text-bone hover:border-bone",
  ghost: "text-bone/80 hover:text-bone",
  dark: "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-bone",
};

type CommonProps = {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <TransitionLink href={href} className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10">{children}</span>
    </TransitionLink>
  );
}

export function ExternalButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a href={href} className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
