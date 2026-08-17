import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexaFlow — AI-Powered Operations Platform',
  description: 'Turn complex work into simple growth with NexaFlow.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
