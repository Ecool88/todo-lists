const genericCrud = require('./generic.controller');
const { Task } = require('../model')



module.exports = {
  ...genericCrud(Task)
}
