import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {error: null}
  }

  componentDidCatch (error, info) {
    this.setState(() => ({
      error
    }));
    // You can also log the error to an error reporting service
    log(error, info)
  }

  log(error, errorInfo) {
    this.props.logger.log(error, errorInfo);
  }

  render () {
    if (this.state.error) {
      return this.props.logger.fallbackRender()
    }

    return this.props.children
  }
}
