import type { Metadata } from "next";
import TanstackProviders from "src/_lib/tanstackProviders";
import "src/app/globals.css";

export const metadata: Metadata = {
  title: "모아용",
  description: "많이 모아용",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QV8M85QKYB"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QV8M85QKYB');
            `,
          }}
        />
      </head>
      <body className="antialiased bg-gray-0 font-pretendard">
        <TanstackProviders>{children}</TanstackProviders>
      </body>
    </html>
  );
}
