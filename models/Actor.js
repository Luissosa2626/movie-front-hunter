import { Schema, model, models } from "mongoose";

const ActorSchema = new Schema({
    name: {type:String, required: true},
    lastName: String,
    age: Number,
    gender: String,
    birthDate: {type:String, required: true},
    images: [{type:String}]
})

export const Actor = models.Actor || model('Actor', ActorSchema)