import React from 'react'

const ErrorMessage = (props: Props) => {
  return (
    <div>{props.message}</div>
  )
}

interface Props {
  message: string
}
export default ErrorMessage