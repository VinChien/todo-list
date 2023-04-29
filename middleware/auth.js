// 這個設定檔會匯出一個物件，物件裡是一個叫做 authenticator 的函式。
//req.isAuthenticated() 是 Passport.js 提供的函式，會根據 request 的登入狀態回傳 true 或 false，回傳 true，則我們執行下一個 middleware
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('warning_msg', '請先登入才能使用！');
    res.redirect('/users/login');
  },
};
