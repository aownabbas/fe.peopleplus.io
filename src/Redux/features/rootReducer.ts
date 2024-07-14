import { Action, combineReducers } from 'redux'
import appReducer from './appSlice'
import authReducer from './authSlice'
import settingsReducer from './settingsSlice'
import departmentReducer from './departmentSlice'
import dashboardReducer from './dashboardSlice'
import employeeReducer from './employeeSlice'
import assetsReducer from './assetsSlice'
import kanbanReducer from './kanbanSlice'
import recruitmentReducer from './recruitmentSlice'
import organizationalChartReducer from './organizationalChart'
import employeeDashboardReducer from './employee/dashboardSlice'
import policiesReducer from './policiesSlice'
import eventReducer from './eventsSlice'
import generalReducer from './generalSlice'
// reducers type
export type AppReducerType = ReturnType<typeof combinedReducer>

const combinedReducer = combineReducers({
	empDashboard: employeeDashboardReducer,
	app: appReducer,
	auth: authReducer,
	department: departmentReducer,
	dashboard: dashboardReducer,
	settings: settingsReducer,
	assets: assetsReducer,
	employee: employeeReducer,
	kanban: kanbanReducer,
	event: eventReducer,
	recruitment: recruitmentReducer,
	orgChart: organizationalChartReducer,
	policies: policiesReducer,
	general: generalReducer,
})

// root reducer
const rootReducer = (rootState: AppReducerType | undefined, action: Action) => {
	// terminate the state of a redux store
	console.log(action)

	if (action.type === 'Auth/logout/fulfilled') {
		rootState = undefined
	}
	return combinedReducer(rootState, action)
}

export default rootReducer
