import { string } from 'prop-types'
import { StatusSetting } from './config'

export interface organizationalChartState extends StatusSetting {
	orgChartList: []
}

export interface Subordinate {
	id: number
	name: string
	uuid: string
	photo: string
	job_title: string
	subordinates?: Subordinate[]
}
