import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


export default function isWeekend(date){
  const weekDays=date.format('dddd');

  if(weekDays==='Sunday' || weekDays==='Saturday'){
    return weekDays
  } else {
    return 'Not weekend'
  }
}