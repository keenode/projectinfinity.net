const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  googleId: String
})

UserSchema.methods.comparePassword = function comparePassword(password, cb) {
  bcrypt.compare(password, this.password, cb)
}

UserSchema.pre('save', function saveHook(next) {
  console.log('calling user save hook!')
  const user = this
  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next()

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) return next(saltError)

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError)
      // replace a password string with hash value
      user.password = hash
      return next()
    })
  })
})


const User = mongoose.model('User', UserSchema)

module.exports = User
