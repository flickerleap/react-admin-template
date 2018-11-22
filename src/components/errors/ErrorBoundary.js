import React from 'react'
import { Container } from 'reactstrap'

export class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {error: null}
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  componentDidCatch (error, errorInfo) {
    this.setState(() => ({
      error
    }))
    // You can also log the error to an error reporting service
    this.props.logger.log(error, errorInfo)
  }

  render () {
    if (this.state.error) {
      return (
        <main className="main">
          <Container fluid>
            {this.props.logger.render()}
          </Container>
        </main>
      )
    }

    return this.props.children
  }
}
