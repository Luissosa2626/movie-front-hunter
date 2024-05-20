import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router"

export default function MovieForm({
    _id,
    name: existingName, 
    lastName: existingLastName, 
    age: existingAge,
    gender: existingGender, 
    birthDate: existingBirthDate,
    images: existingImages
}) {
    const [name, setName] = useState(existingName ||'')
    const [lastName, setLastName] = useState(existingLastName ||'')
    const [age, setAge] = useState(existingAge ||'')
    const [images, setImages] = useState(existingImages || [])
    const [gender, setGender] = useState(existingGender ||'')
    const [birthDate, setBirthDate] = useState(existingBirthDate ||'')
    const [goToActors, setGoToActors] = useState(false)
    const router = useRouter()

    async function createActor(e) {
        e.preventDefault()
        const data = {name, lastName, age, gender, birthDate, images}
        if(_id) {
            await axios.put('/api/actors', {...data, _id})
        } else {
            await axios.post('/api/actors', data)
        }
        setGoToActors(true)
    }

    if(goToActors) {
        router.push('/actors')
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

    fetch('/api/apiComp', {
        method: 'POST',
        body: JSON.stringify(FormData)
    })
    

    return (
        <form onSubmit={createActor}>
            <label>Name</label>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
            <label>Lastname</label>
            <input type="text" placeholder="Lastname" value={lastName} onChange={e => setLastName(e.target.value)}/>
            <label>Age</label>
            <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)}/>
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
                    <div>No photos in this person.</div>
                )}
            </div>
            <label>Gender</label>
            <input type="text" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)}/>
            <label>Birth date</label>
            <input type="date" min="1990-01-01" max="2024-12-31" placeholder="Birth date" value={birthDate} onChange={e => setBirthDate(e.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}