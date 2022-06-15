import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function getRaceHorse () {
  const { data, error } = useSWR(`/api/hello`, fetcher)
  return {
    graphd: data,
    isLoading: !error && !data,
    isError: error
  }
}