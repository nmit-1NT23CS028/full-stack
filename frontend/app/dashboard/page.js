'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ThemeToggle from '../../components/ThemeToggle';
import { apiGet } from '../../lib/api';

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Please login first.');
      return;
    }

    apiGet('/dashboard/overview', token)
      .then(setOverview)
      .catch(() => setError('Unable to load dashboard'));
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <header>
          <h1>Dashboard</h1>
          <ThemeToggle />
        </header>
        {error ? <p>{error}</p> : null}
        {!overview ? (
          <p>Loading...</p>
        ) : (
          <>
            <section className="cards">
              <article className="card"><h4>Total Products</h4><p>{overview.totalProducts}</p></article>
              <article className="card"><h4>Low Stock Alerts</h4><p>{overview.lowStock}</p></article>
              <article className="card"><h4>Total Orders</h4><p>{overview.totalOrders}</p></article>
            </section>
            <section className="card">
              <h3>Recent Transactions</h3>
              <table>
                <thead>
                  <tr><th>ID</th><th>Type</th><th>Status</th><th>Amount</th></tr>
                </thead>
                <tbody>
                  {overview.recentTransactions.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.type}</td>
                      <td>{item.status}</td>
                      <td>{item.total_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
