import { users } from '$lib/server/db/users';
import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 403 });
	}
	const page = url.searchParams.get('page') || 0;

	const usersData = await users
		.find()
		.project({ photo: true, _id: { $convert: { input: '$_id', to: 'string' } } })
		.limit(10)
		.skip(page * 10)
		.toArray();

	return json(usersData);
}
