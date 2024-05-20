import Layout from "@/components/Layout"
import Link from "next/link"
import axios from "axios";
import { useEffect, useState } from "react";

export default function actors() {
    const [actors, setActors] = useState([])

    useEffect(() => {
        axios.get('/api/actors').then(response => {
            setActors(response.data)
        })
    }, [])

 return (
        <Layout>
            <Link className="bg-blue-900  text-white rounded-md py-1 px-2" href={'/actors/new'}>
                Add new actor
            </Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Actor name</td>
                        <td>Actor Age</td>
                        <td>Gender</td>
                        <td>Birth Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {actors.map(actor => (
                        <tr key={actor._id}>
                            <td>{actor.name} {actor.lastName}</td>
                            <td>{actor.age}</td>
                            <td>{actor.gender}</td>
                            <td>{actor.birthDate}</td>
                            <td>
                                <Link href={'/actors/edit/' +actor._id}>
                                    Edit
                                </Link>
                                <Link href={'/actors/delete/' +actor._id}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}