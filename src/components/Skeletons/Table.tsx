import React from 'react'
import { Box, Skeleton, Stack, TableCell, TableRow } from '@mui/material'

interface TableProps {
	rows: number
	columns: number
	avatarColumn?: number
}

const Table: React.FC<TableProps> = ({ rows, columns, avatarColumn }) => {
	return (
		<>
			{Array.from({ length: rows }, (_, rowIndex) => (
				<TableRow
					sx={{
						cursor: 'pointer',
						borderRadius: '50px',
						padding: '5px 10px',
						'&:hover': {
							background: 'linear-gradient(to right, #357DBC2c, #B591DB2a)',
						},
					}}
					key={rowIndex}
				>
					{Array.from({ length: columns }, (_, columnIndex) => (
						<TableCell key={columnIndex}>
							{avatarColumn !== undefined && columnIndex === avatarColumn ? (
								<Stack
									alignItems="center"
									direction="row"
									spacing={1}
								>
									<Skeleton
										variant="circular"
										width={42}
										height={42}
									/>
									<Box sx={{ flexGrow: 1 }}>
										<Skeleton
											variant="text"
											sx={{ fontSize: '1rem' }}
										/>
										<Skeleton
											variant="text"
											sx={{ fontSize: '1rem' }}
										/>
									</Box>
								</Stack>
							) : (
								<Skeleton
									variant="text"
									sx={{ fontSize: '1rem' }}
								/>
							)}
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	)
}

export default Table
