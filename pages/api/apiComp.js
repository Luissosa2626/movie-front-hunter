import {NextApiRequest, NextApiResponse} from "next";

const handler = async (req, res) => {
    if(req.method === 'POST') {
        await fetch(`http://localhost:3000/actors`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body:req.body
        })
        return res.status(201).json({testing: 'test'})
    }

    if(req.method === 'GET') {
        const response = await fetch(`http://localhost:3000/actors`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const compsumption = await response.json()
        return res.status(200).json(compsumption)
    }
    return res.status(400).json({error: 'Not Found'})
}

export default handler;