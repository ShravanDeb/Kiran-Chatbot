import type { Metadata, Viewport } from 'next';
import { Nunito, Baloo_2, Baloo_Da_2 } from 'next/font/google';
import './globals.css';
import '../styles/tailwind.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const baloo2 = Baloo_2({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo2',
  display: 'swap',
});

const balooDa2 = Baloo_Da_2({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo-da2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kiran — AI Helpline',
  description:
    'Kiran — AI-powered helpline chatbot for parents and families of children with disabilities in Northeast India.',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
  openGraph: {
    title: 'Kiran — AI Helpline',
    description:
      'AI-powered helpline chatbot for parents and families of children with disabilities in Northeast India.',
    url: 'https://kiran-chatbot.vercel.app',
    siteName: 'Kiran',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#7A2433',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const foucScript = `(function() {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('kiran-theme');
    if (t === 'dark') d.classList.add('dark');
    var hc = localStorage.getItem('kiran-hc');
    if (hc === 'true') d.classList.add('hc');
    var fs = localStorage.getItem('kiran-fs');
    if (fs === 'large') d.classList.add('fs-2');
    else if (fs === 'xlarge') d.classList.add('fs-3');
    else d.classList.add('fs-1');
    var lang = localStorage.getItem('kiran-lang');
    if (lang) d.lang = lang;
  } catch(e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${baloo2.variable} ${balooDa2.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: foucScript }} />
      </head>
      <body>
        {children}
        <script async src="https://analytics.rocket.new/js/script.js" data-domain="kiran-chatbot.vercel.app" />
        <script defer src="https://analytics.rocket.new/js/script.tagged-events.js" />
      </body>
    </html>
  );
}
