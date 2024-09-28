import { useEffect, useState } from "react"
import { getAllObjects, getObjectByDepartment } from '../api'
import Loading from "./Loading"
import ObjectCard from "./ObjectCard"
import Error from "./Error"

export default function Artworks () {
    const objectDepartments = {
        "American Decorative Arts": 1,
        "Ancient Near Eastern Art": 3,
        "Arts of Africa, Oceania, and the Americas": 5,
        "Asian Art": 6,
        "Egyptian Art": 10,
        "Greek and Roman Art": 13,
        "Islamic Art": 14,
        "Medieval Art": 17,
        "Modern Art": 21
    }

    const [isError, setIsError] = useState(false)
    let [pageNumber, setPageNumber] = useState(1)
    let [startIndex, setStartIndex] = useState((pageNumber - 1) * 20)
    let [endIndex, setEndIndex] = useState(pageNumber * 20)
    const [isLoading, setIsLoading] = useState(false);
    const [objects, setObjects] = useState([]);

    const handleButtonFilter = (e) => {
        const department = e.target.innerHTML
        const departmentId = objectDepartments[department]
        setIsLoading(true)
        getObjectByDepartment(departmentId)
        .then(response => {
            setObjects(response.data.objectIDs.slice(startIndex, endIndex))
            setIsLoading(false)
        })
        .catch(err => console.log(err))
        
    }

    const handlePages = (e) => {
        const increment = +e.target.value
        if (startIndex === 0 && increment === -1) {
            setIsError(true)
            return
        }
        setIsError(false)
        setPageNumber(pageNumber += increment)
        setStartIndex((pageNumber - 1) * 20)
        setEndIndex(pageNumber * 20)
        console.log(pageNumber)
    }

    useEffect(() => {
        setIsLoading(true)
        getAllObjects()
        .then((response => {
            setObjects(response.data.objectIDs.slice(startIndex, endIndex))
            setIsLoading(false)
        }))
        .catch(err => console.log(err))
    }, [ pageNumber ])


    return (
        isLoading ? <Loading text="Loading Object Collection..."/> :
        (
        <div> 
            <h2> The Metropolitan Museum of Art Collection: </h2>
            <div className="objects">

                {objects.map(object => {
                    return <ObjectCard key={object} id={object}/>
                })}
            </div>
            { isError ? <Error text="Cannot scroll that far" /> : <p></p> }
            <div className="pages">
                <button value="-1" onClick={(e) => handlePages(e)}> Previous Page </button>
                <button value="1" onClick={(e) => handlePages(e)}> Next Page </button>
            </div>
            <div className="departments">
                <h3> Filter by department: </h3>
                {Object.keys(objectDepartments).map(department => {
                    return <button key = {department} onClick={(e) => handleButtonFilter(e)}>{department}</button>
                })}
            </div>
            <br></br>
        </div>
        )
    )
}