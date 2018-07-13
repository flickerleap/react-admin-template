import moment from 'moment';

/**
 * Returns a timestamp string for the current time.
 *
 * @returns {string}
 */
export const now = () => moment().format('YYYY-MM-DD HH:mm:ss');

/**
 *
 * @param {Moment} date
 * @returns {string}
 */
export const timestamp = (date) => date.format(getTimestampFormat());

/**
 *
 * @param {string} value
 * @returns {string}
 */
export const getTimeFormatForMoment = (value) => `${moment().format('YYYY-MM-DD')}T${value}`;

/**
 *
 * @returns {string}
 */
export const getTimestampFormat = () => 'YYYY-MM-DD HH:mm:ss';