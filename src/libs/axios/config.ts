import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com/products/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
