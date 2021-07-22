const boom = require('boom')

const genericCrud = (model) => ({
  async get({ params: { id } }, res) {
    try {
      const item = await model.findById(id)
      return res.status(200).send(item)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async getAll({query: {user}}, res) {
    try {
      const items = await model.find({user})
      return res.status(200).send(items)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async create({ body }, res) {
    try {
      const item = new model(body)
      await item.save()
      const items = await model.find({user: body.user})
      return res.status(200).send(items)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async update({ params: { id }, body }, res) {
    try {
      await model.findByIdAndUpdate(id, body, { new: true })
      const user = body.user
      const items = await model.find({user})
      return res.status(200).send(items)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
  async delete({ params: { id }, query: {user} }, res) {
    try {
      await model.findByIdAndDelete(id);
      const items = await model.find({user})
      return res.status(200).send(items)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  }
});

module.exports = genericCrud
