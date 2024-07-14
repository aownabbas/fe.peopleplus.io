import { FC, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// mui imports
import {
	Box,
	Button,
	ButtonGroup,
	MenuItem,
	Popover,
	SxProps,
	TextField,
	createTheme,
} from '@mui/material'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { updatePipelineStageRequest } from '@service/recruitment'
import { PipelineStageOptionsSelector, settingsSelector } from '@redux/features/settingsSlice'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

import type { Candidate, pipelineParam } from 'type/recruitment'
import type { STATUS } from 'type/config'
import { kanbanActions } from '@redux/features/kanbanSlice'
import { moveCandidateParams } from 'type/kanban'
import { usePopover } from '@hooks/use-popover'
import { width } from '@mui/system'

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

interface stage {
	label: string
	value: number
	uuid: string
	path: string
}

const PipelineStageDropdown: FC<{ candidate: Candidate; onClose?: () => void; sx?: SxProps }> = ({
	candidate,
	onClose,
	sx,
}) => {
	const [settings, setSettings] = useState<{ status: STATUS }>({ status: 'IDLE' })
	const PipelineStageOptions = useAppSelector(PipelineStageOptionsSelector)

	const dispatch = useAppDispatch()

	const { t } = useTranslation()
	const { job_detail } = tokens.recruitment
	const popover = usePopover<HTMLDivElement>()

	const {
		handleSubmit,
		control,
		formState: { errors, isDirty },
		watch,
		getValues,
		unregister,
	} = useForm<pipelineParam>({
		defaultValues: { candidate_id: candidate.uuid, pipeline_stage_id: candidate.stageId },
	})

	const onSubmit: SubmitHandler<pipelineParam> = async (values) => {
		// console.info(values)

		const destinationId: any = PipelineStageOptions.find(
			({ value }) => Number(value) === values.pipeline_stage_id,
		)

		try {
			setSettings({ ...settings, status: 'LOADING' })

			const dndData: moveCandidateParams = {
				candidateId: String(candidate.id),
				sourcePosition: 0,
				sourceId: candidate.columnId,
				destinationId: destinationId?.uuid,
				destinationPosition: 0,
				stageId: destinationId?.value,
			}

			// console.log(dndData)

			dispatch(kanbanActions.moveCandidateFromDropdown(dndData))

			await updatePipelineStageRequest(values)
			SHOW_SUCCESS({})
			if (onClose !== undefined) {
				onClose()
			}
		} catch (error) {
			console.error('Pipeline change ', error)
			setSettings({ ...settings, status: 'FAIL' })
			SHOW_ERROR({})
		} finally {
			setSettings({ ...settings, status: 'IDLE' })
		}
	}

	// const [selectedOption, setSelectedOption] = useState('')

	// const handleSelectOption = (optionLabel: string) => {
	// 	setSelectedOption(optionLabel)
	// 	popover.handleClose() // Assuming popover.handleClose correctly closes the Popover
	// }

	const dropdownValue = watch('pipeline_stage_id')

	useEffect(() => {
		// console.log('isDirty : ', isDirty)
		// console.log('dropdownValue : ', dropdownValue)

		// isDirty
		if (dropdownValue && isDirty) {
			handleSubmit(onSubmit)()
		}
		// return () => {
		// 	unregister('pipeline_stage_id')
		// }
	}, [dropdownValue])

	return (
		<Box
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
			sx={{ width: '300px' }}
		>
			{/* <ButtonGroup
				ref={popover.anchorRef}
				sx={{ background: 'black' }}
				size="small"
			>
				<Button sx={{ color: 'white' }}>
					{selectedOption ? `Move to ${selectedOption}` : 'Move To Interview'}
				</Button>
				<Button
					size="small"
					onClick={popover.handleToggle}
					sx={{
						background: 'black',
					}}
				>
					<ChevronDownIcon />
				</Button>
			</ButtonGroup> */}
			{/* <Popover
				anchorEl={popover.anchorRef.current}
				disableScrollLock
				onClose={popover.handleClose}
				open={popover.open}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top',
				}}
			>
				{PipelineStageOptions.map((option) => (
					<MenuItem
						key={option.value}
						onClick={() => handleSelectOption(option.label)} // Added click handler here
						value={option.value}
					>
						{option.label}
					</MenuItem>
				))}
			</Popover> */}

			<Controller
				name="pipeline_stage_id"
				control={control}
				defaultValue={candidate.stageId}
				render={({ field }) => (
					<TextField
						{...field}
						error={!!errors.pipeline_stage_id}
						helperText={errors.pipeline_stage_id?.message}
						label={t(job_detail.candidate.pipelineDropdown)}
						placeholder=""
						fullWidth
						select
					>
						{PipelineStageOptions.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				)}
			/>
		</Box>
	)
}

export default PipelineStageDropdown
