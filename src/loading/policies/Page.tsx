import { Box, Stack, Container } from '@mui/material'
import Header from './Header'
import Documents from './Documents'

const Page = () => {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1 }}
		>
			<Container maxWidth="xl">
				<Stack
					spacing={3}
					sx={{
						mb: 3,
					}}
				>
					<Header />
					<Documents />
				</Stack>
			</Container>
		</Box>
	)
}

export default Page
