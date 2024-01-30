import mongoose, {Schema} from "mongoose";

const todoSchema: Schema = new mongoose.Schema( {
  text: String,
  checked: Boolean,
});
const Todo= mongoose.model('Todo', todoSchema);
export { Todo };
