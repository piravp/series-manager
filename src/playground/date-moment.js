import moment from 'moment';

const now = moment();
const nowFormatted = moment().format('YYYY-MM-DD HH:mm');
console.log('now: ',now);
console.log('nowFormatted:', nowFormatted);

const unix = moment().format('X');      // need to *1000 to use this e.g in moment(unix).format('YYYY MM DD')
console.log('unix:', unix);

const unixMs = moment().format('x');
console.log('unixMs:', unixMs);

// get unix
console.log(moment().unix())

// print a unixMs to formatted date
const something = moment(1524439677257).format('YYYY MM DD hh:mm:ss');  
console.log(something)

// Compare if one unix timestamp is before another
const before = moment(1524439677257).isBefore(1524439677256);
console.log(before);

// compare two formatted dates
const test = moment('2018-08-22 23:39:20').format("YYYY-MM-DD hh:mm:ss") > moment('2018-08-22 23:39:22').format("YYYY-MM-DD hh:mm:ss");
console.log(test);