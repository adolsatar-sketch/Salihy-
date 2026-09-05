"use client";

import Link, { type LinkProps } from "next/link";
import { useTransitionNavigate } from "./TransitionProvider";
import type { AnchorHTMLAttributes } from "react";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: React.ReactNode;
  };

export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const navigate = useTransitionNavigate();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button !== 0) return;
        event.preventDefault();
        navigate(typeof href === "string" ? href : href.pathname ?? "/");
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
