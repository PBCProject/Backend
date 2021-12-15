'use strict';

import pkg from 'bluebird';
const { reject } = pkg;
import jwt from 'jwt-simple';
import moment from 'moment';

const SECRET = 'secretsecretsecretsecretsecret';

function createToken(user) {
	const payload = {
		sub: {
			_id: user._id,
			email: user.email,
			username: user.username,
		},
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix(),
	};
	return jwt.encode(payload, SECRET);
}

function decodeToken(bearer) {
	const token = bearer.split(' ')[1];
	const payload = jwt.decode(token, SECRET);

	if (payload.exp <= moment().unix()) {
		reject({
			status: 401,
			message: 'El token ha expirado',
		});
	}
	return payload.sub;
}

export default {
	createToken,
	decodeToken,
};
