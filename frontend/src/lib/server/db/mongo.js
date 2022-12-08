import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export async function start_mongo() {
	console.log('starting mongo...');
	return await client.connect();
}

export default client.db('tbd');
