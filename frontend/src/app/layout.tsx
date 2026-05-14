import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "考研数学问答助手",
  description: "智能考研数学问答助手，帮助您解答高等数学、线性代数、概率论等问题",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}