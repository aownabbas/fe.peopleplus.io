import { FC, useMemo } from 'react'
import type { ApexOptions } from 'apexcharts'

import { Box, Card, CardContent, Typography, useMediaQuery, useTheme, Stack } from '@mui/material'
import { Chart } from '@components/chart'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

interface ChartSeries {
	data: number[]
}

interface DocumentsRecordProps {
	published: number
	total: number
}

const useChartOptions = (published: number, remaining: number): ApexOptions => {
	const theme = useTheme()

	return useMemo(
		() => ({
			series: [published, remaining],
			chart: {
				type: 'radialBar',
				background: 'transparent',
				redrawOnParentResize: false,
				redrawOnWindowResize: false,
			},
			plotOptions: {
				radialBar: {
					dataLabels: {
						name: {
							show: true,
							offsetY: -5,
						},
						value: {
							formatter: (val) => `${published}`,
							color: '#101828',
							fontSize: '28px',
							fontWeight: 600,
							offsetY: -50,
						},
					},
					endAngle: 90,
					hollow: { size: '60%' },
					startAngle: -90,
					track: {
						background:
							theme.palette.mode === 'dark'
								? theme.palette.primary.dark
								: theme.palette.primary.light,
						strokeWidth: '100%',
					},
				},
			},
			labels: ['Published', 'Remaining'],
			colors: ['#357DBC'],
			fill: {
				opacity: 1,
				type: 'solid',
			},
			grid: {
				padding: {
					bottom: 0,
					left: 0,
					right: 0,
					top: 0,
				},
			},
			stroke: {
				lineCap: 'round',
			},
			theme: {
				mode: theme.palette.mode,
			},
		}),
		[published, remaining, theme],
	)
}

const DocumentsRecord: FC<DocumentsRecordProps> = ({ published, total }) => {
	const { t } = useTranslation()
	const remaining = total - published
	const chartOptions = useChartOptions(published, remaining)
	const currentProgress = (published * 100) / total
	const chartSeries: ChartSeries = { data: [currentProgress] }

	const theme = useTheme()
	const isMdScreen = useMediaQuery(theme.breakpoints.up('md'))

	let heading = ''
	let text = ''

	if (published === 0 && remaining === 0) {
		heading = t(tokens.policy.documents_record.get_started.heading)
		text = t(tokens.policy.documents_record.get_started.text)
	} else if (remaining > 0) {
		heading = `${t(tokens.policy.documents_record.pending_drafts.heading)} ${remaining} ${t(tokens.policy.documents_record.pending_drafts.heading_including)}`
		text = t(tokens.policy.documents_record.pending_drafts.text)
	} else if (published > 0 && remaining === 0) {
		heading = t(tokens.policy.documents_record.all_published.heading)
		text = t(tokens.policy.documents_record.all_published.text)
	}

	return (
		<Card
			sx={{
				boxShadow: 'none !important',
				border: '1px solid #EAECF0',
				height: 'auto',
				'@media (min-width: 900px)': {
					height: '200px',
				},
			}}
		>
			<CardContent
				sx={{
					py: '36px',
					px: '24px',
				}}
			>
				<Box
					sx={{
						display: isMdScreen ? 'flex' : 'flex',
						flexDirection: isMdScreen ? 'row' : 'column',
						alignItems: 'center',
						gap: 4,
					}}
				>
					<Box
						sx={{
							mx: -4,
							my: -6,
						}}
					>
						<Chart
							sx={{ mt: '20px' }}
							width={260}
							height={260}
							options={chartOptions}
							series={chartSeries.data}
							type="radialBar"
						/>
					</Box>
					<Stack
						spacing={1}
						sx={{ mt: 2 }}
					>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 700,
								lineHeight: '21px',
								fontSize: 18,
							}}
						>
							{heading}
						</Typography>
						<Typography
							sx={{
								color: '#6C737F',
								fontWeight: 400,
								lineHeight: '21px',
								fontSize: 14,
							}}
						>
							{text}
						</Typography>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	)
}

export default DocumentsRecord
