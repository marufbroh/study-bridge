import mongoose, {Schema} from "mongoose";

const quizSetSchema = new Schema({
    title : {
        required: true,
        type: String,
      },
      description : {
        type: String,
      },
      slug : {
        type: String,
      },
      quizIds : [{ type: Schema.ObjectId, ref: "Quiz" }],
      active : {
        required: true,
        default: false,
        type: Boolean,
      },
})

export const Quizset = mongoose.models.Quizset ?? mongoose.model("Quizset", quizSetSchema);