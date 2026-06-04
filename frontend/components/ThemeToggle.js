'use client';

import { useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => {
        document.body.classList.toggle('dark');
        setDark((current) => !current);
      }}
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
