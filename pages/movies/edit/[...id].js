import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import MovieForm from "@/components/MovieForm";
export default function EditMoviePage() {
    const [movieInfo, setMovieInfo] = useState(null)
    const router = useRouter()
    const {id} = router.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/movies?id='+id).then(response => {
            setMovieInfo(response.data)
        })
    }, [id])

    return (
        <Layout>
            <h1>Edit Movie</h1>
            {movieInfo && (
                <MovieForm {...movieInfo}/>
            )}
        </Layout>
    )
}