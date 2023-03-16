import { useTheme } from '@mui/material/styles'
import { Select, Box, MenuItem } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import {
  CustomizedFormControl,
  BootstrapInput,
  getStyles,
  MenuProps
} from './MultiSelect'
import type { SelectChangeEvent } from '@mui/material'
import type { CSSProperties } from 'react'
interface OptionProps {
  label: string
  value: string
}

interface SelectProps {
  value?: string
  options: OptionProps[]
  placeholder?: string
  // eslint-disable-next-line autofix/no-unused-vars
  handleChange: (e: SelectChangeEvent<OptionProps | string>) => void
  label?: string
  style?: CSSProperties
}

const SingleSelect = (props: SelectProps) => {
  const { options, value, placeholder, handleChange, label, style } = props
  const theme = useTheme()
  const [name, setSelectedName] = React.useState('')
  const [menuItem, setMenuItem] = React.useState([{ label: '', value: '' }])
  React.useEffect(() => {
    if (value) {
      setSelectedName(value)
    }
    if (Array.isArray(options) && options.length) {
      setMenuItem(options)
    }
  }, [options, value])
  return (
    <Box style={style}>
      {label ? (
        <Box marginBottom={2}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              color: theme.typography.subtitle2.color
            }}>
            {label}
          </Typography>
        </Box>
      ) : null}
      <CustomizedFormControl
        inputBgColor="dark"
        width="100%"
        height="2rem"
        theme={theme}>
        <Select
          value={name}
          onChange={handleChange}
          size="small"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          input={<BootstrapInput />}
          MenuProps={MenuProps}>
          <MenuItem
            value=""
            style={{ fontSize: theme.typography.subtitle1.fontSize }}>
            {placeholder || ''}
          </MenuItem>
          {menuItem &&
            menuItem.map(
              (
                menu: { label: string; value: string | number },
                idx: number
              ) => (
                <MenuItem
                  value={menu.value}
                  key={idx}
                  style={getStyles(menu.label, name, theme)}>
                  {menu.label}
                </MenuItem>
              )
            )}
        </Select>
      </CustomizedFormControl>
    </Box>
  )
}

export default SingleSelect
