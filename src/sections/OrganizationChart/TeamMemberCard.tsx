import React from 'react'
import { Card, CardContent, Typography, Avatar, IconButton, Box, Tooltip } from '@mui/material'
import ExpandMoreIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import { Subordinate } from 'type/organizationalChart'
import { Link } from 'react-router-dom'
import { urlPreFix } from '@config/index'

interface TeamMemberCardProps {
	name: string
	uuid: string
	subordinates: Subordinate[] | undefined
	title: string
	imageSrc: string
	toggleSubChart: () => void
	expanded: boolean
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
	name,
	uuid,
	subordinates,
	title,
	imageSrc,
	toggleSubChart,
	expanded,
}) => {
	return (
		<Card
			sx={{
				position: 'relative',
				width: 280,
				height: '140px',
				mb: 2,
				overflow: 'visible',
				boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
			}}
		>
			<CardContent sx={{ textAlign: 'center', p: 2 }}>
				<Avatar
					src={imageSrc}
					sx={{
						width: 48,
						height: 48,
						position: 'absolute',
						top: -24,
						left: 'calc(50% - 24px)',
						border: '1px solid  #357DBC',
						objectFit: 'cover',
					}}
				/>

				<Tooltip title={name}>
					<Link
						style={{
							textDecoration: 'none',
						}}
						to={`/${urlPreFix.employee}/profile/${uuid}`}
					>
						<Typography
							sx={{
								mt: 3,
								fontWeight: 500,
								fontSize: 14,
								lineHeight: '22px',
								color: '#111927',
								textDecoration: 'none',
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '300px',
								textOverflow: 'ellipsis',
							}}
						>
							{name}
						</Typography>
					</Link>
				</Tooltip>

				<Tooltip title={title}>
					<Typography
						sx={{
							fontWeight: 400,
							fontSize: 14,
							lineHeight: '22px',
							color: '#6C737F',
							textDecoration: 'none',
							textWrap: 'nowrap',
							overflow: 'hidden',
							maxWidth: '300px',
							textOverflow: 'ellipsis',
						}}
					>
						{title}
					</Typography>
				</Tooltip>

				<Box
					sx={{
						width: '100%',
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{subordinates && subordinates.length > 0 && (
						<Box
							onClick={toggleSubChart}
							sx={{
								border: '1px solid #f4f4f4',
								display: 'flex',
								p: 1,
								alignItems: 'center',
								backgroundColor: 'white',
								borderRadius: '100%',
								cursor: 'pointer',
							}}
						>
							<Typography
								sx={{
									color: '#6C737F',
								}}
							>
								{subordinates ? subordinates.length : 0}
							</Typography>

							<ExpandMoreIcon
								style={{
									transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
									transition: 'transform 0.3s',
									width: '20px',
									height: '20px',
									color: '#6C737F',
								}}
							/>
						</Box>
					)}
				</Box>
			</CardContent>
		</Card>
	)
}

export default TeamMemberCard
