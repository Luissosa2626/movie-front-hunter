import { Schema, model, models } from "mongoose";

const MovieSchema = new Schema({
    title: {type:String, required: true},
    description: String,
    genre: String,
    releaseDate: {type:String, required: true},
    images: [{type:String}]
})

export const Movie = models.Movie || model('Movie', MovieSchema)