import {MONTH_NAMES} from './const.js';

export const getDayNo = (date) => new Date(date).getDate();
export const getMonthNo = (date) => new Date(date).getMonth();
export const getMonthName = (date) => MONTH_NAMES[getMonthNo(date)];
export const getYearNo = (date) => new Date(date).getFullYear();
export const getTimeStamp = (date) => `${getDayNo(date)}-${getMonthNo(date)}-${getYearNo(date)}`;
