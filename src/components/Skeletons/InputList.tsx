import { FC } from 'react'

// mui imports
import { Skeleton, Stack, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import TrashIcon from '@untitled-ui/icons-react/build/esm/Trash01'

type InputListProps = {
	isBottom?: boolean
	numberOfFields?: number
}
const InputList: FC<InputListProps> = ({ isBottom = true, numberOfFields = 5 }) => {
	return (
		<Stack spacing={2}>
			{Array.from({ length: numberOfFields }).map((_, idx) => (
				<Stack
					key={idx}
					alignItems="center"
					direction="row"
					justifyContent="space-between"
					spacing={2}
				>
					<Skeleton
						variant="rectangular"
						width="100%"
						height={56}
						sx={{ flexGrow: 1 }}
					/>
					<Skeleton
						variant="rectangular"
						width="100%"
						height={56}
						sx={{ flexGrow: 1 }}
					/>
					<IconButton disabled>
						<Skeleton variant="circular">
							<SvgIcon fontSize="small">
								<TrashIcon />
							</SvgIcon>
						</Skeleton>
					</IconButton>
				</Stack>
			))}
			<Stack
				alignItems="center"
				justifyContent="space-between"
				direction="row"
			>
				<Skeleton
					variant="text"
					// width="25%"
				>
					<Button
						startIcon={
							<SvgIcon fontSize="small">
								<PlusIcon />
							</SvgIcon>
						}
					>
						Add
					</Button>
				</Skeleton>

				<Skeleton
					variant="rectangular"
					// width="25%"
				>
					<Button variant="gradient">Save Changes</Button>
				</Skeleton>
			</Stack>
		</Stack>
	)
}

export default InputList
