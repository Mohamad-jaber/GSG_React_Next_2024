import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Task Tracker',
  description: 'A Next.js 15 Task Tracker Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}