import mongoose from 'mongoose';

const UserSchema = mongoose.Schema = {
	name: String
}

const usetModel = mongoose.model("User", UserSchema)

export default usetModel
