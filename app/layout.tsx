import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlayMolt Project Page',
  description: 'Research-driven project overview for PlayMolt and related repositories.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
