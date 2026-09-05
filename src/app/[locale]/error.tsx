"use client";

import { useEffect } from "react";
import Image from "next/image";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const dict = getDictionary(defaultLocale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center bg-obsidian px-6 text-center">
      <Image src="/assets/logo/logo-mark.png" alt="" width={80} height={80} className="opacity-50" />
      <h1 className="font-heading mt-8 text-2xl text-bone sm:text-3xl">{dict.common.errorTitle}</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-steel">{dict.common.errorBody}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-10 border border-bone/30 px-7 py-3 text-sm tracking-wide text-bone transition-colors hover:border-active hover:bg-active"
      >
        {dict.common.tryAgain}
      </button>
    </section>
  );
}
