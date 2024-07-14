import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import styled from 'styled-components'
import { FormHelperText } from '@mui/material'

interface PhoneNumberInputProps {
	control: Control<any>
	name: string
	errors: FieldErrors
	isAddMode: boolean
	placeholder: string // Add placeholder prop
}

const StyledPhoneInput = styled.div`
	.react-tel-input {
		width: 100%;

		.form-control {
			width: 100%;
			height: 55px;
			border-radius: 8px;
			border: 1px solid #e5e7eb;
			padding-left: 60px;
		}

		.form-control:focus {
			outline: none;
			box-shadow: 0 0 0 3px #2970ff; /* This adds the blue ring */
			border-color: #2970ff; /* This is the default MUI primary color */
		}

		.flag-dropdown {
			border-radius: 8px 0 0 8px;
			border: 1px solid #e5e7eb;
			padding: 3px;
		}
	}
`

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
	control,
	name,
	errors,
	isAddMode,
	placeholder, // Destructure placeholder from props
}) => {
	const { t } = useTranslation()

	return (
		<Controller
			name={name}
			control={control}
			// rules={{
			// required: 'Phone number is required',
			// value: 10,
			// }}
			render={({ field }) => (
				<StyledPhoneInput>
					<PhoneInput
						{...field}
						country={'pk'} // set default country
						enableSearch={true}
						inputProps={{
							name: name,
							required: false,
							autoFocus: false,
						}}
						inputStyle={{
							width: '100%',
							height: '100%%',
							border: '1px solid #e5e7eb',
						}}
						containerStyle={{
							marginBottom: errors[name] ? '0.5rem' : '0',
						}}
						placeholder={placeholder} // Use the placeholder prop here
						specialLabel={t(tokens.employee.create_employee.form.contact_info.number.label)}
						isValid={errors[name] ? false : true}
					/>
					{!!errors[name] && (
						<FormHelperText sx={{ color: 'red' }}>{String(errors[name]?.message)}</FormHelperText>
					)}
				</StyledPhoneInput>
			)}
		/>
	)
}

export default PhoneNumberInput
