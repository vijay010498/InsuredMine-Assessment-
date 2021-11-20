import mongoose from "mongoose";

interface PolicyCategoryAttrs {
  categoryName: String;
}

interface PolicyCategoryModel extends mongoose.Model<PolicyCategoryDoc> {
  build(attrs: PolicyCategoryAttrs): PolicyCategoryDoc;
}

interface PolicyCategoryDoc extends mongoose.Document {
  categoryName: String;
}

const PolicyCategorySchema = new mongoose.Schema(
  {
    categoryName: {
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

PolicyCategorySchema.statics.build = (attrs: PolicyCategoryAttrs) => {
  return new PolicyCategory(attrs);
};
const PolicyCategory = mongoose.model<PolicyCategoryDoc, PolicyCategoryModel>(
  "policyCategory",
  PolicyCategorySchema
);

export { PolicyCategory };
