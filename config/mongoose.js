// 載入 mongoose
const mongoose = require('mongoose');
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected');
});
module.exports = db;
