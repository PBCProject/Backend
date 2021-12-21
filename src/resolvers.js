import models from './models/models.js';
const { role: Role, user: User, creditRequest: CreditRequest, creditResponse: CreditResponse, credit: Credit, creditState: CreditState } = models;

const resolvers = {
	Query: {
		getRole: async (_, args) => await Role.findById(args.id),
		getRoles: async _ => await Role.find({}),

		getUser: async (_, args) => await User.findById(args.id),
		getUsers: async (_, args) => await User.find({}),

		getCreditRequest: async (_, args) => await CreditRequest.findById(args.id),
		getCreditRequests: async (_, args) => await CreditRequest.find({}),
		getCreditRequestsByClient: async (_, args) => await CreditRequest.find({ client: args.client }),

		getCreditResponse: async (_, args) => await CreditResponse.findById(args.id),
		getCreditResponseByCreditRequest: async (_, args) => await CreditResponse.find({ creditRequest: args.creditRequest }),
		getCreditResponses: async (_, args) => await CreditResponse.find({}),
		getCreditResponsesByClient: async (_, args) => {
			const creditRequests = await CreditRequest.find({ client: args.client });
			return await CreditResponse.find({ creditRequest: { $in: creditRequests } }).populate('creditRequest');
		},

		getCreditState: async (_, args) => await CreditState.findById(args.id),
		getCreditStates: async (_, args) => await CreditState.find({}),

		getCredit: async (_, args) => await Credit.findById(args.id),
		getCredits: async (_, args) => await Credit.find({}),
		getCreditsByClient: async (_, args) => {
			const creditRequests = await CreditRequest.find({ client: args.client });
			const creditResponses = await CreditResponse.find({ creditRequest: { $in: creditRequests } }).populate('creditRequest');
			return await Credit.find({ creditResponse: { $in: creditResponses } }).populate('creditResponse');
		},
	},
	Mutation: {
		createRole: async (_, args) => await new Role(args.role).save(),
		updateRole: async (_, args) => await Role.findByIdAndUpdate(args.id, args.role, { new: true }),
		deleteRole: async (_, args) => await Role.findByIdAndDelete(args.id),

		createUser: async (_, args) => {
			console.log(args);
			if ((args.role == models.defaultRoleId || !args.role) && !args.user.clientInfo) throw new Error('Client info is required for default role');
			return await new User(args.user).save();
		},
		updateUser: async (_, args) => await User.findByIdAndUpdate(args.id, args.user, { new: true }).populate('role'),
		deleteUser: async (_, args) => await User.findByIdAndDelete(args.id).populate('role'),

		createCreditRequest: async (_, args) => await new CreditRequest(args.creditRequest).save(),
		updateCreditRequest: async (_, args) => await CreditRequest.findByIdAndUpdate(args.id, args.creditRequest, { new: true }).populate('user'),
		deleteCreditRequest: async (_, args) => await CreditRequest.findByIdAndDelete(args.id).populate('user'),

		createCreditState: async (_, args) => await new CreditState(args.creditState).save(),
		updateCreditState: async (_, args) => await CreditState.findByIdAndUpdate(args.id, args.creditState, { new: true }),
		deleteCreditState: async (_, args) => await CreditState.findByIdAndDelete(args.id),

		createCreditResponse: async (_, args) => {
			console.log(args.creditResponse);
			var response = args.creditResponse;
			const request = await CreditRequest.exists({ _id: response.creditRequest });
			const admin = await User.exists({ _id: response.admin });
			const isValid = request && admin;
			if (!isValid) throw new Error('Invalid credit response');
			var creditResponseSaved = await new CreditResponse(response).save();
			if (response.isApproved) {
				const nextMonth = new Date();
				nextMonth.setMonth(nextMonth.getMonth() + 1);
				const newCredit = await new Credit({
					creditResponse: creditResponseSaved._id,
					startDate: Date.now(),
					nextPaymentDate: nextMonth,
					creditState: models.aprovedCreditStateId,
				}).save();
			}
			return creditResponseSaved;
		},
		updateCreditResponse: async (_, args) => await CreditResponse.findByIdAndUpdate(args.id, args.creditResponse, { new: true }).populate('creditRequest', 'admin'),
		deleteCreditResponse: async (_, args) => await CreditResponse.findByIdAndDelete(args.id).populate(['creditRequest', 'admin']),
	},
	CreditRequest: {
		isApproved: async (creditRequest, _, context) => {
			const creditResponse = await CreditResponse.findOne({ creditRequest: creditRequest._id });
			return creditResponse && creditResponse.isApproved;
		},
	},
};

export default resolvers;
