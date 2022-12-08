import { start_mongo } from '$lib/server/db/mongo';
import { verifyJwt } from '$lib/server/verifyJwt';

let dbStarting = true;

export async function handle({ event, resolve }) {
	if (dbStarting) {
		dbStarting = false;
		await start_mongo();
	}
	const { cookies } = event;
	const token = cookies.get('token');
	if (token) {
		const decoded = await verifyJwt(token);
		if (decoded) {
			event.locals.user = {
				username: decoded.username
			};
		}
	}
	const response = resolve(event);

	return response;
}
