import db from '$lib/server/db/mongo';

export const auth = db.collection('auth');
