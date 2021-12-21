'use strict';

import { ApolloServer, gql } from 'apollo-server';
import './models/database.js';
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
import models from './models/models.js';
import services from './services/index.js';

const { role, user: User, creditRequest, creditResponse, credit, creditState } = models;
const { createToken, decodeToken } = services;

const authResolvers = {
	Query: {
		whoiam: async (_, __, context) => (context.user ? await User.findById(context.user._id) : null),
	},
	Mutation: {
		login: async (_, args, context) => {
			const user = await User.findOne({ email: args.email, password: args.password });
			if (!user) throw new Error('User not found');
			const token = createToken(user);
			context.user = user.id;
			return { token };
		},
		register: async (_, args, context) => {
			const user = await User.create(args);
			const token = createToken(user);
			context.user = user.id;
			return { token };
		},
	},
};

const authTypeDefs = gql`
	type Auth {
		token: String!
	}

	type Query {
		whoiam: User
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		register(name: String!, email: String!, password: String!): Auth
	}
`;

const server = new ApolloServer({
	typeDefs: [authTypeDefs, typeDefs],
	resolvers: [authResolvers, resolvers],
	context: async ({ req }) => {
		let authToken = null;
		let user = null;
		try {
			authToken = req.headers.authorization;
			if (authToken) user = decodeToken(authToken);
		} catch (e) {
			console.warn(`No se pudo autenticar el token: ${authToken}`);
		}
		return {
			authToken,
			user,
		};
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
