import jwt from 'jsonwebtoken';
import { auth } from '$lib/server/db/auth';
import { JWT_SECRET } from '$env/static/private';
import { ENV } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { verifyPassword } from '$lib/server/passwordUtils';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();
	if (!username || !password) {
		return new Response('Missing username or password', { status: 400 });
	}

	const user = await auth.findOne({ username: username });
	if (!user) {
		return new Response("User doesn't exists", { status: 400 });
	}

	if (!(await verifyPassword(password, user.salt, user.hash))) {
		return new Response('Invalid password', { status: 400 });
	}
	const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
	cookies.set('token', token, {
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60,
		path: '/',
		secure: ENV === 'production'
	});
	return json({ message: 'ok' });
}
