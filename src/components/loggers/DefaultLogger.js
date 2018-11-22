import React from 'react'
import { Logger } from './Logger'

export class DefaultLogger extends Logger {
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

