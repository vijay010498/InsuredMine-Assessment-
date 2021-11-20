import mongoose from "mongoose";

interface PolicyInfoAttrs {
  policyNumber: String;
  policyStartDate: mongoose.Schema.Types.Date;
  policyEndDate: mongoose.Schema.Types.Date;
  policyCategory: String;
  userId: string;
}

interface PolicyInfoModel extends mongoose.Model<PolicyInfoDoc> {
  build(attrs: PolicyInfoAttrs): PolicyInfoDoc;
}

interface PolicyInfoDoc extends mongoose.Document {
  policyNumber: String;
  policyStartDate: mongoose.Schema.Types.Date;
  policyEndDate: mongoose.Schema.Types.Date;
  policyCategory: String;
  userId: string;
}

const PolicyInfoSchema = new mongoose.Schema(
  {
    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },
    policyStartDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    policyEndDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    policyCategory: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

PolicyInfoSchema.statics.build = (attrs: PolicyInfoAttrs) => {
  return new PolicyInfo(attrs);
};
const PolicyInfo = mongoose.model<PolicyInfoDoc, PolicyInfoModel>(
  "policyInfo",
  PolicyInfoSchema
);
export { PolicyInfo };
