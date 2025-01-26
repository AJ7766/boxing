"use client"
import { DateTime } from 'luxon';

export default function Home() {
  const date = DateTime.local();
  const dateNow = DateTime.now();

  const localTimeFormat = (date: DateTime) => {
    const localDateTime = date.setZone('local', { keepLocalTime: true });
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy')
  }
  console.log("Date:", dateNow)
  return (
    <>
      <div>DateTime Now: {dateNow.toFormat('HH:mm - dd/MM/yyyy')}</div>
      <div>DateTime Local: {localTimeFormat(date)}</div>
    </>
  );
}
