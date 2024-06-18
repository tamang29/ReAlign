import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
      },
      password: {
        type: String,
        required: true
      },
      //the user could be an orgnization creater(orgnizer) or a member of the organization or no role
      role: {
        type: String, default: null,
        enum: ['orgnizer', 'member', null],
      },
      photo: {
        type: String,
        required: false
      },
      isVerified: {type: Boolean, default: false},
      token: {type: String, default: null},
      orgnization: {type: String, default: null}

}, {collection: "users"},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
