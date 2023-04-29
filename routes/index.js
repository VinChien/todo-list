// 引用 Express 與 Express 路由器
const express = require('express');
const router = express.Router();

// 準備引入路由模組
// 引入 home 模組程式碼
const home = require('./modules/home');
// 引入 todos 模組程式碼
const todos = require('./modules/todos');
// 引入 users 模組程式碼
const users = require('./modules/users');
// 引入 auth
const auth = require('./modules/auth');
// 引入 middleware
const { authenticator } = require('../middleware/auth');

// 將網址結構符合 / 字串的 request 導向 home 模組
// router.use('/', home);

// 將網址結構符合 /todos 字串的 request 導向 todos 模組
// router.use('/todos', todos);
// 加入驗證程序
router.use('/todos', authenticator, todos);
// 將網址結構符合 /users 字串的 request 導向 users 模組
router.use('/users', users);
// 掛載 auth
router.use('/auth', auth);
// 加入驗證程序
// 這種定義寬鬆的路由引到清單最下方，避免攔截到其他的路由
router.use('/', authenticator, home);
// 匯出路由器
module.exports = router;
