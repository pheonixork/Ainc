const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import Lang from 'constants/lang';
import Constants from 'constants/constants';

const {serverRuntimeConfig} = getConfig();

export {jwtMiddleware};

function jwtMiddleware(req, res) {
	if (req.url === '/api/users/authenticate')
		return true;

	const authHeader = req.headers.authorization;
	if (!authHeader)
		throw {status: Constants.errors.unauthorized, message: Lang.communcation_errs.e010};

	const token = authHeader.split(' ')[1];
	jwt.verify(token, serverRuntimeConfig.secret, (err, tokenInfo) => {
		if (err)
			throw {status: Constants.errors.unauthorized, message: Lang.communcation_errs.e010};
		if (tokenInfo.exp < tokenInfo.iat)
			throw {status: Constants.errors.forbidden, message: Lang.communcation_errs.e010};

		req.user = {id:tokenInfo.user, role:tokenInfo.role};
	});

	return true;
}