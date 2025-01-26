import { DateTime } from 'luxon';

export default function Home() {
  const date = new Date();

  const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone('local', { keepLocalTime: true }) ;
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy')
  }

  return (
    <>
      <div>LOCAL TIME2: {localTimeFormat(date)}</div>
    </>
  );
}
