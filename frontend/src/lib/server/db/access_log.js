import db from '$lib/server/db/mongo';

export const access_log = db.collection('access_log');
