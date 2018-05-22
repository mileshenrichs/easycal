import jwt_decode from 'jwt-decode';

export default function decodeToken(token) {
	return jwt_decode(token);
}