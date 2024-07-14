import { useDropzone, DropzoneOptions, FileWithPath } from 'react-dropzone'
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

export type File = FileWithPath

interface FileDropzoneProps extends DropzoneOptions {
	caption?: string
	files?: File[]
	onRemove?: (file: File) => void
	onRemoveAll?: () => void
	onUpload?: () => void
	multipleFiles?: boolean
	validationCheck?: any
}

export const FileDropzone = (props: FileDropzoneProps) => {
	const {
		caption,
		files = [],
		onRemove,
		onRemoveAll,
		onUpload,
		multipleFiles,
		validationCheck,
		...other
	} = props

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		...other,
		multiple: multipleFiles !== false,
	})
	const hasAnyFiles = files.length > 0

	return (
		<div>
			<Box
				sx={{
					gap: 1,
					width: '100%',
					fontWeight: 500,
					pb: 3,
					pt: 6,
					display: 'flex',
					flexDirection: 'column',
					color: '#357DBC',
					fontSize: 13,
					cursor: 'pointer',
					flexWrap: 'wrap',
					border: validationCheck ? '2px solid red' : '1px solid #357DBC',
					borderRadius: '8px',
					'&:hover': {
						backgroundImage: 'linear-gradient(135deg, #357DBC2a, #B591DB2c)',
					},
					'@media (min-width: 600px)': {
						fontSize: 16,
					},
				}}
				{...getRootProps()}
			>
				<input {...getInputProps()} />
				<Stack
					spacing={1}
					sx={{
						justifyContent: 'center',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<Avatar sx={{ height: 64, width: 64 }}>
						<SvgIcon>
							<Upload01Icon />
						</SvgIcon>
					</Avatar>
					<Typography
						sx={{
							'& span': {
								textDecoration: 'underline',
							},
						}}
						// variant="h6"
					>
						<span>Click to upload</span> or drag and drop
					</Typography>
					{caption && <Typography>{caption}</Typography>}
				</Stack>
			</Box>
			{hasAnyFiles && <Box sx={{ mt: 2 }}></Box>}
		</div>
	)
}

// FileDropzone.propTypes = {
// 	caption: PropTypes.string,
// 	files: PropTypes.array,
// 	onRemove: PropTypes.func,
// 	onRemoveAll: PropTypes.func,
// 	onUpload: PropTypes.func,
// 	accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired),
// 	disabled: PropTypes.bool,
// 	getFilesFromEvent: PropTypes.func,
// 	maxFiles: PropTypes.number,
// 	maxSize: PropTypes.number,
// 	minSize: PropTypes.number,
// 	noClick: PropTypes.bool,
// 	noDrag: PropTypes.bool,
// 	noDragEventsBubbling: PropTypes.bool,
// 	noKeyboard: PropTypes.bool,
// 	onDrop: PropTypes.func,
// 	onDropAccepted: PropTypes.func,
// 	onDropRejected: PropTypes.func,
// 	onFileDialogCancel: PropTypes.func,
// 	preventDropOnDocument: PropTypes.bool,
// }

export default FileDropzone
