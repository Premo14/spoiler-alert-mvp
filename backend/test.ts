import * as cors from 'cors';
console.log(typeof cors);
if (typeof cors === 'function') {
  console.log('cors is a function');
} else {
  console.log('cors is NOT a function');
  console.log(cors);
}
