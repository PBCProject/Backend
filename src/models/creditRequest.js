import pkg from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { Schema, model } = pkg;

const schema = new Schema({
	client: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		autopopulate: true,
	},
	fees: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

schema.plugin(mongooseAutoPopulate);

export default model('CreditRequest', schema);
