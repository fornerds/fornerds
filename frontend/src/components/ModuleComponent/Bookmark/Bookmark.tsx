import styles from './Bookmark.module.css'
import { ReactComponent as BookmarkIcon } from '../../../assets/icons/bookmark.svg'

interface BookmarkProps {
  isBookmarked?: boolean
  bookmarkCount?: number
  onBookmarkClick: () => void
}

export function Bookmark({
  isBookmarked,
  bookmarkCount,
  onBookmarkClick
}: BookmarkProps) {
  return (
    <button
      className={`${styles.bookmark} font-roboto-body-3`}
      onClick={onBookmarkClick}
    >
      <BookmarkIcon
        className={`${styles.bookmarkIcon} ${isBookmarked ? styles.bookmarked : styles.notBookmarked}`}
        width="24"
        height="24"
      />
      {bookmarkCount ? bookmarkCount : ''}
    </button>
  )
}
