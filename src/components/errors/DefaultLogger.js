import React from 'react'
import * as Sentry from '@sentry/browser'
import Logger from './Logger'

export default class DefaultLogger extends Logger {
  constructor () {
    super('default')
  }

  log (error, errorInfo) {
    console.log(error, errorInfo)
  }

  fallbackRender () {
    return (
      <h1>Something went wrong.</h1>
    )
  }
}

