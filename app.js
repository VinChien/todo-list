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

// 載入 Todo model
const Todo = require('./models/todo');

// 引用 body-parser
const bodyParser = require('body-parser');

//用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }));

// 設定路由
// Todo 首頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then((todos) => res.render('index', { todos: todos }))
    .catch((error) => console.error(error));
});

// new
app.get('/todos/news', (req, res) => {
  res.render('new');
});
app.post('/todos', (req, res) => {
  // 從 req.body 拿出表單的 name 資料
  const name = req.body.name;
  // 存入資料庫
  Todo.create({ name })
    // 新增完成後導回 index
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// 啟動伺服器
app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
});
