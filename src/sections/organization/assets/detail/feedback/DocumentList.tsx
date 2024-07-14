import type { FC } from 'react'
import { useCallback, useContext, useState } from 'react'
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
import NoRecordFound from '@components/NoRecordFound'
import { ConfirmationContext } from '@contexts/confirmation'

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

	// const deleteDocument = useCallback(
	// 	(fileId: string, documentUuid: string) => {
	// 		setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [fileId]: true }))

	// 		dispatch(deleteAssetDocumentAction({ fileId, documentUuid }))
	// 			.then(() => {
	// 				toast.success('Record Deleted successfully!')
	// 			})
	// 			.catch((error: any) => {
	// 				console.error('Error Store Employee Document:', error)
	// 			})
	// 			.finally(() => {
	// 				setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [fileId]: false }))
	// 			})
	// 	},

	// 	[deleteAssetDocumentAction],
	// )

	const { openModal } = useContext(ConfirmationContext)

	const deleteDocument = useCallback(
		(fileId: string, documentUuid: string) => {
			openModal(
				`Are you sure you want to delete this Document?`,
				async () => {
					setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [fileId]: true }))

					try {
						await dispatch(deleteAssetDocumentAction({ fileId, documentUuid }))
						toast.success('Record Deleted successfully!')
					} catch (error) {
						console.error('Error Store Employee Document:', error)
					} finally {
						setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [fileId]: false }))
					}
				},
				() => {
					console.log('Cancelled')
				},
			)
		},
		[deleteAssetDocumentAction],
	)

	const {
		asset: { asset_documents },
	} = useAppSelector(assetsSelector)

	return (
		<Scrollbar sx={{ maxHeight: '610px' }}>
			{asset_documents && asset_documents.length ? (
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
											}}
										>
											<Box>
												<Tooltip title={file.name}>
													<Typography
														sx={{
															color: '#111927',
															fontWeight: 500,
															fontSize: 14,
															textWrap: 'nowrap',
															overflow: 'hidden',
															maxWidth: '150px',
															textOverflow: 'ellipsis',
														}}
													>
														{file.name}
													</Typography>
												</Tooltip>
												<Typography
													color="text.secondary"
													variant="caption"
												>
													{bytesToSize(Number(file.size))}
												</Typography>
											</Box>
											<Box>
												{loadingMap[file.file_id] ? (
													<CircularProgress
														sx={{ width: '15px!important', height: '15px!important' }}
													/>
												) : (
													<Tooltip title="Move to trash">
														<IconButton
															onClick={() => deleteDocument(file.file_id, file.uuid)}
															edge="end"
															size="small"
														>
															<SvgIcon>
																<DeleteOutlineOutlinedIcon />
															</SvgIcon>
														</IconButton>
													</Tooltip>
												)}
												<Typography variant="subtitle2">{loadingMap[file.file_id]}</Typography>
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
			) : (
				<NoRecordFound />
			)}
		</Scrollbar>
	)
}

export default DocumentList
