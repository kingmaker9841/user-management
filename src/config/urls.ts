import { FILESTACKAPIKEY } from './constants'

const baseURL = 'https://640e9399cde47f68db32cce7.mockapi.io/api/v1'
const fileStackBaseURL = 'https://www.filestackapi.com/api/store/S3'
const employeeURL = `${baseURL}/employee`
const teamsURL = `${baseURL}/team`
const fileStackURL = `${fileStackBaseURL}?key=${FILESTACKAPIKEY}`

export { employeeURL, teamsURL, baseURL, fileStackURL }
