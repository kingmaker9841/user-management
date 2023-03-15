/* eslint-disable autofix/no-unused-vars */
import { Row as EmpRow } from '../data/table/employees/rows'
import { Columns as EmpCol } from '../data/table/employees/columns'
import { Row as TeamRow } from '../data/table/teams/rows'
import { Column as TeamCol } from '../data/table/teams/columns'
import { lsSet } from '../utils/localStorateAction'
import { Team } from '../mockData/teams'
import { Employee } from '../mockData/employee'
enum Store {
  teamRow = 'teamRow',
  teamCol = 'teamCol',
  empRow = 'employeeRow',
  empCol = 'employeeCol',
  teams = 'teams',
  employees = 'employees'
}
const setStorageData = () => {
  // lsSet(Store.teamRow, JSON.stringify(TeamRow))
  // lsSet(Store.teamCol, JSON.stringify(TeamCol))
  // lsSet(Store.empRow, JSON.stringify(EmpRow))
  // lsSet(Store.empCol, JSON.stringify(EmpCol))
  lsSet(Store.teams, JSON.stringify(Team))
  lsSet(Store.employees, JSON.stringify(Employee))
}

export { setStorageData }
