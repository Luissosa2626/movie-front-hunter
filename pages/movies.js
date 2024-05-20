import Layout from "@/components/Layout"
import Link from "next/link"
import axios from "axios";
import { useEffect, useState } from "react";

export default function movies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get('/api/movies').then(response => {
            setMovies(response.data)
        })
    }, [])

    return (
        <Layout>
            <Link className="bg-blue-900  text-white rounded-md py-1 px-2" href={'/movies/new'}>
                Add new movie
            </Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Movie name</td>
                        <td>Genre</td>
                        <td>Release Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.releaseDate}</td>
                            <td>
                                <Link href={'/movies/edit/' +movie._id}>
                                    Edit
                                </Link>
                                <Link href={'/movies/delete/' +movie._id}>
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