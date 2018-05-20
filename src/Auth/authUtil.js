import jwt_decode from 'jwt-decode';

function decodeToken(token) {
	return jwt_decode(token);
}

export default decodeToken;