import { gql } from 'apollo-server';

const typeDefs = gql`
	type Role {
		id: ID!
		name: String!
	}

	type User {
		id: ID!
		name: String!
		role: Role!
		clientInfo: ClientInfo
		email: String!
		password: String!
		createdAt: String
		updatedAt: String
	}

	type ClientInfo {
		identificationType: String!
		identification: String!
		birthDate: String!
		documentDate: String!
		revenueValue: Float!
		expensesValue: Float!
	}

	type CreditRequest {
		id: ID!
		client: User!
		fees: Int!
		amountReq: Int
		createdAt: String!
	}

	type CreditResponse {
		id: ID!
		creditRequest: CreditRequest!
		admin: User!
		interest: Float!
		amountAproved: Int!
		message: String!
		isApproved: Boolean!
		createdAt: String!
	}

	type CreditState {
		id: ID!
		name: String!
		color: String!
	}

	type Credit {
		id: ID!
		creditResponse: CreditResponse!
		startDate: String!
		nextPaymentDate: String!
		creditState: CreditState!
	}

	type Payment {
		id: ID!
		credit: Credit!
		date: String!
		amount: Float!
	}

	type ExtensionRequest {
		id: ID!
		credit: Credit!
		date: String!
		reason: String!
		fees: Int!
	}

	type ExtensionResponse {
		id: ID!
		extensionRequest: ExtensionRequest!
		date: String!
		admin: User!
		message: String!
		isApproved: Boolean!
	}

	input RoleInput {
		name: String!
	}

	input ClientInfoInput {
		identificationType: String
		identification: String
		birthDate: String
		documentDate: String
		revenueValue: Float
		expensesValue: Float
	}

	input UserInput {
		name: String
		email: String
		password: String
		role: ID
		clientInfo: ClientInfoInput
	}

	input CreditRequestInput {
		client: ID
		fees: Int
		amountReq: Int		
		createdAt: String
	}

	input CreditResponseInput {
		creditRequest: ID
		admin: ID
		interest: Float
		amountAproved: Int
		message: String
		isApproved: Boolean
	}

	input CreditStateInput {
		name: String
		color: String
	}

	type Query {
		getRole(id: ID!): Role
		getRoles: [Role]

		getUser(id: ID!): User
		getUsers: [User]

		getCreditRequest(id: ID!): CreditRequest
		getCreditRequests: [CreditRequest]
		getCreditRequestsByClient(client: ID!): [CreditRequest]

		getCreditState(id: ID!): CreditState
		getCreditStates: [CreditState]

		getCreditResponse(id: ID!): CreditResponse
		getCreditResponseByCreditRequest(creditRequest: ID!): [CreditResponse]
		getCreditResponses: [CreditResponse]
		getCreditResponsesByClient(client: ID!): [CreditResponse]

		getCredit(id: ID!): Credit
		getCredits: [Credit]
	}

	type Mutation {
		createRole(role: RoleInput!): Role
		updateRole(id: ID!, role: RoleInput!): Role
		deleteRole(id: ID!): Role

		createUser(user: UserInput!): User
		updateUser(id: ID!, user: UserInput!): User
		deleteUser(id: ID!): User

		createCreditRequest(creditRequest: CreditRequestInput!): CreditRequest
		updateCreditRequest(id: ID!, creditRequest: CreditRequestInput!): CreditRequest
		deleteCreditRequest(id: ID!): CreditRequest

		createCreditState(creditState: CreditStateInput!): CreditState
		updateCreditState(id: ID!, creditState: CreditStateInput!): CreditState
		deleteCreditState(id: ID!): CreditState

		createCreditResponse(creditResponse: CreditResponseInput!): CreditResponse
		updateCreditResponse(id: ID!, creditResponse: CreditResponseInput!): CreditResponse
		deleteCreditResponse(id: ID!): CreditResponse
	}
`;

export default typeDefs;
