
import axios from 'axios'


const api = axios.create({
    baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1'
})

export function getAllObjects () {
    return api.get("/objects")
}

export function getObjectById (id) {
    return api.get(`/objects/${id}`)
}

export function getObjectByDepartment (departmentId) {
    return api.get(`/objects?departmentIds=${departmentId}`)
}