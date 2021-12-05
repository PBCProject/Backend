import user from './models/user.js';
import role from './models/role.js';
import creditRequest from './models/creditRequest.js';
import creditResponse from './models/creditResponse.js';

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
	},
	Mutation: {
		createRole: async (_, args) => await new role(args.role).save(),
		updateRole: async (_, args) => await role.findByIdAndUpdate(args.id, args.role, { new: true }),
		deleteRole: async (_, args) => await role.findByIdAndDelete(args.id),

		createUser: async (_, args) => await new user(args.user).save(),
		updateUser: async (_, args) => await user.findByIdAndUpdate(args.id, args.user, { new: true }).populate('role'),
		deleteUser: async (_, args) => await user.findByIdAndDelete(args.id).populate('role'),

		createCreditRequest: async (_, args) => await new creditRequest(args.creditRequest).save(),
		updateCreditRequest: async (_, args) => await creditRequest.findByIdAndUpdate(args.id, args.creditRequest, { new: true }).populate('user'),
		deleteCreditRequest: async (_, args) => await creditRequest.findByIdAndDelete(args.id).populate('user'),

		createCreditResponse: async (_, args) => await new creditResponse(args.creditResponse).save(),
		updateCreditResponse: async (_, args) => await creditResponse.findByIdAndUpdate(args.id, args.creditResponse, { new: true }).populate('creditRequest', 'admin'),
		deleteCreditResponse: async (_, args) => await creditResponse.findByIdAndDelete(args.id).populate(['creditRequest', 'admin']),
	},
};

export default resolvers;
