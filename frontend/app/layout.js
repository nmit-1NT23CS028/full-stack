import './globals.css';

export const metadata = {
  title: 'Smart Inventory Management',
  description: 'Production-ready smart inventory management dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
