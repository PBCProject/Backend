import pkg from 'mongoose';
const { Schema, model } = pkg;

const scheme = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
});

export default model('Role', scheme);
