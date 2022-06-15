import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function getRaceHorse () {
  const { data, error } = useSWR(`/api/hello`, fetcher)
  return {
    graphd: data,
    isLoading: !error && !data,
    isError: error
  }
}