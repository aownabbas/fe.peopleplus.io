import React from 'react'
import { Box, Skeleton, Stack, Card as MUICard, CardContent } from '@mui/material'

// Type Definitions
type AvatarType = 'circular' | 'rectangular' | 'rounded'

interface AvatarConfig {
	size: number
	alignment: 'flex-start' | 'center' | 'flex-end'
	type: AvatarType
	onBackground: boolean
}

interface BackgroundConfig {
	height: number
	display: boolean
}

interface LinesConfig {
	title: number
	content: number
}

interface ActionConfig {
	display: boolean
}

interface CardConfig {
	avatar?: Partial<AvatarConfig>
	background?: Partial<BackgroundConfig>
	lines?: Partial<LinesConfig>
	action?: Partial<ActionConfig>
}

// Default Configuration
const defaultConfig: CardConfig = {
	avatar: {
		size: 60,
		alignment: 'center',
		type: 'circular',
		onBackground: false,
	},
	background: {
		height: 140,
		display: true,
	},
	lines: {
		title: 1,
		content: 2,
	},
	action: {
		display: false,
	},
}

// Helper Function for Merging Configurations
const mergeConfigs = (userConfig: CardConfig = {}): CardConfig => {
	const mergedConfig: CardConfig = {
		avatar: { ...defaultConfig.avatar, ...userConfig.avatar },
		background: { ...defaultConfig.background, ...userConfig.background },
		lines: { ...defaultConfig.lines, ...userConfig.lines },
		action: { ...defaultConfig.action, ...userConfig.action },
	}

	return mergedConfig
}

interface PolicyCardProps {
	config?: CardConfig
}

const PolicyCard: React.FC<PolicyCardProps> = ({ config }) => {
	const mergedConfig = mergeConfigs(config)

	return (
		<MUICard>
			{mergedConfig.background?.display && (
				<Skeleton
					variant="rectangular"
					height={mergedConfig.background?.height}
					animation="wave"
				/>
			)}
			<CardContent>
				<Stack
					direction="column"
					spacing={2}
				>
					{mergedConfig.avatar?.onBackground && (
						<Box
							display="flex"
							justifyContent={mergedConfig.avatar.alignment}
							position="relative"
						>
							<Skeleton
								variant={mergedConfig.avatar.type}
								width={mergedConfig.avatar.size}
								height={mergedConfig.avatar.size}
								animation="wave"
							/>
						</Box>
					)}
					{Array.from({ length: mergedConfig.lines?.title ?? 0 }).map((_, index) => (
						<Skeleton
							key={`title-${index}`}
							variant="text"
							animation="wave"
						/>
					))}
					{Array.from({ length: mergedConfig.lines?.content ?? 0 }).map((_, index) => (
						<Skeleton
							key={`content-${index}`}
							variant="text"
							animation="wave"
						/>
					))}
					{mergedConfig.action?.display && (
						<Skeleton
							variant="rectangular"
							height={36}
							animation="wave"
						/>
					)}
				</Stack>
			</CardContent>
		</MUICard>
	)
}

export default PolicyCard
