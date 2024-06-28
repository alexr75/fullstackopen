import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = (id) => {
	const url = id ? `${baseUrl}/${id}` : baseUrl
	const request = axios.get(url)
	return request.then(response => response.data)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

export default { get, create, update, remove }
