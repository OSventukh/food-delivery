export const getData = async (url: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + url);
  if (!response.ok) {
    throw new Error('Failed to get data')
  }
  return await response.json();
};

export const sendData = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error('Failed to send data')
  }
  return await response.json();
}