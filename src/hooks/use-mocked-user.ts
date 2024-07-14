export interface User {
	id: string
	avatar?: string
	email?: string
	name?: string

	[key: string]: any
}

export const useMockedUser = (): User => {
	return {
		id: '5e86809283e28b96d2d38537',
		avatar: '/images/avatars/avatar-anika-visser.png',
		name: 'Anika Visser',
		email: 'anika.visser@devias.io',
	}
}
