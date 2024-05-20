import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
export default function DeleteActorPage() {
    const router = useRouter();
    const [actorInfo, setActorInfo] = useState()
    const {id} = router.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/actors?id='+id).then(response => {
            setActorInfo(response.data)
        })
    }, [id])

    function goBack() {
        router.push('/actors')
    }

    async function deleteActor() {
        await axios.delete('/api/actors?id='+id)
        goBack()
    }

    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete the actor &nbsp;{actorInfo?.name} {actorInfo?.lastName}?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={deleteActor}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
            </Layout>
    )
}