import { Schema,Model, model } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        user: {
  type: Schema.Types.ObjectId,
  ref: "User",  
  required: true
}
    },
    {
        timestamps: true  
    }
);

const noteModel = model("note",noteSchema);

export default noteModel;