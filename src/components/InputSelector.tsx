import {
	Autocomplete,
	TextField,
	MenuItem,
	AutocompleteRenderInputParams,
	TextFieldProps,
} from '@mui/material'
import { FC } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import CustomOptionItem from './CustomOptionItem'

interface Option {
	label: string
	value: string
	photo?: string
	job_title?: string
}

interface InputSelectorProps {
	options: Option[]
	name: any
	helperText?: any
	rules?: RegisterOptions
	defaultValue?: any
	mainProps: TextFieldProps // Use TextFieldProps here as a nested object
	searchable?: boolean // New prop to determine if the input should be searchable
	onChange?: any
}

const InputSelector: FC<InputSelectorProps> = ({
	name,
	helperText,
	options = [],
	rules,
	defaultValue,
	onChange,
	searchable = false, // Default to false
	...mainProps
}) => {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field, fieldState: { error } }) =>
				searchable ? (
					<Autocomplete
						autoHighlight
						options={options}
						getOptionLabel={(option: Option) => option.label}
						renderOption={(props, option: Option) => {
							return (
								<MenuItem
									{...props}
									key={option.value}
									value={option.value}
								>
									{option.photo && option.job_title ? (
										<CustomOptionItem option={option} />
									) : (
										option.label // Render regular label if 'photo' key does not exist
									)}
								</MenuItem>
							)
						}}
						renderInput={(params: AutocompleteRenderInputParams) => (
							<TextField
								{...params}
								{...field}
								{...mainProps.mainProps}
								error={!!error}
								// helperText={error?.message}
								helperText={helperText ? helperText : error?.message}
								select={false}
								fullWidth
								margin="dense"
								sx={{ mt: 0 }}
								onChange={(event) => {
									field.onChange(event)
									if (onChange) onChange(event.target.value)
								}}
							/>
						)}
						onInputChange={(_, value, reason) => {
							if (reason === 'clear' || value === '') {
								field.onChange('')
							}
						}}
						onChange={(_, data) => {
							if (data) {
								field.onChange(data.value)
							}
						}}
						value={options.find((option) => option.value === field.value) ?? null}
						// isOptionEqualToValue={(option, value) => option.value === value.value}
					/>
				) : (
					<TextField
						sx={{ mt: 0, height: '55px' }}
						{...field}
						{...mainProps.mainProps}
						error={!!error}
						helperText={error?.message}
						select
						fullWidth
						margin="dense"
					>
						{options.length > 0 ? (
							options.map((option: Option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.photo && option.job_title ? (
										<CustomOptionItem option={option} />
									) : (
										option.label // Render regular label if 'photo' key does not exist
									)}
								</MenuItem>
							))
						) : (
							<MenuItem disabled>No Record Found</MenuItem>
						)}
					</TextField>
				)
			}
		/>
	)
}

export default InputSelector
