const router = require('express-promise-router')();
const { auth } = require('../controllers')
const { check } = require('express-validator')

router.route('/login').post(auth.login);
router.route('/registration').post([
  check('email', 'Это не email').isEmail(),
  check('password', 'Пароль должен быть от 4 до 10 символов').isLength({
    min: 4,
    max: 10
  })
], auth.signUp);
router.route('/refresh').post(auth.refreshToken);
router.route('/logout').post(auth.logout);

module.exports = router;
