import React from 'react'
import { FormControl, TextField, Box, Chip, MenuItem, FormHelperText } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import CustomOptionItem from './CustomOptionItem'

interface Option {
	label: string
	value: string
	photo?: string
	job_title?: string
}

interface InputChipSelectorProps {
	label: string
	placeholder: string
	options: Option[]
	name: string
}

const InputChipSelector: React.FC<InputChipSelectorProps> = ({
	label,
	placeholder,
	name,
	options = [],
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={[]}
			render={({ field }) => (
				<FormControl
					sx={{ width: '100%' }}
					error={!!errors[name]}
				>
					<TextField
						label={label}
						placeholder={placeholder}
						id={`${label}-chip`}
						select
						SelectProps={{
							multiple: true,
							value: field.value,
							onChange: field.onChange,
							renderValue: (selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{(selected as string[])?.map((item: string) => {
										const option = options?.find((opt) => opt?.value === item)
										return (
											<Chip
												key={item}
												label={option?.label}
											/>
										)
									})}
								</Box>
							),
						}}
					>
						{options.length > 0 ? (
							options?.map((option) => (
								<MenuItem
									// {...props}
									key={option.value}
									value={option.value}
								>
									{option.photo && option.job_title ? (
										<CustomOptionItem option={option} />
									) : (
										option.label
									)}
								</MenuItem>
							))
						) : (
							<MenuItem disabled>No Record Found</MenuItem>
						)}
					</TextField>
					{!!errors[name] && <FormHelperText>{String(errors[name]?.message)}</FormHelperText>}
				</FormControl>
			)}
		/>
	)
}

export default InputChipSelector
