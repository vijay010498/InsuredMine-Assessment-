import mongoose from "mongoose";

interface UserAccountAttrs {
  accountName: String;
}

interface UserAccountModel extends mongoose.Model<UserAccountDoc> {
  build(attrs: UserAccountAttrs): UserAccountDoc;
}
interface UserAccountDoc extends mongoose.Document {
  accountName: String;
}

const UserAccountSchema = new mongoose.Schema(
  {
    accountName: {
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
UserAccountSchema.statics.build = (attrs: UserAccountAttrs) => {
  return new UserAccount(attrs);
};

const UserAccount = mongoose.model<UserAccountDoc, UserAccountModel>(
  "userAccount",
  UserAccountSchema
);
export { UserAccount };
