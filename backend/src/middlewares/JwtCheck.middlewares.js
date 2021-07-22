require('dotenv').config();
const { verify } = require('jsonwebtoken');

const checkJWTSign = async (req, res, next) => {
  const {headers: { authorization }} = req
  if (authorization) {
    const token = authorization.split(' ')[1]
    verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).send({
          message: 'Not authorized 1'
        })
        return next()
      }
    })
    console.log('token success')
    return next()
  }
  return res.status(403).send({
    message: 'Not Authorized 2'
  })
}

module.exports = checkJWTSign
