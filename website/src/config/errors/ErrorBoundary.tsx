import React from 'react'
import UnhandledErrorPage from './UnhandledErrorPage'
import type { IProps } from '../interfaces'

interface IErrorBoundaryState {
  hasError: boolean
}
export default class ErrorBoundary extends React.Component<IProps> {
  state: IErrorBoundaryState = {
    hasError: false
  }

  // Update state so the next render will show the fallback UI
  static getDerivedStateFromError (): IErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch (error: Error): void {
    reportError(error)
  }

  render () {
    return !this.state.hasError
      ? this.props.children
      : <UnhandledErrorPage />
  }
}
