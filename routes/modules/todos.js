// 引用 Express 與 Express 路由器
const express = require('express');
const router = express.Router();
//引用 Todo model
const Todo = require('../../models/todo');
// 定義 todos 路由
// new
router.get('/new', (req, res) => {
  return res.render('new');
});
// create
router.post('/', (req, res) => {
  const userId = req.user._id;
  const name = req.body.name;
  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});
// detail
router.get('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error));
});
// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error));
});
// update
router.put('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const { name, isDone } = req.body;
  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name;
      todo.isDone = isDone === 'on';
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((error) => console.log(error));
});
// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Todo.findOne({ _id, userId })
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// 匯出路由模組
module.exports = router;
