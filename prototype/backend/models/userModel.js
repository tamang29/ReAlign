import mongoose from "mongoose";
const Schema = mongoose.Schema
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
      role: {
        type: String,
        enum: ['Owner', 'Editor', 'Observer'],
      },
      photo: {
        type: String,
        required: false
      }
}, {collection: "users"},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
