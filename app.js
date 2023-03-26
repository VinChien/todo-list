// 載入 express 並建構應用程式伺服器
const express = require('express');
const app = express();
const port = 3000;
// 設定路由
app.get('/', (req, res) => {
  res.send('hello world');
});
// 啟動伺服器
app.listen(port, () => {
  console.log('App is running on http://localhost:3000');
});
