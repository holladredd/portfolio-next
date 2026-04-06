import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="description" content="Quantum Realm - Next-Gen 3D Portfolio Experience" />
      </Head>
      <body className="antialiased bg-black selection:bg-accent/30 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
