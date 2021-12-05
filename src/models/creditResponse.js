import pkg from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { Schema, model } = pkg;

const schema = new Schema({
	creditRequest: {
		type: Schema.Types.ObjectId,
		ref: 'CreditRequest',
		autopopulate: true,
		required: true,
	},
	admin: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		autopopulate: true,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	isApproved: {
		type: Boolean,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

schema.plugin(mongooseAutoPopulate);

export default model('CreditResponse', schema);
