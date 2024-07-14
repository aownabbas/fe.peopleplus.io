import { useState, type FC } from 'react'
import PropTypes from 'prop-types'
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

import { RouterLink } from '@components/router-link'
import SideDrawer from './DocumentCardDrawer'
import { SeverityPill } from '@components/severity-pill'
// import { paths } from 'src/paths'

interface Document {
	id: string
	title: string
	media?: string
	description: string
	lastUpdated: string
}

interface DocumentCardProps {
	document: Document
}

export const DocumentCard: FC<DocumentCardProps> = (props) => {
	const { document } = props
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

	return (
		<>
			<Card
				onClick={toggleDrawer}
				sx={{
					boxShadow: 'none !important',
					border: '1px solid #EAECF0',
					margin: 1,
					cursor: 'pointer',
					transition: 'transform 0.1s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition for zoom and shadow
					'&:hover': {
						transform: 'scale(1.03)', // Slightly zoom in
						boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // More prominent shadow on hover
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: '#F8F9FA',
						height: '97px',
					}}
				>
					<img
						src={document.media}
						style={{ height: '56px', width: '56px' }}
					/>
				</Box>

				<CardContent
					sx={{
						p: '24px',
						height: '170px',
					}}
				>
					<Stack spacing={3}>
						<Stack spacing={1}>
							<Typography
								sx={{
									color: '#111927',
									fontWeight: 600,
									fontSize: 16,
								}}
							>
								{document.title}
							</Typography>
							<Typography
								sx={{
									color: '#6C737F',
									fontweight: 400,
									lineHeight: '21px',
									fontSize: 14,
								}}
							>
								{document.description}
							</Typography>
						</Stack>

						<Stack
							alignItems="center"
							direction="row"
							spacing={1}
						>
							<SvgIcon>
								<ClockIcon
									style={{
										color: '#6C737F',
									}}
								/>
							</SvgIcon>
							<Typography
								sx={{
									color: '#6C737F',
									fontWeight: 500,
									fontSize: 12,
									lineHeight: '19px',
								}}
							>
								{document.lastUpdated}
							</Typography>
						</Stack>
					</Stack>
				</CardContent>
			</Card>
			<SideDrawer
				isOpen={isDrawerOpen}
				toggleDrawer={toggleDrawer}
			/>
		</>
	)
}

DocumentCard.propTypes = {
	// @ts-ignore
	document: PropTypes.object.isRequired,
}
