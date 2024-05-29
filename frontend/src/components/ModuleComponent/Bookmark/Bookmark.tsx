import styles from './Bookmark.module.css'
import { ReactComponent as BookmarkIcon } from '../../../assets/icons/bookmark.svg'
import { Button } from '../../AtomComponent'

interface BookmarkProps {
  width?: string
  height?: string
  isBookmarked?: boolean
  bookmarkCount?: number
  onBookmarkClick: () => void
}

export function Bookmark({
  width,
  height,
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
        width={width || '24'}
        height={height || '24'}
      />
      {bookmarkCount ? bookmarkCount : ''}
    </button>
  )
}

export function BookmarkButton({
  width,
  height,
  isBookmarked,
  onBookmarkClick
}: BookmarkProps) {
  return (
    <Button
      className={`${styles.bookmarkButton} font-roboto-cta-small`}
      onClick={onBookmarkClick}
      variant="default"
    >
      <BookmarkIcon
        className={`${styles.bookmarkIcon} ${isBookmarked ? styles.bookmarked : styles.notBookmarked}`}
        width={width || '24'}
        height={height || '24'}
      />{' '}
      Save
    </Button>
  )
}
