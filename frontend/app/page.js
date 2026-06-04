import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="centered">
      <h1>Smart Inventory Management</h1>
      <p>Secure, role-based inventory platform with analytics and operations.</p>
      <div className="actions">
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    </main>
  );
}
