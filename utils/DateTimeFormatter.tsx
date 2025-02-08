import { DateTime } from "luxon";

export const localTimeFormat = (date: Date | null) => {
    if (date === null) return 'No time available';
    const localDateTime = DateTime.fromJSDate(date).setZone('local');
    const timeZone = localDateTime.zoneName;

    return localDateTime.toFormat('dd MMMM - (HH:mm') + ` ${timeZone})`;
}

export const shortDateFormat = (date: Date | null) => {
    if (date === null) return 'No date available';
    return DateTime.fromJSDate(date).setZone('local').toFormat('dd MMMM');
};