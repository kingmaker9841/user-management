import React from 'react'

const AddTeam = React.lazy(() => import('../../pages/teams/AddTeam'))
const EditTeam = React.lazy(() => import('../../pages/teams/EditTeam'))
const AddEmployee = React.lazy(
  () => import('../../pages/employees/AddEmployee')
)
const EditEmployee = React.lazy(
  () => import('../../pages/employees/EditEmployee')
)
const ManageUsers = React.lazy(() => import('../../pages/manageUsers'))

export const routeList = [
  {
    name: 'Manage Users',
    path: '/',
    exact: true,
    component: ManageUsers,
    children: [
      {
        name: 'Teams',
        path: '/teams',
        exact: false,
        children: [
          {
            name: 'Add Team',
            path: '/teams/add-team',
            exact: true,
            component: AddTeam
          },
          {
            name: 'Edit Team',
            path: '/teams/edit-team',
            exact: true,
            component: EditTeam
          }
        ]
      },
      {
        name: 'Employees',
        path: '/employees',
        exact: false,
        children: [
          {
            name: 'Add Employee',
            path: '/employee/add-employee',
            exact: true,
            component: AddEmployee
          },
          {
            name: 'Edit Employee',
            path: '/employee/edit-employee',
            exact: true,
            component: EditEmployee
          }
        ]
      }
    ]
  }
]
