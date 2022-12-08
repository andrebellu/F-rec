import { auth } from '$lib/server/db/auth';
import { verifyJwt } from '$lib/server/verifyJwt';
import { hashPassword } from '$lib/server/passwordUtils';

export async function POST({ request, cookies }) {
	const token = cookies.get('token');
	const { username, password } = await request.json();
	if (!token) {
		return new Response('Missing token', { status: 400 });
	}
	if (!(await verifyJwt(token))) {
		return new Response('Invalid token', { status: 400 });
	}
	if (!username || !password) {
		return new Response('Missing username or password', { status: 400 });
	}

	const { hash, salt } = await hashPassword(password);
	try {
		await auth.insertOne({ username, hash, salt });
		return new Response(JSON.stringify({ message: 'User created' }));
	} catch {
		return new Response('User already exists', { status: 400 });
	}
}
