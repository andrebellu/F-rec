import { ObjectId } from 'mongodb';
import { users } from '$lib/server/db/users';

export async function POST({ locals, request }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 403 });
	}

	const id = await request.json();
	await users.deleteOne({ _id: ObjectId(id) });
	return new Response('OK', { status: 200 });
}
