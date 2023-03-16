/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable autofix/no-unused-vars */
import type { Theme } from '@mui/material/styles'

export interface BootstrapFormProps {
  inputBgColor?: string
  formPaddingX?: string | number
  formPaddingY?: string | number
}

export interface BootstrapFormControlProps extends BootstrapFormProps {
  theme: Theme
}

export interface FormControlProps extends BootstrapFormControlProps {
  width?: string | number
  height?: string | number
  children?: React.ReactNode
}

export interface MultiSelectComponentProps extends BootstrapFormControlProps {
  names?: string[]
  id: string | number
  label: string
  placeholder?: string
}

export interface WorkingHoursProps {
  startsAt?: string | number
  endsAt?: string | number
  handleStartsAtChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  handleEndsAtChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
}

export interface JobsProps {
  designation?: string
  handleTeamChange?: any
  selectedTeam?: string
  teams?: any
  handleDesignationChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  teamName?: string
}

export interface BillableInformationProps {
  billableHours?: string | number
  handleBillableHoursChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export interface EmployeeProps
  extends WorkingHoursProps,
    JobsProps,
    BillableInformationProps {
  firstName?: string
  lastName?: string
  surname?: string
  birthDate?: string | number
  gender?: string
  address?: string
  phoneNumber?: string | number
  emailAddress?: string
  image?: string
  team?: string | string[] | null
  fullName?: string
  currentTeam?: string
  empTeamName?: string
  employeeId?: string | number
  id?: string
  startDate?: string | number
  role?: string
  billableStatus?: string
}

export interface AddEmployeeProps extends EmployeeProps {
  mode?: string
}

export interface TeamsProps {
  teamName: string | undefined
  teamPassword: string | undefined
  totalManHours: string | number
  teamMembers?: EmployeeProps[]
  members?: EmployeeProps[]
  id?: string | number
  billableHours?: string | number
}

export interface EmployeeSelectProps {
  checkBoxLabel: string
  checkBoxSubtitle: string
  rightSideText: string
  value: string
  id: string
  label: string
  disableSelect: boolean
}

export interface MultiSelect1ComponentProps extends BootstrapFormProps {
  members?: React.SetStateAction<string[]>
  getSelected?: (value: string[] | string) => void
  id?: string | number
  label: string
  placeholder?: string
  names: EmployeeSelectProps[]
}

export interface BasicInformationProps {
  firstName: string
  lastName: string
  surname: string
  birthDate: string | number
  gender: string
  address: string
  phoneNumber: string | number
  emailAddress: string
  handleFirstNameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleLastNameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleSurnameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleBirthDateChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleGenderChange: any
  handleAddressChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handlePhoneNumberChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleEmailAddressChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}
