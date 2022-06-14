import getRaceHorse from "../components/usrSWR";

function Profile() {
  //const fetcher = (...args) => fetch(...args).then(res => res.json());
  //const { data, error } = useSWR('/api/hello', fetcher)

  const {data,isLoading,isError} = getRaceHorse()

  console.log(data)

  

  if (isError) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data["graph"]["nodes"][0]["id"]}!</div>
}

export default Profile