const fs = require('fs');
const zp = require('simple-zeropad');

const today = new Date();
const todaysItem = `${today.getFullYear()}-${zp(today.getMonth() + 1)}-${zp(today.getDate())}`;
const otherItem = `${today.getFullYear() + 1}-${zp(today.getMonth() + 1)}-${zp(today.getDate())}`;

console.log(todaysItem)
module.exports = () => Promise.resolve([
{
    title: 'Yummy',
    meals: {
      [todaysItem]: {
          title: 'Pizza',
          description: 'with Pepperoni and olive',
          prices: ['CHF 100.00', 'CHF 200.00']
      }, 
      [otherItem]: {
          title: 'Salad',
          description: 'with weeds and other plants',
          prices: ['CHF 100.00', 'CHF 200.00']
      }  
    }
},
{
    title: 'More Yummy',
    meals: {
      [todaysItem]: {
          title: 'Hamburger',
          description: 'with lettuce and tomato',
          prices: ['CHF 100.00', 'CHF 200.00']
      }, 
      [otherItem]: {
          title: 'Omlette',
          description: 'with weeds and other plants',
          prices: ['CHF 100.00', 'CHF 200.00']
      }  
    }
}
]);