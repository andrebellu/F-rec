/** @type {import('./$types').RequestHandler} */
import { access_log } from '$lib/server/db/access_log';
import { json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	if (!locals.user) {
		return new Response('Unauthorized', { status: 403 });
	}
	const page = url.searchParams.get('page');

	if (!page) {
		return new Response('Missing page', { status: 400 });
	}

	const data = await access_log
		.aggregate([
			{ $addFields: { user_id: { $toObjectId: '$user_id' } } },
			{
				$lookup: {
					from: 'users',
					localField: 'user_id',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$sort: { timestamp: -1 }
			}
		])
		.skip(page * 10)
		.limit(10)
		.toArray();
	data.forEach((log) => {
		log._id = log._id.toString();
		if (log.user.length === 0) {
			log.user[0] = { _id: '0', name: 'Deleted user' };
		} else {
			log.user[0]._id = log.user[0]._id.toString();
		}
		delete log.user_id;
	});

	return json({
		logs: data
	});
}
