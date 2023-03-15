import axios from 'axios'

const serverCall = axios.create({
  baseURL: `https://640e9399cde47f68db32cce7.mockapi.io/api/v1`
})

serverCall.defaults.timeout = 30000

export { serverCall }
