type RequestMethod = 'GET' | 'POST' | 'PATCH';

export const requestData = async (
  url: string,
  {
    data,
    method,
    cache,
  }: { data?: any; method?: RequestMethod; cache?: RequestCache } = {}
) => {
  const options: RequestInit = {
    method: method || 'GET',
    cache,
  };

  if (method !== 'GET') {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + url, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Something went wrong');
  }

  return result;
};
