import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "SunLighter - Privacy-First Instant Employment Verification",
    template: "%s | SunLighter"
  },
  description: "Privacy-first instant employment verification platform. Verify employment history with blockchain technology, employee consent, & complete data privacy control.",
  keywords: [
    "employment verification",
    "privacy-first",
    "blockchain verification",
    "employee verification",
    "HR technology",
    "employment history",
    "secure verification",
    "data privacy",
    "employment platform",
    "verification system"
  ],
  authors: [{ name: "SunLighter Team" }],
  creator: "SunLighter",
  publisher: "SunLighter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.sunlighter.in'),
  alternates: {
    canonical: 'https://www.sunlighter.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sunlighter.in',
    title: 'SunLighter - Privacy-First Instant Employment Verification',
    description: 'Privacy-first instant employment verification platform. Verify employment history with blockchain technology, employee consent, & complete data privacy control.',
    siteName: 'SunLighter',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SunLighter - Privacy-First Instant Employment Verification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SunLighter - Privacy-First Instant Employment Verification',
    description: 'Privacy-first instant employment verification platform. Verify employment history with blockchain technology, employee consent, & complete data privacy control.',
    images: ['/og-image.jpg'],
    creator: '@sunlighter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1E40AF' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#3B82F6',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="39.78373;-100.445882" />
        <meta name="ICBM" content="39.78373, -100.445882" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SunLighter" />
        <meta name="application-name" content="SunLighter" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SunLighter",
              "description": "Privacy-first employment verification platform",
              "url": "https://www.sunlighter.in",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "SunLighter"
              },
              "features": [
                "Employment Verification",
                "Privacy-First Design",
                "Blockchain Technology",
                "Data Security",
                "Employee Consent Management"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
          {children}
          <Toaster />
      </body>
    </html>
  );
}
