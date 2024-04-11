import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/fr";

dayjs.extend(utc);

export const day = dayjs;
export { Dayjs as Day } from "dayjs";