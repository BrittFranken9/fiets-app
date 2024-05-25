import fetcher from './_fetcher'

export default function useNetwork () {
    const { data, error, isLoading } = useSWR(`https://api.citybik.es/v2/networks/velo-antwerpen`, fetcher)
   
    return {
      network: data,
      isLoading,
      isError: error
    }
  }