require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User, Token } = require('../model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const boom = require('boom')

//todo обработать статусы и сообщения при ошибках во всех конторллерах

module.exports = {
   async logout({body: {refreshToken}}, res) {
     const findToken = await Token.findOne({token: refreshToken})
     if (!findToken){
       return res.status(403).send({
         message: 'user not authorize'
       })
     }
     await Token.findByIdAndDelete(findToken._id)
     return res.status(200).send({
       message: 'user success logout'
     })
   },

   async refreshToken({ body: { refreshToken } }, res){
     if (!refreshToken){
       return res.send({
         message: 'don"t action'
       })
     }
     const currentToken = await Token.findOne({token: refreshToken})
     if (!currentToken){
       return res.send({
         message: 'don"t action'
       })
     }
     jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
       if (err) {
         return res.send({
           message: 'don"t action'
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
         return res.send({
           message: 'Login or password not match'
         })
       }
       const isPasswordCorrect = bcrypt.compareSync(password, findUser.password)
       if (!isPasswordCorrect) {
         return res.send({
           message: 'Login or password not match'
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
       return res.send({
         message: 'Login or password not match',
         err
       })
     }
   },

   async signUp(req, res){
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()){
        return res.send({
          message: 'ошибка при регистрации',
          errors
        })
      }
      const { email, password } = req.body
      const findUser = await User.findOne( { email } )
      if (findUser) {
        return res.send({
          message: 'email take try another email'
        })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      console.log(hashPassword, 'hashPassword')
      const createdUser = await new User({ email, password: hashPassword })
      await createdUser.save();
      return res.status(200).send({
        message: 'User created'
      })
    } catch (err) {
      return res.send(
        boom.boomify(err)
      )
    }
  }
}
