export const getData = async (url: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + url);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Something went wrong');
  }

  return await response.json();
};

export const sendData = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Something went wrong');
  }
  return await response.json();
};
