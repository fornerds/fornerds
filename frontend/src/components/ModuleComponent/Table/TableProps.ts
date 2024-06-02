export interface SolutionProps {
  id: number
  likeCount: number
  createdAt: string
  user_id: number
  user_name: string
  user_image: number
  codeLength: number
  executionTime: number
  memoryUsage: number
}

export interface MySolutionProps {
  id: number
  likeCount: number
  title: string
  user_id: number
  user_image: number
  memoryUsage: number
  createdAt: string
}

export interface SolutionsTapProps {
  id: number
  isBookmarked: boolean
  title: string
  user_id: number
  user_image: number
  memoryUsage: number
  createdAt: string
}
