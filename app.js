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
  return Todo.find()
    .lean()
    .then((todos) => res.render('index', { todos: todos }))
    .catch((error) => console.error(error));
});

// new 頁面
app.get('/todos/new', (req, res) => {
  res.render('new');
});

// detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo: todo }))
    .catch((error) => console.log(error));
});

// edit
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo: todo }))
    .catch((error) => console.log(error));
});

// 新增 todo
app.post('/todos', (req, res) => {
  // 從 req.body 拿出表單的 name 資料
  const name = req.body.name;
  // 存入資料庫
  return Todo.create({ name })
    .then(() => res.redirect('/')) // 新增完成後導回 index
    .catch((error) => console.log(error));
});

// edit
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name;
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

// delete
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// 啟動伺服器
app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
});
