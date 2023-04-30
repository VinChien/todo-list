const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const mongoose = require('mongoose');
// 載入 todo model
const Todo = require('../todo');

const User = require('../user');

// 引用 mongoose 設定檔
const db = require('../../config/mongoose');

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678',
};

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', () => {
//   console.log('mongodb error!');
// });

// db.once('open', () => {
//   console.log('mongodb connected!');

//   for (let i = 0; i < 10; i++) {
//     Todo.create({ name: `name-${i}` });
//   }

//   console.log('done');
// });
db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      // for (let i = 0; i < 10; i++) {
      //   Todo.create({ name: `name-${i}`, userId });
      // }
      return Promise.all(
        Array.from({ length: 10 }, (_, i) =>
          Todo.create({ name: `name-${i}`, userId })
        )
      );
    })
    .then(() => {
      console.log('done.');
      process.exit();
    });
});
