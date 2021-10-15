require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User, Token } = require('../model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const boom = require('boom')


module.exports = {
   async logout({body: {refreshToken}}, res) {
     const findToken = await Token.findOne({token: refreshToken})
     if (!findToken){
       return res.status(403).send({
         message: 'пользователь не авторизован'
       })
     }
     await Token.findByIdAndDelete(findToken._id)
     return res.status(200).send({
       message: 'Пользователь успешно разлогинен'
     })
   },

   async refreshToken({ body: { refreshToken } }, res){
     if (!refreshToken){
       return res.status(401).send({
         message: 'токен не найден'
       })
     }
     const currentToken = await Token.findOne({token: refreshToken})
     if (!currentToken){
       return res.status(401).send({
         message: 'токен не найден'
       })
     }
     jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
       if (err) {
         return res.status(401).send({
           message: 'токен не найден'
         })
       }
       const accessToken = jwt.sign({
         userId: user.userId,
         email: user.email
       }, process.env.SECRET_KEY, {
         expiresIn: '1h'
       })
       return res.status(200).send({
         accessToken,
         email: user.email
       })
     })
   },

   async login({body: {email, password}}, res) {
     try {
       const findUser = await User.findOne({email} )
       if (!findUser) {
         return res.status(401).send({
           message: 'Логин или пароль не совпадает'
         })
       }
       const isPasswordCorrect = bcrypt.compareSync(password, findUser.password)
       if (!isPasswordCorrect) {
         return res.status(401).send({
           message: 'Логин или пароль не совпадает'
         })
       }
       const accessToken = jwt.sign({
         userId: findUser._id,
         email: findUser.email
       }, process.env.SECRET_KEY, {
         expiresIn: '1h'
       })
       const refreshToken = jwt.sign({
         userId: findUser._id,
         email: findUser.email
       }, process.env.REFRESH_SECRET_KEY)
       const findToken = await Token.findOne({
         user: findUser._id
       })
       if (findToken) {
         await Token.findByIdAndUpdate(findToken._id, {
           token: refreshToken
         })
         return res.status(200).send({
           accessToken,
           refreshToken,
           email: findUser.email
         })
       }
       const item = new Token({token: refreshToken, user: findUser._id})
       await item.save()
       return res.status(200).send({
         accessToken,
         refreshToken,
         email: findUser.email,
         id: findUser._id
       })
     } catch (err) {
       return res.status(401).send({
         message: 'Логин или пароль не совпадает',
         err
       })
     }
   },

   async signUp(req, res){
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return res.status(400).send({
          message: 'Ошибка при регистрации',
          errors
        })
      }
      const { email, password } = req.body
      const findUser = await User.findOne( { email } )
      if (findUser) {
        return res.status(400).send({
          message: 'Email уже используется введите другой email'
        })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const createdUser = await new User({ email, password: hashPassword })
      await createdUser.save();
      return res.status(200).send({
        message: 'Пользователь успешно зарегистрирован!'
      })
    } catch (err) {
      return res.send(
        boom.boomify(err)
      )
    }
  }
}
