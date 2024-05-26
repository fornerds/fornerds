export interface CardProps {
  className?: string
  projectId: number
  status?: 'inProgress' | 'completed'
  difficulty?: string
  isBookmarked?: boolean
  bookmarkCount?: number
  title?: string
  description?: string
  skills?: string[]
  developerCount?: number
  remaining_quests?: number
  estimatedDuration?: string
  deadline?: number
  rewardCash?: number
  rewardExp?: number
  rewardPoint?: number
  createdAt?: string
}

export interface QuestCardProps {
  className?: string
  userQuestId: number
  status?: 'inProgress' | 'completed'
  difficulty?: string
  isBookmarked?: boolean
  bookmarkCount?: number
  title?: string
  description?: string
  skills?: string[]
  developerCount?: number
  remaining_quests?: number
  estimatedDuration?: string
  deadline?: number
  rewardCash?: number
  rewardExp?: number
  rewardPoint?: number
  createdAt?: string
  positionName?: string
  opened?: boolean
}
