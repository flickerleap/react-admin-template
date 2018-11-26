import React from 'react'
import * as Sentry from '@sentry/browser'
import { Logger } from './Logger'

export class SentryLogger extends Logger {
  constructor (dsn) {
    super('sentry')

    if(this.isProduction()) {
      Sentry.init({
        dsn
      })
    }
  }

  isProduction = () => {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  }

  log (error, errorInfo) {
    if(this.isProduction()) {
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key])
        })
        Sentry.captureException(error)
      })
    }
  }

  render () {
    return (
      <div>
        <h1>Sorry, something went wrong.</h1>
      </div>
    )
  }
}

