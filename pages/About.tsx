import getRaceHorse from "../components/getRacehorse";

function Profile() {
  //const fetcher = (...args) => fetch(...args).then(res => res.json());
  //const { data, error } = useSWR('/api/hello', fetcher)

  const {graphd,isLoading,isError} = getRaceHorse()

  console.log(graphd)

  

  if (isError) return <div>failed to load</div>
  if (!graphd) return <div>loading...</div>
  return <div>hello {graphd["graph"]["nodes"][0]["id"]}!</div>
}

export default Profile