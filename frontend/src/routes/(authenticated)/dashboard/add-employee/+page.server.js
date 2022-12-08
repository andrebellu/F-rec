import { invalid, error } from '@sveltejs/kit';
import { users } from '$lib/server/db/users';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) {
		throw error(401);
	}
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		if (!data.has('name') || !data.has('role')) {
			return invalid(400, { message: 'Nome o ruolo mancante' });
		}
		if (
			!data.get('photo').startsWith('data:image/png;base64,i') &&
			!data.get('photo').startsWith('data:image/jpeg;base64,/')
		) {
			return invalid(400, { message: 'Formato immagine non supportato' });
		}
		// max 1mb
		if (data.get('photo').length > 1048576) {
			return invalid(400, { message: 'Massimo 1MB' });
		}

		await users.insertOne({
			name: data.get('name'),
			role: data.get('role'),
			photo: data.get('photo')
		});
	}
};
