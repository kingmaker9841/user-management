/* eslint-disable autofix/no-unused-vars */
import { Row as EmpRow } from '../data/table/employees/rows'
import { Columns as EmpCol } from '../data/table/employees/columns'
import { Row as TeamRow } from '../data/table/teams/rows'
import { Column as TeamCol } from '../data/table/teams/columns'
import { lsSet } from '../utils/localStorateAction'
import Teams from '../mockData/teams.json'
import Employees from '../mockData/employee.json'
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
  lsSet(Store.teams, JSON.stringify(Teams))
  lsSet(Store.employees, JSON.stringify(Employees))
}

export { setStorageData }
