import { DateTime } from 'luxon';

export default function Home() {
  const date = new Date();

  const localTimeFormat = (date: Date) => {
    const localDateTime = DateTime.fromJSDate(date).setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    return localDateTime.toFormat('HH:mm - dd/MM/yyyy');
  }

  return (
    <>
      <div>LOCAL TIME test: {localTimeFormat(date)}</div>
    </>
  );
}
