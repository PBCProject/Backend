import pkg from 'mongoose';
const { Schema, model } = pkg;

const scheme = new Schema({
	name: {
		type: String,
		required: true,
	},
});

export default model('User', scheme);
