import mongoose from "mongoose";

interface UserAttrs {
  firstName: String;
  DOB: String;
  address: String;
  phoneNumber: String;
  state: String;
  zipCode: Number;
  email: String;
  gender: String;
  userType: String;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  firstName: String;
  DOB: String;
  address: String;
  phoneNumber: String;
  state: String;
  zipCode: Number;
  email: String;
  gender: String;
  userType: String;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        const createdAtISO = ret.createdAt;
        delete ret.createdAt;
        ret.createdAt = createdAtISO.getTime();
        const updatedAtISO = ret.updatedAt;
        delete ret.updatedAt;
        ret.updatedAt = updatedAtISO.getTime();
      },
    },
  }
);

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
export { User };