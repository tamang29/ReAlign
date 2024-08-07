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
        enum: ['Admin', 'Member', null],
      },
      photo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
      } ,
      isVerified: {type: Boolean, default: false},
      token: {type: String, default: null},
      // organization: {type: String, default: null}
      organization: {
        type: Schema.Types.ObjectId, 
        ref: 'Organization', 
        default: null
      }

}, {collection: "users"},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
