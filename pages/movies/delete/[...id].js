import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
export default function DeleteMoviePage() {
    const router = useRouter();
    const [movieInfo, setMovieInfo] = useState()
    const {id} = router.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/movies?id='+id).then(response => {
            setMovieInfo(response.data)
        })
    }, [id])

    function goBack() {
        router.push('/movies')
    }

    async function deleteMovie() {
        await axios.delete('/api/movies?id='+id)
        goBack()
    }

    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete the movie &nbsp;{movieInfo?.title}?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteMovie}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
            </Layout>
    )
}