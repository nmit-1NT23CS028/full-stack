export async function apiGet(path) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    credentials: 'include',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}
