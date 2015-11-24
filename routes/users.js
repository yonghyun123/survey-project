var express = require('express'),
    User = require('../models/User');
var router = express.Router();



/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) { //이미 db에 들어있는 이메일이 있으면 에러처리
    if (err) {
      return next(err);
    }

    var newUser = new User({            //newPost에 Post객체 대엡하고 data들을 각각 입력한다.
      name:req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save(function(err) {         //입력된 내용들을 저장하고 redirect posts시킨다.
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
  });
});


module.exports = router;
