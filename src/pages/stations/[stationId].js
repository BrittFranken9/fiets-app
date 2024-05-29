import { useRouter } from 'next/router';
import useNetwork from '@/data/network';
import styles from '@/styles/StationId.module.css';
import Image from 'next/image';

export default function StationDetail() {
  const { network, isLoading, isError } = useNetwork();
  const router = useRouter();

  if (isLoading) return <div>loading ...</div>;
  if (isError) return <div>error</div>;

  const station = network.stations.find(station => station.id === router.query.stationId);

  function removeLeadingDigits(name) {
    return name.replace(/^\d+\s*-\s*/, '');
  }

  return (
    <div className={styles.stationDetail}>
      <Image src="/Velo-Antwerpen-01.svg" alt="Logo" width={300} height={50} className={styles.logo} />
      <h1 className={styles.hoofd}>{removeLeadingDigits(station.name)}</h1>
      <p>{station.free_bikes} bikes available</p>
    </div>
  );
}