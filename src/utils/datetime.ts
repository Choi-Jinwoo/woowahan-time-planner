export const date2MMdd = (date: Date): string => {
  const month = date.getMonth() + 1;
  const _date = date.getDate();

  const mm = month < 10 ? `0${month}` : month;
  const dd = _date < 10 ? `0${_date}` : _date;

  return `${mm}${dd}`;
}

export const toHHmm = (hour: number, minute: number): string => {
  const hh = hour < 10 ? `0${hour}` : hour;
  const mm = minute < 10 ? `0${minute}` : minute;

  return `${hh}:${mm}`;
}