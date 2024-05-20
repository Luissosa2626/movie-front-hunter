import { Actor } from "@/models/Actor";
import { mongooseConnect } from "@/lib/mongoose";
export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect()

    if(method === 'GET') {
        if(req.query?.id) {
            res.json(await Actor.findOne({_id:req.query?.id}))
        } else {
            res.json(await Actor.find())
        }
    }

    if(method === 'POST') {
        const {name, lastName, age, gender, birthDate, images} = req.body;
        const actorDoc = await Actor.create({
            name, lastName, age, gender, birthDate, images
        })
        res.json(actorDoc)
    }

    if (method === "PUT") {
        const {name, lastName, age, gender, birthDate, images, _id} = req.body;
        await Actor.updateOne({_id}, {name, lastName, age, gender, birthDate, images})
        res.json(true)
    }

    if(method === "DELETE") {
        if(req.query?.id) {
            await Actor.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
}