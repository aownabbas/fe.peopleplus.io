import { useCallback, useEffect, useState } from 'react'
import { DropResult, DragDropContext } from 'react-beautiful-dnd'

// mui imports
import { Box, Stack } from '@mui/material'

import { Seo } from '@components/seo'
import { CandidateModal } from '@sections/organization/recruitment/CandidateListing/Candidate-modal/Candidate-modal'
import { ColumnCard } from '@sections/organization/recruitment/CandidateListing/column-card'
import {
	columnsSelector,
	kanbanActions,
	kanbanSelector,
	prepareBoardAction,
} from '@redux/features/kanbanSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

import { dragDropCandidateRequest } from '@service/recruitment'
import { SHOW_ERROR } from '@utils/ToastMessage'
import Loading from '@components/Loading'
import { useLocation, useNavigate } from 'react-router-dom'
import { Candidate, Job } from 'type/recruitment'
import { PipelineStageOptionsSelector } from '@redux/features/settingsSlice'
import { Scrollbar } from '@components/scrollbar'
import { checkPoint } from '@utils/bug'
import { KanbanListingLoading } from '@loading/recruitment'

const CandidateListing = ({ candidateList }: { candidateList: Candidate[] }) => {
	const { state, pathname } = useLocation()
	const dispatch = useAppDispatch()
	const { allIds } = useAppSelector(columnsSelector)
	const { status } = useAppSelector(kanbanSelector)
	const PipelineStageOptions = useAppSelector(PipelineStageOptionsSelector)
	const navigate = useNavigate()

	const [currentCandidateId, setCurrentCandidateId] = useState<string | null>(state?.state || null)

	const handleDragEnd = async ({ source, destination, draggableId }: DropResult) => {
		if (
			!destination ||
			(source.droppableId === destination.droppableId && source.index === destination.index)
		)
			return // No destination or candidate not moved
		const destinationId: any = PipelineStageOptions.find(
			//@ts-ignore
			({ uuid }) => uuid === destination.droppableId,
		)
		const dndData = {
			candidateId: draggableId,
			sourcePosition: source.index,
			sourceId: source.droppableId,
			destinationId: destination.droppableId,
			destinationPosition: destination.index,
			stageId: destinationId?.value,
		}

		dispatch(kanbanActions.moveCandidate(dndData))
	}

	const handleCandidateOpen = useCallback((candidateId: string): void => {
		setCurrentCandidateId(candidateId)
	}, [])

	const handleCandidateClose = useCallback((): void => {
		setCurrentCandidateId(null)
		navigate(pathname, { replace: true })
	}, [])

	useEffect(() => {
		if (state?.state && status === 'SUCCESS') {
			checkPoint(state?.state)
			setCurrentCandidateId(state.state)
			handleCandidateOpen(state.state)
		}
		return () => {}
	}, [state])

	return (
		<>
			<Seo title="Candidate Listing" />
			{status === 'LOADING' ? (
				<KanbanListingLoading />
			) : (
				<Box
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						overflow: 'hidden',
					}}
				>
					<DragDropContext onDragEnd={handleDragEnd}>
						<Scrollbar>
							<Box
								sx={{
									display: 'flex',
									flexGrow: 1,
									flexShrink: 1,
								}}
							>
								<Stack
									alignItems="flex-start"
									direction="row"
									spacing={2}
								>
									{allIds?.map((columnId: string) => (
										<ColumnCard
											key={columnId}
											columnId={columnId}
											onCandidateOpen={handleCandidateOpen}
										/>
									))}
								</Stack>
							</Box>
						</Scrollbar>
					</DragDropContext>
				</Box>
			)}
			<CandidateModal
				onClose={handleCandidateClose}
				open={!!currentCandidateId}
				candidateId={currentCandidateId || undefined}
			/>
		</>
	)
}

export default CandidateListing
