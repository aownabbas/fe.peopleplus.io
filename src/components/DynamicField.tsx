import { Grid, Container, TextField } from '@mui/material'
import { useFormik } from 'formik'

interface DynamicFieldProps {
	index: number
}

const DynamicField = ({ index }: DynamicFieldProps) => {
	const formik = useFormik({
		initialValues: {
			assetName: '',
			assetIdTag: '',
		},
		onSubmit: (values) => {
			// Handle form submission if needed
		},
	})

	return (
		<Container maxWidth="xl">
			<Grid
				container
				spacing={2}
			>
				{/* field Name */}
				<Grid
					item
					xs={4}
				>
					<TextField
						fullWidth
						label="Field Name"
						name={`assetName-${index}`}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						// @ts-ignore
						value={formik.values[`assetName-${index}`]}
					/>
				</Grid>

				{/* field value */}
				<Grid
					item
					xs={8}
				>
					<TextField
						fullWidth
						label="Field Value"
						name={`assetIdTag-${index}`}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						// @ts-ignore
						value={formik.values[`assetIdTag-${index}`]}
					/>
				</Grid>
			</Grid>
		</Container>
	)
}

export default DynamicField
