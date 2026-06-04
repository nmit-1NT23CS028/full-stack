'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (!response.ok) {
      setMessage('Login failed');
      return;
    }

    const payload = await response.json();
    sessionStorage.setItem('token', payload.token);
    sessionStorage.setItem('role', payload.user.role);
    setMessage('Login successful. You can now open dashboard.');
  };

  return (
    <main className="centered">
      <h2>Sign In</h2>
      <form className="card" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
          minLength={6}
        />
        <button type="submit">Login</button>
      </form>
      {message ? <p>{message}</p> : null}
    </main>
  );
}
