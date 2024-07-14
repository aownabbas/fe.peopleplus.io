import { dynamicFields } from 'type/settings'
import { Column } from 'type/kanban'
import { Candidate, Pipeline } from 'type/recruitment'
import { Person } from 'type/search'
import { Employee } from 'type/employee'
import { Document, Documents, PolicyStatus } from 'type/policies'
import { urlPreFix } from '@config/index'

interface RawData {
	[key: string]: any
}

type makeDynamicFieldsParams = {
	rawData: RawData[]
	pick: string[]
	drop?: string[]
	majorKey?: string
	path: dynamicFields
	isEmpty?: boolean
}
export const makeDynamicFields = ({
	pick,
	drop = ['name', 'details'],
	rawData,
	majorKey,
	path,
	isEmpty,
}: makeDynamicFieldsParams) => {
	const [pFirst, pSecond] = pick
	const [dFirst, dSecond] = drop
	if (rawData.length === 0 && majorKey && isEmpty) {
		return { [majorKey]: [{ name: '', details: '' }] }
	}

	if (rawData.length === 0 && isEmpty) {
		return [{ name: '', details: '' }]
	}

	if (majorKey) {
		return {
			[majorKey]: rawData.map((item) => ({
				[dFirst]: item[pFirst],
				[dSecond]: item[pSecond],
				uuid: item.uuid,
				path,
			})),
		}
	}

	return rawData.map((item) => ({
		[dFirst]: item[pFirst],
		[dSecond]: item[pSecond],
		uuid: item.uuid,
		photo: item.photo,
		job_title: item.job_title,
		path,
	}))
}

export function createColumn(rawData: any, candidates: Candidate[]): Column[] {
	return rawData.map((item: { uuid: any; name: any }) => {
		const candidateIds: string[] = candidates
			.filter((cdt) => cdt.columnId === item.uuid)
			.map((cdt) => String(cdt.id))

		// console.info(item.name, { candidateIds })

		return { id: item.uuid, candidateIds, name: item.name }
	})
}

export function transformCandidates(pipelines: Pipeline): Candidate[] {
	let candidates: Candidate[] = []
	for (const stage in pipelines) {
		// console.info('stage => ', stage)
		candidates = candidates.concat(
			pipelines[stage].map((cdt) => {
				return { ...cdt, columnId: stage }
			}),
		)
	}
	return candidates
}

export function swapValue(candidates: Candidate[], pipeline: any[]) {
	return candidates.map((cdt) => {
		const stage = pipeline.find(({ name }) => name === cdt.columnId)
		// console.info('stage', stage.uuid, cdt.columnId)
		return { ...cdt, columnId: stage.uuid, stageId: stage.id }
	})
}

export function createPerson(rawData: any[]): Person[] {
	const persons = rawData.map(
		(ce): Person => ({
			email: ce.email,
			id: ce.id,
			image: ce.photo || ce.image,
			name: `${ce.first_name} ${ce.last_name}`,
			phone: ce.phone_number || ce.phone,
			role: ce.designation || ce?.job?.title,
			reDir: {
				url: ce?.job?.uuid
					? `/recruitment/job/${ce?.job?.uuid} `
					: `/${urlPreFix.employee}/profile/${ce.uuid}`,
				state: ce?.job?.uuid ? ce.id : null,
			},
		}),
	)

	return persons
}

export const createPolicyCategoriesTab = (documents: Documents) => {
	// Helper function to reduce and sort categories
	const reduceAndSortCategories = (docs: Documents) =>
		docs
			.reduce((acc: { label: string; value: string }[], item: Document) => {
				const exists = acc.some((existingItem) => existingItem.value === item.category_name)
				if (!exists) {
					acc.push({ label: item.category_name, value: item.category_name })
				}
				return acc
			}, [])
			.sort((a, b) => a.label.localeCompare(b.label))

	//  Filter, reduce, and sort for  documents

	const draftCategories = reduceAndSortCategories(
		documents.filter((document) => document.status === PolicyStatus.Draft),
	)
	const publishedCategories = reduceAndSortCategories(
		documents.filter((document) => document.status === PolicyStatus.Published),
	)
	draftCategories.unshift({ label: 'All', value: 'All' })
	publishedCategories.unshift({ label: 'All', value: 'All' })

	return [draftCategories, publishedCategories]
}
