import Image from "next/image";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ background: "#050505", color: "#f2efe8", margin: 0 }}>
        <section
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
            fontFamily: "sans-serif",
          }}
        >
          <Image src="/assets/logo/logo-mark.png" alt="" width={96} height={96} style={{ opacity: 0.5 }} />
          <p style={{ fontSize: "4rem", marginTop: "2rem" }}>404</p>
          <Link href="/ar" style={{ marginTop: "1.5rem", color: "#B20F20" }}>
            العودة إلى الرئيسية
          </Link>
        </section>
      </body>
    </html>
  );
}
