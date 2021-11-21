import mongoose from "mongoose";

interface policyCarrierAttrs {
  companyName: String;
}

interface policyCarrierModel extends mongoose.Model<policyCarrierDoc> {
  build(attrs: policyCarrierAttrs): policyCarrierDoc;
}
interface policyCarrierDoc extends mongoose.Document {
  companyName: String;
}

const PolicyCarrierSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
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

PolicyCarrierSchema.statics.build = (attrs: policyCarrierAttrs) => {
  return new PolicyCarrier(attrs);
};

const PolicyCarrier = mongoose.model<policyCarrierDoc, policyCarrierModel>(
  "PolicyCarrier",
  PolicyCarrierSchema
);
export { PolicyCarrier };
