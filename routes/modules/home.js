// 引用 Express 與 Express 路由器
const express = require('express');
const router = express.Router();
//引用 Todo model
const Todo = require('../../models/todo');
// 定義首頁路由
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos: todos }))
    .catch((error) => console.log(error));
});
// 匯出路由模組
module.exports = router;
