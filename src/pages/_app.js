import "@/styles/globals.css";
import Layout from '@/components/Layout'
import Layout2 from '@/components/Layout2'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === '/') {

    return (
        <Component {...pageProps} />
    )
  }

  if (router.pathname === '/zoeken') {

    return (
      <>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
      </>
    )
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
