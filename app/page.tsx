"use client"
import { DateTime } from 'luxon';

export default function Home() {
  const date = new Date();

  const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local') ;
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy')
  }

  return (
    <>
      <div>LOCAL TIME: {localTimeFormat(date)}</div>
    </>
  );
}
