import { Time } from "@/components/Time";
import { Suspense } from "react";

export default function Home() {
  return <Suspense fallback={<p>Loading local time...</p>}>
    <Time />
  </Suspense>
}
