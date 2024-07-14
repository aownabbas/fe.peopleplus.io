import { useEffect, useCallback } from 'react'

const useDebounce = (callback: () => void, delay: number) => {
	// Here we create a debounced function that we can call
	const debouncedFn = useCallback(() => {
		callback()
	}, [callback])

	// Setup useEffect to call our debouncedFn after delay
	useEffect(() => {
		const handler = setTimeout(debouncedFn, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [debouncedFn, delay])
}

export default useDebounce
