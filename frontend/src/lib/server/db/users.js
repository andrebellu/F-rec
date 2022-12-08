import db from "$lib/server/db/mongo"

export const users = db.collection("users")