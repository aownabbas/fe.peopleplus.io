import { useEffect, useRef } from 'react'

const useScrollPosition = (open: boolean) => {
	const scrollPosition = useRef(0)

	useEffect(() => {
		if (open) {
			scrollPosition.current = window.scrollY
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollPosition.current}px`
		} else {
			document.body.style.position = ''
			document.body.style.top = ''
			window.scrollTo(0, scrollPosition.current)
		}
	}, [open])
}

export default useScrollPosition
