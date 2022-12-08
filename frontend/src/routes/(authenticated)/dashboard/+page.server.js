import { error } from "@sveltejs/kit"
import { access_log } from "$lib/server/db/access_log"


export const load = async ({locals}) => {
    if(!locals.user){
        throw error(401)
    }


    const data = await access_log.aggregate([
        { "$addFields": { "user_id": { "$toObjectId": "$user_id" }}},
              {
                  $lookup:
                  {
                      from: "users",
                      localField: "user_id",
                      foreignField: "_id",
                      as: "user",
                  }
              },
              {
                "$sort": { "timestamp": -1 }
              }
          ]).limit(10).toArray()
    const count = Math.ceil(await access_log.count({})/10)
    data.forEach((log) => {
         log._id = log._id.toString()
         if(log.user.length===0){
            log.user[0] = {_id:"0","name":"Deleted user"}
         }else{
            log.user[0]._id = log.user[0]._id.toString()
         }
         delete log.user_id;
         
    })
    return {
        logs: data,
        count: count
    }

}