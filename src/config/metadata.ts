import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    template: "%s | EduPlatform",
    default: "EduPlatform",
  },
  description: "Education Management System",
  keywords: ["교육 관리", "학습 플랫폼", "온라인 교육"],
  authors: [{ name: "EduTeam", url: "https://eduplatform.com" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://eduplatform.com",
    siteName: "EduPlatform",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduPlatform",
    description: "Education Management System",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}; 