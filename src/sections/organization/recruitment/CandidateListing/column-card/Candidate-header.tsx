import type { FC } from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Chip } from '@mui/material'

interface CandidateHeaderProps {
	candidateName: string
	CandidateCount: number
	onRename?: (name: string) => void
}

export const CandidateHeader: FC<CandidateHeaderProps> = (props) => {
	const { candidateName, CandidateCount } = props
	const [nameCopy, setNameCopy] = useState<string>(candidateName)
	useEffect(() => {
		setNameCopy(candidateName)
	}, [candidateName])

	return (
		<>
			<Stack
				alignItems="center"
				direction="row"
				justifyContent="space-between"
				spacing={2}
				sx={{
					pr: 2,
					py: 1,
					background: 'white',
					borderRadius: '12px 12px 0px 0px',
				}}
			>
				<Typography
					sx={{
						// cursor: 'pointer',
						fontWeight: 500,
						overflow: 'hidden',
						px: 2,
						py: 1,
						fontSize: 14,
						color: '#357DBC',
					}}
				>
					{nameCopy}
				</Typography>

				<Stack
					alignItems="center"
					direction="row"
					spacing={2}
				>
					<Chip label={CandidateCount} />
				</Stack>
			</Stack>
		</>
	)
}

CandidateHeader.propTypes = {
	candidateName: PropTypes.string.isRequired,
	CandidateCount: PropTypes.number.isRequired,
}
