import PolicyCard from '@components/Skeletons/PolicyCard'
import { Grid, Box } from '@mui/material'

function ViewDraft() {
	const policyCards = Array(6).fill(null) // Create an array with 6 elements

	return (
		<Box sx={{ flexGrow: 1, padding: 2 }}>
			<Grid
				container
				spacing={2}
			>
				{policyCards.map((_, index) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						key={index}
					>
						<PolicyCard />
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default ViewDraft
