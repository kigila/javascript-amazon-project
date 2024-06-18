import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import isSatSun from './dateUtils.js';

const today=dayjs();
const fiveDaysAfterToday = today.add(5,'days')
const aMonthAfterToday = today.add(1,'months')
const aMonthBeforeToday = today.subtract(1,'months')

console.log(fiveDaysAfterToday.format('MMMM D'))
console.log(aMonthAfterToday.format('MMMM D'))
console.log(aMonthBeforeToday.format('MMMM D'))
console.log(today.format('dddd'))




console.log(isSatSun(today))
console.log(isSatSun(fiveDaysAfterToday))
console.log(isSatSun(aMonthAfterToday))