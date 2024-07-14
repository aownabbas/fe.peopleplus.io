import type { FC } from 'react'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// mui imports
import { Box } from '@mui/material'

import type { Column } from '../../../../../types/kanban'
import CandidateCard from '../CandidateCard'
import { CandidateHeader } from './Candidate-header'
import { useAppSelector } from '@redux/hooks'
import { columnsSelector } from '@redux/features/kanbanSlice'
import { Scrollbar } from '@components/scrollbar'

const useColumn = (columnId: string): Column | undefined => {
	const columns = useAppSelector(columnsSelector)
	return columns.byId[columnId]
}

interface ColumnCardProps {
	columnId: string
	onCandidateOpen?: (candidateId: string) => void
}

const ColumnCard: FC<ColumnCardProps> = (props) => {
	const { columnId, onCandidateOpen, ...other } = props
	const column = useColumn(columnId)

	if (!column) {
		return null
	}

	const CandidateCount = column.candidateIds.length

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '258px',
			}}
			{...other}
		>
			<Box
				sx={{
					backgroundColor: '#f2f2f2', // or 'rgb(255, 255, 255)'
					width: '100%',
					borderRadius: 1,
				}}
			>
				<CandidateHeader
					candidateName={column.name}
					CandidateCount={CandidateCount}
				/>
			</Box>

			<Box sx={{ borderRadius: 2.5 }}>
				<Droppable droppableId={column.id}>
					{(droppableProvider): JSX.Element => (
						<Scrollbar
							sx={{
								height: '820px',
							}}
						>
							<Box
								ref={droppableProvider.innerRef}
								sx={{
									flexGrow: 1,
									// px: 1,
									cursor: 'pointer',
									height: '820px',
									mr: 1,
								}}
							>
								{column?.candidateIds.map((candidateId, index) => (
									<Draggable
										key={candidateId}
										draggableId={candidateId}
										index={index}
									>
										{(draggableProvided, snapshot): JSX.Element => (
											<Box
												ref={draggableProvided.innerRef}
												style={{ ...draggableProvided.draggableProps.style }}
												sx={{
													outline: 'none',
													py: 1,
												}}
												{...draggableProvided.draggableProps}
												{...draggableProvided.dragHandleProps}
											>
												<CandidateCard
													key={candidateId}
													dragging={snapshot.isDragging}
													onOpen={() => onCandidateOpen?.(candidateId)}
													candidateId={candidateId}
												/>
											</Box>
										)}
									</Draggable>
								))}
								{droppableProvider.placeholder}
							</Box>
						</Scrollbar>
					)}
				</Droppable>
			</Box>
		</Box>
	)
}

export default ColumnCard

ColumnCard.propTypes = {
	columnId: PropTypes.string.isRequired,
	onCandidateOpen: PropTypes.func,
}
