import "@/styles/globals.css";
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === '/') {

    return (
        <Component {...pageProps} />
    )
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
