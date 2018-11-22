import React from 'react'
import * as Sentry from '@sentry/browser'
import Logger from './Logger'

export default class SentryLogger extends Logger {
  constructor (dsn) {
    super('sentry')
    Sentry.init({
      dsn
    });
  }

  log (error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  fallbackRender () {
    return (
      <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
    )
  }
}

