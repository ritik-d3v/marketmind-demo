import { marked } from 'marked';
import ReactHtmlParser from 'react-html-parser';

export const dateFormat = () => {
  const currentDate = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const monthIndex = currentDate.getMonth();
  const monthName = monthNames[monthIndex];
  return `${monthName}`;
};

export const markDownText = async (response: string) => {
  const r = await marked.parse(response ? response.toString() : '');
  return ReactHtmlParser(r);
};
