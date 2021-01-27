import useSWR from 'swr';
import { api } from '../services';

export function useFetch<Data, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url);

    return response.data;
  });

  return { data, error };
}
