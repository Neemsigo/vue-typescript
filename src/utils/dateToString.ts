import TDate from '@/models/TDate';

const monthDict: {[index: number]: string} = [
  'ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ',
  'НОЯ', 'ДЕК',
];
export default (date: TDate) => {
  return `${date.day} ${monthDict[date.month + 1]} ${date.year}`;
};
