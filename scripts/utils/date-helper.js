import CONFIG from '../global/config.js';

const DateHelper = {
  parse(date) {
    const parseDate = new Date(date);
    
    const result = {
      month: CONFIG.MONTH[parseDate.getMonth()],
      date: parseDate.getDate(),
      year: parseDate.getFullYear(),
    };

    return result;
  },
};

export default DateHelper;
