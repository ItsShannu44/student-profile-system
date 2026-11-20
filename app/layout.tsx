import './globals.css';

export const metadata = {
  title: 'Student Profile Management',
  description: 'Manage student profiles easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}