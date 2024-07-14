import type { FC } from 'react'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import FilePlus02Icon from '@untitled-ui/icons-react/build/esm/FilePlus02'
import UserPlus02Icon from '@untitled-ui/icons-react/build/esm/UserPlus02'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

export const PolicyFind: FC = () => {
	const { t } = useTranslation()

	const theme = useTheme()
	const isMdScreen = useMediaQuery(theme.breakpoints.up('md'))
	return (
		<Card
			sx={{
				boxShadow: 'none !important',
				border: '1px solid #EAECF0',
				height: 'auto',

				mt: 2,
				'@media (min-width: 1440px)': {
					ml: 2,
					mt: 0,
				},
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
						// alignItems: isMdScreen ? 'start' : 'center',
						gap: 2,
						justifyContent: 'space-between',
						display: isMdScreen ? 'flex' : 'flex',
						flexDirection: isMdScreen ? 'row' : 'column',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'start',
							gap: 2,
						}}
					>
						<Box>
							<img
								src="/files.png"
								style={{
									width: '24px',
									height: '24px',
								}}
							/>
						</Box>

						<Stack>
							<Typography
								sx={{
									color: '#111927',
									fontWeight: 500,
									fontSize: 15,
								}}
							>
								{t(tokens.policy.policy_find.template_sec.heading)}
							</Typography>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 400,
									color: '#6C737F',
								}}
							>
								{t(tokens.policy.policy_find.template_sec.text)}
							</Typography>
							<Box sx={{ mt: 2 }}>
								<Button
									// color="info"
									endIcon={<ChevronRightIcon />}
									size="small"
									variant="gradient"
									onClick={() => window.open('https://peopleplus.io/document-template', '_blank')}
									sx={{
										fontSize: 13,
									}}
								>
									{t(tokens.policy.policy_find.template_sec.browse_btn)}
								</Button>
							</Box>
						</Stack>
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'start',
							gap: 2,
						}}
					>
						<Box>
							<img
								src="/userplus.png"
								style={{
									width: '24px',
									height: '24px',
								}}
							/>
						</Box>

						<Stack>
							<Typography
								sx={{
									color: '#111927',
									fontWeight: 500,
									fontSize: 15,
								}}
							>
								{t(tokens.policy.policy_find.need_help.heading)}
							</Typography>
							<Typography
								sx={{
									fontSize: 13,
									fontWeight: 400,
									color: '#6C737F',
								}}
							>
								{t(tokens.policy.policy_find.need_help.text)}
							</Typography>
							<Box sx={{ mt: 2 }}>
								<Button
									endIcon={<ChevronRightIcon />}
									size="small"
									onClick={() => window.open('https://peopleplus.io/support', '_blank')}
									sx={{
										backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
										color: '#164C63',
										fontSize: 13,
									}}
								>
									{t(tokens.policy.policy_find.need_help.support_btn)}
								</Button>
							</Box>
						</Stack>
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}
