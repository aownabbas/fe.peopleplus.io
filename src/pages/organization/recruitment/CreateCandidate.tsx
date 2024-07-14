import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'
import AddCandidateForm from '@sections/organization/recruitment/AddCandidateForm'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJobAction } from '@redux/features/recruitmentSlice'
import { pipelineStagesListAction, settingsSelector } from '@redux/features/settingsSlice'
import Loading from '@components/Loading'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

const CreateCandidate = () => {
	const { uuid } = useParams()
	const dispatch = useAppDispatch()
	const { status } = useAppSelector(settingsSelector)

	useEffect(() => {
		if (uuid) {
			Promise.all([dispatch(getJobAction(uuid)), dispatch(pipelineStagesListAction())])
		}
		return () => {}
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.recruitment.candidate_listing)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Typography
					sx={{
						fontSize: '24px',
						fontWeight: 600,
						color: '#111927',

						'@media (min-width:600px)': {
							fontSize: '32px',
							fontWeight: 700,
						},
					}}
				>
					{status === 'LOADING' ? <Loading /> : <AddCandidateForm />}
				</Typography>
			</Box>
		</>
	)
}

export default CreateCandidate
