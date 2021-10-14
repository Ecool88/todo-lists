const { model, Schema, Schema: { Types: { ObjectId } } } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {             // какому пользователю принадлежит эта задача
    type: ObjectId,    // создание отношения между одной таблицей и другой
    ref: 'User'
  }
})


module.exports = model('Task', schema, 'Tasks')
