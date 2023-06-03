import React from 'react'
import type { IProps } from '../interfaces'

const ErrorLayout: React.FC<IProps> = ({ children }) => (
  <div className='layout layout--error'>
    {children}
  </div>
)

export default ErrorLayout
