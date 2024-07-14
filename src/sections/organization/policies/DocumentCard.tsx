import { useState, type FC } from 'react'

// mui imports
import { Box, Card, CardContent, Stack, SvgIcon, Tooltip, Typography } from '@mui/material'
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock'

// local imports
import { SeverityPill } from '@components/severity-pill'
import { Document, PolicyStatus } from 'type/policies'
import { formatTime } from '@utils/times'
import { handlePolicyDrawerOpen } from '@redux/features/policiesSlice'
import { useAppDispatch } from '@redux/hooks'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

interface DocumentCardProps {
	document: Document
}

export const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
	const { t } = useTranslation()

	const dispatch = useAppDispatch()

	console.log('document', document)
	return (
		<>
			<Card
				onClick={() =>
					dispatch(handlePolicyDrawerOpen({ variant: 'details', payload: { id: document.id } }))
				}
				sx={{
					boxShadow: 'none !important',
					border: '1px solid #EAECF0',
					m: 1,
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
						src={document.icon}
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
							<Tooltip title={document.title}>
								<Typography
									sx={{
										color: '#111927',
										fontWeight: 600,
										fontSize: 16,
										textWrap: 'nowrap',
										overflow: 'hidden',
										maxWidth: '240px',
										textOverflow: 'ellipsis',
									}}
								>
									{document.title}
								</Typography>
							</Tooltip>
							<Tooltip title={document.summary}>
								<Typography
									sx={{
										color: '#6C737F',
										fontWeight: 400, // Corrected property name from 'fontweight' to 'fontWeight'
										lineHeight: '21px',
										fontSize: 14,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										display: '-webkit-box',
										WebkitLineClamp: 2, // Limit the text block to two lines
										WebkitBoxOrient: 'vertical',
										maxHeight: '42px', // Double the lineHeight to limit to 2 lines (21px * 2)
									}}
								>
									{document.summary}
								</Typography>
							</Tooltip>
						</Stack>

						<Box>
							{document.status === PolicyStatus.Draft ? (
								<SeverityPill
									color="info"
									sx={{ fontSize: { xs: '12px', sm: 'inherit' } }}
								>
									{t(tokens.policy.draft_pill)}
								</SeverityPill>
							) : (
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
										{formatTime(document.updated_at, 'YYY MMM dd, h:mm a')}
									</Typography>
								</Stack>
							)}
						</Box>
					</Stack>
				</CardContent>
			</Card>
		</>
	)
}
