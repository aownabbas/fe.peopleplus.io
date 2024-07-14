import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { prepareBoardAction } from '@redux/features/kanbanSlice'
import { recruitmentSelector } from '@redux/features/recruitmentSlice'
import { transformCandidates } from '@utils/factory'

export const useBoard = (): void => {
	const dispatch = useAppDispatch()
	const { job } = useAppSelector(recruitmentSelector)

	const prepareBoard = useCallback(() => {
		const candidate = transformCandidates(job.pipelines)
		dispatch(prepareBoardAction(candidate))
	}, [dispatch, job.pipelines])

	useEffect(() => {
		prepareBoard()
	}, [prepareBoard])
}
