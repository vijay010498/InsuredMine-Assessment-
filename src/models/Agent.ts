import mongoose from "mongoose";

interface AgentAttrs {
  agentName: string;
}

interface AgentModel extends mongoose.Model<AgentDoc> {
  build(attrs: AgentAttrs): AgentDoc;
}
interface AgentDoc extends mongoose.Document {
  agentName: string;
}

const AgentSchema = new mongoose.Schema(
  {
    agentName: {
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

AgentSchema.statics.build = (attrs: AgentAttrs) => {
  return new Agent(attrs);
};
const Agent = mongoose.model<AgentDoc, AgentModel>("Agent", AgentSchema);
export { Agent };
