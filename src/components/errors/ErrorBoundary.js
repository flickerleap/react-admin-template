import React from 'react'
import * as Sentry from '@sentry/browser';

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  logError = (error, info) => {
    if (process.env && process.env.SENTRY_REACT_DSN) {

    }
    else {
      console.log(error)
      console.log(info)
    }
  }

  render () {
    if (this.state.error) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
