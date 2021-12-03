import { gql } from 'apollo-server';

const typeDefs = gql`
	type Role {
		id: ID!
		name: String!
	}

	type User {
		id: ID!
		name: String!
		Role: Role!
		clientInfo: ClientInfo
	}

	type ClientInfo {
		id: ID!
		user: User!
		identification: String!
		birthDate: String!
		revenueValue: Float!
		ExpensesValue: Float!
	}

	type CreditRequest {
		id: ID!
		client: User!
		Fees: Int!
		Amount: Int!
		Date: String!
	}

	type CreditResponse {
		id: ID!
		creditRequest: CreditRequest!
		admin: User!
		message: String!
		isApproved: Boolean!
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
		interestRate: Float!
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

	type Query {
		getUser(id: ID!): User
		getUsers: [User]
		getRole(id: ID!): Role
		getRoles: [Role]
		getClientInfo(id: ID!): ClientInfo
		getClientInfos: [ClientInfo]
		getCreditRequest(id: ID!): CreditRequest
		getCreditRequests: [CreditRequest]
		getCreditResponse(id: ID!): CreditResponse
		getCreditResponses: [CreditResponse]
		getCreditState(id: ID!): CreditState
		getCreditStates: [CreditState]
		getCredit(id: ID!): Credit
		getCredits: [Credit]
		getPayment(id: ID!): Payment
		getPayments: [Payment]
		getExtensionRequest(id: ID!): ExtensionRequest
		getExtensionRequests: [ExtensionRequest]
		getExtensionResponse(id: ID!): ExtensionResponse
		getExtensionResponses: [ExtensionResponse]
	}

	type Mutation {
		createUser(name: String!, Role: ID!): User
		updateUser(id: ID!, name: String, Role: ID): User
		deleteUser(id: ID!): User
		createRole(name: String!): Role
		updateRole(id: ID!, name: String!): Role
		deleteRole(id: ID!): Role
		createClientInfo(user: ID!, identification: String!, birthDate: String!, revenueValue: Float!, ExpensesValue: Float!): ClientInfo
		updateClientInfo(id: ID!, user: ID, identification: String, birthDate: String, revenueValue: Float, ExpensesValue: Float): ClientInfo
		deleteClientInfo(id: ID!): ClientInfo
		createCreditRequest(client: ID!, Fees: Int!, Amount: Int!, Date: String!): CreditRequest
		updateCreditRequest(id: ID!, client: ID, Fees: Int, Amount: Int, Date: String): CreditRequest
		deleteCreditRequest(id: ID!): CreditRequest
		createCreditResponse(creditRequest: ID!, admin: ID!, message: String!, isApproved: Boolean!): CreditResponse
		updateCreditResponse(id: ID!, creditRequest: ID, admin: ID, message: String, isApproved: Boolean): CreditResponse
		deleteCreditResponse(id: ID!): CreditResponse
		createCreditState(name: String!, color: String!): CreditState
		updateCreditState(id: ID!, name: String, color: String): CreditState
		deleteCreditState(id: ID!): CreditState
		createCredit(creditResponse: ID!, startDate: String!, nextPaymentDate: String!, creditState: ID!, interestRate: Float!): Credit
		updateCredit(id: ID!, creditResponse: ID, startDate: String, nextPaymentDate: String, creditState: ID, interestRate: Float): Credit
		deleteCredit(id: ID!): Credit
		createPayment(credit: ID!, date: String!, amount: Float!): Payment
		updatePayment(id: ID!, credit: ID, date: String, amount: Float): Payment
		deletePayment(id: ID!): Payment
		createExtensionRequest(credit: ID!, date: String!, reason: String!, fees: Int!): ExtensionRequest
		updateExtensionRequest(id: ID!, credit: ID, date: String, reason: String, fees: Int): ExtensionRequest
		deleteExtensionRequest(id: ID!): ExtensionRequest
		createExtensionResponse(extensionRequest: ID!, date: String!, admin: ID!, message: String!, isApproved: Boolean!): ExtensionResponse
		updateExtensionResponse(id: ID!, extensionRequest: ID, date: String, admin: ID, message: String, isApproved: Boolean): ExtensionResponse
		deleteExtensionResponse(id: ID!): ExtensionResponse
	}
`;

export default typeDefs;
