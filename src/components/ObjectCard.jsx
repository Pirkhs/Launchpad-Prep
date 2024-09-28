import { useEffect, useState } from "react"
import Loading from "./Loading"
import { getObjectById } from "../api"
import Error from "./Error"

export default function ObjectCard({id}) {

    const [isError, setIsErro] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [object, setObject] = useState({})

    useEffect(() => {
        setIsLoading(true)
        getObjectById(id)
        .then(response => {

            setObject(response.data)
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    }, [])


    return (
        
        isLoading ? <Loading text="Loading Individual Object"/> :

        <div className="object-card">
            <p> {object.title} </p>
            <p> Id: {id}</p>
            { object.primaryImageSmall ? <img className="object-image" src={object.primaryImageSmall} alt={object.title}/> : <Error text="Image Unavailable"/>}
        </div>
    )
}