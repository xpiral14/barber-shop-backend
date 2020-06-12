import { addMinutes, parseISO } from 'date-fns';

export default function getDateTime(date:Date, time:number) {
  return addMinutes(date, time);
}
