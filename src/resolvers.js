import user from './models/user.js';
import Role from './models/role.js';

const resolvers = {
	Query: {
		getUser: (root, args, context) => {
			return user.findOne({ _id: args.id });
		},
		getUsers: (root, args, context) => {
			return user.find({});
		},
		getRole: (root, args, context) => {
			return Role.findOne({ _id: args.id });
		},
		getRoles: async (root, args, context) => {
			return Role.find({});
		},
	},
	Mutation: {
		createRole: (root, args, context) => {
			return new Role({ ...args }).save();
		},
		updateRole: (root, args, context) => {
			return Role.findOneAndUpdate({ _id: args.id }, args.role, { new: true });
		},
		deleteRole: (root, args, context) => {
			return Role.findOneAndRemove({ _id: args.id });
		},
	},
};

export default resolvers;
