// 載入 express 並建構應用程式伺服器
const express = require('express');
const app = express();
const port = 3000;

// 指定樣板引擎
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
// 啟動樣板引勤
app.set('view engine', 'hbs');

// 載入 mongoose
const mongoose = require('mongoose');

// 僅在非正式環境使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected');
});

// 設定路由
// Todo 首頁
app.get('/', (req, res) => {
  res.render('index');
});

// 啟動伺服器
app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
});
