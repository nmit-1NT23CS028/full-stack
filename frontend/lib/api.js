export async function apiGet(path, token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    headers: {
      Authorization: 'Bearer ' + token
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}
