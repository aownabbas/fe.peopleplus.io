import type { FC } from 'react'

// mui imports
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'

// local imports
import { FeedbackTabsSection } from './feedback'
import { useAppSelector } from '@redux/hooks'
import { assetsSelector } from '@redux/features/assetsSlice'
import { SeverityPill } from '@components/severity-pill'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

const FeedbackDetail: FC = () => {
	const { asset } = useAppSelector(assetsSelector)

	const assetImages = asset.asset_images || []

	return (
		<Grid
			item
			xs={12}
			md={8}
		>
			<Box
				sx={{
					mr: 0,
					mb: '32px',
					'@media (min-width: 900px)': {
						mr: '32px',
						mb: 0,
					},
				}}
			>
				<Card
					sx={{
						boxShadow: 'none !important',
						border: '1px solid #EAECF0',
						padding: '20px',
					}}
				>
					<Stack spacing={2}>
						<Box
							sx={{
								flexWrap: 'wrap',
								gap: '24px',
								justifyContent: 'center',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							{assetImages.map((image: any, index: number) => (
								<a
									href={image.url}
									target="_blank"
									rel="noopener noreferrer"
									key={index}
								>
									<img
										alt={`Asset Image ${index}`}
										src={image.url}
										style={{
											width: '236px',
											height: '187px',
											objectFit: 'cover',
											borderRadius: 10,
										}}
									/>
								</a>
							))}
						</Box>

						<Box>
							<FeedbackTabsSection />
						</Box>
					</Stack>
				</Card>
			</Box>
		</Grid>
	)
}

export default FeedbackDetail
