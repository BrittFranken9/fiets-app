import "@/styles/globals.css";
import Layout from '@/components/Layout'
import Layout2 from '@/components/Layout2'
import LayoutC1 from '@/components/LayoutC1'
import LayoutC2 from '@/components/LayoutC2'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === '/') {

    return (
        <Component {...pageProps} />
    )
  }

  if (router.pathname === '/keuzes') {

    return (
        <Component {...pageProps} />
    )
  }

  if (router.pathname === '/Maps/zoeken') {

    return (
      <>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
      </>
    )
  }

  if (router.pathname === '/Maps/favorites') {

    return (
      <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </>
    )
  }

  if (router.pathname === '/Maps/home') {

    return (
      <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </>
    )
  }

  if (router.pathname === '/Maps/map') {

    return (
      <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </>
    )
  }

  if (router.pathname === '/stations/[stationId]') {

    return (
      <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </>
    )
  }

  if (router.pathname === '/Creatief/favorites') {

    return (
      <>
      <LayoutC1>
        <Component {...pageProps} />
      </LayoutC1>
      </>
    )
  }
  
  if (router.pathname === '/Creatief/home') {

    return (
      <>
      <LayoutC1>
        <Component {...pageProps} />
      </LayoutC1>
      </>
    )
  }

  if (router.pathname === '/station2/[stationId]') {

    return (
      <>
      <LayoutC1>
        <Component {...pageProps} />
      </LayoutC1>
      </>
    )
  }

  if (router.pathname === '/Creatief/map') {

    return (
      <>
      <LayoutC1>
        <Component {...pageProps} />
      </LayoutC1>
      </>
    )
  }

  if (router.pathname === '/Creatief/zoeken') {

    return (
      <>
      <LayoutC2>
        <Component {...pageProps} />
      </LayoutC2>
      </>
    )
  }
  
}
