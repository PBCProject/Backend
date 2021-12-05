import pkg from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { Schema, model } = pkg;

const defaultRoleId = '61ac54b9fb6ec897dee61944';

const scheme = new Schema({
	name: {
		type: String,
		required: true,
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: 'Role',
		required: true,
		default: defaultRoleId,
		autopopulate: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	clientInfo: {
		type: Object,
		required: false,
		identification: {
			type: String,
			required: true,
		},
		brithDate: {
			type: Date,
			required: true,
		},
		revenueValue: {
			type: Number,
			default: 0,
			required: true,
		},
		expensesValue: {
			type: Number,
			default: 0,
			required: true,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

scheme.plugin(mongooseAutoPopulate);

export default model('User', scheme);
