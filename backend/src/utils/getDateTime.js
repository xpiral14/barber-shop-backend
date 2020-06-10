import { addMinutes, parseISO } from 'date-fns';

export default function getDateTime(date, time) {
  return addMinutes(date, time);
}
