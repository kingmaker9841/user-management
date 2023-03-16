import type { SelectChangeEvent, Theme } from '@mui/material'
import { InputBase } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import { FormControl, Select, Box, Chip, MenuItem } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Typography from '@mui/material/Typography'
import type {
  FormControlProps,
  MultiSelectComponentProps
} from '../../../ts/interfaces'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export const CustomFormControl = styled(FormControl, {
  shouldForwardProp: (prop) =>
    prop !== 'inputBgColor' &&
    prop !== 'formPaddingX' &&
    prop !== 'formPaddingY' &&
    prop !== 'width' &&
    prop !== 'height'
})(
  ({
    inputBgColor,
    formPaddingX,
    formPaddingY,
    width,
    height,
    theme
  }: FormControlProps) => ({
    '&': {
      width: '100%'
    },
    '& .MuiInputBase-root': {
      borderRadius: 6,
      position: 'relative',
      height: height || 'auto',
      backgroundColor:
        inputBgColor === 'light'
          ? '#fcfcfb'
          : inputBgColor === 'dark'
          ? grey[100]
          : inputBgColor,
      border: '1px solid #ced4da',
      padding: `${formPaddingX ? formPaddingX : '1.5px'} ${
        formPaddingY ? formPaddingY : '8px'
      }`,
      width: width || '80%',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow'
      ]),
      '&:focus-within': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      },
      '&:hover': {
        borderColor: theme.palette.primary.light
      }
    },
    '&.MuiOutlinedInput-input:hover': {
      borderColor: theme.palette.primary.light
    }
  })
)

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },

  '& .MuiInputBase-input': {
    fontSize: theme.typography.subtitle2.fontSize,
    color: grey[700],
    fontWeight: 400
  }
}))

export function getStyles(
  name: string,
  selectedName: readonly string[] | string,
  theme: Theme
) {
  return {
    fontWeight:
      selectedName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    fontSize: theme.typography.subtitle1.fontSize
  }
}

const MultiSelectComponent = (props: MultiSelectComponentProps) => {
  const {
    names,
    inputBgColor,
    formPaddingX,
    formPaddingY,
    id,
    label,
    placeholder
  } = props
  const [selectedName, setselectedName] = React.useState<string[]>([])
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<typeof selectedName>) => {
    const {
      target: { value }
    } = event
    setselectedName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <>
      {label ? (
        <Box marginBottom={2}>
          <Typography variant="subtitle2">{label}</Typography>
        </Box>
      ) : null}
      <Box sx={{ border: '1px solid #ced4da', padding: '8px' }}>
        <CustomFormControl
          sx={{ m: 1, minWidth: 120 }}
          {...{ inputBgColor, formPaddingX, formPaddingY }}>
          <Select
            labelId={`${id}-multiple-chip-label`}
            id={`${id}-multiple-chip`}
            multiple
            value={selectedName}
            onChange={handleChange}
            placeholder={placeholder}
            input={<BootstrapInput id="select-multiple-chip" size="small" />}
            size="small"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    sx={{ fontSize: theme.typography.subtitle2.fontSize }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}>
            {names?.map((name: string) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectedName, theme)}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <Box marginY={2}>
            {selectedName?.map((value) => (
              <Chip
                key={value}
                label={value}
                sx={{
                  fontSize: theme.typography.subtitle2.fontSize,
                  fontWeight: 400
                }}
              />
            ))}
          </Box>
        </CustomFormControl>
      </Box>
    </>
  )
}

export default MultiSelectComponent
export const CustomizedFormControl = (props: FormControlProps) => (
  <CustomFormControl {...props} />
)
