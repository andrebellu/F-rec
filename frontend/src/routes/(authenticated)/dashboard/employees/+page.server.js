import { users } from '$lib/server/db/users';
import { error } from '@sveltejs/kit';

export const load = async ({ locals, depends }) => {
	if (!locals.user) {
		throw error(401);
	}
	const usersData = await users.find().project({ photo: false }).toArray();

	usersData.forEach((user) => {
		user._id = user._id.toString();
	});

	depends('app:employees');

	return {
		data: usersData
	};
};
