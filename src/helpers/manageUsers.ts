import { serverCall } from '..//lib/api'
import { teamsURL, employeeURL } from '../config/urls'

export const getAllTeams = async () => {
  try {
    const teams = await serverCall.get(teamsURL)
    return teams.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getAllEmployees = async () => {
  try {
    const employees = await serverCall.get(employeeURL)
    return employees.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getTeamById = async (id: string) => {
  try {
    const teams = await serverCall.get(`${teamsURL}/${id}`)
    return teams.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const updateTeam = async (data: any) => {
  try {
    const update = await serverCall.post(`${teamsURL}`, data)
    return update.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const updateEmployee = async (data: any) => {
  try {
    const update = await serverCall.post(`${employeeURL}`, data)
    return update.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const updateTeamById = async (id: string, data: any) => {
  try {
    const update = await serverCall.put(`${teamsURL}/${id}`, data)
    return update.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getEmployeeById = async (id: string) => {
  try {
    const teams = await serverCall.get(`${employeeURL}/${id}`)
    return teams.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const updateEmployeeById = async (id: string, data: any) => {
  try {
    const update = await serverCall.put(`${employeeURL}/${id}`, data)
    return update.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const deleteEmployeeById = async (id: string) => {
  try {
    const deleteEmp = await serverCall.delete(`${employeeURL}/${id}`)
    return deleteEmp.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const deleteTeamById = async (id: string) => {
  try {
    const deleteTeam = await serverCall.delete(`${teamsURL}/${id}`)
    return deleteTeam.data
  } catch (err) {
    console.error(err)
    return null
  }
}

export const uploadImage = async (file: any) => {
  try {
    const res = await serverCall.post(
      `https://www.filestackapi.com/api/store/S3?key=AzlEfNTMKTlqmpnCmjYZEz`,
      file,
      {
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`
        }
      }
    )
    return res.data
  } catch (err) {
    console.error(err)
    return null
  }
}
