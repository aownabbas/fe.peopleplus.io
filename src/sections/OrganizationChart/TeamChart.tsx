import React, { useState, useEffect } from 'react'
import TeamMemberCard from './TeamMemberCard'
import { Avatar, Box, Typography } from '@mui/material'
import { Subordinate } from 'type/organizationalChart'
import { useAppSelector } from '@redux/hooks'
import { orgChartSelector } from '@redux/features/organizationalChart'
import SkeletonCard from './SkeletonCard'

type ExpandedIdByLevel = {
	[level: number]: number | null
}

const TeamChart: React.FC = () => {
	const { orgChartList, status } = useAppSelector(orgChartSelector)
	const isLoading = orgChartList.length === 0 && status === 'LOADING'

	const [expandedIdByLevel, setExpandedIdByLevel] = useState<ExpandedIdByLevel>({})
	const [teamMembers, setTeamMembers] = useState<Subordinate[]>([])
	const [lastExpanded, setLastExpanded] = useState<{ id: number; level: number } | null>(null)

	useEffect(() => {
		setTeamMembers(orgChartList)
	}, [orgChartList])

	useEffect(() => {
		if (lastExpanded) {
			const { id, level } = lastExpanded
			const expandedInfoId = `expanded-info-${id}-${level}`
			const expandedInfoElement = document.getElementById(expandedInfoId)
			if (expandedInfoElement && expandedInfoElement.childElementCount > 0) {
				expandedInfoElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'start',
				})
			}
		}
	}, [lastExpanded])
	const toggleSubChart = (id: number, level: number) => {
		setExpandedIdByLevel((prev) => {
			const newExpandedIdByLevel = {
				...prev,
				[level]: prev[level] === id ? null : id,
			}
			for (let i = level + 1; i <= Object.keys(prev).length; i++) {
				newExpandedIdByLevel[i] = null
			}
			setLastExpanded({ id, level })
			return newExpandedIdByLevel
		})
	}

	const renderMembers = (members: Subordinate[], level: number = 0): JSX.Element => {
		return (
			<>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						width: 'fit-content',
						gap: 3,
						paddingTop: level > 0 ? '40px' : '0px',
						borderTop: level > 0 ? '1px solid #c8cbd1' : 'none',
						borderRadius: level > 0 ? '20px' : 'none',
					}}
				>
					{members.map((member) => {
						const isExpanded = expandedIdByLevel[level] === member.id
						return (
							<TeamMemberCard
								key={member.id}
								subordinates={member.subordinates}
								uuid={member.uuid}
								name={member.name}
								title={member.job_title}
								imageSrc={member.photo}
								toggleSubChart={() => toggleSubChart(member.id, level)}
								expanded={isExpanded}
							/>
						)
					})}
				</Box>
				{members.map((member) => {
					const isExpanded = expandedIdByLevel[level] === member.id
					return (
						<React.Fragment key={`expanded-${member.id}`}>
							{isExpanded && member.subordinates && member.subordinates.length > 0 && (
								<Box
									id={`expanded-info-${member.id}-${level}`}
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										width: '100%',
									}}
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 2,
											paddingTop: '20px',
											marginBottom: '10px',
										}}
									>
										<Avatar
											src={member.photo}
											sx={{
												width: '40px',
												height: '40px',
												objectFit: 'cover',
												border: '1px solid #357DBC',
											}}
										/>
										<Typography
											sx={{
												fontSize: 16,
												fontWeight: 500,
												color: '#6B7280',
											}}
										>
											{member.name}
										</Typography>
									</Box>
									<Box
										sx={{
											width: '1px',
											height: '50px',
											backgroundColor: '#c8cbd1',
										}}
									></Box>
									<Box
										id={`sub-chart-${member.id}-${level}`}
										sx={{
											display: 'flex',
											flexWrap: 'wrap',
											justifyContent: 'center',
											width: '100%',
										}}
									>
										{renderMembers(member.subordinates, level + 1)}
									</Box>
								</Box>
							)}
						</React.Fragment>
					)
				})}
			</>
		)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			{isLoading ? (
				<SkeletonCard />
			) : (
				teamMembers && teamMembers.length > 0 && renderMembers(teamMembers)
			)}
		</Box>
	)
}

export default TeamChart
