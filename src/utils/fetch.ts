type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const requestData = async (
  url: string,
  {
    data,
    method,
    cache,
    revalidate,
    tags,
  }: { data?: any; method?: RequestMethod; cache?: RequestCache; revalidate?: number; tags?: string[] } = {}
) => {
  const options: RequestInit = {
    method: method || 'GET',
    cache,
  };

  if (method !== 'GET' && method !== 'DELETE') {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(data);
  }

  if (revalidate) {
    options.next = {...(options?.next && options.next)}
    options.next.revalidate = revalidate;
  }

  if (tags) {
    options.next = { ...(options?.next && options.next)}
    options.next.tags = [...tags];
  }
  console.log('options', options)
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + url, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Something went wrong');
  }

  return result;
};
