/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable autofix/no-unused-vars */
import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import MultiSelectComponent from '../../form/select/MultiSelect1'
import Grid from '@mui/material/Grid'
import InputWithEndAdornment from '../../form/input/InputWithEndAdornment'
import { grey } from '@mui/material/colors'
import { getAllEmployees } from '../../../helpers/manageUsers'
import type { EmployeeSelectProps, EmployeeProps } from '../../../ts/interfaces'

export interface MembersProps {
  totalManHours: string | number
  onManHourChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  getSelected: any
  members?: string[]
  getManHour: (val: string) => void
  currentTeam: string | undefined
}

const Members = ({
  totalManHours,
  onManHourChange,
  getSelected,
  members,
  getManHour,
  currentTeam
}: MembersProps) => {
  const theme = useTheme()
  const [employee, setEmployee] = React.useState([] as EmployeeSelectProps[])
  const [manHour, setManHour] = React.useState<string | number>('')
  const [employees, setEmployees] = React.useState<EmployeeProps[]>([])

  React.useEffect(() => {
    const getEmployees = async () => {
      const emp = await getAllEmployees()
      if (Array.isArray(emp) && emp.length) {
        setEmployees(emp)
      }
    }
    getEmployees()
  }, [])

  React.useEffect(() => {
    if (Array.isArray(employees) && employees.length) {
      const newArr = [] as EmployeeSelectProps[]
      employees.map((item) =>
        newArr.push({
          checkBoxLabel: item?.firstName + ' ' + item?.lastName,
          checkBoxSubtitle: item.designation ?? '',
          rightSideText: !item.teamName ? 'Available' : 'Not Available',
          value: item?.firstName + ' ' + item?.lastName,
          id: item.id ?? '',
          label: item?.firstName + ' ' + item?.lastName,
          disableSelect: !item.teamName
            ? false
            : currentTeam === item.teamName
            ? false
            : true
        })
      )
      setEmployee(newArr)
    }
  }, [employees])

  React.useEffect(() => {
    if (totalManHours) setManHour(totalManHours)
  }, [totalManHours])

  const getSelectedEmployee = (users: any) => {
    getSelected(users)
    if (Array.isArray(employees) && employees.length) {
      let individualTime = 0
      employees.map((employee: EmployeeProps) =>
        users.forEach((id: string) => {
          if (id === employee?.id) {
            let billHour = employee.billableHours
            if (billHour) {
              billHour = billHour.toString()
              individualTime += parseInt(billHour)
            }
          }
        })
      )
      setManHour(individualTime.toString())
      getManHour(individualTime.toString())
    }
  }

  return (
    <>
      <Grid container spacing={4} sx={{ marginY: theme.typography.pxToRem(0) }}>
        <Grid item xs={2}>
          <Typography variant="body2" textAlign={'right'}>
            Members
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MultiSelectComponent
                names={employee}
                inputBgColor="dark"
                label="Team Members"
                placeholder="Select Team"
                getSelected={getSelectedEmployee}
                members={members}
              />
            </Grid>

            <Grid item xs={4} />

            <Grid item xs={4}>
              <Box marginTop={2}>
                <InputWithEndAdornment
                  placeholder="Billable Hours"
                  label="Billable Hours"
                  endAdornmentValue="Hours"
                  endAdornmentBgColor={theme.palette.primary.main}
                  value={manHour}
                  onChange={onManHourChange}
                  readOnly={true}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider
            sx={{
              borderWidth: '2px',
              borderColor: grey[300],
              marginY: '26px'
            }}
            orientation="horizontal"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Members
