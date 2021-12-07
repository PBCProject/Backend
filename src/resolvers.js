import models from './models/models.js';
const { role, user, creditRequest, creditResponse, credit, creditState } = models;

const resolvers = {
	Query: {
		getRole: async (_, args) => await role.findById(args.id),
		getRoles: async _ => await role.find({}),

		getUser: async (_, args) => await user.findById(args.id),
		getUsers: async (_, args) => await user.find({}),

		getCreditRequest: async (_, args) => await creditRequest.findById(args.id),
		getCreditRequests: async (_, args) => await creditRequest.find({}),
		getCreditRequestsByClient: async (_, args) => await creditRequest.find({ client: args.client }),

		getCreditResponse: async (_, args) => await creditResponse.findById(args.id),
		getCreditResponseByCreditRequest: async (_, args) => await creditResponse.find({ creditRequest: args.creditRequest }),
		getCreditResponses: async (_, args) => await creditResponse.find({}),
		getCreditResponsesByClient: async (_, args) => {
			const creditRequests = await creditRequest.find({ client: args.client });
			return await creditResponse.find({ creditRequest: { $in: creditRequests } }).populate('creditRequest');
		},

		getCreditState: async (_, args) => await creditState.findById(args.id),
		getCreditStates: async (_, args) => await creditState.find({}),

		getCredit: async (_, args) => await credit.findById(args.id),
		getCredits: async (_, args) => await credit.find({}),
	},
	Mutation: {
		createRole: async (_, args) => await new role(args.role).save(),
		updateRole: async (_, args) => await role.findByIdAndUpdate(args.id, args.role, { new: true }),
		deleteRole: async (_, args) => await role.findByIdAndDelete(args.id),

		createUser: async (_, args) => {
			if ((args.role == models.defaultRoleId || !args.role) && !args.user.clientInfo) throw new Error('Client info is required for default role');
			return await new user(args.user).save();
		},
		updateUser: async (_, args) => await user.findByIdAndUpdate(args.id, args.user, { new: true }).populate('role'),
		deleteUser: async (_, args) => await user.findByIdAndDelete(args.id).populate('role'),

		createCreditRequest: async (_, args) => await new creditRequest(args.creditRequest).save(),
		updateCreditRequest: async (_, args) => await creditRequest.findByIdAndUpdate(args.id, args.creditRequest, { new: true }).populate('user'),
		deleteCreditRequest: async (_, args) => await creditRequest.findByIdAndDelete(args.id).populate('user'),

		createCreditState: async (_, args) => await new creditState(args.creditState).save(),
		updateCreditState: async (_, args) => await creditState.findByIdAndUpdate(args.id, args.creditState, { new: true }),
		deleteCreditState: async (_, args) => await creditState.findByIdAndDelete(args.id),

		createCreditResponse: async (_, args) => {
			console.log(args.creditResponse);
			var response = args.creditResponse;
			const request = await creditRequest.exists({ _id: response.creditRequest });
			const admin = await user.exists({ _id: response.admin });
			const isValid = request && admin;
			if (!isValid) throw new Error('Invalid credit response');
			var creditResponseSaved = await new creditResponse(response).save();
			if (response.isApproved) {
				const nextMonth = new Date();
				nextMonth.setMonth(nextMonth.getMonth() + 1);
				const newCredit = await new credit({
					creditResponse: creditResponseSaved._id,
					startDate: Date.now(),
					nextPaymentDate: nextMonth,
					creditState: models.aprovedCreditStateId,
				}).save();
			}
			return creditResponseSaved;
		},
		updateCreditResponse: async (_, args) => await creditResponse.findByIdAndUpdate(args.id, args.creditResponse, { new: true }).populate('creditRequest', 'admin'),
		deleteCreditResponse: async (_, args) => await creditResponse.findByIdAndDelete(args.id).populate(['creditRequest', 'admin']),
	},
};

export default resolvers;
