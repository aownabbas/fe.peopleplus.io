import { Link, useNavigate } from 'react-router-dom'

// mui imports
import { Box, Container, Stack, Typography, Button, SvgIcon } from '@mui/material'
import Arrow from '@untitled-ui/icons-react/build/esm/ArrowRight'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

const NavBar = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	const clickHandle = () => {
		navigate('/policies/drafts')
	}
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Box>
				<Typography
					sx={{
						fontSize: '18px',
						fontWeight: 600,
						color: '#111927',

						'@media (min-width:600px)': {
							fontWeight: 700,
						},
					}}
				>
					{t(tokens.policy.company_documents.heading.text)}
				</Typography>
			</Box>

			<Button
				onClick={clickHandle}
				variant="text"
				sx={{
					color: 'black',
					gap: 1,
				}}
				endIcon={
					<SvgIcon
						sx={{
							margin: '0px',
							width: '20px',
						}}
					>
						<Arrow />
					</SvgIcon>
				}
			>
				<Typography sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600, fontSize: 13 }}>
					{t(tokens.policy.company_documents.view_drafts_btn.full_btn)}
				</Typography>
				<Typography sx={{ display: { xs: 'block', md: 'none' }, fontWeight: 600, fontSize: 13 }}>
					{t(tokens.policy.company_documents.view_drafts_btn.short_btn)}
				</Typography>
			</Button>
		</Box>
	)
}

export default NavBar
