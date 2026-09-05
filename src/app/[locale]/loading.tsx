import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center bg-obsidian">
      <div className="relative h-16 w-16 animate-pulse">
        <Image src="/assets/logo/logo-mark.png" alt="" fill sizes="64px" className="object-contain opacity-60" />
      </div>
    </div>
  );
}
