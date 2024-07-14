import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '@redux/hooks'
import { candidateSelector } from '@redux/features/kanbanSlice'

import Rating from '@mui/material/Rating'
import { format } from 'date-fns'
import { Candidate } from 'type/recruitment'
import { createTheme } from '@mui/system'
import { Tooltip } from '@mui/material'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const useTask = (candidateId: string): Candidate | undefined => {
	const Candidates = useAppSelector(candidateSelector)
	if (!candidateId) {
		return undefined
	}
	return Candidates.byId[candidateId]
}
interface CandidateCardProps {
	candidateId: string
	dragging?: boolean
	onOpen?: () => void
}

const CandidateCard = forwardRef<HTMLDivElement, CandidateCardProps>(
	function CandidateCard(props, ref) {
		const { candidateId, dragging = true, onOpen, ...other } = props
		const Candidate = useTask(candidateId)

		if (!Candidate) {
			return null
		}

		return (
			<Card
				elevation={dragging ? 8 : 1}
				onClick={onOpen}
				ref={ref}
				sx={{
					backgroundColor: 'white',
					p: 3,
					userSelect: 'none',
					transition: 'background-color 0.3s', // Add transition for smoother effect
					'&:hover': {
						background: theme.palette.background.default,
						'& .MuiTypography-root': {
							// Assuming you are using Material-UI v5
							color: 'white',
						},
						'& .MuiChip-root': {
							color: 'white',
						},
					},
				}}
				{...other}
			>
				<Tooltip title={`${Candidate.first_name} ${Candidate.last_name}`}>
					<Typography
						sx={{
							color: '#111927',
							fontWeight: 600,
							fontSize: 16,
							textWrap: 'nowrap',
							overflow: 'hidden',
							maxWidth: '200px',
							textOverflow: 'ellipsis',
						}}
					>
						{`${Candidate.first_name} ${Candidate.last_name}`}
					</Typography>
				</Tooltip>

				<Divider sx={{ mt: 1 }} />
				<Stack
					alignItems="center"
					direction="row"
					justifyContent="space-between"
					spacing={2}
					sx={{ mt: 2, width: '100%' }}
				>
					{/* <Box sx={{ pt: 1 }}>
						<Rating
							name="half-rating-read"
							defaultValue={5}
							precision={0.5}
							readOnly
							size="small"
						/>
					</Box> */}
					<Box>
						<Chip
							size="small"
							label={format(new Date(Candidate.created_at), 'MMM dd, yyyy')}
							sx={{
								color: '#111927',
							}}
						/>
					</Box>
				</Stack>
			</Card>
		)
	},
)

export default CandidateCard

// @ts-ignore
CandidateCard.propTypes = {
	candidateId: PropTypes.string.isRequired,
	dragging: PropTypes.bool,
	onOpen: PropTypes.func,
}
