import CONFIG from '../global/config';

const DateHelper = {
  parse(date) {
    const parseDate = new Date(date);

    const result = {
      year: parseDate.getFullYear(),
      month: CONFIG.MONTH[parseDate.getMonth()],
      date: parseDate.getDate(),
      hour: parseDate.getHours(),
      minute: parseDate.getMinutes(),
      second: parseDate.getSeconds(),
    };

    return result;
  },
};

export default DateHelper;
