import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/animated-background";
import PoperProvider from "@/components/poper-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://halfbloodcoder.com"),
  title: {
    default:
      "Jayant Jeet Tomar | Java Full-Stack Developer | Spring Boot, Angular, Microservices",
    template: "%s | Half-Blood Coder",
  },
  description:
    "Java Full-Stack Developer in Gurugram with 4+ years of experience in Spring Boot, Angular, Microservices, AWS, and Kubernetes. Building scalable, cloud-native solutions and mentoring future tech talent.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jayant Jeet Tomar | Java Full-Stack Developer",
    description:
      "Building scalable, cloud-native solutions with Spring Boot, Angular, and Microservices.",
    url: "https://halfbloodcoder.com",
    siteName: "Half-Blood Coder",
    images: [{ url: "/profile.png", width: 1200, height: 630, alt: "Jayant Jeet Tomar - Java Full-Stack Developer" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayant Jeet Tomar | Java Full-Stack Developer",
    description:
      "Building scalable, cloud-native solutions with Spring Boot, Angular, and Microservices.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jayant Jeet Tomar',
              alternateName: 'Half-Blood Coder',
              url: 'https://halfbloodcoder.com',
              jobTitle: 'Java Full-Stack Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Half-Blood Coder'
              },
              sameAs: [
                'https://github.com/Jayant-Jeet',
                'https://www.linkedin.com/in/jayant-jeet/'
              ],
              knowsAbout: [
                'Java',
                'Spring Boot',
                'Angular',
                'Microservices',
                'AWS',
                'Kubernetes'
              ],
            }),
          }}
        />
  <PoperProvider />
        {children}
        <AnimatedBackground />
      </body>
    </html>
  );
}
