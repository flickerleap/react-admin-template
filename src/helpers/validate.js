import { validate } from 'validate.js'
import { contains } from './string'

import './validateExtensions'

/**
 *
 * @param field
 * @param value
 * @param validationRules
 * @returns {*}
 */
export const validateField = (field, value, validationRules = {}) => {
  // Validate.js validates your values as an object
  // e.g. var form = {email: 'email@example.com'}
  // Line 8-9 creates an object based on the field name and field value
  let formValues = {}
  formValues[field] = value

  // Line 13-14 creates an temporary form with the validation fields
  // e.g. var formFields = {
  //                        email: {
  //                         presence: {
  //                          message: 'Email is blank'
  //                         }
  //                       }
  let formFields = {}
  formFields[field] = validationRules

  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const result = validate(formValues, formFields)

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0]
  }

  return null
}

export const validateFields = (fields = [], data = {}) => {
  let formFields = {}
  let formValues = data
  fields.forEach((field) => {
    formFields[field.name] = field.validation
  })

  // The formValues and validated against the formFields
  // the variable result hold the error messages of the field
  const result = validate(formValues, formFields)

  // If there is an error message, return it!
  if (result) {
    return result
  }

  return undefined
}

/**
 *
 * @param action
 * @returns {*}
 */
export const hasErrors = (action) => {
  return contains(action.type, 'FAILURE')
}

/**
 *
 * @param action
 * @returns {Array}
 */
export const getErrors = (action) => {
  let errors = []

  if (hasErrors(action)) {
    action.payload.response.then((data) => {
      errors = data.errors
    })
  }

  return errors
}
