import mongoose, {Schema} from "mongoose";

const userSchema: Schema = new mongoose.Schema( {
    username: String,
    password: String,
});
const User= mongoose.model('User', userSchema);
export { User };
