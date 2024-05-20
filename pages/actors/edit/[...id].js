import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import ActorForm from "@/components/ActorForm";
export default function EditActorPage() {
    const [actorInfo, setActorInfo] = useState(null)
    const router = useRouter()
    const {id} = router.query;

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/api/actors?id='+id).then(response => {
            setActorInfo(response.data)
        })
    }, [id])

    return (
        <Layout>
            <h1>Edit Actor</h1>
            {actorInfo && (
                <ActorForm {...actorInfo}/>
            )}
        </Layout>
    )
}