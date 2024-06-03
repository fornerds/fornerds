import styles from './TextContent.module.css'
import { TextContentProps } from './TextContentProps'

export function TextContent({ title, description, list }: TextContentProps) {
  return (
    <div className={styles.textContent}>
      <p className={`text-color-lighten font-roboto-header-3`}>{title}</p>
      {description ? (
        <p className={`text-color-lighten font-roboto-body-1`}>{description}</p>
      ) : null}
      {list
        ? list?.map((str, index) => (
            <li key={index} className={`text-color-lighten font-roboto-body-1`}>
              {str}
            </li>
          ))
        : null}
    </div>
  )
}
