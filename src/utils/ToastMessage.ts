import toast from 'react-hot-toast'

export const notify = () => toast('Here is your toast.')

const customId = 'custom-id-yes'

interface ToastMessage {
	state?: boolean
	msg?: string
}

const SHOW_ERROR = ({ state = true, msg = 'Something went wrong' }: ToastMessage) => {
	if (state) {
		toast.error(msg, {
			position: 'top-right',
			duration: 4000,
			// style: {
			//   backgroundColor: "#f05252",
			//   color: "#fff",
			//   fontSize: "18px",
			// },
		})
	}
}

const SHOW_SUCCESS = ({ state = true, msg = 'Successful !' }: ToastMessage) => {
	if (state) {
		toast.success(msg, {
			position: 'top-right',
			duration: 4000,
			// style: {
			//   backgroundColor: "#04bac7",
			//   color: "#fff",
			//   fontSize: "18px",
			// },
		})
	}
}

const SHOW_INFO = ({ state = true, msg = 'information !' }: ToastMessage) => {
	if (state) {
		toast(msg, {
			position: 'top-right',
			duration: 4000,
		})
	}
}

export { SHOW_ERROR, SHOW_SUCCESS, SHOW_INFO }
