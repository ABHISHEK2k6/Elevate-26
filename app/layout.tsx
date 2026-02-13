import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://elevate26.hrevolve.org')
    : 'http://localhost:3000'),
  title: {
    default: "ELEVATE26 - Shaping the Future | HR Conclave 2026",
    template: "%s | ELEVATE26 HR Conclave"
  },
  description: "Join us for ELEVATE26, the ultimate HR Conclave on November 20, 2026. Shaping the Future: Leading through the Human–AI Nexus. Discover insights on AI in HR, talent management, future of work, and human-centric leadership strategies.",
  keywords: [
    "HR Conclave",
    "ELEVATE26", 
    "Human Resources",
    "AI in HR",
    "Talent Management",
    "Future of Work",
    "HR Technology",
    "Human-AI Nexus",
    "Leadership",
    "HR Conference 2025"
  ],
  authors: [{ name: "HREvolve" }],
  creator: "HREvolve",
  publisher: "HREvolve",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/hr.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/hr.png?v=4", type: "image/png", sizes: "16x16" },
      { url: "/hr.png?v=4", type: "image/png", sizes: "any" },
    ],
    shortcut: "/hr.png?v=4",
    apple: [
      { url: "/hr.png?v=3", sizes: "180x180", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "152x152", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "144x144", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "120x120", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "114x114", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "76x76", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "72x72", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "60x60", type: "image/png" },
      { url: "/hr.png?v=3", sizes: "57x57", type: "image/png" },
    ],
    other: [],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ELEVATE26 HR Conclave",
    title: "ELEVATE26 - Shaping the Future | HR Conclave 2026",
    description: "Join us for ELEVATE26, the ultimate HR Conclave on November 20, 2026. Shaping the Future: Leading through the Human–AI Nexus. Discover insights on AI in HR, talent management, and the future of work.",
    images: [
      {
        url: "/hr.png?v=3",
        width: 1200,
        height: 630,
        alt: "ELEVATE26 HR Conclave - Shaping the Future through Human-AI Nexus",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HREvolve",
    creator: "@HREvolve",
    title: "ELEVATE26 - Shaping the Future | HR Conclave 2026",
    description: "Join us for ELEVATE26, the ultimate HR Conclave on November 20, 2026. Shaping the Future: Leading through the Human–AI Nexus.",
    images: [
      {
        url: "/hr.png?v=3",
        alt: "ELEVATE26 HR Conclave Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "ELEVATE26 - HR Conclave",
    "description": "Shaping the Future: Leading through the Human–AI Nexus. The ultimate HR Conclave featuring insights on AI in HR, talent management, and the future of work.",
    "startDate": "2026-11-20T09:00:00+05:30",
    "endDate": "2026-11-20T18:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Event Venue",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "image": [
      "/hr.png?v=3"
    ],
    "organizer": {
      "@type": "Organization",
      "name": "HREvolve",
      "url": "https://elevate26.hrevolve.org"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://elevate26.hrevolve.org",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2026-01-01T00:00:00+05:30"
    },
    "performer": {
      "@type": "Organization", 
      "name": "Industry HR Leaders and AI Experts"
    }
  };

  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Favicon and Icons - Explicit PNG favicon to override Vercel default */}
        <link rel="icon" href="/hr.png?v=4" type="image/png" />
        <link rel="icon" href="/hr.png?v=4" type="image/png" sizes="32x32" />
        <link rel="icon" href="/hr.png?v=4" type="image/png" sizes="16x16" />
        <link rel="shortcut icon" href="/hr.png?v=4" type="image/png" />
        <link rel="apple-touch-icon" href="/hr.png?v=4" />
        <link rel="apple-touch-icon" sizes="152x152" href="/hr.png?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/hr.png?v=4" />
        
        <meta name="theme-color" content="#1883ca" />
        <meta name="msapplication-TileColor" content="#1883ca" />
        <meta name="msapplication-TileImage" content="/hr.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ELEVATE26" />
        <meta name="application-name" content="ELEVATE26" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="canonical" href="https://elevate26.hrevolve.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} antialiased`}
        style={{ overflowX: 'hidden' }}
      >
        {/* Content wrapper */}
        <div className="relative z-20">
          {children}
        </div>
      </body>
    </html>
  );
}
