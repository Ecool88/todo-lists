const router = require('express-promise-router')();
const checkJSWSign = require('../middlewares/JwtCheck.middlewares')
const { task } = require('../controllers')


router.route('/:id').get(checkJSWSign, task.get);
router.route('/').post(checkJSWSign, task.create);
router.route('/').get(checkJSWSign, task.getAll);
router.route('/:id').put(checkJSWSign, task.update);
router.route('/:id').delete(checkJSWSign, task.delete);

module.exports = router;
