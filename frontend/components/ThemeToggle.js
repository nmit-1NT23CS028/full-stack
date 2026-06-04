'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button onClick={() => setDark((current) => !current)}>
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
