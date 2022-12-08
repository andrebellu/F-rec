import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

function verifyJwtAsync(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, token) => {
			if (err) return reject(err);
			else return resolve(token);
		});
	});
}

export async function verifyJwt(token) {
	try {
		const decoded = await verifyJwtAsync(token);
		return decoded;
	} catch (err) {
		return false;
	}
}
