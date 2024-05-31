import "@/styles/globals.css";
import Layout from '@/components/Layout';
import Layout2 from '@/components/Layout2';
import LayoutC1 from '@/components/LayoutC1';
import LayoutC2 from '@/components/LayoutC2';
import { useRouter } from 'next/router';
import React from "react";
import ReactLoading from "react-loading";

function App({ Component, pageProps }) {
  const router = useRouter();

  const getLayout = (path) => {
    switch (path) {
      case '/Maps/zoeken':
        return Layout2;
      case '/Maps/favorites':
      case '/Maps/home':
      case '/Maps/map':
      case '/stations/[stationId]':
        return Layout;
      case '/Creatief/favorites':
      case '/Creatief/home':
      case '/station2/[stationId]':
      case '/Creatief/map':
        return LayoutC1;
      case '/Creatief/zoeken':
        return LayoutC2;
      default:
        return React.Fragment;
    }
  };

  const LayoutComponent = getLayout(router.pathname);

  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

function Loading() {
  return (
    <div>
      <h2>Loading in ReactJs - GeeksforGeeks</h2>
      <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bars" color="#0000FF" height={100} width={50} />
      <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cubes" color="#0000FF" height={100} width={50} />
      <ReactLoading type="cylon" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spokes" color="#0000FF" height={100} width={50} />
      <ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={50} />
    </div>
  );
}

export default App;