import type { FC } from 'react'
import { useCallback, useState } from 'react'
// mui imports
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	IconButton,
	SvgIcon,
	Tooltip,
	Typography,
	Avatar,
} from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'

import FileCheck03Icon from '@untitled-ui/icons-react/build/esm/FileCheck03'
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01'
import DeleteOutlineOutlinedIcon from '@untitled-ui/icons-react/build/esm/Trash02'

// local imports
import { bytesToSize } from '@utils/bytes-to-size'
import { assetsSelector, deleteAssetDocumentAction } from '@redux/features/assetsSlice'
import { useAppSelector } from '@redux/hooks'
import {} from 'react-redux'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@redux/hooks'
import CircularProgress from '@mui/material/CircularProgress'
import { height } from '@mui/system'
import { Scrollbar } from '@components/scrollbar'
const DocumentList = () => {
	const dispatch = useAppDispatch()
	const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>({})

	function getIconForMimeType(mimeType: string): string {
		const mimeTypeToIconMap: Record<string, string> = {
			'application/pdf': 'pdf.png',
			'application/document': 'document.png',
			'application/sheet': 'sheet.png',
			'application/excel': 'excel.png',
			'image/png': 'pngfile.png',
			'image/jpg': 'jpg.png',
			'image/jpeg': 'jpg.png',
			'text/plain': 'text.png',
		}
		return mimeTypeToIconMap[mimeType] || 'pngfile.png'
	}

	const deleteDocument = useCallback(
		(fileId: string, documentUuid: string) => {
			setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [fileId]: true }))

			dispatch(deleteAssetDocumentAction({ fileId, documentUuid }))
				.then(() => {
					toast.success('Record Deleted successfully!')
				})
				.catch((error: any) => {
					console.error('Error Store Employee Document:', error)
				})
				.finally(() => {
					setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [fileId]: false }))
				})
		},
		[deleteAssetDocumentAction],
	)

	const {
		asset: { asset_documents },
	} = useAppSelector(assetsSelector)

	return (
		<Scrollbar sx={{ maxHeight: '610px' }}>
			<Box
				sx={{
					p: 3,
				}}
			>
				<Grid
					container
					spacing={3}
				>
					{asset_documents?.map((file) => {
						const isImage = file.mime_type.includes('pdf/')
						return (
							<Grid
								key={file.file_id}
								md={4}
								xs={12}
							>
								<Card
									sx={{
										boxShadow: 'none !important',
										border: '1px solid #EAECF0',
										height: '310px',
									}}
								>
									<Box
										sx={{
											width: '100%',
											display: 'flex',
											justifyContent: 'center',
											pt: 3,
										}}
									>
										<img
											src={`/fileformat/${getIconForMimeType(file.mime_type)}`}
											style={{
												height: '100px',
												width: '100px',
												objectFit: 'contain',
											}}
										/>
									</Box>

									<CardContent
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											px: 2,
											height: '132px',
										}}
									>
										<Box>
											<Typography
												sx={{
													fontWeight: 500,
													fontSize: 14,
													lineHeight: '21px',
													color: '#111927',
													width: '190px',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												{file.name}
											</Typography>
											<Typography
												sx={{
													fontSize: 14,
													fontWeight: 400,
													lineHeight: '21px',
													color: '#6C737F',
												}}
											>
												{bytesToSize(Number(file.size))}
											</Typography>
										</Box>
									</CardContent>
									<Divider />
									<CardActions sx={{ justifyContent: 'center' }}>
										<Button
											color="inherit"
											size="small"
											startIcon={
												<SvgIcon>
													<Download01Icon />
												</SvgIcon>
											}
										>
											<a
												href={file.url}
												download={file.name}
												style={{ textDecoration: 'none', color: 'inherit' }}
												target="_blank"
												rel="noreferrer"
											>
												Download
											</a>
										</Button>
									</CardActions>
								</Card>
							</Grid>
						)
					})}
				</Grid>
			</Box>
		</Scrollbar>
	)
}

export default DocumentList
