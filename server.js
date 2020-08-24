require('dotenv').config();
const { app } = require('./src/app.js');

console.log('');
console.log('Server listening at localhost:3001');
console.log('');
console.log('      ◎[▪‿▪]◎ ❤         ');
console.log('');

app.listen(process.env.PORT || 3001);
