import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function formatDateFromNow(date: any) {
  return dayjs(date).fromNow();
}
