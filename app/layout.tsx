import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from 'components/navbar';
import Footer from 'components/footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: process.env.PAGE_URL ? new URL(process.env.PAGE_URL) : undefined,
  title: {
    default: 'Jaro Ratz - Web Developer & SEO Specialist',
    template: '%s | Jaro Ratz',
  },
  description:
    'I am Jaro Ratz, a web developer and SEO specialist with a passion for delivering results.',
};

// Runs before paint to set the theme class and avoid a flash of the wrong theme.
const themeScript = `
  (function () {
    try {
      var theme = localStorage.getItem('theme') || 'dark';
      if (theme === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="flex flex-col min-h-screen h-full">
          <Navbar />
          <main className="max-w-4xl w-full mb-auto py-2 mx-auto px-5 md:px-3">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
