import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router"

export default function MovieForm({
    _id,
    title: existingTitle, 
    description: existingDescription, 
    genre: existingGenre, 
    releaseDate: existingReleaseDate,
    images: existingImages
}) {
    const [title, setTitle] = useState(existingTitle ||'')
    const [description, setDescription] = useState(existingDescription ||'')
    const [images, setImages] = useState(existingImages || [])
    const [genre, setGenre] = useState(existingGenre ||'')
    const [releaseDate, setReleaseDate] = useState(existingReleaseDate ||'')
    const [goToMovies, setGoToMovies] = useState(false)
    const router = useRouter()

    async function createMovie(e) {
        e.preventDefault()
        const data = {title, description, genre, releaseDate, images}
        if(_id) {
            await axios.put('/api/movies', {...data, _id})
        } else {
            await axios.post('/api/movies', data)
        }
        setGoToMovies(true)
    }

    if(goToMovies) {
        router.push('/movies')
    }

    async function uploadImages(e) {
        const files = e.target?.files;
        if(files?.length > 0) {
            const data = new FormData()
            for(const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data)
            console.log(res.data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links]
            })
        }
    }

    return (
        <form onSubmit={createMovie}>
            <label>Movie Name</label>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
            <label>Description</label>
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
                <label className=" w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        upload
                    </div>
                    <input type="file" onChange={uploadImages} className="hidden"/>
                </label>
                {!images && (
                    <div>No photos in this movie.</div>
                )}
            </div>
            <label>Genre</label>
            <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)}/>
            <label>Release date</label>
            <input type="date" min="2000-01-01" max="2024-12-31" placeholder="Release date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}