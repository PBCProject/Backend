import pkg from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const { Schema, model } = pkg;

const defaultRoleId = '61aed31ef01d357c60dd4ac2';
const adminRoleId = '61aed348f01d357c60dd4ac9';

const aprovedCreditStateId = '61aed288564d474e3a9b3c66';

const role = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
});

const user = new Schema({
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

const creditRequest = new Schema({
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
	interest: {
		type: Number,
		required: true,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const creditResponse = new Schema({
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

const creditState = new Schema({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});

const credit = new Schema({
	creditResponse: {
		type: Schema.Types.ObjectId,
		ref: 'CreditResponse',
		autopopulate: true,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	nextPaymentDate: {
		type: Date,
		required: true,
	},
	creditState: {
		type: Schema.Types.ObjectId,
		ref: 'CreditState',
		required: true,
		autopopulate: true,
	},
});

role.plugin(mongooseAutoPopulate);
user.plugin(mongooseAutoPopulate);
creditRequest.plugin(mongooseAutoPopulate);
creditResponse.plugin(mongooseAutoPopulate);
creditState.plugin(mongooseAutoPopulate);
credit.plugin(mongooseAutoPopulate);

export default {
	role: model('Role', role),
	user: model('User', user),
	creditRequest: model('CreditRequest', creditRequest),
	creditResponse: model('CreditResponse', creditResponse),
	credit: model('Credit', credit),
	creditState: model('CreditState', creditState),
	defaultRoleId,
	adminRoleId,
	aprovedCreditStateId,
};
