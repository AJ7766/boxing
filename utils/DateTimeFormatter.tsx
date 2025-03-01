import { DateTime } from "luxon";

export const localTimeFormat = (date?: string | null) => {
    if (date === null || date === undefined) return 'No time available';
    const localDateTime = DateTime.fromISO(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return `${localDateTime.toFormat('ccc')}, ${localDateTime.toFormat('dd MMMM - (HH:mm')} ${timeZone})`
}