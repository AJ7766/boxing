import { Suspense, lazy } from "react";

const Time = lazy(() =>
  import('@/components/Time').then((module) => ({ default: module.Time }))
);

export default function Home() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <Time />
      </Suspense>
    </div>
  );
}
