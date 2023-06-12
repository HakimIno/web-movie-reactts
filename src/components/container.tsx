import { CustomComponentProps } from '../interfaces'
import { mergeClassName } from '../utils'

export const Container = (props: CustomComponentProps) => {
  return (
    <div
      className={mergeClassName(
        'px-6 py-3 max-w-screen-2xl mx-auto',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}