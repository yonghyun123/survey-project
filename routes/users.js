var express = require('express'),
    User = require('../models/User');
var router = express.Router();

function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim();
  email = email.trim();

  if (!name) {
    return '이름을 입력해주세요.';
  }

  if (!email) {
    return '이메일을 입력해주세요.';
  }

  if (!form.password) {
    return '비밀번호를 입력해주세요.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (form.password.length < 6) {
    return '비밀번호는 6글자 이상이어야 합니다.';
  }
  if(!form.introduce){
    return '자기소개는 필수 항목입니다.';
  }

  return null;
}



/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/', function(req, res, next) {
  var err = validateForm(req.body, {needPassword: true});
  if(err){
    req.flash('danger',err);
    return res.redirect('back');
  }
  User.findOne({email: req.body.email}, function(err, user) { //이미 db에 들어있는 이메일이 있으면 에러처리
    if (err) {
      return next(err);
    }
    if (user) {
    req.flash('danger', '동일한 이메일 주소가 이미 존재합니다.');
    res.redirect('back');
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
        req.flash('success', '가입이 완료되었습니다. 로그인 해주세요.');
        res.redirect('/');
      }
    });
  });
});


module.exports = router;
