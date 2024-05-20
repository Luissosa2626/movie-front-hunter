import mongoose from "mongoose";
import { Movie } from "@/models/Movie";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect()

    if(method === 'GET') {
        if(req.query?.id) {
            res.json(await Movie.findOne({_id:req.query?.id}))
        } else {
            res.json(await Movie.find())
        }
    }

    if(method === 'POST') {
        const {title, description, genre, releaseDate, images} = req.body;
        const movieDoc = await Movie.create({
            title, description, genre, releaseDate, images
        })
        res.json(movieDoc)
    }

    if (method === "PUT") {
        const {title, description, genre, releaseDate, images, _id} = req.body;
        await Movie.updateOne({_id}, {title, description, genre, releaseDate, images})
        res.json(true)
    }

    if(method === "DELETE") {
        if(req.query?.id) {
            await Movie.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
}