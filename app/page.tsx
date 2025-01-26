import dynamic from 'next/dynamic';

const Time = dynamic(() => import('@/components/Time').then((mod) => mod.Time), { ssr: true, loading: () => <p>Loading...</p> });

export default async function Home() {

  return (
    <>
      <Time />
    </>
  );
}
