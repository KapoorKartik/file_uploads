const {
  Schema,
  model
} = require('mongoose')
/* Create a user model which has the following things
first_name
last_name
profile_pic ( can be 1 only )
Create a gallery model which will belong to the user
pictures ( multiple images are allowed )
user_id ( belong to the user) */
const gallerySchema = new Schema({
  pictures: [{
    type: String,
    required: true
  }],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'file',
    required: true,
  },
}, {
  versionKey: false,
}, )

module.exports = model('gallery', gallerySchema)
