import { CustomComponentProps } from '../interfaces'
import { Container } from './container'

interface Props extends CustomComponentProps {
  title?: string
}

export const Section = (props: Props) => {
  return (
    <Container className={props.className}>
      {props.title ? <h1 className="text-xl py-1.5">{props.title}</h1> : ''}
      {props.children}
    </Container>
  )
}
