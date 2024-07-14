import type { ChangeEvent, FC } from 'react'
import { FormEvent, useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

import { useUpdateEffect } from '@hooks/use-upate-effect'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

interface JobListSearchProps {
	onFiltersChange: (filters: ChangeEvent<HTMLInputElement>) => void
}

const JobListSearch: FC<JobListSearchProps> = (props) => {
	const { t } = useTranslation()
	const { dashboard } = tokens.recruitment
	const { onFiltersChange, ...other } = props

	return (
		<div {...other}>
			<Stack
				alignItems="center"
				component="form"
				direction="row"
				spacing={2}
				sx={{ p: 2 }}
			>
				<SvgIcon>
					<SearchMdIcon />
				</SvgIcon>
				<Input
					defaultValue=""
					disableUnderline
					fullWidth
					onChange={onFiltersChange}
					placeholder={t(dashboard.search)}
					sx={{ flexGrow: 1 }}
				/>
			</Stack>
			<Divider />
		</div>
	)
}

export default JobListSearch
